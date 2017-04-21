
/**
 * AUTO-GENERATED FILE @ 2016-12-07 13:17:46 - DO NOT EDIT!
 *
 * This file was generated with schemats node package:
 * $ schemats generate -c sql://username:password@localhost/test -o ./test/artifacts/postgres/osm.ts -t users
 *
 * Re-run the command above.
 *
 */

export type format_enum = 'html' | 'markdown' | 'text';
export type user_status_enum = 'active' | 'confirmed' | 'deleted' | 'pending' | 'suspended';

export namespace usersFields {
    export type email = string;
    export type id = number;
    export type pass_crypt = string;
    export type creation_time = Date;
    export type display_name = string;
    export type data_public = boolean;
    export type description = string;
    export type home_lat = number | null;
    export type home_lon = number | null;
    export type home_zoom = number | null;
    export type nearby = number | null;
    export type pass_salt = string | null;
    export type image_file_name = string | null;
    export type email_valid = boolean;
    export type new_email = string | null;
    export type creation_ip = string | null;
    export type languages = string | null;
    export type status = user_status_enum;
    export type terms_agreed = Date | null;
    export type consider_pd = boolean;
    export type preferred_editor = string | null;
    export type terms_seen = boolean;
    export type auth_uid = string | null;
    export type description_format = format_enum;
    export type image_fingerprint = string | null;
    export type changesets_count = number;
    export type traces_count = number;
    export type diary_entries_count = number;
    export type image_use_gravatar = boolean;
    export type image_content_type = string | null;
    export type auth_provider = string | null;
    export type uuid_column = string | null;
    export type number_ = number | null;
    export type string_ = string | null;
    export type money_col = number | null;
    export type char_col = string | null;
    export type time_col = string | null;
    export type inet_col = string | null;
    export type jsonb_col = Object | null;
    export type numeric_col = number | null;
    export type bytea_col = string | null;
    export type bool_array_col = Array<boolean> | null;
    export type varchar_array_col = Array<string> | null;
    export type int2_array_col = Array<number> | null;
    export type int4_array_col = Array<number> | null;
    export type int8_array_col = Array<number> | null;
    export type uuid_array_col = Array<string> | null;
    export type text_array_col = Array<string> | null;
    export type bytea_array_col = Array<string> | null;
    export type real_col = number | null;
    export type double_col = number | null;
    export type time_with_tz = string | null;
    export type oid_col = number | null;
    export type interval_col = string | null;
    export type json_col = Object | null;
    export type date_col = Date | null;
    export type unspported_path_type = any | null;

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
    json_col: usersFields.json_col;
    date_col: usersFields.date_col;
    unspported_path_type: usersFields.unspported_path_type;

}
