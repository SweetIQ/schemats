/**
 * Generate typescript interface from table schema
 * Created by xiamx on 2016-08-10.
 */

import { TableDefinition } from './schemaInterfaces'

function nameIsReservedKeyword (name: string): boolean {
    const reservedKeywords = [
        'string',
        'number',
        'package'
    ]
    return reservedKeywords.indexOf(name) !== -1
}

function normalizeName (name: string): string {
    if (nameIsReservedKeyword(name)) {
        return name + '_'
    } else {
        return name
    }
}

export function generateTableInterface (tableName: string, tableDefinition: TableDefinition) {
    let members = ''
    Object.keys(tableDefinition).forEach((columnName) => {
        members += `${columnName}: ${tableName}Fields.${normalizeName(columnName)};\n`
    })

    return `
        export interface ${normalizeName(tableName)} {
        ${members}
        }
    `
}

export function generateEnumType (enumObject: any) {
    let enumString = ''
    for (let enumName in enumObject) {
        enumString += `export type ${enumName} = `
        enumString += enumObject[enumName].map((v: string) => `'${v}'`).join(' | ')
        enumString += ';\n'
    }
    return enumString
}

export function generateTableTypes (tableName: string, tableDefinition: TableDefinition) {
    let fields = ''
    Object.keys(tableDefinition).forEach((columnName) => {
        let type = tableDefinition[columnName].tsType
        let nullable = tableDefinition[columnName].nullable ? '| null' : ''
        fields += `export type ${normalizeName(columnName)} = ${type}${nullable};\n`
    })

    return `
        export namespace ${tableName}Fields {
        ${fields}
        }
    `
}
