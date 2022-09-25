import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import customFetch from "../../utils/axios";
import { addUserToLocalStorage, getUserFromLocalStorage } from "../../utils/localStorage";


/**Jobster app - version 5 - userSlice js - Features:
 * 
 *    --> Importing and placing customFetch hook to
 *        build the API request for login and register         
 * 
 *    --> Setting up the 'extraReducers' to handle
 *        the notifications for register and login
 *        (the responses are server made - node js)
 * 
 *    --> Importing and placing 'getUserFromLocalStorage'
 *        as user prop in 'initialState'.
 * 
 *    --> Implementing 'addUserToLocalStorage' to add 
 *        the 'user' to the 'localStorage'
 * 
 * Note: this '/auth/testingRegister' url is already
 * set in the server ( made with node js)
 * 
 * Reference to HTTP methods ==> 'https://course-api.com/slides/'
 * > HTTP methods
 * 
 *  by this version i implement 'post', but 'get' and 'pos't use the
 * same end-point but i have to make sure to use the right method
 */

const initialState = { 
    isLoading: false,
    /**the 'getUserFromLocalStorage' must be invoked*/
    user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
    'user/registerUser', async(user,thunkAPI) =>
{
    /**here i set the try-cath to make the API request */
    try {
        /**the server needs end-point 'url' and 'user' with post method*/
        
        /**i switch the 'testingRegister' to 'register' and 
         * effectivelly register the user*/
        const resp = await customFetch.post('/auth/register', user )
        console.log('this is the axios response when i send the user data ==>', resp)
        return resp.data
    } catch (error) {
        /**using 'thunkAPI' to handle the error response from 
         * axios */
       return thunkAPI.rejectWithValue(error.response.data.msg);
        
    }
})

/**the logic for login user will be exactlly the same
 * that register */
export const loginUser = createAsyncThunk(
    'user/loginUser', async(user,thunkAPI) =>
{
    /**here i set the try-cath to make the API request */
    try {
        /**the server needs end-point 'url' and 'user' with post method*/
        const resp = await customFetch.post('/auth/login', user )
        console.log('this is the axios response when i send the login user data ==>', resp)
        return resp.data
    } catch (error) {
        /**using 'thunkAPI' to handle the error response from 
         * axios */
       return thunkAPI.rejectWithValue(error.response.data.msg);
        
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    /**extraReducers will be 'pending', fulfilled, and 
     * rejected */
    extraReducers:{
        [registerUser.pending]:(state) =>{
            state.isLoading = true;
        },
        /**i destructure the payload that will be the user */
        [registerUser.fulfilled]:(state, { payload }) =>{
            const { user } = payload;
            state.isLoading = false;
            state.user = user;
            /**here i add the user to local storage */
            addUserToLocalStorage(user);
            /**i set the toast with the user name */
            toast.success(`Hello There ${user.name}`)
        },
        /**i set the axios error message from toast*/
        [registerUser.rejected]:(state, { payload }) =>{
            state.isLoading = false;
            toast.error(payload)
        },

        /**the extraReducer also exactlly the same as
         * the register, only changes the toast 
         * message */
        [loginUser.pending]:(state) =>{
            state.isLoading = true;
        },
        /**i destructure the payload that will be the user */
        [loginUser.fulfilled]:(state, { payload }) =>{
            const { user } = payload;
            state.isLoading = false;
            state.user = user;
             /**here i add the user to local storage */
             addUserToLocalStorage(user);
            /**i set the toast with the user name */
            toast.success(`Welcome Back ${user.name} !!`)
        },
        /**i set the axios error message from toast*/
        [loginUser.rejected]:(state, { payload }) =>{
            state.isLoading = false;
            toast.error(payload)
        },
    }
})

/**here i export the reducer */
export default userSlice.reducer;