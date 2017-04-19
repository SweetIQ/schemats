
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    char_col varchar(255) NOT NULL,
    nullable_char_col varchar(255),
    binary_col binary NOT NULL,
    nullable_binary_col binary,
    varbinary_col varbinary(255) NOT NULL,
    nullable_varbinary_col varbinary(255),
    blob_col blob NOT NULL,
    nullable_blob_col blob,
    text_col text NOT NULL,
    nullable_text_col text,
    mediumtext_col mediumtext NOT NULL,
    nullable_mediumtext_col mediumtext,

    integer_col integer NOT NULL,
    nullable_integer_col integer,
    int_col int NOT NULL,
    nullable_int_col int,
    smallint_col smallint NOT NULL,
    nullable_smallint_col smallint,
    mediumint_col mediumint NOT NULL,
    nullable_mediumint_col mediumint,
    bigint_col bigint NOT NULL,
    nullable_bigint_col bigint,
    double_col double NOT NULL,
    nullable_double_col double,
    decimal_col decimal NOT NULL,
    nullable_decimal_col decimal,
    numeric_col numeric NOT NULL,
    nullable_numeric_col numeric,
    float_col float NOT NULL,
    nullable_float_col float,
    bit_col bit NOT NULL,
    nullable_bit_col bit,

    tinyint_col tinyint NOT NULL,
    nullable_tinyint_col tinyint,

    json_col json NOT NULL,
    nullable_json_col json,

    date_col date NOT NULL,
    nullable_date_col date,
    datetime_col date NOT NULL,
    nullable_datetime_col date,
    timestamp_col date NOT NULL,
    nullable_timestamp_col date,
    time_col date NOT NULL,
    nullable_time_col date,
    year_col date NOT NULL,
    nullable_year_col date,

    enum_col enum('enum1', 'enum2', 'enum3') DEFAULT 'enum1' NOT NULL,
    nullable_enum_col enum('enum1', 'enum2', 'enum3'),
    set_col set('set1', 'set2', 'set3') DEFAULT 'set1' NOT NULL,
    nullable_set_col set('set1', 'set2', 'set3')
);

DROP TABLE IF EXISTS user_enums;

CREATE TABLE user_enums (
    enum_col enum('enum1', 'enum2', 'enum3') DEFAULT 'enum1' NOT NULL,
    nullable_enum_col enum('enum1', 'enum2', 'enum3'),
    set_col set('set1', 'set2', 'set3') DEFAULT 'set1' NOT NULL,
    nullable_set_col set('set1', 'set2', 'set3')
);
