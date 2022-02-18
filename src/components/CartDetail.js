import React from 'react'; 
import { useState, useContext, useEffect } from 'react';
import { Row, Col, Checkbox, Popconfirm, message, Modal, Empty, Grid } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';
import cartDelete from '../img/btn_cart_delete.png';
import draw from '../img/btn-draw.png';
import { SET_CHECKING_VISIBLE,
         GET_CARTS_DATA,
         SET_CARTITEM_DELETED
} from '../utils/constants';
import { StoreContext } from '../store';
import { getAllCarts, 
         getDrinksStores, 
         getFoodsStores, 
         deleteADish, 
         getUsingUser
        } from '../api';
const { useBreakpoint } = Grid;
function CartItemList(props) {
    const { state: { checkingVisible , deleteFlag } , dispatch } = useContext(StoreContext);
    const { sm } = useBreakpoint();
    const cartBlockContent = sm ? "cartBlockContent" : "cartBlockContentMobile";
    const cartBlockContents = sm ? "cartBlockContents" : "cartBlockContentsMobile";
    const cartBlockContent2 = sm ? "cartBlockContent2" : "cartBlockContent2Mobile";
    const cartBlockContent3 = sm ? "cartBlockContent cartBlockContent3" : "cartBlockContent cartBlockContent3Mobile";

    function confirm(e){
        console.log(e);
        // 還需添加remove item事件
        deleteADish(props.id).then((response) => {
            console.log(response);
            dispatch({
                type: SET_CARTITEM_DELETED,
                payload: !deleteFlag
            })
            message.success('Successfully deleted!');
        }).catch(
            input => {console.log(input.response)}
        )
    }

    return(
        <Row className={cartBlockContents}>
            {
                sm ? 
                <>
                    <Col className={cartBlockContent} span={8}>{checkingVisible ? <span><Checkbox className="checkPay"></Checkbox></span> : ""}{props.name}</Col>
                    <Col className="cartBlockContent cartBlockContent2" span={12}>{props.item}</Col>
                </> : 
                <Col span={16} className={cartBlockContent}>
                    <div>{checkingVisible ? <span><Checkbox className="checkPay"></Checkbox></span> : ""}{props.name}</div>
                    <div className={cartBlockContent2}>{props.item}</div>
                </Col>
            }
            <Col className={cartBlockContent3} sm={{span:3}}>{props.sum}</Col>
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
    const { state: { checkingVisible , cartsData , deleteFlag , code }, dispatch } = useContext(StoreContext);
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
        if(String(localStorage.getItem("groupCode")) === 'undefined') {
            getAllCarts(localStorage.getItem("orderSoloCode")).then((response) => {
                console.log(response.data)
                dispatch({
                    type: GET_CARTS_DATA,
                    payload: response.data
                })
                // response.data.map(i => {
                //     console.log(i.Store_info[0].StoreName)
                //     console.log(i.Store_info[0].Phone)
                //     i.TotalList.map(j => {
                //         console.log(j.User_info[0].UserName)
                //         console.log(j.OrderList.Meals)
                //         console.log(j.OrderList.Price)
                //     })
                // })
            }).catch(
                input => {console.log(input.response)}
            )
        } else {
            getAllCarts(localStorage.getItem("groupCode")).then((response) => {
                console.log(response.data)
                dispatch({
                    type: GET_CARTS_DATA,
                    payload: response.data
                })
                // response.data.map(i => {
                //     console.log(i.Store[0].StoreName)
                //     console.log(i.Store[0].Phone)
                //     i.TotalList.map(j => {
                //         console.log(j.User[0].NickName)
                //         console.log(j.OrderList.Meals)
                //         console.log(j.OrderList.Price)
                //     })
                // })
            }).catch(
                input => {console.log(input.response)}
            )
        }
    }, [deleteFlag]);

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
        if(code !== 'get a code') {
            getUsingUser(code).then((response) => {
                // console.log(response.data[0].user.UserName);
                // let i = 0;
                // response.data.map(() => {
                //     return(i = i + 1)
                // })
                // setDrawUserResult(response.data[0].User_info[Math.floor(Math.random()*i)].UserName);
                setDrawUserResult(response.data[0].user.NickName);
            }).catch(
                input => {console.log(input.response)}
            )
        } else {
            message.warning("尚未加入團購無法使用此功能，快去取得團購碼吧！")
        }
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
                    {
                        String(localStorage.getItem("orderSoloCode")) !== 'undefined' ?
                        "" :
                        <Col span={8} className="drawCol">
                            <div className="drawTitle" onClick={onClickDrawUser}>誰訂餐</div>
                            <div className="drawResult">{drawUserResult}</div>
                        </Col>
                    }
                    
                </Row>
                
            </Modal>
            <div className={cartTitle}>Shopping Cart</div>
            {
                cartsData ? cartsData.map((store) => (
                <div key={nanoid()}>
                    <div style={{display: "flex", justifyContent: "space-between", borderBottom: "0.2vw solid lightgray", marginTop:'2vh'}}>
                        <div className={cartStoreName}>{store.Store[0].StoreName}<span className={cartPhone}>{store.Store[0].Phone}</span></div>
                        <div className={cartStoreMoney}>Total: {store.Total} 元</div>
                    </div>
                    {
                        sm ? 
                        <Row className="cartBlockTitles">
                            <Col className="cartBlockTitle" span={8}>點餐者</Col>
                            <Col className="cartBlockTitle" span={12}>項目</Col>
                            <Col className="cartBlockTitle" span={4}>金額</Col>
                        </Row> : 
                        ""
                    }
                    {
                        store.TotalList.map(data =>
                        <CartItemList key={data.OrderList._id} id={data.OrderList._id} name={data.User[0].UserName} item={data.OrderList.Meals} sum={data.OrderList.Price} />)
                    }
                    <Row className={cartBtnsBox}>
                        <Col className="cartBtnBox" sm={{span:3, offset:18}} span={9} offset={6} onClick={onClickCheckingBtn}>
                            <div className={cartMarkPaying}>{checkingBtn}</div>
                        </Col>
                        <Col className="cartBtnBox" sm={{span:3}} span={9} onClick={showModal}>
                            <div className={cartFinish}>完成訂單</div>
                            <Modal
                                title={<div><ExclamationCircleOutlined className="modalIcon" /><span className="modalTitle">請確認</span></div>}
                                visible={modalVisible}
                                onOk={modalOk}
                                confirm={modalLoading}
                                onCancel={modalCancel}
                                className={modal}
                            >
                                <div className="modalText">{modalText}</div>
                            </Modal>
                        </Col>
                    </Row>
                </div>
                )) : <Empty style={{marginTop:"10vh"}}/>
            }
            
        </div>
        
    );
}