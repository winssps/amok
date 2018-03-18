import { Form, Icon, Input, Button, Checkbox } from 'antd';
import PropTypes from 'prop-types';
const FormItem = Form.Item;



const LoginForm = ({form, onSubmitValues }) => {

    const { getFieldDecorator, validateFields } = form;

    function handleSubmit(e) {
        e.preventDefault();
        var vs = null;
        validateFields((err, values) => {
            if (!err) { vs = values; }
        });
        onSubmitValues(vs);
    };
    return (
        <div id="#components-form-demo-normal-login" style={{maxWidth: "300px",margin: "0 auto",}}>
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
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                        )}
                    <a className="login-form-forgot" href="">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </FormItem>
            </Form>
        </div>
    );
};


const WrappedNormalLoginForm = Form.create()(LoginForm);

LoginForm.propTypes = {
    onSubmitValues: PropTypes.func.isRequired,
};

export default WrappedNormalLoginForm;

