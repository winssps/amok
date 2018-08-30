import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, message } from 'antd';
import { routerRedux } from 'dva/router';


import RegisterForm from '../components/RegisterForm';


const { Header, Content, Footer } = Layout;

const Register = ({ dispatch, register }) => {
    function handleonSubmit(value) {
        dispatch({
            type: 'register/submit',
            payload: value,
        });
    }
    if (register.name != null) {
        message.success(register.name);
        if(register.name == "注册成功") {
           setTimeout(function () {
               dispatch(routerRedux.push({pathname: '/login',}));
           }, 2000);
        }
    }
    return (
        <Layout>
            <Header style={{ position: 'fixed', width: '100%' }}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['3']}
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
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px', marginTop: 64 }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Register</Breadcrumb.Item>
                </Breadcrumb>
                <RegisterForm onSubmitValues={handleonSubmit} />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2016 Created by Ant UED
            </Footer>
        </Layout>
    );
};


// export default ;
export default connect(({ register }) => ({
    register,
}))(Register);
