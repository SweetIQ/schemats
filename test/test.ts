/**
 *
 * Created by xiamx on 2016-08-31.
 */

import { loadSchema } from './load_schema'
import * as fs from 'mz/fs'
import { typescriptOfSchema, Database, extractCommand } from '../src/index'

// the types of diff is outdated, does not support diffTrimmedLines
// workaround for the moment
const diff = require('diff')
interface IDiffResult {
    value: string
    count?: number
    added?: boolean
    removed?: boolean
}

async function compare(goldStandardFile: string, outputFile: string, formattedOutput: string ) {
    await fs.writeFile(outputFile, formattedOutput)

    let gold = await fs.readFile(goldStandardFile, {encoding: 'utf8'})
    let actual = await fs.readFile(outputFile, {encoding: 'utf8'})

    let diffs = diff.diffTrimmedLines(gold, actual)

    const addOrRemovedLines = diffs.filter((d: IDiffResult) => d.added || d.removed)

    if (addOrRemovedLines.length > 0) {
        console.error(`Generated type definition different to the standard ${goldStandardFile}`)
        addOrRemovedLines.forEach((d: IDiffResult, i: number) => {
            const t = d.added ? '+' : d.removed ? '-' : 'x'
            console.error(`  [${i}] ${t} ${d.value}`)
        })
        process.exit(1)
    } else {
        console.log(`Generated type definition identical to the standard ${goldStandardFile}`)
    }
}

async function testGeneratingTables(db: Database) {
    await loadSchema('test/osm_schema.sql')
    console.log('loaded osm schema')

    let outputFile = (process.env.CIRCLE_ARTIFACTS || './test/artifacts') + '/osm.ts'
    let formattedOutput = await typescriptOfSchema(
        db,
        null,
        ['users'],
        null,
        extractCommand(
            ['node', 'schemats', 'generate', '-c', 
            'postgres://secretUser:secretPassword@localhost/test', 
            '-t', 'users', '-o', './test/osm.ts'],
            'postgres://secretUser:secretPassword@localhost/test'
        ),
        '2016-12-07 13:17:46'
    )
    await compare('./test/example/osm.ts', outputFile, formattedOutput)
}

async function testGeneratingSchema(db: Database) {
    await loadSchema('test/maxi_schema.sql')
    console.log('loaded maxi schema')

    let outputFile = (process.env.CIRCLE_ARTIFACTS || './test/artifacts') + '/maxi.ts'
    let formattedOutput = await typescriptOfSchema(
        db,
        'maxi',
        [],
        'maxi',
        extractCommand(
            ['node', 'schemats', 'generate', '-c',
            'postgres://secretUser:secretPassword@localhost/test',
            '-s', 'maxi', '-o', './test/maxi.ts'],
            'postgres://secretUser:secretPassword@localhost/test'
        ),
        '2016-12-07 13:17:46'
    )
    await compare('./test/example/maxi.ts', outputFile, formattedOutput)
}

(async () => {
    try {
        let db = new Database(process.env.DATABASE_URL)
        await testGeneratingTables(db)
        await testGeneratingSchema(db)
        process.exit(0)
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
})()
