import { configureStore } from '@reduxjs/toolkit';
import userSlice from "./features/user/userSlice";
import jobSlice from './features/job/jobSlice';

/**Jobster app - version 6 - store js - Features:
 * 
 *   --> Builting the 'store' 
 * 
 *   --> Adding 'jobSlice' to the store.
 * 
 * Note: the store will reduce all state slices. 
 */

export const store = configureStore({
    reducer:{
        user: userSlice,
        job:jobSlice
    }
})