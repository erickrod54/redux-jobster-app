import { configureStore } from '@reduxjs/toolkit';
import userSlice from "./features/user/userSlice";
import jobSlice from './features/job/jobSlice';
import allJobsSlice from './features/allJobs/allJobsSlice';

/**Jobster app - version 7 - store js - Features:
 * 
 *   --> Adding 'allJobsSlice' to the store.
 * 
 * Note: the store will reduce all state slices. 
 */

export const store = configureStore({
    reducer:{
        user: userSlice,
        job:jobSlice,
        allJobs: allJobsSlice
    }
})
