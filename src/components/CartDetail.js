import React from 'react'; 
import { useState, useContext, useEffect } from 'react';
import { Row, Col, Checkbox, Popconfirm, message, Modal, Empty } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import cartDelete from '../img/btn_cart_delete.png';
import { SET_CHECKING_VISIBLE,
         SET_TOTAL_PRICE,
         GET_CARTS_DATA
} from '../utils/constants';
import { StoreContext } from '../store';
import { getCarts } from '../api';

function CartItemList(props) {
    const { state: { checkingVisible } } = useContext(StoreContext);

    function confirm(e){
        console.log(e);
        message.success('Click on Yes');
        // 還需添加remove item事件
    }
    return(
        <Row className="cartBlockContents">
            <Col className="cartBlockContent" span={8}>{checkingVisible ? <span><Checkbox className="checkPay"></Checkbox></span> : ""}</Col>
            <Col className="cartBlockContent cartBlockContent2" span={8}>{props.item}</Col>
            <Col className="cartBlockContent cartBlockContent3" span={7}>{props.sum}</Col>
            <Col span={1}>
                <Popconfirm
                    title="Are you sure to delete this item?"
                    onConfirm={confirm}
                    okText="Yes"
                    cancelText="No"
                    placement="bottomLeft"
                >
                    <img className="cartDelete" src={cartDelete} alt="" />
                </Popconfirm>
            </Col>
        </Row>
    );
    
}

export default function CartDetail() {
    const { state: { checkingVisible, total, cartsData }, dispatch } = useContext(StoreContext);
    const [checkingBtn, setCheckingBtn] = useState(<div className="cartMarkPaying">登記付款</div>);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [modalText, setModalText] = useState('已確認完成這筆訂單嗎？')
    var lodash = require('lodash');

    useEffect(() => {
        getCarts().then((response) => {
            dispatch({
                type: GET_CARTS_DATA,
                payload: response.data
            })
        })
        let b = [];
        let a = cartsData ? cartsData.map(s => {
            b.push(s.Price);
        }) : ""
        dispatch({
            type: SET_TOTAL_PRICE,
            payload: lodash.sum(b)
        })
    }, []);

    useEffect(() => {
        let b = [];
        let a = cartsData ? cartsData.map(s => {
            b.push(s.Price);
        }) : ""
        dispatch({
            type: SET_TOTAL_PRICE,
            payload: lodash.sum(b)
        })
    }, [cartsData]);

    const onClickCheckingBtn = () => {
        dispatch({
            type: SET_CHECKING_VISIBLE,
            payload: !checkingVisible
        })
        if (checkingVisible === true){
            setCheckingBtn(<div className="cartMarkPaying">登記付款</div>)
        } else {
            setCheckingBtn(<div className="cartFinishMarking">完成登記</div>)
        }
    }

    const showModal = () => {
        setModalVisible(true);
    }
    const modalOk = () => {
        setModalText('處理中...');
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
            <div style={{display: "flex", justifyContent: "space-between", borderBottom: "0.2vw solid lightgray"}}>
                <div className="cartStoreName">大嗑蔬菜蛋餅<span className="cartPhone">(03)5777557</span></div>
                <div className="cartStoreName">Total: {total} 元</div>
            </div>
            
            <Row className="cartBlockTitles">
                <Col className="cartBlockTitle" span={8}>點餐者</Col>
                <Col className="cartBlockTitle" span={8}>項目</Col>
                <Col className="cartBlockTitle" span={8}>金額</Col>
            </Row>
            {
                cartsData ? cartsData.map(data =>
                <CartItemList key={data._id} item={data.Meals} sum={data.Price} />)
                : <Empty style={{marginTop: "10vh"}} />
            }
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