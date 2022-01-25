import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Input, Grid } from 'antd';
import { Link } from 'react-router-dom';
import signupBanner from '../img/img-signup-banner.png';
import { postRegister } from '../api';
// const { useBreakpoint } = Grid;
export default function SignupDetail() {
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userAccount, setUserAccount] = useState('');
    const [form] = Form.useForm();
    useEffect(() => {
        console.log(userAccount);
        if(userAccount !== ''){
            postRegister(userAccount).then((response) => {
                console.log(response)
            }).catch(
                input => {console.log(input.response)}
            )
        }
    }, [userAccount])
    const onClickRegister = () => {
        setUserAccount({
            UserName:username,
            Nickname:nickname,
            Password:password,
            ConfirmPassword:confirmPassword
        })
        // form.resetFields();
    }
    return(
        <Row>
            <Col span={10} className="signinLeftBox">
                <div className="signinTitle">Sign up</div>
                <Form
                    form={form}
                    name="signin"
                    className="signinForm"
                >
                    <div className="signupLabel">Username</div>
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
                    <div className="signupLabel">Nickname</div>
                    <Form.Item
                        name="nickname"
                        rules={[
                            {
                                required: true,
                                message:'Please input the nickname'
                            }
                        ]}
                    >
                        <Input
                            value={nickname}
                            autoComplete="off"
                            onChange={(e) => setNickname(e.target.value)}
                            className="signinInput"
                        />
                    </Form.Item>
                    <div className="signupLabel">Password</div>
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
                    <div className="signupLabel">Confirm Password</div>
                    <Form.Item
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message:'Please input the confirm password'
                            }
                        ]}
                        className="passwordForm"
                    >
                        <Input.Password
                            value={confirmPassword}
                            autoComplete="off"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="signinInput"
                        />
                    </Form.Item>
                    <Form.Item className="signinSigninButtonBox">
                        <Button
                            htmlType="submit"
                            className="signinSigninBtn signupSignupBtn"
                            onClick={onClickRegister}
                        >
                            Sign up
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
            <Col span={14}>
                <img className="banner signinBanner" alt="" src={signupBanner} />
                <Link to="/signin"><div className="signupToSignin"></div></Link>
            </Col>
        </Row>
    );
}