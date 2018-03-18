import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Spin } from 'antd';
import { routerRedux } from 'dva/router';

import GroupsList from '../components/GroupsList';
import NewGroups from '../components/NewGroups';

import { getCookie } from '../utils/helper';


const { Header, Content, Footer } = Layout;



const Test = ({ dispatch, getgroups }) => {
    function handleDelete(id) { //点击删除之后，相当于路由发出了一个delete action 
        dispatch({
            type: 'getgroups/delete',
            payload: id,
        });
    }
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
            type: 'getgroups/download',
            payload: id,
        });
    }
    var username = getCookie("username");
    if(username === null) username = "登录";
    if (getgroups.loading === true) {
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
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                    onSelect = {({ key }) => {
                        if (key === "3" && username === "登录") {
                            dispatch(
                                routerRedux.push({
                                    pathname: '/login',
                                })); 
                        } else if (key === "3"){
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
                </Breadcrumb>
                <div style={{ "text-align":"right"}}>
                    <NewGroups  />
                </div>
                
                <GroupsList onShow={handleonShow} onDelete={handleDelete}
                    onDownload={handleonDownload}
                products={getgroups} />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2016 Created by Ant UED
            </Footer>
        </Layout>
    );
    }
};

// export default Products;
export default connect(({ getgroups }) => ({
    getgroups,
}))(Test);