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

export function extractCommand(args: string[], dbConfig: string): string {
    return args
        .slice(2)
        .join(' ')
        .replace(dbConfig.split('@')[0], 'postgres://username:password') // hide real username:password pair
}

export function getTime() {
    let padTime = (value) => `0${value}`.slice(-2)
    let time = new Date()
    return `${time.getFullYear()}-${padTime(time.getMonth() + 1)}-${padTime(time.getDate())} ${padTime(time.getHours())}:${padTime(time.getMinutes())}:${padTime(time.getSeconds())}`
}

export async function typescriptOfSchema(db: Database, namespace: string, tables: string[], commandRan: string, time: string) {
    let interfaces = ''
    for (let i = 0; i < tables.length; i++) {
        interfaces += await typescriptOfTable(db, tables[i])
    }

    let output = `
            /**
             * AUTO-GENERATED FILE @ ${time} - DO NOT EDIT!
             *
             * This file was generated with schemats node package:
             * $ schemats ${commandRan}
             *
             * Re-run the command above.
             *
             */
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
