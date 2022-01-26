import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Input, Grid, message } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import JSEncrypt from 'jsencrypt';
import { postRegister } from '../api';
import signupBanner from '../img/img-signup-banner.png';

//-----BEGIN RSA PRIVATE KEY-----
const PRIV_KEY = `MIICXQIBAAKBgQCkOAmgcmCZokf9isn6pgwO+C2w4pywLMWND58ZM83HCzIRVQcM
Zcvxvq3l+6+LVsUiPIXwDA9TjmrrS5ag8RR/x2wS7zVSwIU/riNyNmVNUwwGmuV7
5NEsvDfIvNETI8inHpuv/cgWvCQYc8nrEEzlKnQrzeTsuVIi1JbSpyI+zwIDAQAB
AoGAIGJco6NqoWF7SOihxCgSoLEYcZV+yM9LdfHqshGhNutiSEC4Tx2UBmxP5tan
W5cU8Rd2Ykw+iX/AXf5eCgcAv5E4f9KRArQQsaP5tv5BJsy/Br2PPAcwD54gcitW
nSNgHDyxFjgqbSG7cK6iDhZWcijkgyUp4MhGZev2QbuKoMECQQDPYgaTyy7F7Ntq
vuqbQwIA5ccHu7UM5oXCPfVVWvbFryOKhsYNlu+Q6JBwMyQYVFXaRrFjEN6OivlS
/kO1WZ4HAkEAyreL8JfA1normUsd1M/zah7jz+U1j/jHf2bsSZNCR8+EwERlR0Fy
/b3mawMnJicjfa7xeG+hGcJdW1K4lcmm+QJBAJyQL9ECMwSf5aK4EZw3wVp2HoVb
E7tyiYb0ibPv4Z+qslVRnFIEIkavHORn55cqjEom1qKoyKyqhMJATVOrHZ8CQQC8
rusKHbXX7A74t/okQwqGFApnTyjzwNOvudTlBrQCsx0U+JRsJncpxr/Ziy29TWCz
c0o+l2iT2V2byvsUMIXBAkB0J+3m55J8Uo8sSdNo2aZIDmFeBYJoGw3f2AZocYVw
/r9+SQ+wlrhT6iXx+80RSMfbLs0YzPgeu0AUefAyRabN`;
//-----END RSA PRIVATE KEY-----

//-----BEGIN PUBLIC KEY-----
const PUB_KEY = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCkOAmgcmCZokf9isn6pgwO+C2w
4pywLMWND58ZM83HCzIRVQcMZcvxvq3l+6+LVsUiPIXwDA9TjmrrS5ag8RR/x2wS
7zVSwIU/riNyNmVNUwwGmuV75NEsvDfIvNETI8inHpuv/cgWvCQYc8nrEEzlKnQr
zeTsuVIi1JbSpyI+zwIDAQAB`;
// -----END PUBLIC KEY-----

function encrypt(text) {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(PUB_KEY);
    const encrypted = encrypt.encrypt(text);
    return encrypted;
}
function decrypt(text) {
    const decrypt = new JSEncrypt();
    decrypt.setPrivateKey(PRIV_KEY);
    const decrypted = decrypt.decrypt(text);
    return decrypted;
}

// const { useBreakpoint } = Grid;
export default function SignupDetail() {
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userAccount, setUserAccount] = useState('');
    const [ifEncrypt, setIfEncrypt] = useState(false);
    const [form] = Form.useForm();
    const history = useHistory();
    // useEffect(() => {
    //     let a = encrypt('123');
    //     let b = encrypt('123');
    //     console.log(a);
    //     console.log(b);
    //     let c = decrypt(a);
    //     let d = decrypt(b);
    //     console.log(c);
    //     console.log(d);
    // },[])

    useEffect(() => {
        if(userAccount !== ''){
            console.log(userAccount);
            postRegister(userAccount).then((response) => {
                console.log(response)
                form.resetFields();
                history.push('/stores');
                message.success("Successfully registered !")
                // setIfEncrypt(false);
            }).catch(
                input => {console.log(input.response)}
            )
        }
    }, [userAccount])
    // useEffect(() => {
    //     if(ifEncrypt === true) {
    //         setUserAccount({
    //             UserName:username,
    //             NickName:nickname,
    //             Password:password,
    //             ConfirmPassword:confirmPassword
    //         })
    //         form.resetFields();
    //     }
    // }, [ifEncrypt])
    const onClickRegister = () => {
        // setPassword(encrypt(password));
        // setConfirmPassword(encrypt(confirmPassword));
        // setIfEncrypt(true);
        setUserAccount({
            UserName:username,
            NickName:nickname,
            Password:password,
            ConfirmPassword:confirmPassword
        })
        
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