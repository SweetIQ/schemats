/**
 * Generate typescript interface from table schema
 * Created by xiamx on 2016-08-10.
 */

export function generateTableInterface(tableName: string, schema: Object) {
    let members = ''
    for (let columnName in schema) {
        if (schema.hasOwnProperty(columnName)) {
            members += `${columnName}: `
            if (schema[columnName].categoy === 'base type') {
                members += `${tableName}Fields.${columnName};\n`
            } else {
                members += `${schema[columnName].type};\n`
            }
        }
    }

    return `
        export interface ${tableName} {
        ${members}
        }
    `
}

export function generateEnumType(enumObject: Object) {
    let enumString = ''
    for (let enumName in enumObject) {
        enumString += `export type ${enumName} = `
        enumString += enumObject[enumName].map( v => `"${v}"`).join(' | ')
        enumString += `;\n`
    }
    return enumString
}

export function generateSchemaTypes(tableName: string, schema: Object) {
    let fields = ''
    for (let columnName in schema) {
        if (schema.hasOwnProperty(columnName)) {
            let type = schema[columnName]
            if (type.category === 'base type') {
                fields += `export type ${columnName} = ${type.type};\n`
            }
        }
    }

    return `
        export namespace ${tableName}Fields {
        ${fields}
        }
    `
}
