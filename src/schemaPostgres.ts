import * as PgPromise from 'pg-promise'
import { mapValues } from 'lodash'
import { keys } from 'lodash'

import { TableDefinition, Database } from './schemaInterfaces'

const pgp = PgPromise()

export class PostgresDatabase implements Database {
    private db: PgPromise.IDatabase<{}>

    constructor(connectionString: string) {
        this.db = pgp(connectionString)
    }

    public async getEnumTypes(schema?: string) {
        let enums: any = {}
        let enumSchemaWhereCaluse = schema ? pgp.as.format(`where n.nspname = $1`, schema) : ''
        await this.db.each(
            `select n.nspname as schema,  
                 t.typname as name,  
                 e.enumlabel as value
             from pg_type t 
             join pg_enum e on t.oid = e.enumtypid  
             join pg_catalog.pg_namespace n ON n.oid = t.typnamespace
             ${enumSchemaWhereCaluse}
             order by t.typname asc, e.enumlabel asc;`, [],
            enumItem => {
                const {name, value} = enumItem
                if (!enums[name]) {
                    enums[name] = []
                }
                enums[name].push(value)
            }
        )
        return enums
    }

    public async getTableDefinition(tableName: string, tableSchema: string) {
        let tableDefinition: TableDefinition = {}
        await this.db.each(
            `SELECT column_name, udt_name, is_nullable
            FROM information_schema.columns
            WHERE table_name = $1 and table_schema = $2`,
            [tableName, tableSchema],
            (schemaItem: { column_name: string, udt_name: string, is_nullable: string }) => {
                tableDefinition[schemaItem.column_name] = {
                    udtName: schemaItem.udt_name,
                    nullable: schemaItem.is_nullable === 'YES'
                }
            })
        return tableDefinition
    }

    public async getTableTypes(tableName: string, tableSchema: string) {
        let enumTypes = await this.getEnumTypes()
        let customTypes = keys(enumTypes)
        return this.mapTableDefinitionToType(await this.getTableDefinition(tableName, tableSchema), customTypes)
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

    private mapTableDefinitionToType(tableDefinition: TableDefinition, customTypes: string[]): TableDefinition {
        return mapValues(tableDefinition, column => {
            switch (column.udtName) {
                case 'bpchar':
                case 'char':
                case 'varchar':
                case 'text':
                case 'uuid':
                case 'bytea':
                case 'inet':
                case 'time':
                case 'timetz':
                case 'interval':
                    column.tsType = 'string'
                    return column
                case 'int2':
                case 'int4':
                case 'int8':
                case 'float4':
                case 'float8':
                case 'numeric':
                case 'money':
                case 'oid':
                    column.tsType = 'number'
                    return column
                case 'bool':
                    column.tsType = 'boolean'
                    return column
                case 'json':
                case 'jsonb':
                    column.tsType = 'Object'
                    return column
                case 'date':
                case 'timestamp':
                case 'timestamptz':
                    column.tsType = 'Date'
                    return column
                case '_int2':
                case '_int4':
                case '_int8':
                case '_float4':
                case '_float8':
                case '_numeric':
                case '_money':
                    column.tsType = 'Array<number>'
                    return column
                case '_bool':
                    column.tsType = 'Array<boolean>'
                    return column
                case '_varchar':
                case '_text':
                case '_uuid':
                case '_bytea':
                    column.tsType = 'Array<string>'
                    return column
                default:
                    if (customTypes.indexOf(column.udtName) !== -1) {
                        column.tsType = column.udtName
                        return column
                    } else {
                        console.log(`Type [${column.udtName} has been mapped to [any] because no specific type has been found.`)
                        column.tsType = 'any'
                        return column
                    }
            }
        })
    }
}
