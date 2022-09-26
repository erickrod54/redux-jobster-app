import React from "react";
import { Link } from 'react-router-dom'
import img from '../assets/images/not-found.svg'
import Wrapper from "../assets/wrappers/ErrorPage";

/*Jobster app - version 5 - Error Page - Features:
 *
 *     --> Building 'Error' Page.
 * 
 *    --> Importing and placing Link, 'img' from 
 *        assets, and 'Wrapper' Style Component
 * 
 * Note: this is part of the first changes to
 * Jobster app
 */ 

const Error = () => {

    return(
        <Wrapper className="full-page">
            <div>
                {/**here i set the image */}
                <img src={img} alt='not found'/>
                <h3>Oh! Page not found</h3>
                <p>We can't seem to find the page you're looking for</p>
                {/**here i set the link to take me back */}
                <Link to='/'>back home</Link>
            </div>
        </Wrapper>
    )
}

export default Error;