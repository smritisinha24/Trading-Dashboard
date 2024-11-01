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

-- Insert data into the companies table
INSERT INTO companies (symbol, name, sector, industry) VALUES
('NTPC', 'NTPC Limited', 'Utilities', 'Electric Utilities'),
('DRREDDY', 'Dr. Reddy\'s Laboratories', 'Healthcare', 'Pharmaceuticals'),
('SUNPHARMA', 'Sun Pharmaceutical Industries Ltd.', 'Healthcare', 'Pharmaceuticals'),
('ADANIPORTS', 'Adani Ports and Special Economic Zone', 'Industrials', 'Infrastructure Operations'),
('ICICIBANK', 'ICICI Bank Limited', 'Financials', 'Banks'),
('BAJAJ-AUTO', 'Bajaj Auto Limited', 'Consumer Discretionary', 'Automobiles'),
('TATACONSUM', 'Tata Consumer Products Limited', 'Consumer Staples', 'Food Products'),
('ASIANPAINT', 'Asian Paints Limited', 'Materials', 'Chemicals'),
('COALINDIA', 'Coal India Limited', 'Materials', 'Metals & Mining'),
('JSWSTEEL', 'JSW Steel Limited', 'Materials', 'Steel'),
('BPCL', 'Bharat Petroleum Corporation Limited', 'Energy', 'Oil & Gas Refining & Marketing'),
('SBIN', 'State Bank of India', 'Financials', 'Banks'),
('GRASIM', 'Grasim Industries Limited', 'Materials', 'Cement'),
('APOLLOHOSP', 'Apollo Hospitals Enterprise Limited', 'Healthcare', 'Healthcare Providers & Services'),
('CIPLA', 'Cipla Limited', 'Healthcare', 'Pharmaceuticals'),
('BEL', 'Bharat Electronics Limited', 'Industrials', 'Aerospace & Defense'),
('AXISBANK', 'Axis Bank Limited', 'Financials', 'Banks'),
('HINDUNILVR', 'Hindustan Unilever Limited', 'Consumer Staples', 'Household Products'),
('INDUSINDBK', 'IndusInd Bank Limited', 'Financials', 'Banks'),
('TECHM', 'Tech Mahindra Limited', 'Information Technology', 'IT Services'),
('NESTLEIND', 'Nestle India Limited', 'Consumer Staples', 'Packaged Foods'),
('TATASTEEL', 'Tata Steel Limited', 'Materials', 'Steel'),
('WIPRO', 'Wipro Limited', 'Information Technology', 'IT Services'),
('TATAMOTORS', 'Tata Motors Limited', 'Consumer Discretionary', 'Automobiles'),
('ITC', 'ITC Limited', 'Consumer Staples', 'Tobacco'),
('ADANIENT', 'Adani Enterprises Limited', 'Industrials', 'Conglomerates'),
('BRITANNIA', 'Britannia Industries Limited', 'Consumer Staples', 'Packaged Foods'),
('TCS', 'Tata Consultancy Services Limited', 'Information Technology', 'IT Services'),
('INFY', 'Infosys Limited', 'Information Technology', 'IT Services'),
('TITAN', 'Titan Company Limited', 'Consumer Discretionary', 'Jewelry'),
('TRENT', 'Trent Limited', 'Consumer Discretionary', 'Retail'),
('SBILIFE', 'SBI Life Insurance Company Limited', 'Financials', 'Insurance'),
('HEROMOTOCO', 'Hero MotoCorp Limited', 'Consumer Discretionary', 'Automobiles'),
('HINDALCO', 'Hindalco Industries Limited', 'Materials', 'Aluminum'),
('HCLTECH', 'HCL Technologies Limited', 'Information Technology', 'IT Services'),
('ONGC', 'Oil and Natural Gas Corporation', 'Energy', 'Oil & Gas Exploration and Production'),
('BAJFINANCE', 'Bajaj Finance Limited', 'Financials', 'Consumer Finance'),
('HDFCLIFE', 'HDFC Life Insurance Company Limited', 'Financials', 'Insurance'),
('ULTRACEMCO', 'UltraTech Cement Limited', 'Materials', 'Cement'),
('MARUTI', 'Maruti Suzuki India Limited', 'Consumer Discretionary', 'Automobiles'),
('BAJAJFINSV', 'Bajaj Finserv Limited', 'Financials', 'Financial Services'),
('KOTAKBANK', 'Kotak Mahindra Bank Limited', 'Financials', 'Banks'),
('HDFCBANK', 'HDFC Bank Limited', 'Financials', 'Banks'),
('RELIANCE', 'Reliance Industries Limited', 'Energy', 'Oil & Gas Integrated'),
('SHRIRAMFIN', 'Shriram Finance Limited', 'Financials', 'Consumer Finance'),
('M&M', 'Mahindra & Mahindra Limited', 'Consumer Discretionary', 'Automobiles'),
('POWERGRID', 'Power Grid Corporation of India Limited', 'Utilities', 'Electric Utilities'),
('EICHERMOT', 'Eicher Motors Limited', 'Consumer Discretionary', 'Automobiles'),
('LT', 'Larsen & Toubro Limited', 'Industrials', 'Engineering & Construction'),
('BHARTIARTL', 'Bharti Airtel Limited', 'Communication Services', 'Telecommunications'),
('DIVISLAB', 'Divi\'s Laboratories Limited', 'Healthcare', 'Pharmaceuticals'),
('HDFCAMC', 'HDFC Asset Management Company Limited', 'Financials', 'Asset Management'),
('HAVELLS', 'Havells India Limited', 'Consumer Discretionary', 'Electrical Equipment'),
('DLF', 'DLF Limited', 'Real Estate', 'Real Estate Management & Development'),
('VEDL', 'Vedanta Limited', 'Materials', 'Metals & Mining'),
('PETRONET', 'Petronet LNG Limited', 'Energy', 'Gas Utilities'),
('MUTHOOTFIN', 'Muthoot Finance Limited', 'Financials', 'Consumer Finance'),
('TATAPOWER', 'Tata Power Company Limited', 'Utilities', 'Electric Utilities'),
('GODREJCP', 'Godrej Consumer Products Limited', 'Consumer Staples', 'Household Products'),
('TORNTPHARM', 'Torrent Pharmaceuticals Limited', 'Healthcare', 'Pharmaceuticals'),
('PIDILITIND', 'Pidilite Industries Limited', 'Materials', 'Specialty Chemicals'),
('BAJAJELEC', 'Bajaj Electricals Limited', 'Consumer Discretionary', 'Electrical Equipment'),
('DMART', 'Avenue Supermarts Limited', 'Consumer Discretionary', 'Retail'),
('BOSCHLTD', 'Bosch Limited', 'Consumer Discretionary', 'Automotive Parts'),
('NMDC', 'NMDC Limited', 'Materials', 'Metals & Mining'),
('BIOCON', 'Biocon Limited', 'Healthcare', 'Biotechnology'),
('CONCOR', 'Container Corporation of India Limited', 'Industrials', 'Transportation Infrastructure'),
('BALKRISIND', 'Balkrishna Industries Limited', 'Consumer Discretionary', 'Automobiles'),
('ABB', 'ABB India Limited', 'Industrials', 'Electrical Equipment');

