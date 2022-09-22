import React, { useState, useEffect } from "react";
import { Logo, FormRow } from "../components";
import Wrapper from '../assets/wrappers/RegisterPage';
import { toast } from "react-toastify";

/**Jobster app - version 3 - Register Page - Features:
 * 
 *    --> Building handleChange to control the
 *        input.
 * 
 *    --> Building onSumbit to control the 
 *        input.
 * 
 *    --> Implementing 'toast' from 
 *        "react-toastify" to display nice
 *        error message
 * 
 * Note: this library can handle the notification 
 * by custom style boxes for case as error, warning,
 * sucess, and many more
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
        const name = e.target.name;
        const value = e.target.value;

        /**to test that i control the inputs */
        //console.log(`${name}:${value}`)

        /**setting the value, i can check right
         * away how state for 'name' and 'values'
         * change by the user interaction.*/
        setValues({ ...values, [name]: value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, isMember } = values
        /**here validate that onSubmit the forms there's no empty 
         * input - ( 'name' is present on register and thats why is 
         * link by shortcircuit with '!isMember')
         */
        if (!email || !password || (!isMember &&  !name)) {
            toast.error('Please fill out all fields')
        }
    }

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember})
    }

    return(
        <Wrapper className="full-page">
            <form className="form" onSubmit={onSubmit}>
                <Logo />
                <h3>{ values.isMember ? 'Login' : 'Register' }</h3>
                {/** name field */}
                { !values.isMember && 
                
                <FormRow 
                    type='text' 
                    name='name' 
                    value={values.name} 
                    handleChange={handleChange} />
                }

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
                <p>{ values.isMember ? 'Not a member yet ?' : 'Already a member ?'}
                    <button 
                        type="button" 
                        onClick={toggleMember} 
                        className='member-btn'
                        >
                            {values.isMember ? 'Register' : 'Login'}</button>
                </p>
            </form>
        </Wrapper>
    )
}

export default Register;