import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Icon, Button, Spin } from 'antd';
import { routerRedux } from 'dva/router';

import Filelist from '../components/Filelist';
import UpLoadFile from '../components/UpLoadFile';

import { getCookie } from '../utils/helper';
const { Header, Content, Footer } = Layout;

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const ShowInfo = ({ dispatch, products }) => {
    function handleDelete(id) { //点击删除之后，相当于路由发出了一个delete action

    }
    function handleBack(params) {
        dispatch(
            routerRedux.push({
                pathname: '/admin',
            }));
    }
    var username = getCookie("username");
    if (username === null) username = "登录";
    // if (products.loading === true) {
    //     return (
    //         <div style={{ left: "50%", position: "absolute", top: "50%"}}>
    //             <Spin size="large" indicator={antIcon}  />
    //         </div>
    //     );
    // } else {
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['0']}
                    style={{ lineHeight: '64px' }}
                    onSelect={({ key }) => {
                        if (key === "1") {
                            dispatch(
                                routerRedux.push({
                                    pathname: '/',
                                }));
                        }
                    }}
                >
                    <Menu.Item key="1">主页</Menu.Item>
                    <Menu.Item key="1" style={{ "float": "right", }}>{username}</Menu.Item>
                </Menu>
            </Header>
            <Layout>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content style={{ padding: '0 50px'}}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>Groups</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ width: "100%", height: "50px" }}>
                            <div style={{ float: "left", padding: "10px 0px" }}>
                                <Button onClick={handleBack}>
                                    <Icon type="left" style={{ fontSize: "14px" }} />返回
                                </Button>
                                <UpLoadFile />
                            </div>
                        </div>
                        <Filelist onDelete={handleDelete} products={products} />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    );
    // }
};

export default connect(({showinfo}) => {
    const datasoure = showinfo;
    return { products: datasoure };
})(ShowInfo);
