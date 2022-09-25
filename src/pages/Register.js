import React, { useState, useEffect } from "react";
import { Logo, FormRow } from "../components";
import Wrapper from '../assets/wrappers/RegisterPage';
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

/**here i import the actions from userSlice */
import { loginUser, registerUser } from "../features/user/userSlice";

/**Jobster app - version 5 - Register Page - Features:
 * 
 *    --> Setting the disabled attribute when 'isLoading' 
 *         and using ternary operator to flip the button 
 *         text between 'loading...' and 'submit'}
 * 
 *    --> Importing and placing 'navigate' (useNavigate hook)
 *        to programmaticlly navigate to Dashboard once
 *        the user login.
 * 
 * Note: These action will have implementation 'onSubmit'
 *
 * to implement the 'navigate' to 'Dashboard', i use 
 * the hook and a useEffect > dependency 'user'
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
    /**here i set 'navigate' to the hook*/
    const navigate = useNavigate()

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
        
        if (!email || !password || (!isMember &&  !name)) {
            toast.error('Please fill out all fields')
            return;
        }
        /**here i dispatch the actions to submit the user data */
        if (isMember) {
           
            dispatch(loginUser({ email: email, password: password}))
            return;
        }
        /**if not */
        dispatch(registerUser({ name, email, password }))
    }

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember})
    }

    /**i set it depending on the user changes */
    useEffect(() => {

        if (user) {
            setTimeout(() => {
                navigate('/')
            },2000)
        }

    // eslint-disable-next-line    
    },[user])

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

                <button type="submit" className="btn btn-block" disabled={isLoading}>
                    {isLoading ? 'loading...' : 'submit'}
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