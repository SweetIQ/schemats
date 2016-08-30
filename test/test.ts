/**
 * 
 * Created by xiamx on 2016-08-31.
 */

import {loadOSM} from './load_osm'
import * as fs from 'mz/fs'
import { typescriptOfSchema, Database } from '../src/index'

(async () => {
    try {
        await loadOSM()
        console.log('loaded osm schema')

        let db = new Database(process.env.DATABASE_URL)
        let formattedOutput = await typescriptOfSchema(db, 'osm', ['users'])
        let outputFile = process.env.CIRCLE_ARTIFACTS + '/osm.ts'
        await fs.writeFile(outputFile, formattedOutput.dest)

    } catch (e) {
        console.error(e)
        process.exit(1)
    }
})()
