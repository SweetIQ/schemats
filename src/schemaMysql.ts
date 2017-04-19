import * as mysql from 'mysql'
import { mapValues, keys, isEqual } from 'lodash'

import { TableDefinition, Database } from './schemaInterfaces'

interface AsyncConnection extends mysql.IConnection {
    queryAsync(queryString: string, escapedValues?: string[]): Promise<Object[]>
}

function parseMysqlEnumeration(mysqlEnum: string): string[] {
    return mysqlEnum.replace(/(^(enum|set)\('|'\)$)/gi, '').split(`','`)
}

function getEnumNameFromColumn(dataType: string, columnName: string): string {
    return `${dataType}_${columnName}`
}

export class MysqlDatabase implements Database {
    private db: AsyncConnection

    constructor(connectionString: string) {
        const cxn = this.db = mysql.createConnection(`${connectionString}?multipleStatements=true`) as AsyncConnection
        this.db.queryAsync = function(queryString: string, escapedValues?: Array<string>): Promise<Object[]> {
            return new Promise((resolve, reject) => {
                cxn.query(queryString, escapedValues, (error: Error, results: Array<Object>) => {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(results)
                })
            })
        }
    }

    public query(queryString: string) {
        return this.db.queryAsync(queryString)
    }

    public async getEnumTypes(schema?: string) {
        let enums: any = {}
        let enumSchemaWhereClause: string
        let params: string[]
        if (schema) {
            enumSchemaWhereClause = `and table_schema = ?`
            params = [schema]
        } else {
            enumSchemaWhereClause = ''
            params = []
        }
        const rawEnumRecords = await this.db.queryAsync(
            `SELECT column_name, column_type, data_type
            FROM information_schema.columns
            WHERE data_type IN ('enum', 'set') ${enumSchemaWhereClause}`,
            params
        )
        rawEnumRecords.forEach((enumItem: { column_name: string, column_type: string, data_type: string }) => {
            const enumName = getEnumNameFromColumn(enumItem.data_type, enumItem.column_name)
            const enumValues = parseMysqlEnumeration(enumItem.column_type)
            if (enums[enumName] && !isEqual(enums[enumName], enumValues)) {
                throw new Error(`Multiple enums with the same name and contradicting types were found: 
                        ${enumItem.column_name}: ${JSON.stringify(enums[enumName])} and ${JSON.stringify(enumValues)})`)
            }
            enums[enumName] = enumValues
        })
        return enums
    }

    public async getTableDefinition(tableName: string, tableSchema: string) {
        let tableDefinition: TableDefinition = {}

        const tableColumns = await this.db.queryAsync(
            `SELECT column_name, data_type, is_nullable
            FROM information_schema.columns
            WHERE table_name = ? and table_schema = ?`,
            [tableName, tableSchema]
        )
        tableColumns.map((schemaItem: { column_name: string, data_type: string, is_nullable: string }) => {
            const columnName = schemaItem.column_name
            const dataType = schemaItem.data_type
            tableDefinition[columnName] = {
                udtName: /^(enum|set)$/i.test(dataType) ? getEnumNameFromColumn(dataType, columnName) : dataType,
                nullable: schemaItem.is_nullable === 'YES'
            }
        })
        return tableDefinition
    }

    public async getTableTypes(tableName: string, tableSchema: string) {
        const enumTypes: any = await this.getEnumTypes(tableSchema)
        let customTypes = keys(enumTypes)
        return this.mapTableDefinitionToType(await this.getTableDefinition(tableName, tableSchema), customTypes)
    }

    public async getSchemaTables(schemaName: string): Promise<string[]> {
        const schemaTables = await this.db.queryAsync(
            `SELECT table_name
            FROM information_schema.columns
            WHERE table_schema = ?
            GROUP BY table_name`,
            [schemaName]
        )
        return schemaTables.map((schemaItem: { table_name: string }) => schemaItem.table_name)
    }

    private mapTableDefinitionToType(tableDefinition: TableDefinition, customTypes: string[]): TableDefinition {
        return mapValues(tableDefinition, column => {
            switch (column.udtName) {
                case 'char':
                case 'varchar':
                case 'binary':
                case 'varbinary':
                case 'blob':
                case 'text':
                case 'mediumtext':
                case 'set':
                case 'enum':
                    // keep set and enum defaulted to string if custom type not mapped
                    column.tsType = 'string'
                    return column
                case 'integer':
                case 'int':
                case 'smallint':
                case 'mediumint':
                case 'bigint':
                case 'double':
                case 'decimal':
                case 'numeric':
                case 'float':
                case 'bit':
                    column.tsType = 'number'
                    return column
                case 'tinyint':
                    column.tsType = 'boolean'
                    return column
                case 'json':
                    column.tsType = 'Object'
                    return column
                case 'date':
                case 'datetime':
                case 'timestamp':
                case 'time':
                case 'year':
                    column.tsType = 'Date'
                    return column
                default:
                    if (customTypes.indexOf(column.udtName) !== -1) {
                        column.tsType = column.udtName
                        return column
                    } else {
                        console.log(`Type [${column.udtName}] has been mapped to [any] because no specific type has been found.`)
                        column.tsType = 'any'
                        return column
                    }
            }
        })
    }
}
