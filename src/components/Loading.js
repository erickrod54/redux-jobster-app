import React from "react";

/**Jobster app - version 6 - Loding js - Features:
 * 
 *    --> Building 'Loding' Component 
 * 
 * Note: this component will display a spinner to implement
 * for every component that needs time to fetch info
 */

const Loading = ({ center }) => {

    return(
        <div className={center ? "loading loading-center" : 'loading'}/>
    )
}

export default Loading