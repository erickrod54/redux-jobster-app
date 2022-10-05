import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllJobsThunk, showStatsThunk } from './allJobsThunk';

/**Jobster app - version 11 - 'jobSlice' js - 
 * Features:
 * 
 *    --> Importing and placing 'getAllJobsThunk' request.
 *        'getAllJobs' to simplify the code.     
 * 
 *    --> Importing and placing 'showStatsThunk' request
 *        'showStats' to simplify the code.
 *  
 * Note: Placing the thunks in a separate file is part of
 * simplifying the code in this file 
 * 
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