import { NavLink } from "react-router-dom";
import links from "../utils/links";

/**Jobster app - version 5 - NavLinks Component 
 * - Features:
 * 
 *    --> Building 'NavLinks' Component. 
 *
 * 
 * Note: this component is going to be implemented
 * in both navigation bars
 */

const NavLinks = ({ toggleSidebar }) => {

    return(
        <div className='nav-links'>
                    {links.map((link) => {
                        const { text, path, id, icon } = link;
                        return <NavLink to={path} className={(({isActive})=> {
                            return isActive ? 'nav-link active' : 'nav-link'
                        })}
                        key={id}
                        onClick={toggleSidebar}
                        >
                            <span className='icon'>{icon}</span>
                            {text}
                        </NavLink>
                    })}
                </div>
    )
}

export default NavLinks