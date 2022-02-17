import React from 'react'; 
import { useState, useContext, useEffect } from 'react';
import { Row, Col, Checkbox, Popconfirm, message, Modal, Empty, Grid, Form, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { StoreContext } from '../store';
import { setAuthToken,
         deleteGroupByLeader, 
         deleteGroupByMembers,
         getHistories,
         editProfile
        } from '../api';
import editIcon from '../img/icon-profile-edit.png';
import straightLine from '../img/img-profile-straightLine.png';
import profileLogout from '../img/icon-profile-logout.png';
import profileOrderRecord from '../img/icon-profile-orderRecord.png';
const { useBreakpoint } = Grid;

export default function ProfileDetail() {
    const { state : { code }, dispatch } = useContext(StoreContext);
    const [toLogoutVisible, setToLogoutVisible] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [nickname, setNickname] = useState(localStorage.getItem("nickname"));
    const [postEdit, setPostEdit] = useState(null);
    const [record, setRecord] = useState('');
    const history=useHistory();
    const [form] = Form.useForm();

    useEffect(() => {
        let isMounted = true
        getHistories(localStorage.getItem("userID")).then((response) => {
            if(isMounted) {
                setRecord(response.data)
            }
        }).catch(
            input => {console.log(input.response)}
        )
        return () => {isMounted=false}
    }, [])

    useEffect(() => {
        if(postEdit !== null) {
            console.log(postEdit)
            editProfile(postEdit, localStorage.getItem("userID")).then((response) => {
                console.log(response)
                localStorage.setItem("username", username);
                localStorage.setItem("nickname", nickname);
                message.success("Successfully edited!")
            }).catch(
                input => {console.log(input.response)}
            )
        }
    }, [postEdit])

    const onClickToLogout = () => {
        setToLogoutVisible(true);
    }
    const handleLogout = () => {
        if(localStorage.getItem("groupStatus") === 'main' && code !== 'get a code') {
            deleteGroupByLeader(localStorage.getItem("userID")).then((response) => {
                console.log(response.data)
            }).catch(
                input => {console.log(input.response)}
            )
        } else if (localStorage.getItem("groupStatus") === 'members' && code !== 'get a code'){
            deleteGroupByMembers(code, localStorage.getItem("userID")).then((response) => {
                console.log(response.data)
            }).catch(
                input => {console.log(input.response)}
            )
        }
        history.push('/')
        setAuthToken(undefined, undefined, undefined, undefined);
        localStorage.setItem("groupCode", undefined);
        localStorage.setItem("orderSoloCode", undefined);
        localStorage.setItem("groupStatus", undefined);
        message.success("Successfully Logout!")
        setToLogoutVisible(false)
    }

    const onClickSaveChanges = () => {
        if(nickname === '' || username === '') {
            message.warning('名稱欄位不可空白哦！')
        } else {
            setPostEdit({
                UserName: username,
                NickName: nickname
            })
        }
    }
    return(
        <div className="profileBgc">
            <div  style={{display: "flex", justifyContent: "space-between", borderBottom: "0.2vw solid lightgray", padding:"1vw 0"}}>
                <div className="profileTitle"><span><img className="profileEditIcon" src={editIcon} alt="" /></span>Edit Profile</div>
            </div>
            <div className="editProfileFormBgc">
                <Form
                    form={form}
                    name="editProfile"
                    initialValues={{username:username, nickname:nickname}}
                >
                    <Row className="editProfileRow">
                        
                        <Col span={12} className="profileLabel" style={{display:'flex', alignItems:'center'}}>
                            Username
                            <div><img className="straightLine" src={straightLine} alt="" /></div>
                            <Form.Item>
                            <div>
                                <Input
                                    value={username}
                                    autoComplete="off"
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="profileInput"
                                />
                            </div>
                            </Form.Item>
                            {/* <span className="profileName">{localStorage.getItem("username")}</span> */}
                        </Col>
                        
                       
                        <Col span={12} className="profileLabel" style={{display:'flex', alignItems:'center'}}>
                            Nickname
                            <span><img className="straightLine" src={straightLine} alt="" /></span>
                            <Form.Item>
                            <span>
                                <Input
                                    value={nickname}
                                    autoComplete="off"
                                    onChange={(e) => setNickname(e.target.value)}
                                    className="profileInput"
                                />
                            </span>
                            </Form.Item>
                            {/* <span className="profileName">{localStorage.getItem("nickname")}</span> */}
                        </Col>
                       
                    </Row>
                    <Row className="editProfileRow">
                        <Col span={12} className="profileLabel" style={{display:'flex', alignItems:'center'}}>
                            Password
                            <div><img className="straightLine" src={straightLine} alt="" /></div>
                            <span className="resetPasswordBtn">reset password</span>
                        </Col>
                        
                        <Col span={12} className="editProfileBtns">
                        <Form.Item>
                            <Button 
                                className="saveChangesBtn"
                                htmlType="submit"
                                onClick={onClickSaveChanges}
                            >
                                Save changes
                            </Button>
                            </Form.Item>
                            
                            {/* <div className="saveChangesBtn">Save changes</div> */}
                            <div className="profileLogoutBtn" onClick={onClickToLogout}><span><img src={profileLogout} alt="" className="profileLogoutIcon" /></span>Logout</div>
                        </Col>
                        
                        <Modal
                            visible={toLogoutVisible}
                            onOk={handleLogout}
                            className="toLogoutModal"
                            width={'40vw'}
                            onCancel={()=>setToLogoutVisible(false)}
                        >
                            Are you sure to logout?
                        </Modal>
                    </Row>
                    </Form>
            </div>
            <div  style={{display: "flex", justifyContent: "space-between", borderBottom: "0.2vw solid lightgray", padding:"1vw 0", marginTop:"3vh"}}>
                <div className="profileTitle"><span><img className="profileEditIcon" src={profileOrderRecord} alt="" /></span>Past Orders</div>
            </div>
            <div className="editProfileFormBgc">
                <Row className="pastOrders">
                    <Col span={7} className="pastOrderColTitle pastOrderBorder">店家</Col>
                    <Col span={8} className="pastOrderColTitle pastOrderBorder">餐點內容</Col>
                    <Col span={4} className="pastOrderColTitle pastOrderBorder">金額</Col>
                    <Col span={5} className="pastOrderColTitle">訂購時間</Col>
                </Row>
                {
                    record ? record.List.map(item => 
                    <Row className="pastOrderContentsRow" key={nanoid()}>
                        <Col span={7} className="pastOrderContent">{item.Store.StoreName}</Col>
                        <Col span={8} className="pastOrderContent">{item.Order.Meals}</Col>
                        <Col span={4} className="pastOrderContent">{item.Order.Price}</Col>
                        <Col span={5} className="pastOrderContent">2022-02-08</Col>
                    </Row>
                    )
                    : ""
                }
                {
                    record ? <Row style={{display:'flex', justifyContent:'center', padding:'5vh 0', fontWeight:'500', fontSize:'1.6vw'}}>總花費：{record.Total}</Row> : ""
                }
                
            </div>
        </div>
    );
}