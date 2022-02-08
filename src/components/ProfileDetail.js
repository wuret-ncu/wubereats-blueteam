import React from 'react'; 
import { useState, useContext, useEffect } from 'react';
import { Row, Col, Checkbox, Popconfirm, message, Modal, Empty, Grid } from 'antd';
import { useHistory } from 'react-router-dom';
import { StoreContext } from '../store';
import { setAuthToken } from '../api';
import editIcon from '../img/icon-profile-edit.png';
import straightLine from '../img/img-profile-straightLine.png';
import profileLogout from '../img/icon-profile-logout.png';
import profileOrderRecord from '../img/icon-profile-orderRecord.png';
const { useBreakpoint } = Grid;

export default function ProfileDetail() {
    const [toLogoutVisible, setToLogoutVisible] = useState(false);
    const history=useHistory();
    const onClickToLogout = () => {
        setToLogoutVisible(true);
    }
    const handleLogout = () => {
        history.push('/')
        setAuthToken(undefined, undefined, undefined, undefined);
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
        </div>

        
        
    );
}