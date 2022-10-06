import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { logoutUser } from "./userSlice";
import { clearJobsState } from '../allJobs/allJobsSlice'
import { clearValues } from "../job/jobSlice";

/**Jobster app - version 13 - userThunk js - Features:
 * 
 *    --> Importing and setting 'checkForUnauthorizedResponse'
 *        for 'updateUserThunk'.
 *    
 * Note:  i am doing the check ony for 'updateUserThunk',
 * because register and user they have aready verification.
 * 
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
        return checkForUnauthorizedResponse(error, thunkAPI);
      
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