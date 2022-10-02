import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { getUserFromLocalStorage } from '../../utils/localStorage';

import { createJobThunk, deleteJobThunk, editJobThunk } from './jobThunk';

/**Jobster app - version 9 - jobSlice js - Features:
 * 
 *    --> Refactoring 'JobSlice'.
 * 
 *    --> Implementing 'createJobThunk', 'deleteJobThunk',
 *        and 'editJobThunk' callBack functions on the
 *        actions.
 * 
 * Note: By this version i have been set callfunctions 
 * in the action with the name of 'Thunk'.
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
export const createJob = createAsyncThunk('job/createJob',
 createJobThunk)

/**here i build the delete job action */
export const deleteJob = createAsyncThunk('job/deleteJob',
 deleteJobThunk)

/**here i build the 'editJob' action*/
export const editJob = createAsyncThunk('job/editJob',
 editJobThunk)

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