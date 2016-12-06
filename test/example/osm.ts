
/**
 * AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * This file was generated with schemats node package:
 * $ schemats schemats generate -c postgresql://user:password@localhost/test -t users -o osm.ts
 *
 * Re-run command above if your DB schema was changed.
 *
 */
export namespace osm {

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
        export type terms_agreed = Date;
        export type consider_pd = boolean;
        export type preferred_editor = string;
        export type terms_seen = boolean;
        export type auth_uid = string;
        export type image_fingerprint = string;
        export type changesets_count = number;
        export type traces_count = number;
        export type diary_entries_count = number;
        export type image_use_gravatar = boolean;
        export type image_content_type = string;
        export type auth_provider = string;

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
        terms_agreed: usersFields.terms_agreed;
        consider_pd: usersFields.consider_pd;
        preferred_editor: usersFields.preferred_editor;
        terms_seen: usersFields.terms_seen;
        auth_uid: usersFields.auth_uid;
        image_fingerprint: usersFields.image_fingerprint;
        changesets_count: usersFields.changesets_count;
        traces_count: usersFields.traces_count;
        diary_entries_count: usersFields.diary_entries_count;
        image_use_gravatar: usersFields.image_use_gravatar;
        image_content_type: usersFields.image_content_type;
        auth_provider: usersFields.auth_provider;

    }

}
