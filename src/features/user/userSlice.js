import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

/**Jobster app - version 4 - userSlice js - Features:
 * 
 *    --> Building 'registerUser' action to
 *        register users.
 * 
 *    --> Building 'loginUser' action to
 *        login users.        
 * 
 * Note: the 'registerUser' and 'loginUser' actions 
 * they use 'createAsyncThunk' in order to use later
 * thunkAPI itself will give me powerful options as 
 * (these actions are over all 'reducers' object i 
 * can get states features and implemented right 
 * away):
 *   
 *  --> dispatch(), getState(), rejectWithValue()
 *      requestId(), signal
 */

const initialState = { 
    isLoading: false,
    user:null,
};

export const registerUser = createAsyncThunk(
    'user/registerUser', async(user,thunkAPI) =>
{
    /**here i stringify to verify entry values
     * in the console (also can be done by redux
     * console)*/
    console.log(`Register user : ${JSON.stringify(user)}`)
})

export const loginUser = createAsyncThunk(
    'login/loginUser', async(user,thunkAPI) =>
{
    console.log(`Login user : ${JSON.stringify(user)}`)
})

const userSlice = createSlice({
    name: 'user',
    initialState
})

/**here i export the reducer */
export default userSlice.reducer;