import { ConnectionPool, VarChar } from 'mssql'
import { mapValues, keys } from 'lodash'
import { parse as urlParse } from 'url'
import { TableDefinition, Database } from './schemaInterfaces'
import Options from './options'

export class MSsqlDatabase implements Database {
    private db: ConnectionPool
    private defaultSchema: string

    constructor (public connectionString: string) {
        this.db = new ConnectionPool(this.connectionString)
        let url = urlParse(connectionString, true)
        if (url && url.pathname) {
            this.defaultSchema = url.pathname.substr(1)
        } else {
            this.defaultSchema = 'master'
        }
    }

    // uses the type mappings from https://github.com/tediousjs/node-mssql where sensible
    private static mapTableDefinitionToType (tableDefinition: TableDefinition, customTypes: string[], options: Options): TableDefinition {
        if (!options) throw new Error()
        return mapValues(tableDefinition, column => {
            switch (column.udtName) {
                case 'bit':
                    column.tsType = 'boolean'
                    return column
                case 'decimal':
                case 'float':
                case 'int':
                case 'money':
                case 'numeric':
                case 'smallint':
                case 'smallmoney':
                case 'real':
                case 'tinyint':
                    column.tsType = 'number'
                    return column
                case 'bigint':
                case 'char' :
                case 'nchar' :
                case 'text' :
                case 'ntext' :
                case 'varchar' :
                case 'nvarchar' :
                case 'xml' :
                case 'uniqueidentifier' :
                    column.tsType = 'string'
                    return column
                case 'time' :
                case 'date' :
                case 'datetime' :
                case 'datetime2' :
                case 'datetimeoffset' :
                case 'smalldatetime' :
                    column.tsType = 'date'
                    return column
                // case 'binary' :
                // case 'varbinary' :
                // case 'image' :
                //     column.tsType = 'mssqlBuffer'
                //     return column
                default:
                    if (customTypes.indexOf(column.udtName) !== -1) {
                        column.tsType = options.transformTypeName(column.udtName)
                        return column
                    } else {
                        console.log(`Type [${column.udtName}] has been mapped to [any] because no specific type has been found.`)
                        column.tsType = 'any'
                        return column
                    }
            }
        })
    }

    public async query (queryString: string) {
        return this.templateQuery`${queryString}`
    }
    public async templateQuery (queryString: TemplateStringsArray, ...interpolations: any[]) {
        if (!this.db.connected) {
            await this.db.connect()
        }
        const { recordset } = await this.db.query(queryString, interpolations)
        return recordset as Object[]
    }

    public getDefaultSchema (): string {
        return this.defaultSchema
    }

    public async getEnumTypes (schema?: string) {
        return {}
    }

    public async getTableDefinition (tableName: string, tableSchema: string) {
        let tableDefinition: TableDefinition = {}
        if (!this.db.connected) {
            await this.db.connect()
        }

        const { recordset } = await this.db.request()
            .input('table_name', VarChar, tableName)
            .input('table_schema', VarChar, tableSchema)
            .query(
                'SELECT column_name, data_type, is_nullable ' +
                'FROM information_schema.columns ' +
                'WHERE table_name = @table_name and table_catalog = @table_schema'
            )

        recordset.forEach((schemaItem: { column_name: string, data_type: string, is_nullable: string }) => {
            const columnName = schemaItem.column_name
            const dataType = schemaItem.data_type
            tableDefinition[columnName] = {
                udtName: dataType.toLowerCase(),
                nullable: schemaItem.is_nullable === 'YES'
            }
        })
        return tableDefinition
    }

    public async getTableTypes (tableName: string, tableSchema: string, options: Options) {
        let enumTypes = await this.getEnumTypes()
        let customTypes = keys(enumTypes)
        return MSsqlDatabase.mapTableDefinitionToType(await this.getTableDefinition(tableName, tableSchema), customTypes, options)
    }

    public async getSchemaTables (schemaName: string): Promise<string[]> {
        const schemaTables = await this.templateQuery`
        SELECT table_name
        FROM information_schema.columns
        WHERE table_catalog = ${schemaName}
        GROUP BY table_name
        `
        return schemaTables.map((schemaItem: { table_name: string }) => schemaItem.table_name)
    }
}
