import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Icon, Button, Spin } from 'antd';
import { routerRedux } from 'dva/router';

import Filelist from '../components/Filelist';
import UpLoadFile from '../components/UpLoadFile';

import { getCookie } from '../utils/helper';
const { Header, Content, Footer } = Layout;



const ShowInfo = ({ dispatch, products }) => {
    function handleDelete(id) { //点击删除之后，相当于路由发出了一个delete action 
        
    }
    function handleBack(params) {
        dispatch(
            routerRedux.push({
                pathname: '/',
            }));
    }
    var username = getCookie("username");
    if (username === null) username = "登录";
    if (products.loading === true) {
        return (
            <div style={{ left: "50%", position: "absolute", top: "50%"}}>
                <Spin size="large"  />  
            </div>
        );
    } else {
    return (
        <Layout>
            <Header style={{ position: 'fixed', width: '100%' }}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                    onSelect={({ key }) => {
                        if (key === "3" && username === "登录") {
                            dispatch(
                                routerRedux.push({
                                    pathname: '/login',
                                }));
                        } else if (key === "3") {
                            dispatch(
                                routerRedux.push({
                                    pathname: '/admin',
                                }));
                        }
                    }}
                >
                    <Menu.Item key="1">主页</Menu.Item>
                    <Menu.Item key="2">上传</Menu.Item>
                    <Menu.Item key="3">{username}</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px', marginTop: 64 }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Groups</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                </Breadcrumb>
                
                <div style={{width:"100%",height:"70px"}}>
                    <div style={{float:"left"}}>
                        <Button type="primary" onClick={handleBack}>
                            <Icon type="left" style={{ fontSize: 14, color: '#fff'}} />返回
                        </Button>
                    </div>
                    <div style={{ float: "right" }}>
                        <UpLoadFile />
                    </div>
                </div>
                <Filelist onDelete={handleDelete} products={products}  />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2016 Created by Ant UED
            </Footer>
        </Layout>
    );
    }
};

export default connect(({showinfo}) => {
    const datasoure = showinfo;
    return { products: datasoure };
})(ShowInfo);
