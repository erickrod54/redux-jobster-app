import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { logoutUser } from '../user/userSlice';

/**Jobster app - version 6 - jobSlice js - Features:
 * 
 *    --> Building 'initialState'.
 * 
 *    --> Building 'createJob' action to add a job.
 * 
 *    --> Building the 'jobSlice'
 * 
 *    --> exporting actions and state.
 * 
 * Note: These function will handle more efficientlly the
 * lines of code of 'userSlice'.
 * 
 *  jobSlice -
 *           --> name
 *           --> initialState
 *           --> reducers
 *           --> extraReducers
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
        [createJob.pending] : (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload)
        },
    }
});

/**here i export actions and state */
export const { clearValues } = jobSlice.actions;

export const { handleChange } = jobSlice.actions;

export default jobSlice.reducer;