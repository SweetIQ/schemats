/**
 * Generate typescript interface from table schema
 * Created by xiamx on 2016-08-10.
 */

import { TableDefinition } from './schemaInterfaces'
import Options from './options'

function nameIsReservedKeyword (name: string): boolean {
    const reservedKeywords = [
        'string',
        'number',
        'package'
    ]
    return reservedKeywords.indexOf(name) !== -1
}

function normalizeName (name: string, options: Options): string {
    if (nameIsReservedKeyword(name)) {
        return name + '_'
    } else {
        return name
    }
}

export function generateTableInterface (tableNameRaw: string, tableDefinition: TableDefinition, options: Options) {
    const tableName = options.transformTypeName(tableNameRaw)
    const members = options.getKeys(tableDefinition).map((columnNameRaw) => {
        const columnName = options.transformColumnName(columnNameRaw)
        return `${columnName}: ${tableName}Fields.${normalizeName(columnName, options)};`
    })

    return `
        export interface ${normalizeName(tableName, options)} {
        ${members.join('\n')}
        }
    `
}

export function generateEnumType (enumObject: any, options: Options) {
    const enumNamespace = options.getKeys(enumObject).map((enumNameRaw) => {
        const enumName = options.transformTypeName(enumNameRaw)
        return `export type ${enumName} = '${options.getMaybeSorted(enumObject[enumNameRaw]).join(`'\n| '`)}';`
    })

    return `
        export namespace customTypes {
        ${enumNamespace.join('\n')}
        }
    `
}

export function generateTableTypes (tableNameRaw: string, tableDefinition: TableDefinition, options: Options) {
    const tableName = options.transformTypeName(tableNameRaw)
    const tableNamespace = options.getKeys(tableDefinition).map((columnNameRaw) => {
        let type = tableDefinition[columnNameRaw].tsType
        let nullable = tableDefinition[columnNameRaw].nullable ? '| null' : ''
        const columnName = options.transformColumnName(columnNameRaw)
        return `export type ${normalizeName(columnName, options)} = ${type}${nullable};`
    })

    return `
        export namespace ${tableName}Fields {
        ${tableNamespace.join('\n')}
        }
    `
}
