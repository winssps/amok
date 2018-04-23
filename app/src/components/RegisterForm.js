import { Form, Icon, Input, Button, Checkbox } from 'antd';
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
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('repassword', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your Email!' }],
                    })(
                        <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Email" />
                    )}
                </FormItem>
                <FormItem>
                    
                    <a className="login-form-forgot" href="/#/login">直接登录</a>
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

