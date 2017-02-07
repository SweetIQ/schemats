#! /usr/bin/env node
/**
 * Commandline interface
 * Created by xiamx on 2016-08-10.
 */

import * as yargs from 'yargs'
import * as fs from 'fs'
import { typescriptOfSchema, Database, extractCommand } from '../src/index'

let argv: any = yargs
    .usage('Usage: $0 <command> [options]')
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
    .demand('n')
    .alias('n', 'namespace')
    .nargs('n', 1)
    .describe('n', 'namespace for interfaces')
    .demand('o')
    .nargs('o', 1)
    .alias('o', 'output')
    .describe('o', 'output file name')
    .help('h')
    .alias('h', 'help')
    .argv

function getTime() {
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
        let db = new Database(argv.c)

        if (!Array.isArray(argv.t)) {
            if (!argv.t) {
                argv.t = []
            } else {
                argv.t = [argv.t]
            }
        }

        let formattedOutput = await typescriptOfSchema(
            db, argv.n, argv.t, argv.s,
            extractCommand(process.argv, argv.c), getTime()
        )
        fs.writeFileSync(argv.o, formattedOutput)

    } catch (e) {
        console.error(e)
        process.exit(1)
    }

})().then(() => {
    process.exit()
})
