package com.CME.tradingdashboard.util;

import java.util.concurrent.atomic.AtomicInteger;

public class PerformanceMetrics {
    private long startTime;
    private long endTime;
    private int queryCount; // Counter for the number of queries

    public void start() {
        this.startTime = System.currentTimeMillis();
        queryCount++; // Increment query count when a query starts
    }

    public void end() {
        this.endTime = System.currentTimeMillis();
    }

    public long getReadSpeed() {
        return endTime - startTime; // Time taken in milliseconds
    }

    public double getQueriesPerSecond() {
        long elapsedTimeInSeconds = (endTime - startTime) / 1000;
        return elapsedTimeInSeconds > 0 ? queryCount : 0;
    }

    public void resetMetrics() {
        queryCount = 0;
    }

    public int getThroughput() {
        return 0;
    }
}
