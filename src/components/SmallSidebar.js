import Wrapper from '../assets/wrappers/SmallSidebar';
import { FaTimes } from 'react-icons/fa';

import Logo from './Logo';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../features/user/userSlice';
import NavLinks from './Navlinks';

/**Jobster app - version 5 - SmallSidebar Component 
 * - Features:
 * 
 *    --> Importing 'isSidebarOpen' from the store and 
 *        attach it to the styles. 
 * 
 *    --> Implementing 'toggle' to toggle between close 
 *        and close and open sidebar.
 * 
 *    --> Importing and placing 'NavLinks' Component
 *        in order to render the links. 
 * 
 * 'navlinks component apart and add comments to navlinks'
 * 
 * Note: this component is created to applied the style
 * to every basic form row that i will build in the app
 */

const SmallSidebar = () => {

    const { isSidebarOpen } = useSelector((store) => store.user )

    const dispatch = useDispatch()

    const toggle = () => {
        dispatch(toggleSidebar())
    }

    return(
        <Wrapper>
            <div className={ isSidebarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
                <div className='content'>
                    <button className='close-btn' onClick={toggle}>
                        <FaTimes />
                    </button>
                <header>
                    <Logo />
                </header>
               <NavLinks toggleSidebar={toggle}/> 
                </div>
            </div>
        </Wrapper>
    )
}

export default SmallSidebar;