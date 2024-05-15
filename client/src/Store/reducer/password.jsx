import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    isRejected: false,
    passwordData: null
}


const api_url = process.env.API_URL;

export const updatepassword = createAsyncThunk('password/updatepassword', async (passwordData, thunkAPI) => {
    try {
        const token = localStorage.getItem('accessToken') ?? null;
        const response = await axios.post(`${api_url}/dashboard/password`, passwordData, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
})

const passwordSlice = createSlice({
    name: 'password',
    initialState,
    extraReducers: builder => {
        builder
        
        .addCase(updatepassword.pending, (state) => {
            state.isLoading = true
        })

        .addCase(updatepassword.fulfilled, (state, action) => {
            state.isLoading = false,
            state.passwordData = action.payload
        })

        .addCase(updatepassword.rejected, (state) => {
            state.isRejected = true;
            state.isLoading = false
            state.passwordData = null
        })
    }
})

export default passwordSlice.reducer;