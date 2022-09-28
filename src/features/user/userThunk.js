import customFetch from "../../utils/axios";
import { logoutUser } from "./userSlice";

/**Jobster app - version 6 - userThunk js - Features:
 * 
 *    --> Building 'userThunk' to simplify the api
 *        request to a function call
 * 
 * Note: These function will handle more efficientlly the
 * lines of code of 'userSlice'.
 */

export const registerUserThunk = async(url, user, thunkAPI) => {
    try {
        const resp = await customFetch.post(url , user )
        console.log('this is the axios response when i send the user data ==>', resp)
        return resp.data
    } catch (error) {

       return thunkAPI.rejectWithValue(error.response.data.msg);
        
    }
}

export const loginUserThunk = async(url, user, thunkAPI) => {
    try {
        const resp = await customFetch.post( url, user, thunkAPI )
        console.log('this is the axios response when i send the login user data ==>', resp)
        return resp.data
    } catch (error) {
       return thunkAPI.rejectWithValue(error.response.data.msg);
        
    }
}

export const updateUserThunk = async(url, user, thunkAPI) => { 
    try {
        const resp = await customFetch.patch(url, user, {
            headers:{
                authorization:`Bearer ${thunkAPI.getState().user.user.token}`
            }
        } )
        console.log('this is the axios response when i updateUser user data ==>', resp)
        return resp.data
    } catch (error) {
        /**this error code 401 - indicates unauthorized access
         * so, will these code will log out the user*/
        if (error.response.status === 401 ) {
            thunkAPI.dispatch(logoutUser())
            return thunkAPI.rejectWithValue('Unauthorized access, you\'ve redirect to login')
        }
       return thunkAPI.rejectWithValue(error.response.data.msg);
        
    }
}