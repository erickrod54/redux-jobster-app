import React from "react";

import { BigSidebar, SmallSidebar, Navbar } from "../../components";

import Wrapper from "../../assets/wrappers/SharedLayout";
import { Outlet } from 'react-router-dom';

/**Jobster app - version 5 - Pages > SharedLayout - Features:
 * 
 *    --> Building 'SharedLayout' Component
 * 
 *    --> Importing and placing 'Wrapper' to style it,
 *        'BigSidebar', 'SmallSidebar', 'Navbar', and 
 *        'Outlet' Components.
 * 
 * Note: this is the two column layout Component
 * 
 */

const SharedLayout = () => {

    return(
        <Wrapper>
            <main className="dashboard">
                <SmallSidebar />
                <BigSidebar />
                <div>
                    <Navbar />
                    <div className="dashboard-page">
                        <Outlet />
                    </div>
                </div>
            </main>
        </Wrapper>
    )
}

export default SharedLayout;