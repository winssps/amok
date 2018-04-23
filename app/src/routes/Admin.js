import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Icon, message } from 'antd';
import { routerRedux } from 'dva/router';
import { getCookie, delCookie } from '../utils/helper';


import GroupsList from '../components/GroupsList';
import NewGroups from '../components/NewGroups';
import SharePage from "../components/SharePage";

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;



const Admin = ({ dispatch, getgroups }) => {
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
    if(username === null) {
        dispatch(
            routerRedux.push({
                pathname: '/',
        }));
    }
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['0']}
                    style={{ lineHeight: '64px' }}
                    onClick = { ({key}) => {
                        switch (key) {
                            case "1": dispatch(
                                        routerRedux.push({
                                            pathname: '/',
                                    }));
                                break;
                            case "b2": dispatch({
                                type: 'newgroups/show',
                            });

                                break;
                            case "b3": dispatch(
                                routerRedux.push({
                                    pathname: '/help',
                                }));
                                break;
                            case "b5":
                                message.success(`${username} 已经退出登录`);
                                delCookie("username");
                                delCookie("token");
                                dispatch(
                                    routerRedux.push({
                                        pathname: '/',
                                    }));
                                break;
                            
                            default:
                                break;
                        }
                    }}
                    onSelect = {({key}) => {
                    }}
                >
                    <Menu.Item key="1">主页</Menu.Item>
                    <SubMenu key="sub1" style={{ "float": "right", }} 
                    title={<span>{username}</span>}
                    >
                        <Menu.Item key="b2">新建分组</Menu.Item>
                        <Menu.Item key="b3">修改密码</Menu.Item>
                        <Menu.Item key="b4">帮助</Menu.Item>
                        <Menu.Item key="b5">退出</Menu.Item>
                    </SubMenu>
                </Menu>
            </Header>
            <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="vertical"
                        defaultSelectedKeys={['r1']}
                        style={{ height: '100%', borderRight: 0 }}
                        onClick = { ({key}) => {
                            if(key === "r2") {
                                dispatch({
                                    type: 'sharepage/showshare',
                                    payload: username,
                                });
                            }      
                        }}
                    >
                       <Menu.Item key="r1">
                            <Icon type="pie-chart" />
                            <span>我的分组</span>
                        </Menu.Item> 
                        <Menu.Item key="r2">
                            <Icon type="desktop" />
                            <span>生成链接</span>
                        </Menu.Item>
                        <Menu.Item key="r3">
                            <Icon type="delete" />
                            <span>垃圾桶</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '10px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Groups</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content style={{ background: '#fff', margin: 0, minHeight: 280 }}>
                        <GroupsList onShow={handleonShow} onDelete={handleDelete}
                            onDownload={handleonDownload}
                            products={getgroups} />    
                        <NewGroups />
                        <SharePage />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    );
}
// export default Products;
export default connect(({ getgroups }) => ({
    getgroups,
}))(Admin);