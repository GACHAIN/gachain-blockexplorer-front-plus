import { connect } from "dva";
import PropTypes from "prop-types";
import BlockList from "./components/List";
import { FormattedMessage } from "react-intl";

const Block = ({ location, block, dispatch, loading }) => {
    const { dataList, total } = block;
    function toggle(index) {
        dispatch({
            type: "block/toggle",
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
                interface: "get_block",
                remark: ""
            },
            params: {
                cmd: "001",
                current_page: p || 1,
                page_size: n || 10
            }
        };
        dispatch({
            type: "block/query",
            payload: args
        });
    };

    const listProps = {
        dataSource: dataList,
        location,
        loading: loading.effects["block/query"],
        onToggle: toggle,
        scroll: { x: 900 },
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
    return <BlockList {...listProps} />;
};

Block.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object
};

export default connect(({ block, loading }) => ({ block, loading }))(Block);
