/**
 * Generate typescript interface from table schema
 * Created by xiamx on 2016-08-10.
 */

import { TableDefinition } from './schema'
import { EOL } from 'os'

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
    for (let columnName in tableDefinition) {
        if (tableDefinition.hasOwnProperty(columnName)) {
            members += `${columnName}: ${tableName}Fields.${normalizeColumnName(columnName)};${EOL}`
        }
    }

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
        enumString += `;${EOL}`
    }
    return enumString
}

export function generateTableTypes(tableName: string, tableDefinition: TableDefinition) {
    let fields = ''
    for (let columnName in tableDefinition) {
        if (tableDefinition.hasOwnProperty(columnName)) {
            let type = tableDefinition[columnName].tsType
            let nullable = tableDefinition[columnName].nullable ? '| null' : ''
            fields += `export type ${normalizeColumnName(columnName)} = ${type}${nullable};${EOL}`
        }
    }

    return `
        export namespace ${tableName}Fields {
        ${fields}
        }
    `
}
