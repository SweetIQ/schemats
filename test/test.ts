/**
 *
 * Created by xiamx on 2016-08-31.
 */

import {loadOSM} from './load_osm'
import * as fs from 'mz/fs'
import { typescriptOfSchema, Database, extractCommand } from '../src/index'
import * as diff from 'diff'

(async () => {
    try {
        await loadOSM()
        console.log('loaded osm schema')

        let db = new Database(process.env.DATABASE_URL)
        let outputFile = (process.env.CIRCLE_ARTIFACTS || './test') + '/osm.ts'
        let formattedOutput = await typescriptOfSchema(
            db,
            'osm',
            ['users'],
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

    } catch (e) {
        console.error(e)
        process.exit(1)
    }
})()
