import { spawnSync } from 'child_process';
import * as assert from 'power-assert';

describe('schemats cli tool integration testing', () => {
  describe('schemats generate postgres', () => {
    before(async function() {
      if (!process.env.POSTGRES_URL) {
        return this.skip();
      }
    });
    it('should run without error', () => {
      const { status } = spawnSync(
        'node',
        ['bin/schemats', 'generate', '-c', process.env.POSTGRES_URL as string, '-o', '/tmp/schemats_cli_postgres.ts'],
        { encoding: 'utf-8' },
      );
      assert.equal(0, status);
    });
  });
  describe('schemats generate mysql', () => {
    before(async function() {
      if (!process.env.MYSQL_URL) {
        return this.skip();
      }
    });
    it('should run without error', () => {
      const { status } = spawnSync('node', [
        'bin/schemats',
        'generate',
        '-c',
        process.env.MYSQL_URL as string,
        '-s',
        'test',
        '-o',
        '/tmp/schemats_cli_postgres.ts',
      ]);
      assert.equal(0, status);
    });
  });
});
