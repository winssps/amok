import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';




const Filelist = ({onDelete, products }) => {
    const columns = [{
        title: '名称',
        key: 'name',
        dataIndex: 'name',
    }, {
        title: '提交时间',
        key: 'time',
        dataIndex: 'time',
    }, {
        title: '大小',
        key: 'size',
        dataIndex: 'size',
    }, {
        title: 'Actions',
        render: (text, record) => {
            return (
                <Button onClick={() => onDelete(record.id)}>编辑</Button>
            );
        },
    }];
    // 定义分页对象
    const pagination = {
        pageSize: 10,
        onChange: () => { },
    };
    return (  //这个Table 包含了一个头部
        <Table
            dataSource={products.list}
            columns={columns}
            pagination={pagination}
        />
    );
};

Filelist.propTypes = {
    onDelete: PropTypes.func.isRequired,
    products: PropTypes.object.isRequired,
};

export default Filelist;
