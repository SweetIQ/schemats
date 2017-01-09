
/**
 * AUTO-GENERATED FILE @ 2016-12-07 13:17:46 - DO NOT EDIT!
 *
 * This file was generated with schemats node package:
 * $ schemats generate -c postgres://username:password@localhost/test -t users -o ./test/osm.ts
 *
 * Re-run the command above.
 *
 */
export namespace osm {

    export type user_status_enum = 'deleted' | 'suspended' | 'confirmed' | 'active' | 'pending';
    export type format_enum = 'text' | 'markdown' | 'html';

    export namespace usersFields {
        export type email = string;
        export type id = number;
        export type pass_crypt = string;
        export type creation_time = Date;
        export type display_name = string;
        export type data_public = boolean;
        export type description = string;
        export type home_lat = number;
        export type home_lon = number;
        export type home_zoom = number;
        export type nearby = number;
        export type pass_salt = string;
        export type image_file_name = string;
        export type email_valid = boolean;
        export type new_email = string;
        export type creation_ip = string;
        export type languages = string;
        export type status = user_status_enum;
        export type terms_agreed = Date;
        export type consider_pd = boolean;
        export type preferred_editor = string;
        export type terms_seen = boolean;
        export type auth_uid = string;
        export type description_format = format_enum;
        export type image_fingerprint = string;
        export type changesets_count = number;
        export type traces_count = number;
        export type diary_entries_count = number;
        export type image_use_gravatar = boolean;
        export type image_content_type = string;
        export type auth_provider = string;
        export type uuid_column = string;
        export type number_ = number;
        export type string_ = string;
        export type money_col = number;
        export type char_col = string;
        export type time_col = string;
        export type inet_col = string;
        export type jsonb_col = Object;
        export type numeric_col = number;
        export type bytea_col = string;
        export type bool_array_col = Array<boolean>;
        export type varchar_array_col = Array<string>;
        export type int2_array_col = Array<number>;
        export type int4_array_col = Array<number>;
        export type int8_array_col = Array<number>;
        export type uuid_array_col = Array<string>;
        export type text_array_col = Array<string>;
        export type bytea_array_col = Array<string>;
        export type real_col = number;
        export type double_col = number;
        export type time_with_tz = string;
        export type oid_col = number;
        export type interval_col = string;

    }

    export interface users {
        email: usersFields.email;
        id: usersFields.id;
        pass_crypt: usersFields.pass_crypt;
        creation_time: usersFields.creation_time;
        display_name: usersFields.display_name;
        data_public: usersFields.data_public;
        description: usersFields.description;
        home_lat: usersFields.home_lat;
        home_lon: usersFields.home_lon;
        home_zoom: usersFields.home_zoom;
        nearby: usersFields.nearby;
        pass_salt: usersFields.pass_salt;
        image_file_name: usersFields.image_file_name;
        email_valid: usersFields.email_valid;
        new_email: usersFields.new_email;
        creation_ip: usersFields.creation_ip;
        languages: usersFields.languages;
        status: usersFields.status;
        terms_agreed: usersFields.terms_agreed;
        consider_pd: usersFields.consider_pd;
        preferred_editor: usersFields.preferred_editor;
        terms_seen: usersFields.terms_seen;
        auth_uid: usersFields.auth_uid;
        description_format: usersFields.description_format;
        image_fingerprint: usersFields.image_fingerprint;
        changesets_count: usersFields.changesets_count;
        traces_count: usersFields.traces_count;
        diary_entries_count: usersFields.diary_entries_count;
        image_use_gravatar: usersFields.image_use_gravatar;
        image_content_type: usersFields.image_content_type;
        auth_provider: usersFields.auth_provider;
        uuid_column: usersFields.uuid_column;
        number: usersFields.number_;
        string: usersFields.string_;
        money_col: usersFields.money_col;
        char_col: usersFields.char_col;
        time_col: usersFields.time_col;
        inet_col: usersFields.inet_col;
        jsonb_col: usersFields.jsonb_col;
        numeric_col: usersFields.numeric_col;
        bytea_col: usersFields.bytea_col;
        bool_array_col: usersFields.bool_array_col;
        varchar_array_col: usersFields.varchar_array_col;
        int2_array_col: usersFields.int2_array_col;
        int4_array_col: usersFields.int4_array_col;
        int8_array_col: usersFields.int8_array_col;
        uuid_array_col: usersFields.uuid_array_col;
        text_array_col: usersFields.text_array_col;
        bytea_array_col: usersFields.bytea_array_col;
        real_col: usersFields.real_col;
        double_col: usersFields.double_col;
        time_with_tz: usersFields.time_with_tz;
        oid_col: usersFields.oid_col;
        interval_col: usersFields.interval_col;

    }

}
