import { configureStore } from '@reduxjs/toolkit';
import userSlice from "./features/user/userSlice";

/**Jobster app - version 5 - store js - Features:
 * 
 *   --> Builting the 'store' 
 * 
 * 
 * Note: the store will reduce all state slices. 
 */

export const store = configureStore({
    reducer:{
        user: userSlice
    }
})