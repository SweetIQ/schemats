/**
 * Schemats takes sql database schema and creates corresponding typescript definitions
 * Created by xiamx on 2016-08-10.
 */

import {generateSchemaTypes, generateTableInterface} from './typescript'
import {Database} from './schema'
import {processString} from 'typescript-formatter'

export async function typescriptOfTable(db: Database, table: string) {
    let interfaces = ''
    let tableTypes = await db.getTableTypes(table)
    interfaces += generateSchemaTypes(table, tableTypes)
    interfaces += generateTableInterface(table, tableTypes)
    return interfaces
}

export async function typescriptOfSchema(db: Database, namespace: string, tables: string[]) {
    let interfaces = ''
    for (let i = 0; i < tables.length; i++) {
        interfaces += await typescriptOfTable(db, tables[i])
    }

    let output = `
            export namespace ${namespace} {
            ${interfaces}
            }
        `

    let formatterOption = {
        replace: false,
        verify: true,
        tsconfig: true,
        tslint: false,
        editorconfig: true,
        tsfmt: true
    }

    return await processString('schema.ts', output, formatterOption)
}

export {Database} from './schema'
