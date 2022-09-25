import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";

/**Jobster app - version 5 - NavLinks Component 
 * - Features:
 * 
 *    --> Building 'ProtectedRoute' Component. 
 *
 * 
 * Note: this component is going to be implemented
 * to protect-restrict access to the dashboard 
 * resources
 */

const ProtectedRoute = ({ children }) => {

    const { user } = useSelector((store) => store.user)
    if (!user) {
        return <Navigate to='/landing'/>
    } 
    return children
}

export default ProtectedRoute;