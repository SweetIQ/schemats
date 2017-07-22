#! /usr/bin/env node
/**
 * Commandline interface
 * Created by xiamx on 2016-08-10.
 */

import * as yargs from 'yargs'
import * as fs from 'fs'
import { typescriptOfSchema, getDatabase, extractCommand } from '../src/index'
import Options from '../src/options'

interface SchematsConfig {
    conn: string,
    table: string[] | string,
    schema: string,
    namespace: string,
    output: string,
    camelCase: boolean,
}

let argv: SchematsConfig = yargs
    .usage('Usage: $0 <command> [options]')
    .global('config')
    .default('config', 'schemats.json')
    .config()
    .env('SCHEMATS')
    .command('generate', 'generate type definition')
    .demand(1)
    // tslint:disable-next-line 
    .example('$0 generate -c postgres://username:password@localhost/db -t table1 -t table2 -s schema -n namespace -o interface_output.ts', 'generate typescript interfaces from schema')
    .demand('c')
    .alias('c', 'conn')
    .nargs('c', 1)
    .describe('c', 'database connection string')
    .alias('t', 'table')
    .nargs('t', 1)
    .describe('t', 'table name')
    .alias('s', 'schema')
    .nargs('s', 1)
    .describe('s', 'schema name')
    .alias('n', 'namespace')
    .nargs('n', 1)
    .describe('n', 'namespace for interfaces')
    .alias('C', 'camelCase')
    .describe('C', 'Camel-case columns')
    .demand('o')
    .nargs('o', 1)
    .alias('o', 'output')
    .describe('o', 'output file name')
    .help('h')
    .alias('h', 'help')
    .argv

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

(async () => {

    try {
        let db = getDatabase(argv.conn)

        if (!Array.isArray(argv.table)) {
            if (!argv.table) {
                argv.table = []
            } else {
                argv.table = [argv.table]
            }
        }

        let formattedOutput = await typescriptOfSchema(
            db, argv.namespace, argv.table, argv.schema, new Options({
                camelCase: argv.camelCase
            }), extractCommand(process.argv), getTime()
        )
        fs.writeFileSync(argv.output, formattedOutput)

    } catch (e) {
        console.error(e)
        process.exit(1)
    }

})().then(() => {
    process.exit()
}).catch((e) => {
    console.warn(e)
    process.exit(1)
})
