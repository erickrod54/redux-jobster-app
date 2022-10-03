import React,{ useEffect} from 'react';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading';
import { getAllJobs } from '../features/allJobs/allJobsSlice';
import PageBtnContainer from './PageBtnContainer';

/**Jobster app - version 9 - jobsContainer js - Features:
 * 
 *    --> Building 'JobsContainer'.
 * 
 *    --> Dispatching action to 'getAllJobs'.
 * 
 *    --> Importing and placing 'Job' Component  
 * 
 *    --> Importing and placing 'PageBtnContainer'
 *        to build the pagination later. 
 * 
 * Note: from this component i'll spread all the props
 * to build 'Job' Component.
 */


const JobsContainer = () => {

    
    /**here is destructure the props for the pagination
     * from the 'allJobs' slice*/
    const { jobs, isLoading, page, totalJobs, numOfPages } = useSelector((store) => store.allJobs)
    const dispatch = useDispatch()
    
    /**'getAllJobs' will dispatch once the 
     * component mounts*/
    useEffect(() => {
        dispatch(getAllJobs())
    // eslint-disable-next-line 
    }, [])
    
    if (isLoading) {
        return <Loading center/>
    }
    

    if (jobs.length === 0 ) {
        return(
            <Wrapper>
                <h2>No jobs to display</h2>
            </Wrapper>
        )
    }

    return(
        <Wrapper>
            <h5>{totalJobs} job{jobs.length > 1 && 's'}</h5>
            <div className='jobs'>
                {jobs.map((job) => {
                    /**here i can test that i get the jobs */
                    //console.log(job)
                    return <Job key={job._id} {...job}/>
                })}
            </div>
            {/**the component will render depending on
             * 'numOfPages' */}
            { numOfPages > 1 && <PageBtnContainer />}
        </Wrapper>
    )
}

export default JobsContainer;