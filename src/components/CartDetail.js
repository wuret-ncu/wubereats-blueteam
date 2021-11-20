import React from 'react'; 
import { useState} from 'react';
import { Row, Col, Checkbox, Popconfirm, message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import cartDelete from '../img/btn_cart_delete.png';

export default function CartDetail() {
    const [checkingVisible, setCheckingVisible] = useState(false);
    const [checkingBtn, setCheckingBtn] = useState(<div className="cartMarkPaying">登記付款</div>);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [modalText, setModalText] = useState('已確認完成這筆訂單嗎？')

    const onClickCheckingBtn = () => {
        setCheckingVisible(!checkingVisible);
        if (checkingVisible === true){
            setCheckingBtn(<div className="cartMarkPaying">登記付款</div>)
        } else {
            setCheckingBtn(<div className="cartFinishMarking">完成登記</div>)
        }
    }
    function confirm(e){
        console.log(e);
        message.success('Click on Yes');
        // 還需添加remove item事件
    }
    const showModal = () => {
        setModalVisible(true);
    }
    const modalOk = () => {
        setModalText('刪除中...');
        setModalLoading(true);
        setTimeout(() => {
            setModalVisible(false);
            setModalLoading(false);
        }, 2000)
        setTimeout(() => {
            setModalText('已確認完成這筆訂單嗎？');
        }, 3000)
    }
    const modalCancel = () => {
        setTimeout(() => {
            setModalVisible(false);
        }, 10)
        console.log('Clicked cancel button');
    }
    
    return(
        <div className="cartBox">
            <div className="cartTitle">Shopping Cart</div>
            <div className="cartStoreName">大嗑蔬菜蛋餅<span className="cartPhone">(03)5777557</span></div>
            <Row className="cartBlockTitles">
                <Col className="cartBlockTitle" span={8}>點餐者</Col>
                <Col className="cartBlockTitle" span={8}>項目</Col>
                <Col className="cartBlockTitle" span={8}>金額</Col>
            </Row>
            <Row className="cartBlockContents">
                <Col className="cartBlockContent" span={8}>{checkingVisible ? <span><Checkbox className="checkPay"></Checkbox></span> : ""}Jenny</Col>
                <Col className="cartBlockContent cartBlockContent2" span={8}>肉絲蛋炒飯<br />大冰紅</Col>
                <Col className="cartBlockContent cartBlockContent3" span={7}>70</Col>
                <Col span={1}>
                    <Popconfirm
                        title="Are you sure to delete this item?"
                        onConfirm={confirm}
                        okText="Yes"
                        cancelText="No"
                        placement="bottomLeft"
                    >
                        <img className="cartDelete" src={cartDelete} />
                    </Popconfirm>
                </Col>
            </Row>
            <Row className="cartBlockContents">
                <Col className="cartBlockContent" span={8}>{checkingVisible ? <span><Checkbox className="checkPay"></Checkbox></span> : ""}Jonathon</Col>
                <Col className="cartBlockContent cartBlockContent2" span={8}>紅蘿蔔炒蛋</Col>
                <Col className="cartBlockContent cartBlockContent3" span={7}>80</Col>
                <Col span={1}>
                    <Popconfirm
                        title="Are you sure to delete this item?"
                        onConfirm={confirm}
                        okText="Yes"
                        cancelText="No"
                        placement="bottomLeft"
                    >
                        <img className="cartDelete" src={cartDelete} />
                    </Popconfirm>    
                </Col>
            </Row>
            <Row className="cartBtnsBox">
                <Col className="cartBtnBox" span={3} offset={18} onClick={onClickCheckingBtn}>{checkingBtn}</Col>
                <Col className="cartBtnBox" span={3} onClick={showModal}>
                    <div className="cartFinish">完成訂單</div>
                    <Modal
                        title={<div><ExclamationCircleOutlined className="modalIcon" /><span className="modalTitle">請確認</span></div>}
                        visible={modalVisible}
                        onOk={modalOk}
                        confirmLoading={modalLoading}
                        onCancel={modalCancel}
                        className="modal"
                    >
                        <div className="modalText">{modalText}</div>
                    </Modal>
                </Col>
            </Row>
        </div>
        
    );
}