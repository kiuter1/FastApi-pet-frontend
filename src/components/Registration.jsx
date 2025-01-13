import React, {useContext} from 'react';

import {Button, Form, Input, message,} from 'antd';
import {AuthContext} from '../contexts/AuthContext.jsx';
import {useNavigate} from "react-router-dom";

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const Registration = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        const { username, email, password } = values;
        try {
            await register(username, email, password);
            message.success("Registration successful");
            navigate("/login")
        } catch (error) {
            message.error(error.response.data.detail);
        }
    };

    const [form] = Form.useForm();
return (
        <div>
            <div className="flex justify-center items-center">
            <h3>Registration</h3>
            </div>
            <div className="relative absolute my-auto left-1/3" >
                <Form
                    {...formItemLayout}

                    form={form}
                    name="register"
                    onFinish={handleSubmit}
                    initialValues={{
                        residence: ['zhejiang', 'hangzhou', 'xihu'],
                        prefix: '86',
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    scrollToFirstError
                >
                    <Form.Item
                        name="username"
                        label="Username"
                        tooltip="What do you want others to call you?"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" style={{ width: 400}}>
                            Register
                        </Button>
                        <p>or <a href="/login">Login</a></p>
                    </Form.Item>

                </Form>
            </div>

        </div>

    );
};
export default Registration;

