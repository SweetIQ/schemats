import { ConnectionPool } from 'mssql'
import { mapValues, keys, isEqual } from 'lodash'
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
            let database = url.pathname.substr(1)
            this.defaultSchema = database
        } else {
            this.defaultSchema = 'master'
        }
    }

    // uses the type mappings from https://github.com/mysqljs/ where sensible
    private static mapTableDefinitionToType (tableDefinition: TableDefinition, customTypes: string[], options: Options): TableDefinition {
        if (!options) throw new Error()
        return mapValues(tableDefinition, column => {
            switch (column.udtName.toLowerCase()) {
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
                case 'binary' :
                case 'varbinary' :
                case 'image' :
                    column.tsType = 'mssqlBuffer'
                    return column
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
        if (!this.db.connected) {
            await this.db.connect()
        }
        const { recordset } = await this.db.query`${queryString}`
        return recordset as Object[]
    }
}
