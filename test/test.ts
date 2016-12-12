/**
 *
 * Created by xiamx on 2016-08-31.
 */

import { loadSchema } from './load_schema'
import * as fs from 'mz/fs'
import { typescriptOfSchema, Database, extractCommand } from '../src/index'
import * as diff from 'diff'

function compare(gold, actual) {
    let diffs = diff.diffLines(gold, actual)

    const addOrRemovedLines = diffs.filter(d => d.added || d.removed);

    if (addOrRemovedLines.length > 0) {
        console.error('Generated type definition different from the standard');
        addOrRemovedLines.forEach((d, i) => {
            const t = d.added ? '+' : d.removed ? '-' : 'x';
            console.error(`  [${i}] ${t} ${d.value}`);
        })
        process.exit(1)
    } else {
        console.log('Generated type definition identical to the standard')
        process.exit(0)
    }
}

async function testGeneratingTables() {
    await loadSchema('test/osm_schema.sql')
    console.log('loaded osm schema')

    let db = new Database(process.env.DATABASE_URL)
    let outputFile = (process.env.CIRCLE_ARTIFACTS || './test') + '/osm.ts'
    let formattedOutput = await typescriptOfSchema(
        db,
        'osm',
        ['users'],
        null,
        extractCommand(
            ['node', 'schemats', 'generate', '-c', 'postgres://secretUser:secretPassword@localhost/test', '-t', 'users', '-o', './test/osm.ts'],
            'postgres://secretUser:secretPassword@localhost/test'
        ),
        '2016-12-07 13:17:46'
    )
    await fs.writeFile(outputFile, formattedOutput.dest)

        // compare against gold standard
        let gold = await fs.readFile('./test/example/osm.ts', {encoding: 'utf8'});
        let actual = await fs.readFile(outputFile, {encoding: 'utf8'});
        let diffs = diff.diffLines(gold, actual)

    compare(gold, actual)
}

async function testGeneratingSchema() {
    await loadSchema('test/maxi_schema.sql')
    console.log('loaded maxi schema')

    let db = new Database(process.env.DATABASE_URL)
    let outputFile = (process.env.CIRCLE_ARTIFACTS || './test') + '/maxi.ts'
    let formattedOutput = await typescriptOfSchema(
        db,
        'maxi',
        [],
        'maxi',
        extractCommand(
            ['node', 'schemats', 'generate', '-c', 'postgres://secretUser:secretPassword@localhost/test', '-s', 'maxi', '-o', './test/maxi.ts'],
            'postgres://secretUser:secretPassword@localhost/test'
        ),
        '2016-12-07 13:17:46'
    )
    await fs.writeFile(outputFile, formattedOutput.dest)

    let gold = await fs.readFile('./test/example/maxi.ts', {encoding: 'utf8'});
    let actual = await fs.readFile(outputFile, {encoding: 'utf8'});

    compare(gold, actual)
}

(async () => {
    try {
        testGeneratingTables()
        testGeneratingSchema()
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
})()
