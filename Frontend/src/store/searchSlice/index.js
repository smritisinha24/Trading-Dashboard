import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isLoading: false,
    searchStockData: null,
    searchTradeInfo: null,
    searchPriceInfo: null,
    searchCombined: null
}

// For PostgreSQL

export const searchStockDataPostgreSql = createAsyncThunk('/search/searchStockDataPostgreSql', 
    async (symbol, { rejectWithValue }) => {
      try {
        const result = await axios.get(`http://localhost:8080/stocks/${symbol}`);
        return result?.data
      } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue({ message: 'Something went wrong!' });
        }
      }
    }
)

export const searchTradeInfoPostgreSql = createAsyncThunk('/search/searchTradeInfoPostgreSql', 
    async (symbol, { rejectWithValue }) => {
      try {
        const result = await axios.get(`http://localhost:8080/trades/${symbol}`);
        return result?.data
      } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue({ message: 'Something went wrong!' });
        }
      }
    }
)

export const searchPriceInfoPostgreSql = createAsyncThunk('/search/searchPriceInfoPostgreSql', 
    async (symbol, { rejectWithValue }) => {
      try {
        const result = await axios.get(`http://localhost:8080/prices/${symbol}`);
        return result?.data
      } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue({ message: 'Something went wrong!' });
        }
      }
    }
)

export const searchCombinedPostgreSql = createAsyncThunk('/search/searchCombinedPostgreSql', 
    async (symbol, { rejectWithValue }) => {
      try {
        const result = await axios.get(`http://localhost:8080/combined/${symbol}`);
        return result?.data
      } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue({ message: 'Something went wrong!' });
        }
      }
    }
)

// For ClickHouse

export const searchStockDataClickHouse = createAsyncThunk('/search/searchStockDataClickHouse', 
    async (symbol, { rejectWithValue }) => {
      try {
        const result = await axios.get(`http://localhost:8080/stocks/${symbol}?dbsource=clickhouse`);
        return result?.data
      } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue({ message: 'Something went wrong!' });
        }
      }
    }
)

export const searchTradeInfoClickHouse = createAsyncThunk('/search/searchTradeInfoClickHouse', 
    async (symbol, { rejectWithValue }) => {
      try {
        const result = await axios.get(`http://localhost:8080/trades/${symbol}?dbsource=clickhouse`);
        return result?.data
      } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue({ message: 'Something went wrong!' });
        }
      }
    }
)

export const searchPriceInfoClickHouse = createAsyncThunk('/search/searchPriceInfoClickHouse', 
    async (symbol, { rejectWithValue }) => {
      try {
        const result = await axios.get(`http://localhost:8080/prices/${symbol}?dbsource=clickhouse`);
        return result?.data
      } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue({ message: 'Something went wrong!' });
        }
      }
    }
)

export const searchCombinedClickHouse = createAsyncThunk('/search/searchCombinedClickHouse', 
    async (symbol, { rejectWithValue }) => {
      try {
        const result = await axios.get(`http://localhost:8080/combined/${symbol}?dbsource=clickhouse`);
        return result?.data
      } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue({ message: 'Something went wrong!' });
        }
      }
    }
)

const searchSlice = createSlice({
    name: 'searchBySymbol',
    initialState,
    reducers: {
        resetSearchResults: (state) => {
            state.searchStockData = null;
            state.searchTradeInfo = null;
            state.searchPriceInfo = null;
            state.searchCombined = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(searchStockDataPostgreSql.pending, (state) => {
            state.isLoading = true
        })
        .addCase(searchStockDataPostgreSql.fulfilled, (state, action) => {
            state.isLoading = false
            state.searchStockData = action.payload.data
        })
        .addCase(searchStockDataPostgreSql.rejected, (state) => {
            state.isLoading = false
            state.searchStockData = null
        })
        .addCase(searchTradeInfoPostgreSql.pending, (state) => {
            state.isLoading = true
        })
        .addCase(searchTradeInfoPostgreSql.fulfilled, (state, action) => {
            state.isLoading = false
            state.searchTradeInfo = action.payload.data
        })
        .addCase(searchTradeInfoPostgreSql.rejected, (state) => {
            state.isLoading = false
            state.searchTradeInfo = null
        })
        .addCase(searchPriceInfoPostgreSql.pending, (state) => {
            state.isLoading = true
        })
        .addCase(searchPriceInfoPostgreSql.fulfilled, (state, action) => {
            state.isLoading = false
            state.searchPriceInfo = action.payload.data
        })
        .addCase(searchPriceInfoPostgreSql.rejected, (state) => {
            state.isLoading = false
            state.searchPriceInfo = null
        })
        .addCase(searchCombinedPostgreSql.pending, (state) => {
            state.isLoading = true
        })
        .addCase(searchCombinedPostgreSql.fulfilled, (state, action) => {
            state.isLoading = false
            state.searchCombined = action.payload.data
        })
        .addCase(searchCombinedPostgreSql.rejected, (state) => {
            state.isLoading = false
            state.searchCombined = null
        })

        .addCase(searchStockDataClickHouse.pending, (state) => {
            state.isLoading = true
        })
        .addCase(searchStockDataClickHouse.fulfilled, (state, action) => {
            state.isLoading = false
            state.searchStockData = action.payload.data
        })
        .addCase(searchStockDataClickHouse.rejected, (state) => {
            state.isLoading = false
            state.searchStockData = null
        })
        .addCase(searchTradeInfoClickHouse.pending, (state) => {
            state.isLoading = true
        })
        .addCase(searchTradeInfoClickHouse.fulfilled, (state, action) => {
            state.isLoading = false
            state.searchTradeInfo = action.payload.data
        })
        .addCase(searchTradeInfoClickHouse.rejected, (state) => {
            state.isLoading = false
            state.searchTradeInfo = null
        })
        .addCase(searchPriceInfoClickHouse.pending, (state) => {
            state.isLoading = true
        })
        .addCase(searchPriceInfoClickHouse.fulfilled, (state, action) => {
            state.isLoading = false
            state.searchPriceInfo = action.payload.data
        })
        .addCase(searchPriceInfoClickHouse.rejected, (state) => {
            state.isLoading = false
            state.searchPriceInfo = null
        })
        .addCase(searchCombinedClickHouse.pending, (state) => {
            state.isLoading = true
        })
        .addCase(searchCombinedClickHouse.fulfilled, (state, action) => {
            state.isLoading = false
            state.searchCombined = action.payload.data
        })
        .addCase(searchCombinedClickHouse.rejected, (state) => {
            state.isLoading = false
            state.searchCombined = null
        })
    }
})

export const { resetSearchResults } = searchSlice.actions
export default searchSlice.reducer