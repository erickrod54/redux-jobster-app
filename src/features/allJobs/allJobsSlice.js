import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';

/**Jobster app - version 6 - 'jobSlice' js - Features:
 * 
 *    --> Building 'initialFiltersState'
 * 
 *    --> Building 'initialState'
 * 
 *    --> Building 'allJobsSlice' and exporting it 
 * 
 * Note: this is the initial setup for 'allJobSlice'
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
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

const allJobsSlice = createSlice({
    name: 'allJobs',
    initialState,
});

export default allJobsSlice.reducer;