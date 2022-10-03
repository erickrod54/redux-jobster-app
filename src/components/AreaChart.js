import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
  } from 'recharts';

/**Jobster app - version 9 - AreaChart Component - Features:
 * 
 *    --> Building 'AreaChartComponent'. 
 * 
 *    --> Seeting up the 'data' that is comming from
 *        'ChartsContainer'.  
 * 
 * Note: all this components as  the attributtes are comming
 * from 'recharts' library
 */

const  AreaChartComponent = ({ data }) => {

    return(
        <ResponsiveContainer width='100%' height={300}>
            <AreaChart data={data} margin={{ top: 50}}>
                <CartesianGrid strokeDasharray=' 3 3 ' />
                <XAxis dataKey='date'/>
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Area type='monotone' dataKey='count' stroke='#1e3a8a' fill='#3b82f6'/>
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default AreaChartComponent;