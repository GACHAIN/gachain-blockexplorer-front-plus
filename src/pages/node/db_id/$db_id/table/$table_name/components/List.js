import { Table } from 'antd';

const TableList = (props) => {
    return (
        <Table
            scroll={{x: '2000'}}
            rowKey={record=>record.id}
            {...props}
         />
    )
}

export default TableList