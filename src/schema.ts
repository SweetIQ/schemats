import * as PgPromise from 'pg-promise'
import { mapValues } from 'lodash'
const pgp = PgPromise()

export interface TableDefinition {
    [columnName: string]: string
}

export class Database {
    private db: PgPromise.IDatabase<{}>

    constructor(connectionString: string) {
        this.db = pgp(connectionString)
    }

    public async getTableDefinition(tableName: string) {
        let tableDefinition: TableDefinition = {}
        await this.db.each(
            `SELECT column_name, udt_name
            FROM information_schema.columns
            WHERE table_name = $1`,
            [tableName],
            (schemaItem: {column_name: string, udt_name: string}) => {
                tableDefinition[schemaItem.column_name] = schemaItem.udt_name
            })
        return tableDefinition
    }

    public async getTableTypes(tableName: string) {
        return this.mapTableDefinitionToType(await this.getTableDefinition(tableName))
    }

    public async getSchemaTables(schemaName: string): Promise<string[]> {
        return await this.db.map(
            `SELECT table_name
            FROM information_schema.columns
            WHERE table_schema = $1
            GROUP BY table_name`,
            [schemaName],
            schemaItem => schemaItem.table_name
        )
    }

    private mapTableDefinitionToType(tableDefinition: TableDefinition): TableDefinition {
        return mapValues(tableDefinition, udtName => {
            switch (udtName) {
                case 'bpchar':
                case 'varchar':
                case 'text':
                case 'uuid':
                case 'bytea':
                    return 'string'
                case 'int2':
                case 'int4':
                case 'int8':
                case 'float8':
                case 'numeric':
                case 'money':
                    return 'number'
                case 'bool':
                    return 'boolean'
                case 'json':
                    return 'Object'
                case 'date':
                case 'timestamp':
                    return 'Date'
                case '_int2':
                case '_int4':
                case '_int8':
                case '_float8':
                case '_numeric':
                case '_money':
                    return 'Array<number>'
                case '_bool':
                    return 'Array<boolean>'
                case '_varchar':
                case '_text':
                case '_uuid':
                case '_bytea':
                    return 'Array<string>'
                default:
                    throw new TypeError(`do not know how to convert type [${udtName}]`)
            }
        })
    }
}
