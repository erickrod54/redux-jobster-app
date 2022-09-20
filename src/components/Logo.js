import logo from '../assets/images/logo.svg';

/**Jobster app - version 1 - Logo Component - Features:
 * 
 *    --> Building basic 'Logo' Component 
 * 
 * Note: This component will give me full control over
 * the logo
 */

const Logo = () => {
    
    return(
        <img src={logo} alt='jobster logo' className='logo'/>
    )
}

export default Logo;