import { Database } from './schemaInterfaces'
import { PostgresDatabase } from './schemaPostgres'
import { MysqlDatabase } from './schemaMysql'

enum SQLVersion {
    POSTGRES = 1,
    MYSQL = 2,
    UNKNOWN = 3
}

function getSQLVersion (connection: string): SQLVersion {
    if (/^postgres(ql)?:\/\//i.test(connection)) {
        return SQLVersion.POSTGRES
    } else if (/^mysql:\/\//i.test(connection)) {
        return SQLVersion.MYSQL
    } else {
        return SQLVersion.UNKNOWN
    }
}

export function getDatabase (connection: string): Database {
    switch (getSQLVersion(connection)) {
        case SQLVersion.MYSQL:
            return new MysqlDatabase(connection)
        case SQLVersion.POSTGRES:
            return new PostgresDatabase(connection)
        default:
            throw new Error(`SQL version unsupported in connection: ${connection}`)
    }
}

export { Database } from './schemaInterfaces'
