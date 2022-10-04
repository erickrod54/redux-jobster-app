import React,{ useEffect} from 'react';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading';
import { getAllJobs } from '../features/allJobs/allJobsSlice';
import PageBtnContainer from './PageBtnContainer';

/**Jobster app - version 10 - jobsContainer js - Features:
 * 
 *    --> Setting 'page' as depency array on the useEffect
 *        as the 'search' related props . 
 * 
 * Note: This dependency is been set by this version
 * because 'getAllJobs' is dispatched and the query 
 * strings params are set already in the allJobSlice.
 * 
 * the 'search' related props and the 'page' will modify
 * the search params by using the Search Form and will
 * dispatch here 'getAllJobs'
 */


const JobsContainer = () => {

    
    /**here is destructure the props for the pagination
     * from the 'allJobs' slice*/
    const { jobs,
            isLoading,
            page,
            totalJobs,
            numOfPages,
            search,
            searchStatus,
            searchType,
            sort } = useSelector((store) => store.allJobs)

    const dispatch = useDispatch()
    
    /**'getAllJobs' will dispatch once the 
     * component mounts*/
    useEffect(() => {
        dispatch(getAllJobs())
    // eslint-disable-next-line 
    }, [page, search, searchStatus, searchType, sort])
    
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