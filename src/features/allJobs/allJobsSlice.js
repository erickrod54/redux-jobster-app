import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import authHeader from '../../utils/AuthHeader';
import customFetch from '../../utils/axios';

/**Jobster app - version 10 - 'jobSlice' js - 
 * Features:
 * 
 *    --> Building 'changePage' action and exporting
 *        it.
 * 
 *    --> Building the 'Query String Params' for the 
 *        'url'
 * 
 *    --> Fixing 'handleChange' bug that preserves
 *        the old 'page' state after the search.
 *  
 * Note: this request is the las request for
 * this file
 * 
 * Once 'getAllJobs' get fulfilled, i'll focus on these
 * two props 'totalJobs', and 'numOfPages' (they were created 
 * at initialState)
 * 
 * the params use to build the 'url' dynamic are 
 * 'initialFiltersState'
 * 
 * Fixing 'handleChange' (to troubleshoot and see this
 * error - Chrome > Network tab, and comment handleChange
 * 'state.page = 1' )
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

  const { page, search, searchStatus, searchType, sort } = thunkAPI.getState().allJobs
  
  /**part of this configuration is server made to set
   * the keys for example 'jobs?status',' &jobType=' 
   * and so on..*/

  /**now all the 'keys' are state and make the url 
   * dynamic */
  let url = 
  `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`

  /**only if search exist i append it to url */
  if (search) {
    url = url + `&search=${search}`
  }
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
        /**this will fix the bug 'query search > page preserve
         * to old state' - so every time that changes will set
         * as '1 '*/
        state.page = 1 
        state[name] = value
      },
      clearFilters:(state) => {
        return {...state, ...initialFiltersState}
      },
      changePage: (state, { payload }) => {
        state.page = payload
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

export const { showLoading, hideLoading, handleChange, clearFilters, changePage } = allJobsSlice.actions;

export default allJobsSlice.reducer;