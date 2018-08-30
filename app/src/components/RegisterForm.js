import { Form, Icon, Input, Button } from 'antd';
import PropTypes from 'prop-types';
const FormItem = Form.Item;



const RegisterForm = ({ form, onSubmitValues }) => {

    const { getFieldDecorator, validateFields } = form;

    function handleSubmit(e) {
        e.preventDefault();
        var vs = null;
        validateFields((err, values) => {
            if (!err) { vs = values; }
        });
        onSubmitValues(vs);
    }
    return (
        <div id="#components-form-demo-normal-login" style={{ maxWidth: "300px", margin: "0 auto", }}>
            <Form onSubmit={handleSubmit} className="login-form" >
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入用户名' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('repassword', {
                        rules: [{ required: true, message: '再次输入密码' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="再次输入密码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: '请输入有效邮箱' }],
                    })(
                        <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="邮箱" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('invite', {
                        rules: [{ required: true, message: '请输入有效的邀请码' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="邀请码" />
                    )}
                </FormItem>
                <FormItem>
                    <a style={{width:"100%",height:"30px"}} className="login-form-forgot" href="/#/login">直接登录</a>
                    <Button style={{ display: "block", margin: "10px auto", width: "100%" }} type="primary" htmlType="submit" className="login-form-button">
                        注册
                    </Button>
                </FormItem>
            </Form>
        </div>
    );
};


const WrappedNormalLoginForm = Form.create()(RegisterForm);

RegisterForm.propTypes = {
    onSubmitValues: PropTypes.func.isRequired,
};

export default WrappedNormalLoginForm;
