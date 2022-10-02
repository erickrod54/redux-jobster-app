import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';

/**Jobster app - version 8 - 'jobSlice' js - 
 * Features:
 * 
 *    --> Building 'getAllJobs' feature.
 *  
 * Note: this fetaure is going to be
 * use to receive allTheJobs from 
 * 'addJob' to 'allJobs'
 * 
 * the editing will redirect to
 * 'addJobs' to edit the job 
 * there.
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
    const resp = await customFetch.get(url, {
      headers:{
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`
      }
    })
    /**here i can test that i recieve the data in the
     * front-end*/
    //console.log(resp.data)
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue('There was an error')
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
    },
    extraReducers:{
      [getAllJobs.pending]: (state) => {
        state.isLoading = true
      },
      [getAllJobs.fulfilled]: (state, {payload}) => {
        state.isLoading = false;
        state.jobs = payload.jobs
      },
      [getAllJobs.rejected]: (state, {payload}) => {
        state.isLoading = false
        toast.error(payload)
      },
    }
});

export const { showLoading, hideLoading } = allJobsSlice.actions;

export default allJobsSlice.reducer;