import { Card } from 'antd';
import { FormattedMessage } from 'react-intl';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer
} from 'recharts';
import styles from './history_map.css';

const history_map = ({ data, loading }) => (
	<Card
		className={styles.history_map_content}
		loading={loading}
		title={<FormattedMessage id="HISTORYMAP" />}
	>
		<ResponsiveContainer>
			<LineChart data={data}>
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line
					type="linear"
					legendType="square"
					layout="horizontal"
					dataKey="transaction"
					stroke="#024a7c"
				/>
			</LineChart>
		</ResponsiveContainer>
	</Card>
);
export default history_map;
