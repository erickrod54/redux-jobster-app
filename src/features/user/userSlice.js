import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { addUserToLocalStorage,
         getUserFromLocalStorage,
         removeUserFromLocalStorage } from "../../utils/localStorage";
import { registerUserThunk,
         loginUserThunk,
         updateUserThunk,
         clearStoreThunk   
        } from "./userThunk";

/**Jobster app - version 12 - userSlice js - Features:
 * 
 *    --> Building 'clearStore' action and exporting it.
 * 
 *    --> Impporting and placing 'clearStoreThunk' in the
 *        'clearStore' action 
 * 
 * Note: This action is going to be use by NavBar Component
 * instead of just 'logout' as it is in previous versions
 * 
 */

const initialState = { 
    isLoading: false,
    isSidebarOpen:false,
    user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
    'user/registerUser', async(user,thunkAPI) => {
     return registerUserThunk('/auth/register', user, thunkAPI)   
})

export const loginUser = createAsyncThunk(
    'user/loginUser', async(user,thunkAPI) => {
    return loginUserThunk('/auth/login', user, thunkAPI)
})

export const updateUser = createAsyncThunk(
    'user/updateUser', async(user, thunkAPI) => {
     return updateUserThunk('/auth/updateUser', user, thunkAPI)
    }
)

export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunk)

const userSlice = createSlice({
    name: 'user',
    initialState,
    /**here i build the actions - */
    reducers:{
        toggleSidebar:(state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        logoutUser: (state, { payload }) => {
            state.user = null
            state.isSidebarOpen = false
            removeUserFromLocalStorage()
            if (payload) {
                toast.success(payload)
            }
        },
    },
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
        /**here i have the extraReducers to
         * update the value*/
         [updateUser.pending]:(state) =>{
            state.isLoading = true;
        },
        /**i destructure the payload that will be the user */
        [updateUser.fulfilled]:(state, { payload }) =>{
            const { user } = payload;
            state.isLoading = false;
            state.user = user;
             /**here i add the user to local storage */
             addUserToLocalStorage(user);
            /**i set the toast with the user name */
            toast.success(`User updated !!`)
        },
        /**i set the axios error message from toast*/
        [updateUser.rejected]:(state, { payload }) =>{
            state.isLoading = false;
            toast.error(payload)
        },
        [clearStore.rejected]: () => {
            toast.error('There was an error ..')
        }
    }
})


export const { toggleSidebar, logoutUser } = userSlice.actions;

/**here i export the reducer */
export default userSlice.reducer;