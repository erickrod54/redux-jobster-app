import authHeader from '../../utils/AuthHeader';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice';

import { clearValues } from './jobSlice';

/**Jobster app - version 13 - StatsContainer - Features:
 * 
 *    --> Importing and setting check 401 for 'createJobThunk',
 *        'deleteJobThunk', and  'editJobThunk' 
 *   
 * Note: this way i will  'check 401' in every step of the
 * user flow.
 */

export const createJobThunk = async(job, thunkAPI) => {
    try {
        const resp = await customFetch.post('/jobs', job, authHeader(thunkAPI))
        thunkAPI.dispatch(clearValues())
        return resp.data
    } catch (error) {
        if (error.response.status === 401) {
            /** */
            return checkForUnauthorizedResponse(error, thunkAPI);
        }  
        return thunkAPI.rejectWithValue(error.response.data.msg);      
    }
}

export const deleteJobThunk = async(jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading())
    /**testing that i get the id onClicking 'delete' button*/
    //console.log(jobId)
    try {
        const resp = await customFetch.delete(`/jobs/${jobId}`, authHeader(thunkAPI))
        thunkAPI.dispatch(getAllJobs())
        return resp.data.msg
    } catch (error) {
        thunkAPI.dispatch(hideLoading())
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
}

export const editJobThunk = async({jobId, job}, thunkAPI) => {
    try {
        const resp = await customFetch.patch(`/jobs/${jobId}`, job, authHeader(thunkAPI))
        thunkAPI.dispatch(clearValues())
        return resp.data
    } catch (error) {
        return checkForUnauthorizedResponse(error, thunkAPI);
    }
}