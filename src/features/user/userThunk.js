import customFetch from "../../utils/axios";
import { logoutUser } from "./userSlice";
import { clearJobsState } from '../allJobs/allJobsSlice'
import { clearValues } from "../job/jobSlice";

/**Jobster app - version 12 - userThunk js - Features:
 * 
 *    --> Building the 'clearStoreThunk'
 * 
 * Note: the 'clearStoreThunk' is set here because the 
 * behavior of preserving the values in the inputs forms
 * is related with the user
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

/**here i create 'clearStorethunk' */
export const clearStoreThunk = async(message, thunkAPI) => {
    try {
        /**this request once the user logs out will
         * perform 'clearJobState' and 'clearValues'
         * -will return initialState for 'Job' and 
         * 'allJobsSlice'- 
        */
        thunkAPI.dispatch(logoutUser(message))
        thunkAPI.dispatch(clearJobsState())
        thunkAPI.dispatch(clearValues())
        /**i just return the promise - because the
         * main goal is get initialState- */
        return Promise.resolve()
    } catch (error) {
        /**i just return the promise - because the
         * main goal is get initialState- */
        return Promise.reject()
    }
}