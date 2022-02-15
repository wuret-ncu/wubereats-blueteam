import React from 'react'; 
import { useState, useContext, useEffect } from 'react';
import { Row, Col, Checkbox, Popconfirm, message, Modal, Empty, Grid } from 'antd';
import { useHistory } from 'react-router-dom';
import { StoreContext } from '../store';
import { setAuthToken, deleteGroupByLeader, deleteGroupByMembers } from '../api';
import editIcon from '../img/icon-profile-edit.png';
import straightLine from '../img/img-profile-straightLine.png';
import profileLogout from '../img/icon-profile-logout.png';
import profileOrderRecord from '../img/icon-profile-orderRecord.png';
const { useBreakpoint } = Grid;

export default function ProfileDetail() {
    const { state : { code }, dispatch } = useContext(StoreContext);
    const [toLogoutVisible, setToLogoutVisible] = useState(false);
    const history=useHistory();
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
        } else if (localStorage.get("groupStatus") === 'members' && code !== 'get a code'){
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
    return(
        <div className="profileBgc">
            <div  style={{display: "flex", justifyContent: "space-between", borderBottom: "0.2vw solid lightgray", padding:"1vw 0"}}>
                <div className="profileTitle"><span><img className="profileEditIcon" src={editIcon} alt="" /></span>Edit Profile</div>
            </div>
            <div className="editProfileFormBgc">
                <Row className="editProfileRow">
                    <Col span={12} className="profileLabel">
                        Username
                        <span><img className="straightLine" src={straightLine} alt="" /></span>
                        <span className="profileName">{localStorage.getItem("username")}</span>
                    </Col>
                    <Col span={12} className="profileLabel">
                        Nickname
                        <span><img className="straightLine" src={straightLine} alt="" /></span>
                        <span className="profileName">{localStorage.getItem("nickname")}</span>
                    </Col>
                </Row>
                <Row className="editProfileRow">
                    <Col span={12} className="profileLabel">
                        Password
                        <span><img className="straightLine" src={straightLine} alt="" /></span>
                        <span className="resetPasswordBtn">reset password</span>
                    </Col>
                    <Col span={12} className="editProfileBtns">
                        <div className="saveChangesBtn">Save changes</div>
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
                <Row className="pastOrderContentsRow">
                    <Col span={7} className="pastOrderContent">大嗑蔬菜蛋餅</Col>
                    <Col span={8} className="pastOrderContent">牛肉蔥捲餅、大溫紅</Col>
                    <Col span={4} className="pastOrderContent">80</Col>
                    <Col span={5} className="pastOrderContent">2022-02-08</Col>
                </Row>
                {/* <Row className="pastOrderContentsRow">
                    <Col span={7} className="pastOrderContent">大嗑蔬菜蛋餅</Col>
                    <Col span={8} className="pastOrderContent">牛肉蔥捲餅、大溫紅</Col>
                    <Col span={4} className="pastOrderContent">80</Col>
                    <Col span={5} className="pastOrderContent">2022-02-08</Col>
                </Row> */}
            </div>
        </div>

        
        
    );
}