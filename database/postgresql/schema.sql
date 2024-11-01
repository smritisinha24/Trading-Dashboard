-- Table: public.trade_info

-- DROP TABLE IF EXISTS public.trade_info;
CREATE TABLE IF NOT EXISTS public.stock_data 
(
    symbol character varying(15) COLLATE pg_catalog."default" NOT NULL,
    prev_close numeric(10,2),
    iep numeric(10,2),
    chng numeric(5,2),
    pct_chng numeric(5,2),
    final numeric(10,2),
    final_quantity bigint,
    value numeric(15,2),
    ffm_cap numeric(15,2),
    nm_52w_h numeric(10,2),
    nm_52w_l numeric(10,2),
    CONSTRAINT symbol PRIMARY KEY (symbol)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.stock_data
    OWNER to postgres;
--create trade_info table
CREATE TABLE IF NOT EXISTS public.trade_info
(
    symbol character varying(15) COLLATE pg_catalog."default" NOT NULL,
    traded_volume_lakhs numeric,
    traded_value_cr numeric,
    total_market_cap_cr numeric,
    free_float_market_cap_cr numeric,
    impact_cost numeric,
    percent_deliverable_traded_quantity numeric,
    applicable_margin_rate numeric,
    face_value numeric,
    CONSTRAINT trade_info_pkey PRIMARY KEY (symbol),
    CONSTRAINT fk_symbol FOREIGN KEY (symbol)
        REFERENCES public.stock_data (symbol) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.trade_info
    OWNER to postgres;


TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.trade_info
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public.companies
(
    symbol text COLLATE pg_catalog."default" NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    sector text COLLATE pg_catalog."default",
    industry text COLLATE pg_catalog."default",
    CONSTRAINT companies_pkey PRIMARY KEY (symbol),
    CONSTRAINT companies_symbol_key UNIQUE (symbol),
    CONSTRAINT symbol FOREIGN KEY (symbol)
        REFERENCES public.stock_data (symbol) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.companies
    OWNER to postgres;
