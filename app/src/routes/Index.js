import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb } from 'antd';
import { routerRedux } from 'dva/router';
import { getCookie } from '../utils/helper';

const { Header, Content, Footer } = Layout;



const Index = ({ dispatch, index }) => {
   /* function handleDelete(id) { //点击删除之后，相当于路由发出了一个delete action 
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
    }*/
    var username = getCookie("username");
    if (username === null) username = "登录";
        return (
            <Layout>
                <Header style={{ position: 'fixed', width: '100%' }}>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px' }}
                        onSelect={({ key }) => {
                            if (key === "4" && username === "登录") {
                                dispatch(
                                    routerRedux.push({
                                        pathname: '/login',
                                    }));
                            } else {
                                dispatch(
                                    routerRedux.push({
                                        pathname: '/admin',
                                    }));
                            }
                            if (key === "3") {
                                dispatch(
                                    routerRedux.push({
                                        pathname: '/reg',
                                    }));
                            }
                        }}
                    >
                        <Menu.Item key="1">主页</Menu.Item>
                        <Menu.Item key="3" style={{ "float": "right", }} >注册</Menu.Item>
                        <Menu.Item key="4" style={{ "float": "right", }} >{username}</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px', marginTop: 64 }}>


                    <h2>Amok 文件提交管理系统</h2>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2016 Created by Ant UED
            </Footer>
            </Layout>
        );
}
// export default Products;
export default connect(({ index }) => ({
    index,
}))(Index);