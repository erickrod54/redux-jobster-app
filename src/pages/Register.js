import React, { useState, useEffect } from "react";
import { Logo, FormRow } from "../components";
import Wrapper from '../assets/wrappers/RegisterPage';
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

/**here i import the actions from userSlice */
import { loginUser, registerUser } from "../features/user/userSlice";

/**Jobster app - version 4 - Register Page - Features:
 * 
 *    --> Importing and placing loginUser and registerUser
 *        actions from 'userSlice'.  
 * 
 *    --> Importing 'user', and  'isLoading' from 
 *        useSelector( store => store.user)
 * 
 * Note: These action will have implementation 'onSubmit'
 * 
 */

const initialState = {
    name:'',
    email:'',
    password:'',
    isMember:true,
}


const Register = () => {

    const [ values, setValues ] = useState(initialState)

    const { user, isLoading } = useSelector( store => store.user)
    const dispatch = useDispatch();

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
            return;
        }
        /**here i dispatch the actions to submit the user data */
        if (isMember) {
            /**if its member (i add the return to avoid to javascript 
             * keep sending data)*/
            dispatch(loginUser({ email: email, password: password}))
            return;
        }
        /**if not */
        dispatch(registerUser({ name, email, password }))
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