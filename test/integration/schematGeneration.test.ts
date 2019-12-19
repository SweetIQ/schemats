import * as assert from 'power-assert';
import { Database, getDatabase } from '../../src/index';
import { compare, loadSchema, writeTsFile } from '../testUtility';

describe('schemat generation integration testing', () => {
  describe('postgres', () => {
    let db: Database;
    before(async function() {
      if (!process.env.POSTGRES_URL) {
        return this.skip();
      }
      db = getDatabase(process.env.POSTGRES_URL);
      await loadSchema(db, './test/fixture/postgres/initCleanup.sql');
    });

    it('Basic generation', async () => {
      const inputSQLFile = 'test/fixture/postgres/osm.sql';
      const outputFile = './test/actual/postgres/osm.ts';
      const expectedFile = './test/expected/postgres/osm.ts';
      const config: any = './fixture/postgres/osm.json';
      await writeTsFile(inputSQLFile, config, outputFile, db);
      return assert(await compare(expectedFile, outputFile));
    });
    it('Camelcase generation', async () => {
      const inputSQLFile = 'test/fixture/postgres/osm.sql';
      const outputFile = './test/actual/postgres/osm-camelcase.ts';
      const expectedFile = './test/expected/postgres/osm-camelcase.ts';
      const config: any = './fixture/postgres/osm-camelcase.json';
      await writeTsFile(inputSQLFile, config, outputFile, db);
      return assert(await compare(expectedFile, outputFile));
    });
  });

  describe('mysql', () => {
    let db: Database;
    before(async function() {
      if (!process.env.MYSQL_URL) {
        return this.skip();
      }
      db = getDatabase(`${process.env.MYSQL_URL}?multipleStatements=true`);
      await loadSchema(db, './test/fixture/mysql/initCleanup.sql');
    });
    it('Basic generation', async () => {
      const inputSQLFile = 'test/fixture/mysql/osm.sql';
      const outputFile = './test/actual/mysql/osm.ts';
      const expectedFile = './test/expected/mysql/osm.ts';
      const config: any = './fixture/mysql/osm.json';
      await writeTsFile(inputSQLFile, config, outputFile, db);
      return assert(await compare(expectedFile, outputFile));
    });
    it('Enum conflict in columns', async () => {
      const inputSQLFile = 'test/fixture/mysql/conflict.sql';
      const outputFile = './test/actual/mysql/conflict.ts';
      const config: any = './fixture/mysql/conflict.json';
      try {
        await writeTsFile(inputSQLFile, config, outputFile, db);
      } catch (e) {
        assert.equal(
          e.message,
          'Multiple enums with the same name and contradicting types were found: location_type: ["city","province","country"] and ["city","state","country"]',
        );
      }
    });
  });
});
