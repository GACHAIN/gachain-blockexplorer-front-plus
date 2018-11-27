import TransactionList from "./components/List";
import { connect } from "dva";
import { FormattedMessage } from "react-intl";

const Transaction = ({ transaction, dispatch, loading, location }) => {
    const { dataList, total } = transaction;
    function toggle(index) {
        dispatch({
            type: "transaction/toggle",
            payload: {
                index
            }
        });
    }

    let pageChange = (p, n) => {
        let args = {
            head: {
                version: "1.0",
                msgtype: "request",
                interface: "get_transaction_block",
                remark: ""
            },
            params: {
                cmd: "001",
                current_page: p || 1,
                page_size: n || 10
            }
        };
        dispatch({
            type: "transaction/queryTransactionByBlock",
            payload: args
        });
	};
	
	// let sortChange = (p, n) => {
	// 	let args = {

	// 	}
	// }

    let listProps = {
        dataSource: dataList,
        loading: loading.effects["transaction/queryTransactionByBlock"],
        onToggle: toggle,
        location,
        dispatch,
		scroll: { x: 900 },
		onChange: (p, f, s) => {
			// console.log(p)
			// console.log(f)
			// console.log(s)
		},
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
            onChange: (p, n, s) => {
				console.log(p, n, s)
                pageChange(p, n);
            },
            onShowSizeChange: (p, n) => {
                pageChange(p, n);
            }
        }
    };

    return (
        <div>
            <TransactionList {...listProps} />
        </div>
    );
};

export default connect(transaction => transaction)(Transaction);
