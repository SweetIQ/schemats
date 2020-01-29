import * as assert from 'assert'
import * as sinon from 'sinon'
import * as Index from '../../src/index'
import * as Typescript from '../../src/typescript'
import * as Schema from '../../src/schema'
import Options, { OptionValues } from '../../src/options'

const options: OptionValues = {}

describe('index', () => {
    const typedTableSandbox = sinon.sandbox.create()
    const db = {
        getDefaultSchema: typedTableSandbox.stub(),
        getTableTypes: typedTableSandbox.stub(),
        query: typedTableSandbox.stub(),
        getEnumTypes: typedTableSandbox.stub(),
        getTableDefinition: typedTableSandbox.stub(),
        getSchemaTables: typedTableSandbox.stub(),
        end: typedTableSandbox.stub(),
        connectionString: 'sql://'
    } as Schema.Database
    const tsReflection = Typescript as any
    const dbReflection = db as any
    const schemaReflection = Schema as any
    before(() => {
        typedTableSandbox.stub(Typescript, 'generateEnumType')
        typedTableSandbox.stub(Typescript, 'generateTableTypes')
        typedTableSandbox.stub(Typescript, 'generateTableInterface')
        typedTableSandbox.stub(Schema, 'getDatabase')
    })
    beforeEach(() => {
        typedTableSandbox.reset()
    })
    after(() => {
        typedTableSandbox.restore()
    })
    describe('typescriptOfTable', () => {
        it('calls functions with correct params', async () => {
            dbReflection.getTableTypes.returns(Promise.resolve('tableTypes'))
            await Index.typescriptOfTable(db, 'tableName', 'schemaName', new Options(options))
            assert.deepEqual(dbReflection.getTableTypes.getCall(0).args, [
                'tableName',
                'schemaName',
                new Options(options)
            ])
            assert.deepEqual(tsReflection.generateTableTypes.getCall(0).args, [
                'tableName',
                'tableTypes',
                new Options(options)
            ])
            assert.deepEqual(tsReflection.generateTableInterface.getCall(0).args, [
                'tableName',
                'tableTypes',
                new Options(options)
            ])
            assert.strictEqual(dbReflection.end.getCall(0), null)
        })
        it('merges string results', async () => {
            dbReflection.getTableTypes.returns(Promise.resolve('tableTypes'))
            tsReflection.generateTableTypes.returns('generatedTableTypes\n')
            tsReflection.generateTableInterface.returns('generatedTableInterfaces\n')
            const typescriptString = await Index.typescriptOfTable(db, 'tableName', 'schemaName', new Options(options))
            assert.equal(typescriptString, 'generatedTableTypes\ngeneratedTableInterfaces\n')
        })
        it('disconnects from database if it created the db instance', async () => {
            dbReflection.getTableTypes.returns(Promise.resolve('tableTypes'))
            dbReflection.end.returns(Promise.resolve())
            schemaReflection.getDatabase.returns(dbReflection)
            await Index.typescriptOfTable('sql://', 'tableName', 'schemaName', new Options(options))

            assert.deepEqual(dbReflection.end.getCall(0).args, [])
            assert.strictEqual(dbReflection.end.callCount, 1)
        })
    })
    describe('typescriptOfSchema', () => {
        it('has schema', async () => {
            dbReflection.getSchemaTables.returns(Promise.resolve(['tablename']))
            dbReflection.getEnumTypes.returns(Promise.resolve('enumTypes'))
            tsReflection.generateTableTypes.returns('generatedTableTypes\n')
            tsReflection.generateEnumType.returns('generatedEnumTypes\n')
            const tsOfSchema = await Index.typescriptOfSchema(db, [], 'schemaName', options)

            assert.deepEqual(dbReflection.getSchemaTables.getCall(0).args[0], 'schemaName')
            assert.deepEqual(dbReflection.getEnumTypes.getCall(0).args[0], 'schemaName')
            assert.deepEqual(tsReflection.generateEnumType.getCall(0).args[0], 'enumTypes')
            assert.deepEqual(tsReflection.generateTableTypes.getCall(0).args[0], 'tablename')
            assert.strictEqual(dbReflection.end.getCall(0), null)
        })
        it('has tables provided', async () => {
            dbReflection.getSchemaTables.returns(Promise.resolve(['tablename']))
            dbReflection.getEnumTypes.returns(Promise.resolve('enumTypes'))
            tsReflection.generateTableTypes.returns('generatedTableTypes\n')
            tsReflection.generateEnumType.returns('generatedEnumTypes\n')
            const tsOfSchema = await Index.typescriptOfSchema(db, ['differentTablename'], null, options)

            assert(!dbReflection.getSchemaTables.called)
            assert.deepEqual(tsReflection.generateEnumType.getCall(0).args[0], 'enumTypes')
            assert.deepEqual(tsReflection.generateTableTypes.getCall(0).args[0], 'differentTablename')
            assert.strictEqual(dbReflection.end.getCall(0), null)
        })
        it('disconnects from database if it created the db instance', async () => {
            dbReflection.getEnumTypes.returns(Promise.resolve('enumTypes'))
            dbReflection.end.returns(Promise.resolve())
            schemaReflection.getDatabase.returns(dbReflection)
            await Index.typescriptOfSchema('sql://', ['table1', 'table2'], 'schemaName', options)

            assert.deepEqual(dbReflection.end.getCall(0).args, [])
            assert.strictEqual(dbReflection.end.callCount, 1)
        })
    })
})
