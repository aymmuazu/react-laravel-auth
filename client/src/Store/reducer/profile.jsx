import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    profileData : null,
    isLoading : false,
    isRejected: false
}

const api_url = process.env.API_URL;

export const updateprofile = createAsyncThunk('profile/updateprofile', async (profileData,thunkAPI) => {
    const token = localStorage.getItem('accessToken');
    try {
        const response = await axios.post(`${api_url}/dashboard/profile`, profileData, {
            headers: {
                Authorization: 'Bearer' + token
            }
        });

        return response.data;

    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
})

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    extraReducers: builder => {
        builder

        .addCase(updateprofile.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateprofile.fulfilled, (state, action) => {
            state.isLoading = false,
            state.profileData = action.payload
        })
        .addCase(updateprofile.rejected, (state) => {
            state.isRejected = true
        })
    }
})

export default profileSlice.reducer;