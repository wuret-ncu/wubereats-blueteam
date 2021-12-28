import React from 'react'; 
import { useState, useContext, useEffect } from 'react';
import { Row, Col, Checkbox, Popconfirm, message, Modal, Empty, Grid } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import cartDelete from '../img/btn_cart_delete.png';
import draw from '../img/btn-draw.png';
import { SET_CHECKING_VISIBLE,
         GET_CARTS_DATA
} from '../utils/constants';
import { StoreContext } from '../store';
import { getCarts, getDrinksStores, getFoodsStores, getUsingUser } from '../api';
const { useBreakpoint } = Grid;
function CartItemList(props) {
    const { state: { checkingVisible } } = useContext(StoreContext);
    const { sm } = useBreakpoint();
    const cartBlockContent = sm ? "cartBlockContent" : "cartBlockContentMobile";
    const cartBlockContents = sm ? "cartBlockContents" : "cartBlockContentsMobile";
    const cartBlockContent2 = sm ? "cartBlockContent2" : "cartBlockContent2Mobile";
    const cartBlockContent3 = sm ? "cartBlockContent cartBlockContent3" : "cartBlockContent cartBlockContent3Mobile";

    function confirm(e){
        console.log(e);
        message.success('Click on Yes');
        // 還需添加remove item事件
    }

    return(
        <Row className={cartBlockContents}>
            {
                sm ? 
                <>
                    <Col className={cartBlockContent} span={8}>{checkingVisible ? <span><Checkbox className="checkPay"></Checkbox></span> : ""}Jenny</Col>
                    <Col className="cartBlockContent cartBlockContent2" span={8}>{props.item}</Col>
                </> : 
                <Col span={16} className={cartBlockContent}>
                    <div>{checkingVisible ? <span><Checkbox className="checkPay"></Checkbox></span> : ""}Jenny</div>
                    <div className={cartBlockContent2}>{props.item}</div>
                </Col>
            }
            <Col className={cartBlockContent3} sm={{span:7}} push={5}>{props.sum}</Col>
            {
                sm ? 
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
                </Col> : ""
            }
        </Row>
    );
}

