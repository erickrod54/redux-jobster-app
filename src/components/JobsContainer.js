import { useEffect } from 'react';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading';

/**Jobster app - version 6 - jobsContainer js - Features:
 * 
 *    --> Building 'jobsContainer' Component.
 * 
 *    --> Importing 'jobs' and 'isLoading' from the
 *        store.
 * 
 *    --> Building the conditional rendering for 'isLoading'
 *        'jobs.length === 0' and for the 'jobs'. 
 * 
 * Note: this component still has some work to do.
 */

const JobsContainer = () => {

    const { jobs, isLoading } = useSelector((store) => store.allJobs)
    const dispatch = useDispatch()

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
                    console.log(job)
                    return <Job key={job._id} {...job}/>
                })}
            </div>
        </Wrapper>
    )
}

export default JobsContainer;