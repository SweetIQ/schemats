DROP SCHEMA maxi CASCADE;
CREATE SCHEMA maxi;

DROP TABLE IF EXISTS maxi.users1;
CREATE TABLE maxi.users1 (
  email text NOT NULL,
  id bigint NOT NULL
);

DROP TABLE IF EXISTS maxi.users2;
CREATE TABLE maxi.users2 (
  email text NOT NULL,
  id bigint NOT NULL
);

DROP TABLE IF EXISTS maxi.users3;
CREATE TABLE maxi.users3 (
  email text NOT NULL,
  id bigint NOT NULL
);
