import * as mysql from 'mysql'
import { mapValues } from 'lodash'

import { TableDefinition, Database } from './schemaInterfaces'

interface AsyncConnection extends mysql.IConnection {
    queryAsync: Function
}

export class MysqlDatabase implements Database {
    private db: AsyncConnection

    constructor(connectionString: string) {
        const cxn = this.db = mysql.createConnection(connectionString) as AsyncConnection
        this.db.queryAsync = function(queryString: string, escapedValues: Array<string>): Promise<Array<Object>> {
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

    public async getEnumTypes(schema?: string) {
        return {}
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
            tableDefinition[schemaItem.column_name] = {
                udtName: schemaItem.data_type,
                nullable: schemaItem.is_nullable === 'YES'
            }
        })
        return tableDefinition
    }

    public async getTableTypes(tableName: string, tableSchema: string) {

        return this.mapTableDefinitionToType(await this.getTableDefinition(tableName, tableSchema))
    }

    public async getSchemaTables(schemaName: string): Promise<string[]> {
        const schemaTables =  await this.db.queryAsync(
            `SELECT table_name
            FROM information_schema.columns
            WHERE table_schema = ?
            GROUP BY table_name`,
            [schemaName]
        )
        return schemaTables.map((schemaItem: { table_name: string }) => schemaItem.table_name)
    }

    private mapTableDefinitionToType(tableDefinition: TableDefinition): TableDefinition {
        return mapValues(tableDefinition, column => {
            switch (column.udtName) {
                case 'char':
                case 'varchar':
                case 'binary':
                case 'varbinary':
                case 'blob':
                case 'text':
                case 'mediumtext':
                case 'enum':
                case 'set':
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
                    console.log(`Type [${column.udtName} has been mapped to [any] because no specific type has been found.`)
                    column.tsType = 'any'
                    return column
            }
        })
    }
}
