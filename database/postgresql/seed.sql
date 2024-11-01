DO $$
DECLARE
    stock_symbols TEXT[] := ARRAY[
        'NTPC', 'DRREDDY', 'SUNPHARMA', 'ADANIPORTS', 'ICICIBANK', 'BAJAJ-AUTO',
        'TATACONSUM', 'ASIANPAINT', 'COALINDIA', 'JSWSTEEL', 'BPCL', 'SBIN',
        'GRASIM', 'APOLLOHOSP', 'CIPLA', 'BEL', 'AXISBANK', 'HINDUNILVR',
        'INDUSINDBK', 'TECHM', 'NESTLEIND', 'TATASTEEL', 'WIPRO', 'TATAMOTORS',
        'ITC', 'ADANIENT', 'BRITANNIA', 'TCS', 'INFY', 'TITAN', 'TRENT',
        'SBILIFE', 'HEROMOTOCO', 'HINDALCO', 'HCLTECH', 'ONGC', 'BAJFINANCE',
        'HDFCLIFE', 'ULTRACEMCO', 'MARUTI', 'BAJAJFINSV', 'KOTAKBANK', 
        'HDFCBANK', 'RELIANCE', 'SHRIRAMFIN', 'M&M', 'POWERGRID', 'EICHERMOT', 
        'LT', 'BHARTIARTL', 'DIVISLAB', 'HDFCAMC', 'HAVELLS', 'DLF', 'VEDL',
        'PETRONET', 'MUTHOOTFIN', 'TATAPOWER', 'GODREJCP', 'TORNTPHARM', 
        'PIDILITIND', 'BAJAJELEC', 'DMART', 'BOSCHLTD', 'NMDC', 'BIOCON', 
        'CONCOR', 'BALKRISIND', 'ABB'
    ];
    i INTEGER;
    random_value NUMERIC;
    random_change NUMERIC;
BEGIN
    FOR i IN 1..array_length(stock_symbols, 1) LOOP
        random_value := ROUND((100 + random() * 900)::NUMERIC, 2);  -- Random base value between 100 and 1000
        random_change := ROUND((random() * 100 - 50)::NUMERIC, 2);  -- Random change between -50 and +50

        INSERT INTO stock_data (
            SYMBOL,
            PREV_CLOSE,
            IEP,
            CHNG,
            PCT_CHNG,
            FINAL,
            FINAL_QUANTITY,
            VALUE,
            FFM_CAP,
            NM_52W_H,
            NM_52W_L
        ) VALUES (
            stock_symbols[i],
            random_value, -- PREV_CLOSE
            random_value + random_change, -- IEP
            random_change, -- CHNG
            ROUND((random_change / random_value) * 100, 2), -- PCT_CHNG
            random_value + random_change, -- FINAL
            (random() * 999000 + 1000)::BIGINT, -- FINAL_QUANTITY
            ROUND((random() * 100)::NUMERIC, 2), -- VALUE in crores
            ROUND((10 + random() * 990)::NUMERIC, 2), -- FFM_CAP in crores
            ROUND((500 + random() * 1500)::NUMERIC, 2), -- NM_52W_H
            ROUND((100 + random() * 400)::NUMERIC, 2) -- NM_52W_L
        );
    END LOOP;
END $$;
--trade_info--
DO $$
DECLARE
    record RECORD;
BEGIN
    FOR record IN SELECT symbol, ffm_cap FROM public.stock_data LOOP
        INSERT INTO public.trade_info (
            symbol,
            traded_volume_lakhs,
            traded_value_cr,
            total_market_cap_cr,
            free_float_market_cap_cr,
            impact_cost,
            percent_deliverable_traded_quantity,
            applicable_margin_rate,
            face_value
        )
        VALUES (
            record.symbol,
            ROUND((1 + (random() * 100))::numeric, 2),
            ROUND((10 + (random() * 500))::numeric, 2),
            record.ffm_cap,
            record.ffm_cap,
            ROUND((random() * 0.1)::numeric, 4),
            ROUND((30 + (random() * 70))::numeric, 2),
            ROUND((5 + (random() * 15))::numeric, 2),
            ROUND((1 + (random() * 100))::numeric, 2)
        );
    END LOOP;
END $$;
