import { Table, Row, Divider, message } from 'antd';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import router from 'umi/router';

const columns = [
    {
        title: <FormattedMessage id="PARAMNAME" />,
        dataIndex: 'key',
        render: text => {
            return <span style={{ width: '5rem', display: 'inline-block' }}>{text}</span>
        },
    }, {
        title: <FormattedMessage id="VALUE" />,
        dataIndex: 'value',
    },
]
class DetailList extends React.Component {
    static propTypes = {
        intl: intlShape.isRequired,
    }
    render() {
        let { listData, pagination, loading } = this.props
        let { intl: { formatMessage } } = this.props;
        /**如果ajax请求已经返回，但是没有获取到数据。那么自动跳转 */
        if (!loading && listData.length === 0) {
            router.replace('/transaction')
            message.error(formatMessage({ id: 'S_NotFound' }))
        }
        let tables = listData.map((item) => {
            return (
                <Row>
                    <Divider orientation="left"><span><FormattedMessage id={item.key} /></span></Divider>
                    <Table
                        loading={loading}
                        dataSource={item.value.map((item) => {
                            item.key = <span style={{ fontWeight: 'bold' }}><FormattedMessage id={item.key} /></span>
                            return item
                        })}
                        columns={columns}
                        pagination={pagination}
                        rowKey={record => record.key.props.children.props.id}
                    />
                </Row>
            )
        })
        return (
            <Row>
                {tables}
            </Row>
        )
    }
}

export default injectIntl(DetailList)