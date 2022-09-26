import React from "react";
import Logo from "./Logo";
import Wrapper from "../assets/wrappers/BigSidebar";
import { useSelector } from "react-redux";
import NavLinks from "./Navlinks";

/**Jobster app - version 5 - BigSidebar Component 
 * - Features:
 * 
 *    --> Building 'BigSidebar' Component.
 * 
 *    --> Importing and placing 'NavLinks'
 *        Component to display links. 
 * 
 * Note: the 'BigSidebar' is use by this component
 * and for 'SmallSidebar'
 */

const BigSidebar = () => {

    const { isSidebarOpen } = useSelector((store) => store.user)

    return(
        <Wrapper>
            <div 
            className={ isSidebarOpen ? 
            'sidebar-container' 
            : 'sidebar-container show-sidebar'}
            >
              <div className="content">
                <header>
                    <Logo />
                </header>
                <NavLinks />
              </div>  
            </div>
        </Wrapper>
    )
}

export default BigSidebar;