/**
 * Schemats takes sql database schema and creates corresponding typescript definitions
 * Created by xiamx on 2016-08-10.
 */

import { generateEnumType, generateTableTypes, generateTableInterface } from './typescript'
import { Database } from './schema'
import Options from './options'
import { processString } from 'typescript-formatter'

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

export function extractCommand (args: string[]): string {
    return args
        .slice(2)
        .join(' ')
        .replace(/:\/\/.*@/,'://username:password@') // hide real username:password pair
}

export async function typescriptOfSchema (db: Database,
                                          tables: string[],
                                          schema: string|null,
                                          options = new Options(),
                                          commandRan: string,
                                          time: string): Promise<string> {
    if (!schema) {
        schema = db.getDefaultSchema()
    }

    if (tables.length === 0) {
        tables = await db.getSchemaTables(schema)
    }

    const enumTypes = generateEnumType(await db.getEnumTypes(schema), options)
    const interfacePromises = tables.map((table) => typescriptOfTable(db, table, schema!, options))
    const interfaces = await Promise.all(interfacePromises)
        .then(tsOfTable => tsOfTable.reduce((init, tsOfTable) => init + tsOfTable, ''))

    let header = `
            /* tslint:disable */
            /**
             * AUTO-GENERATED FILE @ ${time} - DO NOT EDIT!
             *
             * This file was generated with schemats node package:
             * $ schemats ${commandRan}
             *
             * Re-run the command above.
             *
             */

    `

    let output = header

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
