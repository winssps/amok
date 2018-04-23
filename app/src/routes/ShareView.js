import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Spin } from 'antd';
import { routerRedux } from 'dva/router';

import GroupsList from '../components/GroupsList';
import NewGroups from '../components/NewGroups';

import { getCookie } from '../utils/helper';


const { Header, Content, Footer } = Layout;



const ShareView = ({ dispatch, shareview }) => {
    function handleonShow(id) {
        dispatch(
            routerRedux.push({
                pathname: '/showinfo',
                state: {
                    id: id,
                },
            }));
    }
    function handleonDownload(id) {
        dispatch({
            type: 'shareview/download',
            payload: id,
        });
    }
    var username = getCookie("username");
    if (username === null) username = "登录";
    if (shareview.loading === true) {
        return (
            <div style={{ left: "50%", position: "absolute", top: "50%" }}>
                <Spin size="large" />
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
                        defaultSelectedKeys={['0']}
                        style={{ lineHeight: '64px' }}
                        onSelect={({ key }) => {
                            if (key === "1") {
                                dispatch(
                                    routerRedux.push({
                                        pathname: '/',
                                    }));
                            } else if(key === "2" ) {
                                dispatch(
                                    routerRedux.push({
                                        pathname: '/login',
                                    }));
                            }
                        }}
                    >
                        <Menu.Item key="1">主页</Menu.Item>
                        <Menu.Item key="2" style={{ "float": "right", }}>{username}</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px', marginTop: 64 }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Groups</Breadcrumb.Item>
                    </Breadcrumb>
                    <GroupsList onShow={handleonShow} products={shareview} />
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2016 Created by Ant UED
            </Footer>
            </Layout>
        );
    }
};

// export default Products;
export default connect(({ shareview }) => ({
    shareview,
}))(ShareView);