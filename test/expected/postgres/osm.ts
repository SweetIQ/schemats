/* tslint:disable */

export type format_enum = 'html' | 'markdown' | 'text'
export type user_status_enum =
    | 'active'
    | 'confirmed'
    | 'deleted'
    | 'pending'
    | 'suspended'

export namespace usersFields {
    export type auth_provider = string | null
    export type auth_uid = string | null
    export type bool_array_col = Array<boolean> | null
    export type bytea_array_col = Array<string> | null
    export type bytea_col = string | null
    export type changesets_count = number
    export type char_col = string | null
    export type consider_pd = boolean
    export type creation_ip = string | null
    export type creation_time = Date
    export type custom_table_type = 'a' | 'b' | 'c'
    export type data_public = boolean
    export type date_col = Date | null
    export type description = string
    export type description_format = format_enum
    export type diary_entries_count = number
    export type display_name = string
    export type double_col = number | null
    export type email = string
    export type email_valid = boolean
    export type home_lat = number | null
    export type home_lon = number | null
    export type home_zoom = number | null
    export type id = number
    export type image_content_type = string | null
    export type image_file_name = string | null
    export type image_fingerprint = string | null
    export type image_use_gravatar = boolean
    export type inet_col = string | null
    export type int2_array_col = Array<number> | null
    export type int4_array_col = Array<number> | null
    export type int8_array_col = Array<number> | null
    export type interval_col = string | null
    export type json_array_col = Array<Object> | null
    export type json_col = any | null
    export type jsonb_array_col = Array<Object> | null
    export type jsonb_col = any | null
    export type languages = string | null
    export type money_col = number | null
    export type name_type_col = string | null
    export type nearby = number | null
    export type new_email = string | null
    export type number_ = number | null
    export type numeric_col = number | null
    export type oid_col = number | null
    export type pass_crypt = string
    export type pass_salt = string | null
    export type preferred_editor = string | null
    export type real_col = number | null
    export type status = user_status_enum
    export type string_ = string | null
    export type terms_agreed = Date | null
    export type terms_seen = boolean
    export type text_array_col = Array<string> | null
    export type time_col = string | null
    export type time_with_tz = string | null
    export type timestamptz_array_col = Array<Date> | null
    export type traces_count = number
    export type unspported_path_type = any | null
    export type uuid_array_col = Array<string> | null
    export type uuid_column = string | null
    export type varchar_array_col = Array<string> | null
}

export interface users {
    auth_provider: usersFields.auth_provider
    auth_uid: usersFields.auth_uid
    bool_array_col: usersFields.bool_array_col
    bytea_array_col: usersFields.bytea_array_col
    bytea_col: usersFields.bytea_col
    changesets_count: usersFields.changesets_count
    char_col: usersFields.char_col
    consider_pd: usersFields.consider_pd
    creation_ip: usersFields.creation_ip
    creation_time: usersFields.creation_time
    custom_table_type: usersFields.custom_table_type
    data_public: usersFields.data_public
    date_col: usersFields.date_col
    description: usersFields.description
    description_format: usersFields.description_format
    diary_entries_count: usersFields.diary_entries_count
    display_name: usersFields.display_name
    double_col: usersFields.double_col
    email: usersFields.email
    email_valid: usersFields.email_valid
    home_lat: usersFields.home_lat
    home_lon: usersFields.home_lon
    home_zoom: usersFields.home_zoom
    id: usersFields.id
    image_content_type: usersFields.image_content_type
    image_file_name: usersFields.image_file_name
    image_fingerprint: usersFields.image_fingerprint
    image_use_gravatar: usersFields.image_use_gravatar
    inet_col: usersFields.inet_col
    int2_array_col: usersFields.int2_array_col
    int4_array_col: usersFields.int4_array_col
    int8_array_col: usersFields.int8_array_col
    interval_col: usersFields.interval_col
    json_array_col: usersFields.json_array_col
    json_col: usersFields.json_col
    jsonb_array_col: usersFields.jsonb_array_col
    jsonb_col: usersFields.jsonb_col
    languages: usersFields.languages
    money_col: usersFields.money_col
    name_type_col: usersFields.name_type_col
    nearby: usersFields.nearby
    new_email: usersFields.new_email
    number: usersFields.number_
    numeric_col: usersFields.numeric_col
    oid_col: usersFields.oid_col
    pass_crypt: usersFields.pass_crypt
    pass_salt: usersFields.pass_salt
    preferred_editor: usersFields.preferred_editor
    real_col: usersFields.real_col
    status: usersFields.status
    string: usersFields.string_
    terms_agreed: usersFields.terms_agreed
    terms_seen: usersFields.terms_seen
    text_array_col: usersFields.text_array_col
    time_col: usersFields.time_col
    time_with_tz: usersFields.time_with_tz
    timestamptz_array_col: usersFields.timestamptz_array_col
    traces_count: usersFields.traces_count
    unspported_path_type: usersFields.unspported_path_type
    uuid_array_col: usersFields.uuid_array_col
    uuid_column: usersFields.uuid_column
    varchar_array_col: usersFields.varchar_array_col
}
