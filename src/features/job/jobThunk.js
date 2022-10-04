import authHeader from '../../utils/AuthHeader';
import customFetch from '../../utils/axios';
import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice';
import { logoutUser } from '../user/userSlice';
import { clearValues } from './jobSlice';

/**Jobster app - version 9 - StatsContainer - Features:
 * 
 *    --> Building and exporting 'createJobThunk',    
 *        'deleteJobThunk' and 'editJobThunk' callbacks
 *         functions
 *   
 * Note: the 'createJobThunk', 'deleteJobThunk' and 'editJobThunk' 
 * callbacks functions are built in order to simplify the jobSlice
 * code.
 */

export const createJobThunk = async(job, thunkAPI) => {
    try {
        const resp = await customFetch.post('/jobs', job, authHeader(thunkAPI))
        thunkAPI.dispatch(clearValues())
        return resp.data
    } catch (error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser())
            return thunkAPI.rejectWithValue('Unauthorized access, you\'ve redirect to login')
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
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}

export const editJobThunk = async({jobId, job}, thunkAPI) => {
    try {
        const resp = await customFetch.patch(`/jobs/${jobId}`, job, authHeader(thunkAPI))
        thunkAPI.dispatch(clearValues())
        return resp.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}