export default function CartDetail() {
    const { state: { checkingVisible, cartsData }, dispatch } = useContext(StoreContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [modalText, setModalText] = useState('已確認完成這筆訂單嗎？');
    const [drawFoodResult, setDrawFoodResult] = useState("");
    const [drawDrinkResult, setDrawDrinkResult] = useState("");
    const [drawUserResult, setDrawUserResult] = useState("");
    // var lodash = require('lodash');
    const { sm } = useBreakpoint();
    const cartMarkPaying = sm ? "cartMarkPaying" : "cartMarkPayingMobile";
    const cartFinishMarking = sm ? "cartFinishMarking" : "cartFinishMarkingMobile";
    const cartTitle = sm ? "cartTitle" : "cartTitleMobile";
    const cartStoreName = sm ? "cartStoreName" : "cartStoreNameMobile";
    const cartPhone = sm ? "cartPhone" : "cartPhoneMobile";
    const cartStoreMoney = sm ? "cartStoreName" : "cartStoreMoneyMobile";
    const cartFinish = sm ? "cartFinish" : "cartFinishMobile";
    const cartBtnsBox = sm ? "cartBtnsBox" : "cartBtnsBoxMobile";
    const modal = sm ? "modal" : "modalMobile";
    const [checkingBtn, setCheckingBtn] = useState("登記付款");
    const [drawVisible, setDrawVisible] = useState(false);

    useEffect(() => {
        getCarts().then((response) => {
            dispatch({
                type: GET_CARTS_DATA,
                payload: response.data
            })
        })
        // let b = [];
        // let a = cartsData ? cartsData.map(s => {
        //     b.push(s.Price);
        // }) : ""
        // dispatch({
        //     type: SET_TOTAL_PRICE,
        //     payload: lodash.sum(b)
        // })
    }, []);

    // useEffect(() => {
    //     let b = [];
    //     let a = cartsData ? cartsData.map(s => {
    //         b.push(s.Price);
    //     }) : ""
    //     dispatch({
    //         type: SET_TOTAL_PRICE,
    //         payload: lodash.sum(b)
    //     })
    // }, [cartsData]);

    const onClickCheckingBtn = () => {
        dispatch({
            type: SET_CHECKING_VISIBLE,
            payload: !checkingVisible
        })
        if (checkingVisible === true){
            setCheckingBtn("登記付款")
        } else {
            setCheckingBtn("完成登記")
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
    const onClickDraw = () => {
        setDrawVisible(true);
    }
    const handleCancel = () => {
        setDrawVisible(false);
    }
    const onClickDrawFood = () => {
        getFoodsStores().then((response) => {
            let i = 0;
            response.data.map(() => {
                i = i + 1;
            })
            setDrawFoodResult(response.data[Math.floor(Math.random()*i)].StoreName);
        })
    }
    const onClickDrawDrink = () => {
        getDrinksStores().then((response) => {
            let i = 0;
            response.data.map(() => {
                i = i + 1;
            })
            setDrawDrinkResult(response.data[Math.floor(Math.random()*i)].StoreName);
        })
    }
    const onClickDrawUser = () => {
        getUsingUser().then((response) => {
            let i = 0;
            response.data.map(() => {
                i = i + 1;
            })
            setDrawUserResult(response.data[0].User_info[Math.floor(Math.random()*i)].UserName);
        })
    }

    return(
        <div className="cartBox">
            <div onClick={onClickDraw}><img src={draw} alt="" className="draw" /></div>
            <Modal 
                title="Click to start the draw" 
                visible={drawVisible} 
                className="drawModalBox"
                width={'60vw'}
                footer={null}
                onCancel={handleCancel}
                >
                <Row>
                    <Col span={8} className="drawCol">
                        <div className="drawTitle" onClick={onClickDrawFood}>吃什麼</div>
                        <div className="drawResult">{drawFoodResult}</div>
                    </Col>
                    <Col span={8} className="drawCol">
                        <div className="drawTitle" onClick={onClickDrawDrink}>喝什麼</div>
                        <div className="drawResult">{drawDrinkResult}</div>
                    </Col>
                    <Col span={8} className="drawCol">
                        <div className="drawTitle" onClick={onClickDrawUser}>誰訂餐</div>
                        <div className="drawResult">{drawUserResult}</div>
                    </Col>
                </Row>
                
            </Modal>
            <div className={cartTitle}>Shopping Cart</div>
            <div style={{display: "flex", justifyContent: "space-between", borderBottom: "0.2vw solid lightgray"}}>
                <div className={cartStoreName}>大嗑蔬菜蛋餅<span className={cartPhone}>(03)5777557</span></div>
                {/* <div className={cartStoreMoney}>Total: {total} 元</div> */}
            </div>
            {
                sm ? 
                <Row className="cartBlockTitles">
                    <Col className="cartBlockTitle" span={8}>點餐者</Col>
                    <Col className="cartBlockTitle" span={8}>項目</Col>
                    <Col className="cartBlockTitle" span={8}>金額</Col>
                </Row> : 
                ""
            }
            
            {
                cartsData ? cartsData.map(data =>
                <CartItemList key={data._id} item={data.Meals} sum={data.Price} />)
                : <Empty style={{marginTop: "10vh"}} />
            }
            <Row className={cartBtnsBox}>
                <Col className="cartBtnBox" sm={{span:3, offset:18}} span={9} offset={6} onClick={onClickCheckingBtn}><div className={cartMarkPaying}>{checkingBtn}</div></Col>
                <Col className="cartBtnBox" sm={{span:3}} span={9} onClick={showModal}>
                    <div className={cartFinish}>完成訂單</div>
                    <Modal
                        title={<div><ExclamationCircleOutlined className="modalIcon" /><span className="modalTitle">請確認</span></div>}
                        visible={modalVisible}
                        onOk={modalOk}
                        confirmLoading={modalLoading}
                        onCancel={modalCancel}
                        className={modal}
                    >
                        <div className="modalText">{modalText}</div>
                    </Modal>
                </Col>
            </Row>
        </div>
        
    );
}