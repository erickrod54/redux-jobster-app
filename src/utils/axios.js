import axios from "axios";
import { clearStore } from "../features/user/userSlice";

/**Jobster app - version 13 - utils > axios js - Features:
 * 
 *    -->  Building 'checkForUnauthorizedResponse' to kick
 *         out users with old tokens or bad tokens.
 * 
 * Note: The unauthorized access is designated to error code
 * '401', this code indicates users that have issues with 
 * their credentials ( the token ), and they try to access.
 * 
 * This 'check' will be applied to:
 *  
 *          --> allJobsThunk.
 *          --> JobThunk.
 *          --> userThunk.
 * 
 * this will protect the app against '401' code
 */

const customFetch = axios.create({
    baseURL:'https://jobify-prod.herokuapp.com/api/v1/toolkit'
})

/**here i build 'checkForUnauthorizedResponse' */
export const checkForUnauthorizedResponse = ( error, thunkAPI ) => {
    if (error.response.status === 401) {

        /**i use the clear store to clear the user slice and
         * procced to take him out of the system*/
        thunkAPI.dispatch(clearStore())
        return thunkAPI.rejectWithValue('Unauthorized access, you\'ve redirect to login')
    }  
    return thunkAPI.rejectWithValue(error.response.data.msg);
}

export default customFetch;

