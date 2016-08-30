/**
 * Generate typescript interface from table schema
 * Created by xiamx on 2016-08-10.
 */

export function generateTableInterface(tableName: string, schema: Object) {
    let members = ''
    for (let columnName in schema) {
        if (schema.hasOwnProperty(columnName)) {
            members += `${columnName}: ${tableName}Fields.${columnName};\n`
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
            fields += `export type ${columnName} = ${type};\n`
        }
    }

    return `
        export namespace ${tableName}Fields {
        ${fields}
        }
    `
}
