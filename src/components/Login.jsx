import React, { useState, useContext } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Flex } from 'antd';
import { AuthContext } from '../contexts/AuthContext.jsx';




const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const { login } = useContext(AuthContext);


    const handleSubmit = (values) => {
        const { username, password } = values;
        login(username, password);
    };

    return (
        <div>
            <div className="flex justify-center items-center">
                <h3>Login</h3>
            </div>
            <div className="mx-auto my-auto">
                <Form
                    className="mx-auto my-auto"
                    name="login"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={handleSubmit}
                    style={{ width: '360px'}}
                >
                    <Form.Item
                        style={{ width: '360px'}}
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                        style={{ width: '360px'}}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="Password"/>
                    </Form.Item>
                    <Form.Item>

                        <Flex justify="space-between" align="center">
                            <a href="">Forgot password</a>
                        </Flex>
                    </Form.Item>

                    <Form.Item>

                        <Button block type="primary" htmlType="submit" style={{width: '360px'}}>
                            Log in
                        </Button>
                        <div className="flex justify-center">
                            <p>or <a href="/registration">Register now!</a></p>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
export default Login;