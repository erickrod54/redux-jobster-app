import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from 'recharts';

/**Jobster app - version 9 - BarChartComponent  - Features:
 * 
 *    --> Building 'BarChartComponent'. 
 * 
 *    --> Seeting up the 'data' that is comming from
 *        'ChartsContainer'.  
 * 
 * Note: all this components as  the attributtes are comming
 * from 'recharts' library
 */

const BarChartComponent = ({ data }) => {

    return(
        <ResponsiveContainer width='100%' height={300}>
            <BarChart data={data} margin={{ top: 50}}>
                <CartesianGrid strokeDasharray=' 10 10 '/>
                <XAxis dataKey='date'/>
                <YAxis allowDecimals={false}/>
                <Tooltip />
                <Bar dataKey='count' fill='#3b82f6' barSize={75}/>
            </BarChart>
        </ResponsiveContainer>
    )
}

export default BarChartComponent;