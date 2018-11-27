import { connect } from "dva";
import { Row } from "antd";
import List from "./components/List";
import { FormattedMessage } from "react-intl";

const TableName = ({ table, loading, dispatch }) => {
    let {
        columnsData,
        dataSource,
        dataTotal,
        NodePosition,
        table_name
    } = table;
    let columns = [];
    if (!loading.effects["table/queryColumns"]) {
        for (let i = 0; i < columnsData.length; i++) {
            let col = {};
            col["title"] = (
                <Row>
                    <Row style={{ color: "#ffffff" }}>
                        {columnsData[i].column_name}
                    </Row>
                    <Row style={{ color: "#ffffff" }}>
                        ({columnsData[i].data_type})
                    </Row>
                </Row>
            );
            col["dataIndex"] = columnsData[i].column_name;
            col["width"] = "12rem";
            col['sorter'] = (a, b) => a.id - b.id,
            columns.push(col);
        }
    }

    let pageChange = (p, n) => {
        let pageArgs = {
            head: {
                version: "1.0",
                msgtype: "request",
                interface: "database",
                remark: ""
            },
            params: {
                cmd: "004",
                current_page: p,
                page_size: n,
                order: "id asc",
                NodePosition,
                table_name
            }
        };
        dispatch({
            type: "table/queryData",
            payload: pageArgs
        });
    };

    let tableProps = {
        loading: loading.effects["table/queryData"],
        columns,
        dataSource,
        pagination: {
            total: dataTotal,
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
    return <List {...tableProps} />;
};

export default connect(({ table, loading, dispatch }) => ({
    table,
    loading,
    dispatch
}))(TableName);
