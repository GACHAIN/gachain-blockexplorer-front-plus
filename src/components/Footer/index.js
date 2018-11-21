import { Row } from 'antd';
import style from './index.css'
export default () => {
	return (
		<Row className={style.footer} span={24}>
			<Row className={style.Support}></Row>
			<Row className={style.footerInfo}></Row>
		</Row>
	)
}