import React, { useState } from 'react';

import BarChart from './BarChart';
import AreaChart from './AreaChart';
import Wrapper from '../assets/wrappers/ChartsContainer';
import { useSelector } from 'react-redux';

/**Jobster app - version 9 - ChartsContainer - Features:
 * 
 *    --> Building 'ChartsContainer'. 
 * 
 *    --> Importing and setting switch beetwen 'BarChart'
 *        and 'AreaChart' Components  
 * 
 * Note: all this components as  the attributtes are comming
 * from 'recharts' library
 */

const ChartsContainer = () => {

    /**this state is use to switch between charts */
    const [barChart, setBarChart] = useState(true)

    const { monthlyApplications: data } = useSelector((store) => store.allJobs)
   
    return (
        <Wrapper>
            <h4>monthly Applications</h4>
            <button type='button' onClick={() => setBarChart(!barChart)}>
                {barChart ? 'Area Chart' : 'Bar Chart'}
            </button>
            {/**here i render comditionally the components and
             * drill the 'data' to feed the charts*/}
            {barChart ? <BarChart data={data}/> : <AreaChart data={data}/>}
        </Wrapper>
    )
}

export default ChartsContainer;