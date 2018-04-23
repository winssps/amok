import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Popconfirm } from 'antd';

import { getCookie } from '../utils/helper';

const ProductList = ({ onShow, onDelete, onDownload, products }) => {
    const columns = [{
        title: '名称',
        key: 'name',
        dataIndex: 'name',
    }, {
        title: '截止提交时间',
        key: 'time',
        dataIndex: 'time',
    }, {
        title: '已提交人数',
        key: 'submits',
        dataIndex: 'submits',
    },{
        title: 'Actions',
        render: (text, record) => {
            if(getCookie("token")) {
                return (
                    <div>
                        <Button style={{marginRight: "20px"}}  onClick={() => onShow(record._id)}>查看</Button>
                        <Popconfirm title="Delete?" onConfirm={() => onDelete(record._id)}>
                            <Button>Delete</Button>
                        </Popconfirm> 
                        <Button style={{ marginLeft: "20px" }} onClick={() => onDownload(record._id)}>下载全部</Button>
                    </div>
                    
                    );  
            } else {
                return (
                    <Button onClick={() => onShow(record._id)}>查看</Button>
                ); 
            }
            
        },
    }];
    // 定义分页对象
    const pagination = {
        pageSize: 8,
        onChange: () => { },
    };
    const rowselection = {
        onSelect: ({key}) => {
            console.log("hello");
        }
    }
    return (  //这个Table 包含了一个头部 
        <Table
        dataSource={products.list}
        columns={columns}
        pagination={pagination}
      />    
    );
};

ProductList.propTypes = {
    onShow: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDownload: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
};

export default ProductList;