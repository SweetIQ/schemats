/* tslint:disable */

type HasTypeKey<T> = {
    [K in keyof T]: {
        type: any
    }
}

type SimpleSchema<T extends HasTypeKey<T>> = {
    [K in keyof T]: T[K]['type']
}

export type format_enum = 'html' | 'markdown' | 'text';
export type user_status_enum = 'active' | 'confirmed' | 'deleted' | 'pending' | 'suspended';

export namespace usersFields {
    export type email = { type: string, primaryKey: false, unique: false, };
    export type id = { type: number, primaryKey: false, unique: false, };
    export type pass_crypt = { type: string, primaryKey: false, unique: false, };
    export type creation_time = { type: Date, primaryKey: false, unique: false, };
    export type display_name = { type: string, primaryKey: false, unique: false, };
    export type data_public = { type: boolean, primaryKey: false, unique: false, };
    export type description = { type: string, primaryKey: false, unique: false, };
    export type home_lat = { type: number | null, primaryKey: false, unique: false, };
    export type home_lon = { type: number | null, primaryKey: false, unique: false, };
    export type home_zoom = { type: number | null, primaryKey: false, unique: false, };
    export type nearby = { type: number | null, primaryKey: false, unique: false, };
    export type pass_salt = { type: string | null, primaryKey: false, unique: false, };
    export type image_file_name = { type: string | null, primaryKey: false, unique: false, };
    export type email_valid = { type: boolean, primaryKey: false, unique: false, };
    export type new_email = { type: string | null, primaryKey: false, unique: false, };
    export type creation_ip = { type: string | null, primaryKey: false, unique: false, };
    export type languages = { type: string | null, primaryKey: false, unique: false, };
    export type status = { type: user_status_enum, primaryKey: false, unique: false, };
    export type terms_agreed = { type: Date | null, primaryKey: false, unique: false, };
    export type consider_pd = { type: boolean, primaryKey: false, unique: false, };
    export type preferred_editor = { type: string | null, primaryKey: false, unique: false, };
    export type terms_seen = { type: boolean, primaryKey: false, unique: false, };
    export type auth_uid = { type: string | null, primaryKey: false, unique: false, };
    export type description_format = { type: format_enum, primaryKey: false, unique: false, };
    export type image_fingerprint = { type: string | null, primaryKey: false, unique: false, };
    export type changesets_count = { type: number, primaryKey: false, unique: false, };
    export type traces_count = { type: number, primaryKey: false, unique: false, };
    export type diary_entries_count = { type: number, primaryKey: false, unique: false, };
    export type image_use_gravatar = { type: boolean, primaryKey: false, unique: false, };
    export type image_content_type = { type: string | null, primaryKey: false, unique: false, };
    export type auth_provider = { type: string | null, primaryKey: false, unique: false, };
    export type uuid_column = { type: string | null, primaryKey: false, unique: false, };
    export type number_ = { type: number | null, primaryKey: false, unique: false, };
    export type string_ = { type: string | null, primaryKey: false, unique: false, };
    export type money_col = { type: number | null, primaryKey: false, unique: false, };
    export type char_col = { type: string | null, primaryKey: false, unique: false, };
    export type time_col = { type: string | null, primaryKey: false, unique: false, };
    export type inet_col = { type: string | null, primaryKey: false, unique: false, };
    export type jsonb_col = { type: Object | null, primaryKey: false, unique: false, };
    export type numeric_col = { type: number | null, primaryKey: false, unique: false, };
    export type bytea_col = { type: string | null, primaryKey: false, unique: false, };
    export type bool_array_col = { type: Array<boolean> | null, primaryKey: false, unique: false, };
    export type varchar_array_col = { type: Array<string> | null, primaryKey: false, unique: false, };
    export type int2_array_col = { type: Array<number> | null, primaryKey: false, unique: false, };
    export type int4_array_col = { type: Array<number> | null, primaryKey: false, unique: false, };
    export type int8_array_col = { type: Array<number> | null, primaryKey: false, unique: false, };
    export type uuid_array_col = { type: Array<string> | null, primaryKey: false, unique: false, };
    export type text_array_col = { type: Array<string> | null, primaryKey: false, unique: false, };
    export type bytea_array_col = { type: Array<string> | null, primaryKey: false, unique: false, };
    export type real_col = { type: number | null, primaryKey: false, unique: false, };
    export type double_col = { type: number | null, primaryKey: false, unique: false, };
    export type time_with_tz = { type: string | null, primaryKey: false, unique: false, };
    export type oid_col = { type: number | null, primaryKey: false, unique: false, };
    export type interval_col = { type: string | null, primaryKey: false, unique: false, };
    export type json_col = { type: Object | null, primaryKey: false, unique: false, };
    export type date_col = { type: Date | null, primaryKey: false, unique: false, };
    export type unspported_path_type = { type: any | null, primaryKey: false, unique: false, };
    export type name_type_col = { type: string | null, primaryKey: false, unique: false, };
    export type json_array_col = { type: Array<Object> | null, primaryKey: false, unique: false, };
    export type jsonb_array_col = { type: Array<Object> | null, primaryKey: false, unique: false, };
    export type timestamptz_array_col = { type: Array<Date> | null, primaryKey: false, unique: false, };

}

interface usersMeta {
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
    name_type_col: usersFields.name_type_col;
    json_array_col: usersFields.json_array_col;
    jsonb_array_col: usersFields.jsonb_array_col;
    timestamptz_array_col: usersFields.timestamptz_array_col;
}

export type users = SimpleSchema<usersMeta>
