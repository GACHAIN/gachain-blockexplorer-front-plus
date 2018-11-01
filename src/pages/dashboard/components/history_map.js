import { Card } from 'antd';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'
import styles from './history_map.css';

const history_map = ({ data, loading }) => {
    console.log(data)
    return (
        <Card loading={loading} className={styles.history_map_content} >
            <ResponsiveContainer>
                <LineChart data={data} height={400}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </Card>
    )
}

export default history_map;