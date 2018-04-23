import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb,message } from 'antd';
import { routerRedux } from 'dva/router';


import RegisterForm from '../components/RegisterForm';


const { Header, Content, Footer } = Layout;



const Register = ({ dispatch, register }) => {
    function handleonSubmit(value) { //点击删除之后，相当于路由发出了一个delete action 
        dispatch({
            type: 'register/submit',
            payload: value, 
        });
    }
    if (register.isRegister) {
        message.success("注册成功，3秒之后跳到登录界面……");
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