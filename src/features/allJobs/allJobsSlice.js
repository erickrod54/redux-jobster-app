import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import authHeader from '../../utils/AuthHeader';
import customFetch from '../../utils/axios';

/**Jobster app - version 9 - 'jobSlice' js - 
 * Features:
 * 
 *    --> Building 'ShowStats' request
 * 
 *    --> Setting up the pagination once 
 *        'getAllJobs' get fulfilled
 * 
 *    --> Building 'handleChange' and 'ClearFilters' and
 *        exporting it.
 * 
 *    --> Implementing 'authHeader(thunkAPI)' util to
 *        simplify the header code
 *  
 * Note: this request is the las request for
 * this file
 * 
 * Once 'getAllJobs' get fulfilled, i'll focus on these
 * two props 'totalJobs', and 'numOfPages' (they were created 
 * at initialState)
 */


const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

/**switching the isLoading state i can try out
 * the Loading component spinner.
 */
const initialState = {
  isLoading: true,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk('allJobs/getJobs', async(_,thunkAPI) => {
  let url = `/jobs`
  try {
    const resp = await customFetch.get(url, authHeader(thunkAPI))
    /**here i can test that i recieve the data in the
     * front-end*/
    console.log('all the jobs data ==>', resp.data)
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue('There was an error')
  }
})

export const showStats = createAsyncThunk('allJobs/showStats', async(_,thunkAPI) => {
  try {
    /**here i have to pass the header > user > token to get the stats and 
    * avoid a 401 unauthorized access*/
    const resp = await customFetch.get('/jobs/stats', authHeader(thunkAPI))
    console.log('this is the ShowStats result ==>',resp.data);
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
})

const allJobsSlice = createSlice({
    name: 'allJobs',
    initialState,
    reducers:{
      showLoading:(state) => {
        state.isLoading = true;
      },
      hideLoading:(state) => {
        state.isLoading = false;
      },
      handleChange:(state, { payload: {name, value} }) => {
        /**state.page = 1 later */
        state[name] = value
      },
      clearFilters:(state) => {
        return {...state, ...initialFiltersState}
      }
    },
    extraReducers:{
      [getAllJobs.pending]: (state) => {
        state.isLoading = true
      },
      [getAllJobs.fulfilled]: (state, {payload}) => {
        state.isLoading = false;
        state.jobs = payload.jobs;
        state.numOfPages = payload.numOfPages;
        state.totalJobs = payload.totalJobs;
      },
      [getAllJobs.rejected]: (state, {payload}) => {
        state.isLoading = false
        toast.error(payload)
      },
      /**extraReducers fro showStats */
      [showStats.pending]: (state) => {
        state.isLoading = true
      },
      [showStats.fulfilled]: (state, {payload}) => {
        state.isLoading = false;
        state.stats = payload.defaultStats;
        state.monthlyApplications = payload.monthlyApplications;
      },
      [showStats.rejected]: (state, {payload}) => {
        state.isLoading = false
        toast.error(payload)
      },
    }
});

export const { showLoading, hideLoading, handleChange, clearFilters } = allJobsSlice.actions;

export default allJobsSlice.reducer;