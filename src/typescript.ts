/**
 * Generate typescript interface from table schema
 * Created by xiamx on 2016-08-10.
 */

import { TableDefinition } from './schemaInterfaces'

function columnNameIsReservedKeyword(columnName: string): boolean {
    const reservedKeywords = [
        'string',
        'number'
    ]
    return reservedKeywords.indexOf(columnName) !== -1
}

function normalizeColumnName(columnName: string): string {
    if (columnNameIsReservedKeyword(columnName)) {
        return columnName + '_'
    } else {
        return columnName
    }
}

export function generateTableInterface(tableName: string, tableDefinition: TableDefinition) {
    let members = ''
    Object.keys(tableDefinition).forEach((columnName) => {
        members += `${columnName}: ${tableName}Fields.${normalizeColumnName(columnName)};\n`
    })

    return `
        export interface ${tableName} {
        ${members}
        }
    `
}

export function generateEnumType(enumObject: any) {
    let enumString = ''
    for (let enumName in enumObject) {
        enumString += `export type ${enumName} = `
        enumString += enumObject[enumName].map((v: string) => `'${v}'`).join(' | ')
        enumString += ';\n'
    }
    return enumString
}

export function generateTableTypes(tableName: string, tableDefinition: TableDefinition) {
    let fields = ''
    Object.keys(tableDefinition).forEach((columnName) => {
        let type = tableDefinition[columnName].tsType
        let nullable = tableDefinition[columnName].nullable ? '| null' : ''
        fields += `export type ${normalizeColumnName(columnName)} = ${type}${nullable};\n`
    })

    return `
        export namespace ${tableName}Fields {
        ${fields}
        }
    `
}
