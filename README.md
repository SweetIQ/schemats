# Schemats

[![npm](https://img.shields.io/npm/v/schemats.svg)](https://www.npmjs.com/package/schemats)
[![GitHub tag](https://img.shields.io/github/tag/SweetIQ/schemats.svg)](https://github.com/SweetIQ/schemats)
[![CircleCI](https://img.shields.io/circleci/project/github/SweetIQ/schemats/master.svg)](https://circleci.com/gh/SweetIQ/schemats)
[![Coverage Status](https://coveralls.io/repos/github/SweetIQ/schemats/badge.svg?branch=coverage)](https://coveralls.io/github/SweetIQ/schemats?branch=coverage)

Using Schemats, you can generate TypeScirpt interface definitions from (Postgres) SQL database schema, automatically.

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
    id: number;
    username: string;
    password: string;
    last_logon: Date;
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
```


The command above will generate typescript interfaces for [`osm`](test/osm_schema.sql) database 
with table [`users`](test/osm_schema.sql#L18). The resulting file is stored as [`osm.ts`](test/example/osm.ts).

### Generating the type definition for all the tables in a postgres schema

To generate all type definitions for all the tables within the schema 'public': 

```
schemats generate -c postgres://postgres@localhost/osm -s public -o osm.ts
```

If neither the table parameter nor the schema parameter is provided, all tables in schema 'public' will be generated, so the command above is equivalent to:

```
schemats generate -c postgres://postgres@localhost/osm -o osm.ts
```

### Writing code with typed schema

We can import `osm.ts` directly

```typescript

// imports the _osm_ namespace from ./osm.ts

import * as osm from './osm'


// Now query with pg-promise and have a completely typed return value
  
let usersCreatedAfter2013: Array<osm.users>
   = await db.query("SELECT * FROM users WHERE creation_time >= '2013-01-01'");

// We can decide to only get selected fields

let emailOfUsersCreatedAfter2013: Array<{
    email: osm.usersFields.email,
    creation_time: osm.usersFields.creation_time
}> = await db.query("SELECT (email, creation_time) FROM users WHERE creation_time >= '2013-01-01'");

// osm.usersFields.name is just a type alias to string
// and osm.usersFields.creation_time is just a type alias to Date
// Hence the one below also works

let emailOfUsersCreatedAfter2013: Array<{
    email: string,
    creation_time: Date
}> = await db.query("SELECT (email, creation_time) FROM users WHERE creation_time >= '2013-01-01'");
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

### Upgrading to v1.0

#### Deprecation of Namespace
Version 1.0 deprecates generating schema typescript files with namespace. 

Instead of generating schema typescript files with

```bash
schemats generate -c postgres://postgres@localhost/db -n yournamespace -o db.ts
```

and import them with 
```typescript
import {yournamespace} from './db'
```

It is now encouraged to generate without namespace
```bash
schemats generate -c postgres://postgres@localhost/db -o db.ts
```
and import them with 
```typescript
import * as yournamespace from './db'
// or
import {table_a, table_b} from './db'
```

As [TypeScript's documentation](https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html) describes,
having a top level namespace is needless. This was discussed in [#25](https://github.com/SweetIQ/schemats/issues/25).

Generating schema typescript files with namespace still works in v1.0, but it is discouraged and subjected to 
removal in the future.

#### Support Strict Null-Checking

Version 1.0 [supports](https://github.com/SweetIQ/schemats/issues/19)
 [strict null-checking](https://github.com/Microsoft/TypeScript/pull/7140)
and reflects the _NOT NULL_ constraint defined in PostgreSQL schema.


### Contributing

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

Steps to contribute:

- Make your awesome changes
- Run `npm run lint`
- Optionally, run `DATABASE_URL="postgres://youruser@localhost/anyemptytestdatabase" npm test`
- Submit pull request

Our project runs `npm test` automatically on pull requests via CircleCI.
