/**
 * Generate typescript interface from table schema
 * Created by xiamx on 2016-08-10.
 */

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

export function generateTableInterface(tableName: string, schema: Object) {
    let members = ''
    for (let columnName in schema) {
        if (schema.hasOwnProperty(columnName)) {
            members += `${columnName}: ${tableName}Fields.${normalizeColumnName(columnName)};\n`
        }
    }

    return `
        export interface ${tableName} {
        ${members}
        }
    `
}

export function generateSchemaTypes(tableName: string, schema: Object) {
    let fields = ''
    for (let columnName in schema) {
        if (schema.hasOwnProperty(columnName)) {
            let type = schema[columnName]
            fields += `export type ${normalizeColumnName(columnName)} = ${type};\n`
        }
    }

    return `
        export namespace ${tableName}Fields {
        ${fields}
        }
    `
}
