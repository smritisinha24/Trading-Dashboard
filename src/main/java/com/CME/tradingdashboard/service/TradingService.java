package com.CME.tradingdashboard.service;

import com.CME.tradingdashboard.model.*;
import com.CME.tradingdashboard.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TradingService {

    @Autowired
    private StockDataRepository stockDataRepository;

    @Autowired
    private TradeInfoRepository tradeInfoRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private PriceInfoRepository priceInfoRepository;

    @Autowired
    private ClickhouseRepository clickhouseRepository;

    public List<StockData> getAllStockData(String dbsource) {
        if ("clickhouse".equalsIgnoreCase(dbsource)) {
            return clickhouseRepository.findAllStockData();
        }
        return stockDataRepository.findAll();
    }

    public StockData getStockDataBySymbol(String symbol, String dbsource) {
        if ("clickhouse".equalsIgnoreCase(dbsource)) {
            return clickhouseRepository.findStockDataBySymbol(symbol);
        }
        return stockDataRepository.findBySymbolIgnoreCase(symbol).orElse(null);
    }

    public List<TradeInfo> getTradeInfoBySymbol(String symbol, String dbsource) {
        if ("clickhouse".equalsIgnoreCase(dbsource)) {
            return clickhouseRepository.findTradeInfoBySymbol(symbol);
        }
        return tradeInfoRepository.findBySymbolIgnoreCase(symbol);
    }

    public List<Company> getCompanyInfo(String symbol, String dbsource) {
        if ("clickhouse".equalsIgnoreCase(dbsource)) {
            return clickhouseRepository.findCompanyBySymbol(symbol);
        }
        return companyRepository.findBySymbolIgnoreCase(symbol);
    }

    public PriceInfo getPriceInfoBySymbol(String symbol, String dbsource) {
        if ("clickhouse".equalsIgnoreCase(dbsource)) {
            return clickhouseRepository.findPriceInfoBySymbol(symbol);
        }
        return priceInfoRepository.findBySymbolIgnoreCase(symbol);
    }
}