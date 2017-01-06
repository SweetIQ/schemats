# schemats

[![npm](https://img.shields.io/npm/v/schemats.svg)](https://www.npmjs.com/package/schemats)
[![GitHub tag](https://img.shields.io/github/tag/SweetIQ/schemats.svg)](https://github.com/SweetIQ/schemats)
[![CircleCI](https://img.shields.io/circleci/project/github/SweetIQ/schemats/master.svg)](https://circleci.com/gh/SweetIQ/schemats)

Generate typescript interface definitions from (postgres) SQL database schema

For an overview on the motivation and rational behind this project, please take a look at [Statically typed PostgreSQL queries in Typescript
](http://cs.mcgill.ca/~mxia3/2016/11/18/Statically-typed-PostgreSQL-queries-and-typescript-schemats/).

## Quick Start

### Installing Schemats

```
npm install -g schemats
```

### Generating the type definition from schema

```
schemats generate -c postgres://postgres@localhost/osm -t users -o osm.ts -n osm
```


The command above will generate typescript interfaces for [`osm`](test/osm_schema.sql) database 
with table [`users`](test/osm_schema.sql#L18) under namespace `osm`. The resulting file is stored as [`osm.ts`](test/example/osm.ts).

### Generating the type definition for all the tables in a postgres schema

To generate all type definitions for all the tables within the schema 'public': 

```
schemats generate -c postgres://postgres@localhost/osm -s public -o osm.ts -n osm
```

If neither the table parameter nor the schema parameter is provided, all tables in schema 'public' will be generated, so the command above is equivalent to:

```
schemats generate -c postgres://postgres@localhost/osm -o osm.ts -n osm
```

### Writing code with typed schema

We can import `osm.ts` directly

```typescript

// imports the _osm_ namespace from ./osm.ts

import {osm} from './osm'


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
<img align="center" src="demo.gif" width="100%" alt="demo 1"/>
</p>
<p align="center">
<img align="center" src="demo2.gif" width="100%" alt="demo 2"/>
</p>

### Using schemats as a library

Schemats exposes two high-level functions for generating typescript definition from a database schema. They can be used by a build tool such as grunt and gulp.

### Contributing

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

Steps to contribute:

- Make your awesome changes
- Run `npm run lint`
- Optionally, run `DATABASE_URL="postgres://youruser@localhost/anyemptytestdatabase" npm test`
- Submit pull request

Our project runs `npm test` automatically on pull requests via CircleCI.
