import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice';
import { logoutUser } from '../user/userSlice';

/**Jobster app - version 8 - jobSlice js - Features:
 * 
 *    --> Building 'deleteJob' action and exporting it.
 * 
 *    --> Building 'editJob' action and exporting it.  
 * 
 *    --> Building 'extraReducers' for 'deleteJob'.
 * 
 *    --> Building 'extraReducers' for 'editJob'.   
 * 
 * Note: By this version i have been set all the functionality
 * related with deleitng and editing a job.
 * 
 */

/**here i build the initial state */
const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
};

/**here i build the create job action */
export const createJob = createAsyncThunk('job/createJob', async(job, thunkAPI) => {
    try {
        const resp = await customFetch.post('/jobs', job, {
            headers: {
                authorization:`Bearer ${thunkAPI.getState().user.user.token}`
            }
        })
        thunkAPI.dispatch(clearValues())
        return resp.data
    } catch (error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser())
            return thunkAPI.rejectWithValue('Unauthorized access, you\'ve redirect to login')
        }  
        return thunkAPI.rejectWithValue(error.response.data.msg);      
    }
})

/**here i build the delete job action */
export const deleteJob = createAsyncThunk('job/deleteJob', async(jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading())
    /**testing that i get the id onClicking 'delete' button*/
    //console.log(jobId)
    try {
        const resp = await customFetch.delete(`/jobs/${jobId}`, {
            headers: {
                authorization:`Bearer ${thunkAPI.getState().user.user.token}`
            }
        })
        thunkAPI.dispatch(getAllJobs())
        return resp.data.msg
    } catch (error) {
        thunkAPI.dispatch(hideLoading())
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})

/**here i build the 'editJob' action*/
export const editJob = createAsyncThunk('job/editJob', async({jobId, job}, thunkAPI) => {
    try {
        const resp = await customFetch.patch(`/jobs/${jobId}`, job, {
            headers: {
                authorization:`Bearer ${thunkAPI.getState().user.user.token}`
            }
        })
        thunkAPI.dispatch(clearValues())
        return resp.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}
)

/**here i build the jobSlice */
const jobSlice = createSlice({
    name:'job',
    initialState,
    reducers: {
        handleChange: (state, { payload:{name, value}}) => {
            state[name] = value
        },
        clearValues: () => {
            return {...initialState, jobLocation: getUserFromLocalStorage()?.location || ''}
        },
        setEditJob: (state, {payload}) => {
            return {...state, isEditing: true, ...payload }
        }
    },
    extraReducers:{
        [createJob.pending] : (state) => {
            state.isLoading = true;
        },
        [createJob.fulfilled] : (state) => {
            state.isLoading = false;
            toast.success('Job Created')
        },
        [createJob.rejected] : (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload)
        },
        /**extraReducers for delete job*/
        [deleteJob.fulfilled] : (state, { payload }) => {
            toast.success(payload)
        },
        [deleteJob.rejected] : (state, { payload }) => {
            toast.error(payload)
        },
        /**extraReducers for editJob*/
        [editJob.pending] : (state) => {
            state.isLoading = true;
        },
        [editJob.fulfilled] : (state) => {
            state.isLoading = false;
            toast.success('Job Modified...')
        },
        [editJob.rejected] : (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload)
        },
    }
});

/**here i export actions and state */
export const { handleChange, clearValues, setEditJob } = jobSlice.actions;

export default jobSlice.reducer;