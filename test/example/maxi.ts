
/**
 * AUTO-GENERATED FILE @ 2016-12-07 13:17:46 - DO NOT EDIT!
 *
 * This file was generated with schemats node package:
 * $ schemats generate -c postgres://username:password@localhost/test -s maxi -o ./test/maxi.ts
 *
 * Re-run the command above.
 *
 */

export namespace maxi {
    export namespace users1Fields {
        export type email = string;
        export type id = number;

    }

    export interface users1 {
        email: users1Fields.email;
        id: users1Fields.id;

    }

    export namespace users3Fields {
        export type email = string;
        export type id = number;

    }

    export interface users3 {
        email: users3Fields.email;
        id: users3Fields.id;

    }

    export namespace users2Fields {
        export type email = string;
        export type id = number;

    }

    export interface users2 {
        email: users2Fields.email;
        id: users2Fields.id;

    }

}
