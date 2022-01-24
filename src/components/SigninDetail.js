import React from 'react';
import { useState } from 'react';
import { Row, Col, Form, Button, Input, Grid } from 'antd';
import { Link } from 'react-router-dom';
import signBanner from '../img/img-signin-banner.png';
import signinToSignup from '../img/btn-signin-toSignup.png';
// const { useBreakpoint } = Grid;
export default function SigninDetail() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [form] = Form.useForm();
    return(
        <Row>
            <Col span={10} className="signinLeftBox">
                <div className="signinTitle">Login</div>
                <Form
                    form={form}
                    name="signin"
                    className="signinForm"
                >
                    <div className="signinLabel">Username</div>
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message:'Please input the username'
                            }
                        ]}
                    >
                        <Input
                            value={username}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            className="signinInput"
                        />
                    </Form.Item>
                    <div className="signinLabel">Password</div>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message:'Please input the password'
                            }
                        ]}
                        className="passwordForm"
                    >
                        <Input.Password
                            value={password}
                            autoComplete="off"
                            onChange={(e) => setPassword(e.target.value)}
                            className="signinInput"
                            placeholder="英文大小寫或數字"
                        />
                    </Form.Item>
                    <Form.Item className="signinSigninButtonBox">
                        <Button
                            htmlType="submit"
                            className="signinSigninBtn"
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
            <Col span={14}>
                <img className="banner signinBanner" alt="" src={signBanner} />
                <Link to="/"><img class="signinTosignup" alt="" src={signinToSignup} /></Link>
            </Col>
        </Row>
    );
}