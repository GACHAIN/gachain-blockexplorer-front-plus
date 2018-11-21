import { Card } from 'antd';
import { FormattedMessage } from 'react-intl';
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
	return (
		<Card className={styles.history_map_content} loading={loading} title={<FormattedMessage id="HISTORYMAP" />}>
			<ResponsiveContainer>
				<LineChart data={data}>
					<CartesianGrid strokeDasharray="10 10" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="transaction" stroke="#024a7c" />
				</LineChart>
			</ResponsiveContainer>
		</Card>
	)
}
export default history_map;