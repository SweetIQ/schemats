/**
 * Schemats takes sql database schema and creates corresponding typescript definitions
 * Created by xiamx on 2016-08-10.
 */

import { generateEnumType, generateTableTypes, generateTableInterface } from './typescript'
import { Database } from './schema'
import Options, { OptionValues } from './options'
import { processString } from 'typescript-formatter'

function getTime () {
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

function buildHeader (db: Database, tables: string[], schema: string|null, options: OptionValues): string {
    let commands = ['schemats', 'generate', '-c', db.connectionString.replace(/:\/\/.*@/,'://username:password@')]
    if (options.camelCase) commands.push('-C')
    if (tables.length > 0) {
        tables.forEach((t: string) => {
            commands.push('-t', t)
        })
    }
    if (schema) {
        commands.push('-s', schema)
    }

    return `
        /* tslint:disable */
        /**
         * AUTO-GENERATED FILE @ ${getTime()} - DO NOT EDIT!
         *
         * This file was generated with schemats node package:
         * $ ${commands.join(' ')}
         *
         * Re-run the command above.
         *
         */

    `
}

export async function typescriptOfTable (db: Database, 
                                         table: string,
                                         schema: string,
                                         options = new Options()) {
    let interfaces = ''
    let tableTypes = await db.getTableTypes(table, schema, options)
    interfaces += generateTableTypes(table, tableTypes, options)
    interfaces += generateTableInterface(table, tableTypes, options)
    return interfaces
}

export async function typescriptOfSchema (db: Database,
                                          tables: string[],
                                          schema: string|null,
                                          options: OptionValues): Promise<string> {
    if (!schema) {
        schema = db.getDefaultSchema()
    }

    if (tables.length === 0) {
        tables = await db.getSchemaTables(schema)
    }

    const optionsObject = new Options(options)

    const enumTypes = generateEnumType(await db.getEnumTypes(schema), optionsObject)
    const interfacePromises = tables.map((table) => typescriptOfTable(db, table, schema as string, optionsObject))
    const interfaces = await Promise.all(interfacePromises)
        .then(tsOfTable => tsOfTable.join(''))

    let output = '/* tslint:disable */\n\n'
    if (optionsObject.options.writeHeader) {
        output += buildHeader(db, tables, schema, options)
    }
    output += `${enumTypes}`
    output += `${interfaces}`

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

export {Database, getDatabase} from './schema'
export {Options, OptionValues}
