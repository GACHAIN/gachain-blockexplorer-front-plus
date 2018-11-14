import { Table, Divider, Tooltip, message, Row, Tag } from 'antd';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Link from 'umi/link';
import React from 'react';
import moment from 'moment';
import router from 'umi/router';

const columns = [
    {
        title: <FormattedMessage id="PARAMNAME" />,
        dataIndex: 'key',
        width: '10rem'
    }, {
        title: <FormattedMessage id="VALUE" />,
        dataIndex: 'val',
    },
]

const transactions_info_columns = [
    {
        title: <FormattedMessage id="TL_HASH" />,
        dataIndex: 'hash',
        render: (text) => {
            return (
                <Tooltip placement="topLeft" title={text}>
                    <Link to={`/transaction/${text}`}>
                        <span id="textOverflow">{text}</span>
                    </Link>
                </Tooltip>
            )
        }
    }, {
        title: <FormattedMessage id="TL_CONTRACTNAME" />,
        dataIndex: 'contract_name',
    }, {
        title: <FormattedMessage id="TL_CREATETIME" />,
        dataIndex: 'time',
        render: (text) => {
            return (
                <Row>
                    <Tag color="#108ee9">{moment(text * 1000).fromNow(false)}</Tag>
                </Row>
            )
        }
    }, {
        title: <FormattedMessage id="TL_TYPE" />,
        dataIndex: 'type',
        render: (text) => {
            if (text === 276) {
                return (
                    <Tag color="blue"><FormattedMessage id="TYPE_TRANSFER" /></Tag>
                )
            } else
                if (text === 293) {
                    return (
                        <Tag color="green"><FormattedMessage id="TYPE_CREATEUSER" /></Tag>
                    )
                } else
                    if (text === 264) {
                        return (
                            <Tag color="magenta"><FormattedMessage id="TYPE_TASK" /></Tag>
                        )
                    }

            return text
        }
    }, {
        title: <FormattedMessage id="TL_WALLET" />,
        dataIndex: 'key_id',
    }
]

class BlockDetail extends React.Component {
    static propTypes = {
        intl: intlShape.isRequired,
    }

    render() {
        let { Block_header, Block_info, Transactions_info } = this.props.data_list
        let { intl: { formatMessage } } = this.props;
        let { loading } = this.props
        if (!loading && Block_header.length === 0 && Block_info.length === 0 && Transactions_info.length === 0) {
            router.replace("/block")
            message.error(formatMessage({ id: 'S_NotFound' }))
        }
        return (
            <div>
                <Divider orientation="left"><FormattedMessage id="B_HEADER" /></Divider>
                <Table
                    columns={columns}
                    dataSource={Block_header.map((item) => {
                        item.key = <span style={{ fontWeight: "bold" }}><FormattedMessage id={item.key} /></span>
                        return item
                    })}
                    pagination={false}
                    rowKey={record => record.key.props.children.props.id}
                    loading={this.props.loading}
                />

                <Divider orientation="left"><FormattedMessage id="B_DETAIL" /></Divider>
                <Table
                    columns={columns}
                    dataSource={Block_info.map((item) => {
                        if (item.key) {
                            item.key = <span style={{ fontWeight: "bold" }}><FormattedMessage id={item.key} /></span>
                        }
                        return item
                    })}
                    pagination={false}
                    rowKey={record => record.key.props.children.props.id}
                    loading={this.props.loading}
                />

                <Divider orientation="left" style={{ marginTop: 20 }}><FormattedMessage id="TRANSACTION" /></Divider>
                <Table
                    columns={transactions_info_columns.map((item) => {
                        item['align'] = 'center'
                        return item
                    })}
                    dataSource={Transactions_info}
                    pagination={true}
                    scroll={{ x: '900' }}
                    rowKey={record => record.hash}
                    loading={this.props.loading}
                />
            </div>
        )
    }
}

export default injectIntl(BlockDetail)