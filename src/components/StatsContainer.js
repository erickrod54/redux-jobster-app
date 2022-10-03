import StatItem from './StatItem';
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';
import { useSelector } from 'react-redux';

/**Jobster app - version 9 - StatsContainer - Features:
 * 
 *    --> Building 'StatsContainer'. 
 * 
 *    --> Building 'defaultStats' data to set them
 *        in the 'StatsItem'.
 * 
 * Note: i destructure the 'stats' because i'll need it
 * at part of 'defaultStats' 
 */

const StatsContainer = () => {

    /**here i destructure the stats from 'allJobs' */
    const { stats } = useSelector((store) => store.allJobs)

    /**all this data will be displayed and use by
     * 'StatsItem' Component
     */
    const defaultStats = [
        {
          title: 'pending applications',
          count: stats.pending || 0,
          icon: <FaSuitcaseRolling />,
          color: '#e9b949',
          bcg: '#fcefc7',
        },
        {
          title: 'interviews scheduled',
          count: stats.interview || 0,
          icon: <FaCalendarCheck />,
          color: '#647acb',
          bcg: '#e0e8f9',
        },
        {
          title: 'jobs declined',
          count: stats.declined || 0,
          icon: <FaBug />,
          color: '#d66a6a',
          bcg: '#ffeeee',
        },
      ];

    return (
        /**here i map 'defaultStats' and spread the item props on
         * 'StatItem' Component */
        <Wrapper>
            {defaultStats.map((item, index) => {
                return <StatItem key={index} {...item}/>
            })}
        </Wrapper>
    )
}

export default StatsContainer;