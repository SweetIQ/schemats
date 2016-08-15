import * as PgPromise from 'pg-promise'
import { mapValues } from 'lodash'
const pgp = PgPromise();

export class Database {
    private db;

    constructor(connectionString: string) {
        this.db = pgp(connectionString)
    }

    public async getDBSchema(tableName: string) {
        let schemaList: Array<any> = await this.db.query(
            `SELECT column_name, data_type 
             FROM information_schema.columns
             WHERE table_name = $/tableName/`,
            {tableName}
        );

        let schema = {};

        schemaList.forEach(schemaItem => {
            schema[schemaItem['column_name']] = schemaItem['data_type']
        });

        return schema
    }

    public async getTableTypes(tableName: string) {
        return this.mapDBSchemaToType(await this.getDBSchema(tableName));
    }

    private mapDBSchemaToType(schema: Object) {
        return mapValues(schema, data_type => {
            switch (data_type) {
                case 'character varying':
                case 'text':
                    return 'string';
                case 'integer':
                case 'double precision':
                    return 'number';
                case 'boolean':
                    return 'boolean';
                case 'json':
                    return 'Object';
                case 'date':
                case 'timestamp without time zone':
                    return 'Date';
                default:
                    throw new TypeError('do not know how to convert type ' + data_type);
            }
        })
    }
}
