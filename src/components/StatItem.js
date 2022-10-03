import React from "react";
import Wrapper from "../assets/wrappers/StatItem";

/**Jobster app - version 9 - StatItem - Features:
 * 
 *    --> Building 'StatItem'.   
 * 
 * Note: 'StatItem' will be display general information
 * about the jobs and will be dispalyed at the beggining
 * of 'Stats' page
 */

/**here i destructure the props to style the StatItem */
const StatItem = ({ count, title, icon, color, bcg }) => {

    return(
        <Wrapper color={color} bcg={bcg}>
            <header>
                <span className="count">{count}</span>
                <span className="icon">{icon}</span>
            </header>
            <h5 className="title">{title}</h5>
        </Wrapper>
    )
}

export default StatItem;