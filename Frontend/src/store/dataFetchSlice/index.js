import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    dataList: []
}

export const fetchDataFromPostgreSQL = createAsyncThunk('/data/fetchDataFromPostgreSQL',
     
    async (_, { rejectWithValue }) => {
      try {
        const result = await axios.get('http://localhost:8080/stocks');
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

export const fetchDataFromClickHouse = createAsyncThunk('/data/fetchDataFromClickHouse',
         
    async (_, { rejectWithValue }) => {
        try {
            const result = await axios.get('http://localhost:8080/stocks?dbsource=clickhouse');
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

const dataFetchSlice = createSlice({
    name: 'fetchData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchDataFromPostgreSQL.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchDataFromPostgreSQL.fulfilled, (state, action) => {
            state.isLoading = false
            state.dataList = action.payload.data
        })
        .addCase(fetchDataFromPostgreSQL.rejected, (state) => {
            state.isLoading = false
            state.dataList = []
        })
        .addCase(fetchDataFromClickHouse.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchDataFromClickHouse.fulfilled, (state, action) => {
            state.isLoading = false
            state.dataList = action.payload.data
        })
        .addCase(fetchDataFromClickHouse.rejected, (state) => {
            state.isLoading = false
            state.dataList = []
        })
    }
})

export default dataFetchSlice.reducer;