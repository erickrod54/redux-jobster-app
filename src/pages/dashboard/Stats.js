import { useEffect } from 'react';
import { StatsContainer, Loading, ChartsContainer } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { showStats } from '../../features/allJobs/allJobsSlice';

/**Jobster app - version 9 - StatsContainer - Features:
 * 
 *    --> Building 'Stats' Page.
 * 
 *    --> Importing and placing 'StatsContainer' and 
 *        'ChartsContainer'
 * 
 *    --> Importing and dispatching 'showStats'
 *   
 * Note: this will be the general content of 'Stats' page
 */

const Stats = () => {

    const { isLoading, monthlyApplications } = useSelector((store) => store.allJobs )
    const dispatch = useDispatch(); 

    /**'showStats' will dispatch once the component mounts*/
    useEffect(() => {
        dispatch(showStats())
    // eslint-disable-next-line    
    }, [])

    return <>
        <StatsContainer />
        {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
}

export default Stats