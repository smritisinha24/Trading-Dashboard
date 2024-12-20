package com.CME.backend.util;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

public class PerformanceMetrics {
    private long startTime;
    private long endTime;
    private int queryCount;
    private long totalBytesProcessed;

    // for storing row-level metrics
    private List<Long> rowProcessingTimes = new ArrayList<>();
    private List<Long> rowDataSizes = new ArrayList<>();

    public void startSession() {
        this.startTime = System.nanoTime();
        this.queryCount = 0;
        this.totalBytesProcessed = 0;
        this.rowProcessingTimes.clear();
        this.rowDataSizes.clear();
    }

    public void endQuery(long dataSizeInBytes) {
        this.endTime = System.nanoTime();
        this.queryCount++;
        this.totalBytesProcessed += (dataSizeInBytes > 0) ? dataSizeInBytes : 1;
    }

    public BigDecimal getElapsedTimeSeconds() {
        long elapsedTimeInNanoSeconds = endTime - startTime;
        return BigDecimal.valueOf(elapsedTimeInNanoSeconds)
                .divide(BigDecimal.valueOf(1_000_000_000), 9, RoundingMode.HALF_UP);
    }

    public BigDecimal getThroughput() {
        BigDecimal elapsedTimeInSeconds = getElapsedTimeSeconds();
        if (totalBytesProcessed == 0) {
            return BigDecimal.ZERO;
        }
        BigDecimal throughput = BigDecimal.valueOf(totalBytesProcessed)
                .divide(elapsedTimeInSeconds, 9, RoundingMode.HALF_UP);

        if (throughput.compareTo(BigDecimal.valueOf(0.0001)) < 0) {
            throughput = BigDecimal.ZERO;
        }
        return throughput;
    }

    public long getTotalBytesProcessed() {
        return totalBytesProcessed;
    }

    public void resetMetrics() {
        this.startTime = 0;
        this.endTime = 0;
        this.queryCount = 0;
        this.totalBytesProcessed = 0;
        this.rowProcessingTimes.clear();
        this.rowDataSizes.clear();
    }
}
