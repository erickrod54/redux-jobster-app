import React from "react";
import { JobsContainer, SearchContainer } from "../../components";

/**Jobster app - version 6 - AllJobs js - Features:
 * 
 *    --> Building 'AllJobs' Page 
 * 
 *    --> Importing and placing 'SearchContainer' and 
 *        'JobsContainer'.
 * 
 * Note: this component will display a spinner to implement
 * for every component that needs time to fetch info
 */

const AllJobs = () => {

    return(
        <>
            <SearchContainer />
            <JobsContainer />
        </>
    )
}

export default AllJobs;