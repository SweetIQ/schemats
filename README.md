# Schemats

Upstream fork of https://github.com/SweetIQ/schemats, with new features / options:

-   `forInsert`: defines any nullable / columns with defaults optional `?:`
-   `customTypes`: define a mapping of custom types, e.g. for emulating enum behavior
-   `customHeader`: allows adding a custom string header to the generated document
-   `prettierConfig`: specify a path to prettier to auto-format the output
-   `tableNamespaces`: whether to add extra namespaces for columns, default to `false`

```
yarn install @tgriesser/schemats
```

Using Schemats, you can generate TypeScript interface definitions from (Postgres, MySQL) SQL database schema automatically.

Start with a database schema:

<table>
<tr><th colspan="2">Users</th></tr>
<tr>
<td>id</td><td>SERIAL</td>
</tr><tr>
<td>username</td><td>VARCHAR</td>
</tr><tr>
<td>password</td><td>VARCHAR</td>
</tr><tr>
<td>last_logon</td><td>TIMESTAMP</td>
</tr>
</table>

Automatically have the following TypesScript Interface generated

```typescript
interface Users {
    id: number
    username: string
    password: string
    last_logon: Date
}
```

For an overview on the motivation and rational behind this project, please take a look at [Statically typed PostgreSQL queries in Typescript
](http://cs.mcgill.ca/~mxia3/2016/11/18/Statically-typed-PostgreSQL-queries-and-typescript-schemats/).

## Quick Start

### Installing Schemats

```
npm install -g schemats
```

### Generating the type definition from schema

```
schemats generate -c postgres://postgres@localhost/osm -t users -o osm.ts
schemats generate -c mysql://mysql@localhost/osm -t users -o osm.ts
```

The above commands will generate typescript interfaces for [`osm`](test/osm_schema.sql) database
with table [`users`](test/osm_schema.sql#L18). The resulting file is stored as [`osm.ts`](test/example/osm.ts).

### Generating the type definition for all the tables in a postgres schema

To generate all type definitions for all the tables within the schema 'public':

_Note: MySQL does not have a default public schema, but should it have a schema named public, this will still work._

```
schemats generate -c postgres://postgres@localhost/osm -s public -o osm.ts
schemats generate -c mysql://mysql@localhost/osm -s public -o osm.ts
```

If neither the table parameter nor the schema parameter is provided, all tables in schema 'public' will be generated, so the command above is equivalent to:

```
schemats generate -c postgres://postgres@localhost/osm -o osm.ts
schemats generate -c mysql://mysql@localhost/osm -o osm.ts
```

### Using schemats.json config file

Schemats supports reading configuration from a json config file (defaults to `schemats.json`). Instead of passing configuration via commandline parameter like done above, it is also possible to supply the configuration through a config file. The config file supports the same parameters as the commandline arguments.

For example, if a `schemats.json` exists in the current working directory with the following content:

```json
{
    "conn": "postgres://postgres@localhost/osm",
    "table": ["users"]
}
```

Running `schemats generate` here is equivalent to running `schemats generate -c postgres://postgres@localhost/osm -t users -o osm.ts`.

### Writing code with typed schema

We can import `osm.ts` directly

```typescript
// imports the _osm_ namespace from ./osm.ts

import * as osm from './osm'

// Now query with pg-promise and have a completely typed return value

let usersCreatedAfter2013: Array<osm.users> = await db.query(
    "SELECT * FROM users WHERE creation_time >= '2013-01-01'"
)

// We can decide to only get selected fields

let emailOfUsersCreatedAfter2013: Array<{
    email: osm.users['email']
    creation_time: osm.users['creation_time']
}> = await db.query(
    "SELECT (email, creation_time) FROM users WHERE creation_time >= '2013-01-01'"
)
```

With generated type definition for our database schema, we can write code with autocompletion and static type checks.

<p align="center">
<img align="center" src="https://github.com/SweetIQ/schemats/raw/master/demo.gif" width="100%" alt="demo 1"/>
</p>
<p align="center">
<img align="center" src="https://github.com/SweetIQ/schemats/raw/master/demo2.gif" width="100%" alt="demo 2"/>
</p>

### Using schemats as a library

Schemats exposes two high-level functions for generating typescript definition from a database schema. They can be used by a build tool such as grunt and gulp.
