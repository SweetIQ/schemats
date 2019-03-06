import * as assert from 'assert'
import * as sinon from 'sinon'
import * as mysql from 'mysql'
import { MysqlDatabase } from '../../src/schemaMysql'
import { TableDefinition } from '../../src/schemaInterfaces'
import Options from '../../src/options'

const options = new Options({})

const MysqlDBReflection = MysqlDatabase as any

describe('MysqlDatabase', () => {
    let db: MysqlDatabase
    const sandbox = sinon.sandbox.create()
    before(() => {
        sandbox.stub(mysql, 'createConnection')
        sandbox.stub(MysqlDBReflection.prototype, 'queryAsync')
        db = new MysqlDatabase('mysql://user:password@localhost/test')
    })
    beforeEach(() => {
        sandbox.reset()
    })
    after(() => {
        sandbox.restore()
    })
    describe('query', () => {
        it('query calls query async', async () => {
            await db.query('SELECT * FROM test_table')
            assert.deepEqual(MysqlDBReflection.prototype.queryAsync.getCall(0).args,
                ['SELECT * FROM test_table'])
        })
    })
    describe('queryAsync', () => {
        before(() => {
            MysqlDBReflection.prototype.queryAsync.restore()
        })
        after(() => {
            sandbox.stub(MysqlDBReflection.prototype, 'queryAsync')
        })
        it('query has error', async () => {
            (mysql.createConnection as any).returns({
                query: function query (queryString: string, params: Array<any>, cb: Function) {
                    cb('ERROR')
                }
            })
            const testDb: any = new MysqlDatabase('mysql://user:password@localhost/test')
            try {
                testDb.query('SELECT * FROM test_table')
            } catch (e) {
                assert.equal(e, 'ERROR')
            }
        })
        it('query returns with results', async () => {
            (mysql.createConnection as any).returns({
                query: function query (queryString: string, params: Array<any>, cb: Function) {
                    cb(null, [])
                }
            })
            const testDb: any = new MysqlDatabase('mysql://user:password@localhost/test')
            const results = await testDb.query('SELECT * FROM test_table')
            assert.deepEqual(results, [])
        })
        it('query returns with results with columns as lower-case', async () => {
            (mysql.createConnection as any).returns({
                query: function query (queryString: string, params: Array<any>, cb: Function) {
                    cb(null, [{COLUMN_1: 'val1', COLUMN_2: 'val1'}, {COLUMN_1: 'val2', COLUMN_2: 'val2'}])
                }
            })
            const testDb: any = new MysqlDatabase('mysql://user:password@localhost/test')
            const results = await testDb.query('SELECT * FROM test_table')
            assert.deepEqual(results, [{column_1: 'val1', column_2: 'val1'}, {column_1: 'val2', column_2: 'val2'}])
        })
    })
    describe('getEnumTypes', () => {
        it('writes correct query with schema name', async () => {
            MysqlDBReflection.prototype.queryAsync.returns(Promise.resolve([]))
            await db.getEnumTypes('testschema')
            assert.deepEqual(MysqlDBReflection.prototype.queryAsync.getCall(0).args, [
                'SELECT column_name, column_type, data_type ' +
                'FROM information_schema.columns ' +
                'WHERE data_type IN (\'enum\', \'set\') and table_schema = ?',
                ['testschema']
            ])
        })
        it('writes correct query without schema name', async () => {
            MysqlDBReflection.prototype.queryAsync.returns(Promise.resolve([]))
            await db.getEnumTypes()
            assert.deepEqual(MysqlDBReflection.prototype.queryAsync.getCall(0).args, [
                'SELECT column_name, column_type, data_type ' +
                'FROM information_schema.columns ' +
                'WHERE data_type IN (\'enum\', \'set\') ',
                []
            ])
        })
        it('handles response', async () => {
            MysqlDBReflection.prototype.queryAsync.returns(Promise.resolve([
                { column_name: 'column1', column_type: 'enum(\'enum1\')', data_type: 'enum' },
                { column_name: 'column2', column_type: 'set(\'set1\')', data_type: 'set' }
            ]))
            const enumTypes = await db.getEnumTypes('testschema')
            assert.deepEqual(enumTypes, {
                enum_column1: [ 'enum1' ],
                set_column2: [ 'set1' ]
            })
        })
        it('same column same value is accepted', async () => {
            MysqlDBReflection.prototype.queryAsync.returns(Promise.resolve([
                { column_name: 'column1', column_type: 'enum(\'enum1\',\'enum2\')', data_type: 'enum' },
                { column_name: 'column1', column_type: 'enum(\'enum1\',\'enum2\')', data_type: 'enum' }
            ]))
            const enumTypes = await db.getEnumTypes('testschema')
            assert.deepEqual(enumTypes, {
                enum_column1: [ 'enum1', 'enum2' ]
            })
        })
        it('same column different value conflict', async () => {
            MysqlDBReflection.prototype.queryAsync.returns(Promise.resolve([
                { column_name: 'column1', column_type: 'enum(\'enum1\')', data_type: 'enum' },
                { column_name: 'column1', column_type: 'enum(\'enum2\')', data_type: 'enum' }
            ]))
            try {
                await db.getEnumTypes('testschema')
            } catch (e) {
                assert.equal(e.message, 'Multiple enums with the same name and contradicting types were found: column1: ["enum1"] and ["enum2"]')
            }
        })
    })
    describe('getTableDefinitions', () => {
        it('writes correct query', async () => {
            MysqlDBReflection.prototype.queryAsync.returns(Promise.resolve([]))
            await db.getTableDefinition('testtable', 'testschema')
            assert.deepEqual(MysqlDBReflection.prototype.queryAsync.getCall(0).args, [
                'SELECT column_name, data_type, is_nullable ' +
                'FROM information_schema.columns ' +
                'WHERE table_name = ? and table_schema = ?',
                ['testtable', 'testschema']
            ])
        })
        it('handles response', async () => {
            MysqlDBReflection.prototype.queryAsync.returns(Promise.resolve([
                { column_name: 'column1', data_type: 'data1', is_nullable: 'NO' },
                { column_name: 'column2', data_type: 'enum', is_nullable: 'YES' },
                { column_name: 'column3', data_type: 'set', is_nullable: 'YES' }
            ]))
            const schemaTables = await db.getTableDefinition('testtable', 'testschema')
            assert.deepEqual(schemaTables, {
                column1: { udtName: 'data1', nullable: false },
                column2: { udtName: 'enum_column2', nullable: true },
                column3: { udtName: 'set_column3', nullable: true }
            })
        })
    })
    describe('getTableTypes', () => {
        const tableTypesSandbox = sinon.sandbox.create()
        before(() => {
            tableTypesSandbox.stub(MysqlDBReflection.prototype, 'getEnumTypes')
            tableTypesSandbox.stub(MysqlDBReflection.prototype, 'getTableDefinition')
            tableTypesSandbox.stub(MysqlDBReflection, 'mapTableDefinitionToType')
        })
        beforeEach(() => {
            tableTypesSandbox.reset()
        })
        after(() => {
            tableTypesSandbox.restore()
        })
        it('gets custom types from enums', async () => {
            MysqlDBReflection.prototype.getEnumTypes.returns(Promise.resolve({enum1: [], enum2: []}))
            MysqlDBReflection.prototype.getTableDefinition.returns(Promise.resolve({}))
            await db.getTableTypes('tableName', 'tableSchema', options)
            assert.deepEqual(MysqlDBReflection.mapTableDefinitionToType.getCall(0).args[1], ['enum1', 'enum2'])
        })
        it('gets table definitions', async () => {
            MysqlDBReflection.prototype.getEnumTypes.returns(Promise.resolve({}))
            MysqlDBReflection.prototype.getTableDefinition.returns(Promise.resolve({ table: {
                udtName: 'name',
                nullable: false
            }}))
            await db.getTableTypes('tableName', 'tableSchema', options)
            assert.deepEqual(MysqlDBReflection.prototype.getTableDefinition.getCall(0).args, ['tableName', 'tableSchema'])
            assert.deepEqual(MysqlDBReflection.mapTableDefinitionToType.getCall(0).args[0], { table: {
                udtName: 'name',
                nullable: false
            }})
        })
    })
    describe('getSchemaTables', () => {
        it('writes correct query', async () => {
            MysqlDBReflection.prototype.queryAsync.returns(Promise.resolve([]))
            await db.getSchemaTables('testschema')
            assert.deepEqual(MysqlDBReflection.prototype.queryAsync.getCall(0).args, [
                'SELECT table_name ' +
                'FROM information_schema.columns ' +
                'WHERE table_schema = ? ' +
                'GROUP BY table_name',
                ['testschema']
            ])
        })
        it('handles table response', async () => {
            MysqlDBReflection.prototype.queryAsync.returns(Promise.resolve([
                { table_name: 'table1' },
                { table_name: 'table2' }
            ]))
            const schemaTables = await db.getSchemaTables('testschema')
            assert.deepEqual(schemaTables, ['table1', 'table2'])
        })
    })
    describe('mapTableDefinitionToType', () => {
        describe('maps to string', () => {
            it('char', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'char',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'string')
            })
            it('varchar', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'varchar',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'string')
            })
            it('text', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'text',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'string')
            })
            it('tinytext', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'tinytext',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'string')
            })
            it('mediumtext', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'mediumtext',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'string')
            })
            it('longtext', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'longtext',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'string')
            })
            it('time', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'time',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'string')
            })
            it('geometry', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'geometry',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'string')
            })
            it('set', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'set',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'string')
            })
            it('enum', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'enum',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'string')
            })
        })
        describe('maps to number', () => {
            it('integer', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'integer',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'number')
            })
            it('int', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'int',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'number')
            })
            it('smallint', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'smallint',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'number')
            })
            it('mediumint', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'mediumint',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'number')
            })
            it('bigint', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'bigint',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'number')
            })
            it('double', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'double',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'number')
            })
            it('decimal', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'decimal',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'number')
            })
            it('numeric', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'numeric',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'number')
            })
            it('float', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'float',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'number')
            })
            it('year', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'year',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'number')
            })
        })
        describe('maps to boolean', () => {
            it('tinyint', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'tinyint',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'boolean')
            })
        })
        describe('maps to Object', () => {
            it('json', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'json',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'Object')
            })
        })
        describe('maps to Date', () => {
            it('date', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'date',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'Date')
            })
            it('datetime', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'datetime',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'Date')
            })
            it('timestamp', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'timestamp',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'Date')
            })
        })
        describe('maps to Buffer', () => {
            it('tinyblob', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'tinyblob',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'Buffer')
            })
            it('mediumblob', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'mediumblob',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'Buffer')
            })
            it('longblob', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'longblob',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'Buffer')
            })
            it('blob', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'blob',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'Buffer')
            })
            it('binary', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'binary',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'Buffer')
            })
            it('varbinary', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'varbinary',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'Buffer')
            })
            it('bit', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'bit',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,[],options).column.tsType, 'Buffer')
            })
        })
        describe('maps to custom', () => {
            it('CustomType', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'CustomType',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,['CustomType'],options).column.tsType, 'CustomType')
            })
        })
        describe('maps to any', () => {
            it('UnknownType', () => {
                const td: TableDefinition = {
                    column: {
                        udtName: 'UnknownType',
                        nullable: false
                    }
                }
                assert.equal(MysqlDBReflection.mapTableDefinitionToType(td,['CustomType'],options).column.tsType, 'any')
            })
        })
    })
})
