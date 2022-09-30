import Wrapper from "../assets/wrappers/JobInfo";


/**Jobster app - version 7 - JobInfo - Features:
 * 
 *    --> Building 'JobInfo' Component.  
 * 
 * Note: this component was created by the 
 * icon and text that is a repetitive pattern
 * so this component will save lines of code
 * for the 'Job' -allJobs tab- file.
 */

const JobInfo = ({ icon, text}) => {

    return(
        <Wrapper>
            <span className="icon">{icon}</span>
            <span className="text">{text}</span>
        </Wrapper>
    )
}

export default JobInfo;