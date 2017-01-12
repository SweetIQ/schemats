/**
 * Schemats takes sql database schema and creates corresponding typescript definitions
 * Created by xiamx on 2016-08-10.
 */

import {generateEnumType, generateTableTypes, generateTableInterface} from './typescript'
import {Database} from './schema'
import {processString} from 'typescript-formatter'

export async function typescriptOfTable(db: Database, table: string, schema: string) {
    let interfaces = ''
    let tableTypes = await db.getTableTypes(table, schema)
    interfaces += generateTableTypes(table, tableTypes)
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
    let padTime = (value: number) => `0${value}`.slice(-2)
    let time = new Date()
    const yyyy = time.getFullYear()
    const MM = padTime(time.getMonth() + 1)
    const dd = padTime(time.getDate())
    const hh = padTime(time.getHours())
    const mm = padTime(time.getMinutes())
    const ss = padTime(time.getSeconds())
    return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`
}

export async function typescriptOfSchema(db: Database, namespace: string, tables: string[], schema: string = 'public',
                                         commandRan: string, time: string): Promise<string> {
    if (!schema) {
        schema = 'public'
    }

    if (tables.length === 0) {
        tables = await db.getSchemaTables(schema)
    }

    const enumTypes = generateEnumType(await db.getEnumTypes(schema))
    const interfacePromises = tables.map((table) => typescriptOfTable(db, table, schema))
    const interfaces = await Promise.all(interfacePromises)
        .then(tsOfTable => tsOfTable.reduce((init, tsOfTable) => init + tsOfTable, ''))

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

            import { Point, Circle } from 'pg-types/lib/textParsers'

            export namespace ${namespace} {
            ${enumTypes}
            ${interfaces}
            }
        `

    let formatterOption = {
        replace: false,
        verify: false,
        tsconfig: true,
        tslint: true,
        editorconfig: true,
        tsfmt: true
    }

    const processedResult = await processString('schema.ts', output, formatterOption)
    return processedResult.dest
}

export {Database} from './schema'
