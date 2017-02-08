--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

-- Started on 2017-02-08 16:10:55

DROP TABLE IF EXISTS users;
DROP TYPE IF EXISTS user_status_enum;
DROP TYPE IF EXISTS format_enum;

SET statement_timeout = 0;
-- SET lock_timeout = 0;
-- SET idle_in_transaction_session_timeout = 0;
-- SET client_encoding = 'UTF8';
-- SET standard_conforming_strings = on;
-- SET check_function_bodies = false;
-- SET client_min_messages = warning;
-- SET row_security = off;

-- --
-- -- TOC entry 1 (class 3079 OID 12387)
-- -- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
-- --

-- CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


-- --
-- -- TOC entry 2137 (class 0 OID 0)
-- -- Dependencies: 1
-- -- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
-- --

-- COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


-- SET search_path = public, pg_catalog;

-- SET default_tablespace = '';

-- SET default_with_oids = false;

-- --
-- -- TOC entry 186 (class 1259 OID 33899)
-- -- Name: cta_situationcompte_sco; Type: TABLE; Schema: public; Owner: -
-- --

-- CREATE TABLE cta_situationcompte_sco (
--     sco_id integer NOT NULL,
--     sco_total_debit numeric DEFAULT 0 NOT NULL,
--     sco_total_credit numeric DEFAULT 0 NOT NULL,
--     sco_nb_ecritures bigint DEFAULT 0 NOT NULL,
--     pst_id integer DEFAULT 0 NOT NULL,
--     cpt_id integer DEFAULT 0 NOT NULL
-- );


-- --
-- -- TOC entry 185 (class 1259 OID 33897)
-- -- Name: cta_situationcompte_sco_sco_id_seq; Type: SEQUENCE; Schema: public; Owner: -
-- --

-- CREATE SEQUENCE cta_situationcompte_sco_sco_id_seq
--     START WITH 1
--     INCREMENT BY 1
--     NO MINVALUE
--     NO MAXVALUE
--     CACHE 1;


-- --
-- -- TOC entry 2138 (class 0 OID 0)
-- -- Dependencies: 185
-- -- Name: cta_situationcompte_sco_sco_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
-- --

-- ALTER SEQUENCE cta_situationcompte_sco_sco_id_seq OWNED BY cta_situationcompte_sco.sco_id;


-- --
-- -- TOC entry 2002 (class 2604 OID 33902)
-- -- Name: cta_situationcompte_sco sco_id; Type: DEFAULT; Schema: public; Owner: -
-- --

-- ALTER TABLE ONLY cta_situationcompte_sco ALTER COLUMN sco_id SET DEFAULT nextval('cta_situationcompte_sco_sco_id_seq'::regclass);

-- --
-- -- TOC entry 2139 (class 0 OID 0)
-- -- Dependencies: 185
-- -- Name: cta_situationcompte_sco_sco_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
-- --

-- SELECT pg_catalog.setval('cta_situationcompte_sco_sco_id_seq', 1, false);


-- --
-- -- TOC entry 2009 (class 2606 OID 33912)
-- -- Name: cta_situationcompte_sco ctr_pk_sco_sco_id; Type: CONSTRAINT; Schema: public; Owner: -
-- --

-- ALTER TABLE ONLY cta_situationcompte_sco
--     ADD CONSTRAINT ctr_pk_sco_sco_id PRIMARY KEY (sco_id);


-- --
-- -- TOC entry 2010 (class 1259 OID 33913)
-- -- Name: ndx_cta_situationcompte_sco_cpt_id; Type: INDEX; Schema: public; Owner: -
-- --

-- CREATE INDEX ndx_cta_situationcompte_sco_cpt_id ON cta_situationcompte_sco USING btree (cpt_id);


-- --
-- -- TOC entry 2011 (class 1259 OID 33914)
-- -- Name: ndx_cta_situationcompte_sco_pst_id; Type: INDEX; Schema: public; Owner: -
-- --

-- CREATE INDEX ndx_cta_situationcompte_sco_pst_id ON cta_situationcompte_sco USING btree (pst_id);


-- -- Completed on 2017-02-08 16:10:55

-- --
-- -- PostgreSQL database dump complete
-- --

