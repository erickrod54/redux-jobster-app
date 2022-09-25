import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Logo from './Logo';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, logoutUser } from '../features/user/userSlice';

/**Jobster app - version 5 - Navbar js - Features:
 * 
 *    --> Building Navbar component. 
 * 
 *    --> Importing and placing 'logoutUser()'
 *        from the userSlice.
 * 
 * Note: this component is created to applied the style
 * to every basic form row that i will build in the app
 */

const Navbar = () => {

    /**here i build the state to toggle logout styles */
    const [ showLogout, setShowLogout ] = useState(false)

    /**here i grab the 'user' from the store */
    const { user } = useSelector((store) => store.user)

    const dispatch = useDispatch();

    /**Building the toogle action for the Sidebar */
    const toggle = () => {
        dispatch(toggleSidebar())
    }
    return(
        <Wrapper>
            <div className='nav-center'>
                <button 
                    type='button' 
                    className='toggle-btn' 
                    onClick={toggle}
                    >
                        <FaAlignLeft />
                    </button>
                    <div>
                        <Logo />
                        <h3 className='logo-text'>dashboard</h3>
                    </div> 
                    <div className='btn-container'>
                        <button 
                            type='button' 
                            className='btn'
                            onClick={() => setShowLogout(!showLogout)}
                            >
                                <FaUserCircle />
                                { user?.name }
                                <FaCaretDown />
                            </button> 
                            <div 
                            className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                                <button 
                                    type='button' 
                                    className='dropdown-btn' 
                                    onClick={() => dispatch(logoutUser())}
                                    >
                                        logout
                                    </button>
                            </div> 
                    </div>
            </div>
        </Wrapper> 
    )
}

export default Navbar;