import React,{ useEffect} from 'react';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading';
import { getAllJobs } from '../features/allJobs/allJobsSlice';

/**Jobster app - version 7 - jobsContainer js - Features:
 * 
 *    --> Implementing useEffect to dispatch 'getAllJobs'
 *        feature.  
 * 
 * Note: this component still has some work to do.
 */


const JobsContainer = () => {

    
    
    const { jobs, isLoading } = useSelector((store) => store.allJobs)
    const dispatch = useDispatch()
    
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
            <h5>Jobs info</h5>
            <div className='jobs'>
                {jobs.map((job) => {
                    /**here i can test that i get the jobs */
                    //console.log(job)
                    return <Job key={job._id} {...job}/>
                })}
            </div>
        </Wrapper>
    )
}

export default JobsContainer;