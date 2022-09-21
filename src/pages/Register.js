import React, { useState, useEffect } from "react";
import { Logo, FormRow } from "../components";
import Wrapper from '../assets/wrappers/RegisterPage';

/**Jobster app - version 1 - Register Page - Features:
 * 
 *    --> Building 'Register' page.
 * 
 *    --> Building 'initialState' to handle 
 *        the initial values props of 
 *       'FormRow'.
 * 
 *    --> Importing and placing 'Logo', and 
 *        'FormRow'.
 * 
 *    --> Importing and placing 'Wrapper' style
 *        Component from 'wrappers' directory. 
 *      
 * 
 * Note: 'FormRow' Component has been built in order to
 * handle the combination of 'labels' and 'row' built 
 * dynamiclly for name, email, and password 
 * respectivelly
 */

const initialState = {
    name:'',
    email:'',
    password:'',
    isMember:true,
}

const Register = () => {

    const [ values, setValues ] = useState(initialState)

    const handleChange = (e) => {
        console.log(e.target)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e.target)
    }
    return(
        <Wrapper className="full-page">
            <form className="form" onSubmit={onSubmit}>
                <Logo />
                <h3>Login</h3>
                {/** name field */}
                <FormRow 
                    type='text' 
                    name='name' 
                    value={values.name} 
                    handleChange={handleChange} />

                {/** email field */}
                <FormRow 
                    type='email' 
                    name='email' 
                    value={values.email} 
                    handleChange={handleChange} />

                {/** password field */}
                <FormRow 
                    type='password' 
                    name='password' 
                    value={values.password} 
                    handleChange={handleChange} />

                <button type="submit" className="btn btn-block">
                    submit
                </button>
            </form>
        </Wrapper>
    )
}

export default Register;