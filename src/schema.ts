import * as PgPromise from 'pg-promise'
import { mapValues } from 'lodash'
const pgp = PgPromise()

export class Database {
    private db

    constructor(connectionString: string) {
        this.db = pgp(connectionString)
    }

    public async getDBSchema(tableName: string) {
        
        let schema = {}
        
        await this.db.each(
            `SELECT column_name, udt_name 
             FROM information_schema.columns
             WHERE table_name = $1`,
            tableName, schemaItem => {
                schema[schemaItem.column_name] = schemaItem.udt_name
            })
        
        return schema
    }

    public async getTableTypes(tableName: string) {
        return this.mapDBSchemaToType(await this.getDBSchema(tableName))
    }

    private mapDBSchemaToType(schema: Object) {
        return mapValues(schema, udtName => {
            switch (udtName) {
                case 'varchar':
                case 'text':
                    return 'string'
                case 'int2':
                case 'int4':
                case 'int8':
                case 'float8':
                    return 'number'
                case 'bool':
                    return 'boolean'
                case 'json':
                    return 'Object'
                case 'date':
                case 'timestamp':
                    return 'Date'
                case '_float8':
                    return 'Array<number>'
                case '_text':
                    return 'Array<string>'
                default:
                    throw new TypeError(`do not know how to convert type [${udtName}]`)
            }
        })
    }
}
