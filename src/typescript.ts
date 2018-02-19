/**
 * Generate typescript interface from table schema
 * Created by xiamx on 2016-08-10.
 */

import * as _ from 'lodash'

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
    let members = ''
    Object.keys(tableDefinition).map(c => options.transformColumnName(c)).forEach((columnName) => {
        members += `${columnName}: ${tableName}Fields.${normalizeName(columnName, options)};\n`
    })

    return `
        interface ${normalizeName(tableName, options)}Meta {
        ${members}
        }
    `
}

export function generateEnumType (enumObject: any, options: Options) {
    let enumString = ''
    for (let enumNameRaw in enumObject) {
        const enumName = options.transformTypeName(enumNameRaw)
        enumString += `export type ${enumName} = `
        enumString += enumObject[enumNameRaw].map((v: string) => `'${v}'`).join(' | ')
        enumString += ';\n'
    }
    return enumString
}

export function generateTableTypes (tableNameRaw: string, tableDefinition: TableDefinition, options: Options) {
    const tableName = options.transformTypeName(tableNameRaw)
    let fields = ''
    Object.keys(tableDefinition).forEach((columnNameRaw) => {
        const columnName = options.transformColumnName(columnNameRaw)
        fields += `export type ${normalizeName(columnName, options)} = {`

        const { tsType, nullable, primaryKey, unique } = tableDefinition[columnNameRaw]

        // Mapped TS type
        fields += `type: ${tsType}`
        fields += nullable ? '| null' : ''
        fields += `,`

        // Primary key constraint
        fields += primaryKey !== undefined ? `primaryKey: ${primaryKey},` : ''

        // Unique constraint
        fields += unique !== undefined ? `unique: ${unique},` : ''

        fields += '};\n'
    })

    return `
        export namespace ${tableName}Fields {
        ${fields}
        }
    `
}

export function generateExports (tableNameRaw: string, tableDefinition: TableDefinition, options: Options) {
    const tableName = options.transformTypeName(tableNameRaw)

    if (options.exposeConstraintInfo()) {
        // If `--exposeConstraintInfo` flag is passed, simply rename <table>Meta to <table>
        return `
            export type ${tableName} = ${tableName}Meta
        `
    }

    // If no `--exposeConstraintInfo` flag is passed, transform the meta interfaces to simple interfaces
    return `
        export type ${tableName} = SimpleSchema<${tableName}Meta>
    `
}
