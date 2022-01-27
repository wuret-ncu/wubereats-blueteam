import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Input, Grid, message } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import signBanner from '../img/img-signin-banner.png';
import { postLogin, setAuthToken } from '../api';
// const { useBreakpoint } = Grid;
export default function SigninDetail() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userAccount, setUserAccount] = useState('');
    const [form] = Form.useForm();
    const history = useHistory();

    // useEffect(() => {
    //     setAuthToken(null)
    // }, [])

    useEffect(() => {
        if(userAccount !== '') {
            postLogin(userAccount).then((response) => {
                console.log(response);
                setAuthToken(response.data.token);
                // localStorage.setItem("token", response.data.token);
                // dispatch({
                //     type: SET_TOKEN,
                //     paload: response.data.token
                // })
                console.log(response.data.token);
                form.resetFields();
                history.push('/stores');
                message.success("Successfully logined!");
            }).catch(
                input => {console.log(input.response)}
            )
        }
    },[userAccount])
    const onClickLogin = () => {
        setUserAccount({
            UserName: username,
            Password: password
        })
    }
    return(
        <Row>
            <Col span={10} className="signinLeftBox">
                <div className="signinTitle">Login</div>
                <Form
                    form={form}
                    name="signin"
                    className="signinForm"
                >
                    <div className="signinLabel">Username / Nickname</div>
                    <Form.Item
                        name="name"
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
                            onClick={onClickLogin}
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
            <Col span={14}>
                <img className="banner signinBanner" alt="" src={signBanner} />
                <Link to="/signup"><div className="signinTosignup"></div></Link>
            </Col>
        </Row>
    );
}