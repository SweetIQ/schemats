import * as PgPromise from 'pg-promise'
import { transform } from 'lodash'
import { keys } from 'lodash'
import Options from './options'

import { TableDefinition, Database } from './schemaInterfaces'

const pgp = PgPromise()

export class PostgresDatabase implements Database {
    private db: PgPromise.IDatabase<{}>

    constructor(public connectionString: string) {
        this.db = pgp(connectionString)
    }

    private static mapTableDefinitionToType(
        tableDefinition: TableDefinition,
        customTypes: string[],
        options: Options,
        tableName: string
    ): TableDefinition {
        return transform(tableDefinition, (acc, column, columnName) => {
            acc[columnName] = column
            if (
                options.options.customTypes &&
                options.options.customTypes[tableName] &&
                typeof options.options.customTypes[tableName][columnName] !==
                    'undefined'
            ) {
                column.tsCustomType = true
                column.tsType =
                    options.options.customTypes[tableName][columnName]
                return
            }
            // console.log(column, columnName)
            switch (column.udtName) {
                case 'bpchar':
                case 'char':
                case 'varchar':
                case 'text':
                case 'citext':
                case 'uuid':
                case 'bytea':
                case 'inet':
                case 'time':
                case 'timetz':
                case 'interval':
                case 'name':
                    column.tsType = 'string'
                    break
                case 'int2':
                case 'int4':
                case 'int8':
                case 'float4':
                case 'float8':
                case 'numeric':
                case 'money':
                case 'oid':
                    column.tsType = 'number'
                    break
                case 'bool':
                    column.tsType = 'boolean'
                    break
                case 'json':
                case 'jsonb':
                    column.tsType = 'any'
                    break
                case 'date':
                case 'timestamp':
                case 'timestamptz':
                    column.tsType = 'Date'
                    break
                case '_int2':
                case '_int4':
                case '_int8':
                case '_float4':
                case '_float8':
                case '_numeric':
                case '_money':
                    column.tsType = 'Array<number>'
                    break
                case '_bool':
                    column.tsType = 'Array<boolean>'
                    break
                case '_varchar':
                case '_text':
                case '_citext':
                case '_uuid':
                case '_bytea':
                    column.tsType = 'Array<string>'
                    break
                case '_json':
                case '_jsonb':
                    column.tsType = 'Array<Object>'
                    break
                case '_timestamptz':
                    column.tsType = 'Array<Date>'
                    break
                default:
                    if (customTypes.indexOf(column.udtName) !== -1) {
                        column.tsType = options.transformTypeName(
                            column.udtName
                        )
                    } else {
                        console.log(
                            `Type [${column.udtName} has been mapped to [any] because no specific type has been found.`
                        )
                        column.tsType = 'any'
                    }
            }
        })
    }

    public query(queryString: string) {
        return this.db.query(queryString)
    }

    public async getEnumTypes(schema?: string) {
        type T = { name: string; value: any }
        let enums: any = {}
        let enumSchemaWhereClause = schema
            ? pgp.as.format(`where n.nspname = $1`, schema)
            : ''
        await this.db.each<T>(
            'select n.nspname as schema, t.typname as name, e.enumlabel as value ' +
                'from pg_type t ' +
                'join pg_enum e on t.oid = e.enumtypid ' +
                'join pg_catalog.pg_namespace n ON n.oid = t.typnamespace ' +
                `${enumSchemaWhereClause} ` +
                'order by t.typname asc, e.enumlabel asc;',
            [],
            (item: T) => {
                if (!enums[item.name]) {
                    enums[item.name] = []
                }
                enums[item.name].push(item.value)
            }
        )
        return enums
    }

    public async getTableDefinition(tableName: string, tableSchema: string) {
        let tableDefinition: TableDefinition = {}
        type T = {
            column_name: string
            udt_name: string
            is_nullable: string
            column_default: string | null
        }
        await this.db.each<T>(
            'SELECT column_name, udt_name, is_nullable, column_default ' +
                'FROM information_schema.columns ' +
                'WHERE table_name = $1 and table_schema = $2',
            [tableName, tableSchema],
            (schemaItem: T) => {
                tableDefinition[schemaItem.column_name] = {
                    udtName: schemaItem.udt_name,
                    nullable: schemaItem.is_nullable === 'YES',
                    defaultValue: schemaItem.column_default
                }
            }
        )
        return tableDefinition
    }

    public async getTableTypes(
        tableName: string,
        tableSchema: string,
        options: Options
    ) {
        let enumTypes = await this.getEnumTypes()
        let customTypes = keys(enumTypes)
        return PostgresDatabase.mapTableDefinitionToType(
            await this.getTableDefinition(tableName, tableSchema),
            customTypes.sort(),
            options,
            tableName
        )
    }

    public async getSchemaTables(schemaName: string): Promise<string[]> {
        return await this.db.map<string>(
            'SELECT table_name ' +
                'FROM information_schema.columns ' +
                'WHERE table_schema = $1 ' +
                'GROUP BY table_name',
            [schemaName],
            (schemaItem: { table_name: string }) => schemaItem.table_name
        )
    }

    getDefaultSchema(): string {
        return 'public'
    }
}
