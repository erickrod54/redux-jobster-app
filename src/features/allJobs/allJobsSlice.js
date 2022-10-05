import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllJobsThunk, showStatsThunk } from './allJobsThunk';

/**Jobster app - version 12 - 'jobSlice' js - 
 * Features:
 * 
 *    --> Fixing 'AllJobsState' bug by making an action 
 *        to clear the jobs state.
 *  
 * Note: The bug can be visualize it in previous versions
 * by filling out the basic form > 'all jobs' tab, and 
 * loging out switching to another account i notice that 
 * the inputs preserves the values entered by the previuos
 * account loged ( so this is not how is supposed to behave)
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

export const getAllJobs = createAsyncThunk('allJobs/getJobs', getAllJobsThunk)

export const showStats = createAsyncThunk('allJobs/showStats', showStatsThunk)

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
      },
      /**i just set it back to initialState */
      clearJobsState: (state) => initialState
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

export const { showLoading, hideLoading, handleChange, clearFilters, changePage, clearJobsState} = allJobsSlice.actions;

export default allJobsSlice.reducer;