INSERT INTO stock_data FROM INFILE '/tmp/stock_data.csv' FORMAT CSVWithNames;
INSERT INTO trade_info FROM INFILE '/tmp/trade_info.csv' FORMAT CSVWithNames;
INSERT INTO price_info FROM INFILE  '/tmp/price_info.csv' FORMAT CSVWithNames;
