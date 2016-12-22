import * as PgPromise from 'pg-promise'
import { mapValues } from 'lodash'
const pgp = PgPromise()

export class Database {
    private db

    constructor(connectionString: string) {
        this.db = pgp(connectionString)
    }

    public async getEnumTypes(schema: string) {
        let enums = {}
        await this.db.each(
            `select n.nspname as schema,
                 t.typname as name,
                 e.enumlabel as value
             from pg_type t
             join pg_enum e on t.oid = e.enumtypid
             join pg_catalog.pg_namespace n ON n.oid = t.typnamespace
             where enum_schema = '$1'`,
            schema, enumItem => {
                if (!enums[enumItem.name]) {
                    enums[enumItem.name] = []
                }
                enums[enumItem.name].append(enumItem.value)
            }
        )
        return enums
    }

    public async getDBSchema(tableName: string, schemaName: string) {
        let schema = {}
        await this.db.each(
            `SELECT column_name, udt_name
             FROM information_schema.columns
             WHERE table_name = $1 AND table_schema = $2`,
            [tableName, schemaName], schemaItem => {
                schema[schemaItem.column_name] = schemaItem.udt_name
            })
        return schema
    }

    public async getTableTypes(tableName: string, schema: string) {
        return this.mapDBSchemaToType(await this.getDBSchema(tableName, schema))
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
                    return udtName
            }
        })
    }
}
