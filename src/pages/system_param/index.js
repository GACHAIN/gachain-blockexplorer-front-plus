import { connect } from 'dva';
import SystemParamList from './components/List';
import { FormattedMessage } from 'react-intl';

const List = ({ dispatch, system_param, loading }) => {
	let { dataList, total } = system_param;
	let pageChange = (p, n) => {
		let args = {
			head: {
				'version': '1.0',
				'msgtype': 'request',
				'interface': 'get_system_param',
				'remark': ''
			},
			params: {
				'cmd': '001',
				'current_page': p || 1,
				'page_size': n || 10,
			}
		};
		dispatch({
			type: 'system_param/query',
			payload: args
		});
	}
	let listProps = {
		dataSource: dataList,
		loading: loading.effects['system_param/query'],
		scroll: {x: 600},
		pagination: {
			total: Number(total),
            hideOnSinglePage: true,
            showQuickJumper: true,
            showTotal: (total, range) => (
                <FormattedMessage
                    id="PAGE_DESC"
                    values={{
                        x: range[0],
                        y: range[1],
                        total
                    }}
                />
            ),
            showSizeChanger: true,
            onChange: (p, n) => {
                pageChange(p, n);
            },
            onShowSizeChange: (p, n) => {
                pageChange(p, n);
            }
		}
	};

	return (
		<div>
			<SystemParamList {...listProps} />
		</div>
	);
};

export default connect(({ dispatch, system_param, loading }) => ({ dispatch, system_param, loading }))(List);