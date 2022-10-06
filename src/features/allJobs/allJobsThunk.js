import authHeader from "../../utils/AuthHeader";
import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";


/**Jobster app - version 13 - 'jobSlice' js - 
 * Features:
 * 
 *   --> Importing and setting check 401 for 'getAllJobsThunk',
 *       and 'showStatsThunk'.
 *  
  Note: this way i will  'check 401' in every step of the
 * user flow.
 */

export const getAllJobsThunk = async(_,thunkAPI) => {

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
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }

  export const showStatsThunk = async(_,thunkAPI) => {
    try {
      /**here i have to pass the header > user > token to get the stats and 
      * avoid a 401 unauthorized access*/
      const resp = await customFetch.get('/jobs/stats', authHeader(thunkAPI))
      console.log('this is the ShowStats result ==>',resp.data);
      return resp.data
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }