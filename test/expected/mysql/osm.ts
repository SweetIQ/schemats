export type enum_enum_col = 'enum1' | 'enum2' | 'enum3';
export type enum_nullable_enum_col = 'enum1' | 'enum2' | 'enum3';
export type set_set_col = 'set1' | 'set2' | 'set3';
export type set_nullable_set_col = 'set1' | 'set2' | 'set3';

export namespace usersFields {
    export type char_col = string;
    export type nullable_char_col = string | null;
    export type text_col = string;
    export type nullable_text_col = string | null;
    export type tinytext_col = string;
    export type nullable_tinytext_col = string | null;
    export type mediumtext_col = string;
    export type nullable_mediumtext_col = string | null;
    export type longtext_col = string;
    export type nullable_longtext_col = string | null;
    export type time_col = string;
    export type nullable_time_col = string | null;
    export type geometry_col = string;
    export type nullable_geometry_col = string | null;
    export type integer_col = number;
    export type nullable_integer_col = number | null;
    export type int_col = number;
    export type nullable_int_col = number | null;
    export type smallint_col = number;
    export type nullable_smallint_col = number | null;
    export type mediumint_col = number;
    export type nullable_mediumint_col = number | null;
    export type bigint_col = number;
    export type nullable_bigint_col = number | null;
    export type double_col = number;
    export type nullable_double_col = number | null;
    export type decimal_col = number;
    export type nullable_decimal_col = number | null;
    export type numeric_col = number;
    export type nullable_numeric_col = number | null;
    export type float_col = number;
    export type nullable_float_col = number | null;
    export type year_col = number;
    export type nullable_year_col = number | null;
    export type tinyint_col = boolean;
    export type nullable_tinyint_col = boolean | null;
    export type date_col = Date;
    export type nullable_date_col = Date | null;
    export type datetime_col = Date;
    export type nullable_datetime_col = Date | null;
    export type timestamp_col = Date;
    export type tinyblob_col = Buffer;
    export type nullable_tinyblob_col = Buffer | null;
    export type mediumblob_col = Buffer;
    export type nullable_mediumblob_col = Buffer | null;
    export type longblob_col = Buffer;
    export type nullable_longblob_col = Buffer | null;
    export type blob_col = Buffer;
    export type nullable_blob_col = Buffer | null;
    export type binary_col = Buffer;
    export type nullable_binary_col = Buffer | null;
    export type varbinary_col = Buffer;
    export type nullable_varbinary_col = Buffer | null;
    export type bit_col = Buffer;
    export type nullable_bit_col = Buffer | null;
    export type enum_col = enum_enum_col;
    export type nullable_enum_col = enum_nullable_enum_col | null;
    export type set_col = set_set_col;
    export type nullable_set_col = set_nullable_set_col | null;

}

export interface users {
    char_col: usersFields.char_col;
    nullable_char_col: usersFields.nullable_char_col;
    text_col: usersFields.text_col;
    nullable_text_col: usersFields.nullable_text_col;
    tinytext_col: usersFields.tinytext_col;
    nullable_tinytext_col: usersFields.nullable_tinytext_col;
    mediumtext_col: usersFields.mediumtext_col;
    nullable_mediumtext_col: usersFields.nullable_mediumtext_col;
    longtext_col: usersFields.longtext_col;
    nullable_longtext_col: usersFields.nullable_longtext_col;
    time_col: usersFields.time_col;
    nullable_time_col: usersFields.nullable_time_col;
    geometry_col: usersFields.geometry_col;
    nullable_geometry_col: usersFields.nullable_geometry_col;
    integer_col: usersFields.integer_col;
    nullable_integer_col: usersFields.nullable_integer_col;
    int_col: usersFields.int_col;
    nullable_int_col: usersFields.nullable_int_col;
    smallint_col: usersFields.smallint_col;
    nullable_smallint_col: usersFields.nullable_smallint_col;
    mediumint_col: usersFields.mediumint_col;
    nullable_mediumint_col: usersFields.nullable_mediumint_col;
    bigint_col: usersFields.bigint_col;
    nullable_bigint_col: usersFields.nullable_bigint_col;
    double_col: usersFields.double_col;
    nullable_double_col: usersFields.nullable_double_col;
    decimal_col: usersFields.decimal_col;
    nullable_decimal_col: usersFields.nullable_decimal_col;
    numeric_col: usersFields.numeric_col;
    nullable_numeric_col: usersFields.nullable_numeric_col;
    float_col: usersFields.float_col;
    nullable_float_col: usersFields.nullable_float_col;
    year_col: usersFields.year_col;
    nullable_year_col: usersFields.nullable_year_col;
    tinyint_col: usersFields.tinyint_col;
    nullable_tinyint_col: usersFields.nullable_tinyint_col;
    date_col: usersFields.date_col;
    nullable_date_col: usersFields.nullable_date_col;
    datetime_col: usersFields.datetime_col;
    nullable_datetime_col: usersFields.nullable_datetime_col;
    timestamp_col: usersFields.timestamp_col;
    tinyblob_col: usersFields.tinyblob_col;
    nullable_tinyblob_col: usersFields.nullable_tinyblob_col;
    mediumblob_col: usersFields.mediumblob_col;
    nullable_mediumblob_col: usersFields.nullable_mediumblob_col;
    longblob_col: usersFields.longblob_col;
    nullable_longblob_col: usersFields.nullable_longblob_col;
    blob_col: usersFields.blob_col;
    nullable_blob_col: usersFields.nullable_blob_col;
    binary_col: usersFields.binary_col;
    nullable_binary_col: usersFields.nullable_binary_col;
    varbinary_col: usersFields.varbinary_col;
    nullable_varbinary_col: usersFields.nullable_varbinary_col;
    bit_col: usersFields.bit_col;
    nullable_bit_col: usersFields.nullable_bit_col;
    enum_col: usersFields.enum_col;
    nullable_enum_col: usersFields.nullable_enum_col;
    set_col: usersFields.set_col;
    nullable_set_col: usersFields.nullable_set_col;

}

export namespace user_enumsFields {
    export type enum_col = enum_enum_col;
    export type nullable_enum_col = enum_nullable_enum_col | null;
    export type set_col = set_set_col;
    export type nullable_set_col = set_nullable_set_col | null;

}

export interface user_enums {
    enum_col: user_enumsFields.enum_col;
    nullable_enum_col: user_enumsFields.nullable_enum_col;
    set_col: user_enumsFields.set_col;
    nullable_set_col: user_enumsFields.nullable_set_col;

}

export namespace packageFields {
    export type number_ = number;
    export type string_ = string;

}

export interface package_ {
    number: packageFields.number_;
    string: packageFields.string_;

}
