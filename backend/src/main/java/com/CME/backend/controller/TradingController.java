package com.CME.backend.controller;

import com.CME.backend.model.*;
import com.CME.backend.service.TradingService;
import com.CME.backend.util.PerformanceMetrics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin
public class TradingController {

    @Autowired
    private TradingService tradingService;

    private PerformanceMetrics performanceMetrics = new PerformanceMetrics();

    // Endpoint to fetch all stock data
    @GetMapping("/stocks")
    public List<StockData> getAllStockData(@RequestParam(defaultValue = "postgres") String dbsource) {
        performanceMetrics.start();
        List<StockData> stockData = tradingService.getAllStockData(dbsource);
        performanceMetrics.incrementQueryCount(); // Increment for this query
        performanceMetrics.end();
        logPerformanceMetrics();
        return stockData;
    }

    // Endpoint to fetch stock data by symbol
    @GetMapping("/stocks/{symbol}")
    public StockData getStockData(@PathVariable String symbol,
                                  @RequestParam(defaultValue = "postgres") String dbsource) {
        performanceMetrics.start();
        StockData stockData = tradingService.getStockDataBySymbol(symbol, dbsource);
        performanceMetrics.incrementQueryCount(); // Increment for this query
        performanceMetrics.end();
        logPerformanceMetrics();
        return stockData;
    }

    // Endpoint to fetch trade information by symbol
    @GetMapping("/trades/{symbol}")
    public List<TradeInfo> getTradeInfo(@PathVariable String symbol,
                                        @RequestParam(defaultValue = "postgres") String dbsource) {
        performanceMetrics.start();
        List<TradeInfo> tradeInfo = tradingService.getTradeInfoBySymbol(symbol, dbsource);
        performanceMetrics.incrementQueryCount(); // Increment for this query
        performanceMetrics.end();
        logPerformanceMetrics();
        return tradeInfo;
    }

    // Endpoint to fetch company information by symbol
    @GetMapping("/companies/{symbol}")
    public List<Company> getCompanyInfo(@PathVariable String symbol,
                                        @RequestParam(defaultValue = "postgres") String dbsource) {
        performanceMetrics.start();
        List<Company> companyInfo = tradingService.getCompanyInfo(symbol, dbsource);
        performanceMetrics.incrementQueryCount(); // Increment for this query
        performanceMetrics.end();
        logPerformanceMetrics();
        return companyInfo;
    }

    // Endpoint to fetch price information by symbol
    @GetMapping("/price/{symbol}")
    public ResponseEntity<PriceInfo> getPriceInfo(@PathVariable String symbol,
                                                  @RequestParam(defaultValue = "postgres") String dbsource) {
        performanceMetrics.start();
        PriceInfo priceInfo = tradingService.getPriceInfoBySymbol(symbol, dbsource);
        performanceMetrics.incrementQueryCount(); // Increment for this query
        performanceMetrics.end();
        logPerformanceMetrics();
        return priceInfo != null ? ResponseEntity.ok(priceInfo) : ResponseEntity.ok().build();
    }

    // Method to log performance metrics
    private void logPerformanceMetrics() {
        System.out.println("Read Speed: " + performanceMetrics.getReadSpeed() + " ms");
        System.out.println("Queries Per Second: " + performanceMetrics.getQueriesPerSecond());
        System.out.println("Throughput: " + performanceMetrics.getThroughput());
        performanceMetrics.resetMetrics();
    }
}
