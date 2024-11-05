package com.CME.backend.util;

public class PerformanceMetrics {
    private long startTime;
    private long endTime;
    private int queryCount; // Counter for the number of queries

    public void start() {
        this.startTime = System.currentTimeMillis();
        queryCount = 0; // Reset count on start
    }

    public void end() {
        this.endTime = System.currentTimeMillis();
    }

    public long getReadSpeed() {
        return endTime - startTime; // Time taken in milliseconds
    }

    public double getQueriesPerSecond() {
        long elapsedTimeInSeconds = (endTime - startTime) / 1000;
        return (elapsedTimeInSeconds > 0) ? (double) queryCount / elapsedTimeInSeconds : queryCount; // Count all queries if elapsed time is 0
    }

    public void incrementQueryCount() {
        queryCount++; // Increment query count
    }

    public void resetMetrics() {
        queryCount = 0;
    }

    public int getThroughput() {
        // Example throughput calculation (number of queries over a time period, could implement more)
        return queryCount;
    }
}
