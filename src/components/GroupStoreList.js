import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Row, Col, Card, Empty, Popover, Divider, Popconfirm, message, Grid, Tabs, Modal, Form, Input, Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { nanoid } from 'nanoid';
import storeDot from '../img/img-store-dot.png';
import line from '../img/img-store-line.png';
import searchDelete from '../img/btn_cart_delete.png';
import storeMore from '../img/btn-store-more.png';
import addStoreMobile from '../img/btn-store-add-mobile.png';
import draw from '../img/btn-draw.png';
import groupOrderBtn from '../img/btn-store-groupOrder.png';
import groupOrderHover from '../img/img-store-groupCodeHover.png';
import groupOrderModalOrLine from '../img/img-store-groupOrderModalOrLine.png';
import getCodeBtn from '../img/btn-store-getCode.png';
import filledStar from '../img/img-menu-filledStar.png';
import straightLine from '../img/img-storeList-straightLine.png';
import { getDrinksStores,
         getFoodsStores, 
         deleteAStore,
         getAuthToken, 
         getScores,
         getCode,
         postGroupCode,
         getUsingUser,
         deleteGroupByLeader,
         deleteGroupByMembers } from '../api/index';
import { StoreContext } from '../store';
import { SET_SEARCH_VALUE,
         SET_ENTRY_SEARCH_BTN,
         SET_DELETE_STORE,
         SET_GROUP_ORDER_MODAL_VISIBLE,
         SET_GROUP_ORDER_CODE,
         SET_DRAWER_SUM
} from '../utils/constants';
const { useBreakpoint } = Grid;
const { TabPane } = Tabs;

function Cards(props) {
    const { state: { deleteStore, code } , dispatch } = useContext(StoreContext);
    const [score, setScore] = useState('無評分紀錄');
    const { sm } = useBreakpoint();
    const card = sm ? "card" : "cardMobile";
    const storeLine = sm ? "storeLine" : "storeLineMobile";
    const informationDetail = sm ? "informationDetail" : "informationDetailMobile";
    const informationDetail2 = sm ? "informationDetail" : "informationDetailMobile2";
    const storeMoreClass = sm ? "storeMore" : "storeMoreMobile"
    const storeToMenu = sm ? "storeToMenu" : "storeToMenuMobile";
    const storeToMenuWord = sm ? "storeToMenuWord" : "storeToMenuWordMobile";
    const history = useHistory();

    const onClickToSigninAlert3 = () => {
        message.warning("請先登入才可操作哦")
        history.push('/signin');
    }
    useEffect(() => {
        let isMounted = true;
        getScores(props.id).then((response) => {
            if(response.data.length !== 0 && isMounted) {
                let ss = response.data[0].avgScore.toFixed(1)
                setScore(ss);
            }
        }).catch(
            input => {console.log(input.response)}
        )
        return () => {isMounted=false}
    }, [score])
    const content=(
        <div className="storeCard">
            {
                getAuthToken() !== 'null' ?
                <Link to={`/edit/${props.id}`} className="popOverText">
                    Edit
                </Link> :
                <Link to={`/signin`} className="popOverText" onClick={onClickToSigninAlert3}>
                    Edit
                </Link>
            }
            <Divider className="storeDivider" />
            {
                getAuthToken() !== 'null' ?
                <Popconfirm
                    placement="bottomLeft"
                    title={"Are you sure to delete this store?"}
                    onConfirm={() => {
                        deleteAStore(props.id).then((response) => {
                            console.log(response);
                            dispatch({
                                type: SET_DELETE_STORE,
                                payload: !deleteStore
                            })
                            message.success("Successfully deleted !")
                        }).catch(
                            input => {console.log(input.response)}
                        )
                    }}
                    okText="Yes"
                    cancelText="No"
                    overlayClassName="storeConfirm"
                >
                    <div className="popOverText">Delete</div>
                </Popconfirm> :
                 <div className="popOverText" onClick={onClickToSigninAlert3}>Delete</div>
            }
        </div>
    );

    const onClickToSigninAlert = () => {
        message.warning("請先登入即可開始點餐！")
        history.push('/signin');
    }

    return(
        <Card 
            size="small" 
            key={props.id} 
            title={props.name} 
            extra={
            <Popover content={content} placement="bottomLeft" trigger="click" className="storeMoreBox" overlayStyle={{width: "8.5vw"}}>
                <img className={storeMoreClass} src={storeMore} alt="" />
            </Popover>} 
            className={card}
        >
            <Row align="bottom">
                <Col span={2}><img className={storeLine} src={line} alt="" /></Col>
                <Col span={12} className="storeInformation">
                    <div className={informationDetail}>
                        評分等級： {score}
                        {score !== '無評分紀錄' ? <img className="storeListStar" key={nanoid()} alt="" src={filledStar} /> :
                        ""}
                    </div>
                    <div className={informationDetail2}>公休日： {props.restDay}</div>
                </Col>
                <Col span={7} offset={3} className={storeToMenu}>
                    {getAuthToken() !== 'undefined' && code !== 'get a code' ?
                        <Link to={`/menu/${props.id}`} className={storeToMenuWord}>前往點餐 {'>>'}</Link> : 
                        getAuthToken() === 'undefined' ? 
                         <div className={storeToMenuWord} onClick={onClickToSigninAlert}>前往點餐 {'>>'}</div> : 
                         <div className={storeToMenuWord} onClick={() => {
                            dispatch({
                                type: SET_GROUP_ORDER_MODAL_VISIBLE,
                                payload: true
                            })
                         }}>前往點餐 {'>>'}</div>
                    }
                </Col>
            </Row>                        
        </Card>
    );
}

export default function GroupStoreList() {
    const { state: { search, entrySearchBtn, deleteStore, groupOrderModalVisible, code }, dispatch } = useContext(StoreContext);
    const [foodDatas, setFoodData] = useState(null);
    const [drinkDatas, setDrinkData] = useState(null);
    const [drawVisible, setDrawVisible] = useState(false);
    const [drawFoodResult, setDrawFoodResult] = useState("");
    const [drawDrinkResult, setDrawDrinkResult] = useState("");
    const [drawUserResult, setDrawUserResult] = useState("");
    const [joinCode, setJoinCode] = useState('');
    const [userID, setUserID] = useState(null);
    const [groupCode, setGroupCode] = useState('');
    const [postJoinCode, setPostJoinCode] = useState(null);
    const { sm } = useBreakpoint();
    const [form] = Form.useForm();
    const history = useHistory();
    const storeBgc = sm ? "storeBgc" : "storeBgcMobile"
    const storeSearchBgc = sm ? "groupStoreSearchBgc" : "storeSearchBgcMobile";
    const storeSearchInput = sm ? "storeSearchInput" : "storeSearchInputMobile";
    const searchDeleteClass = sm ? "searchDeleteClass" : "searchDeleteClassMobile";
    const searchBtn = sm ? "searchBtn" : "searchBtnMobile";
    const listBgc = sm ? "listBgc" : "listBgcMobile";

    useEffect(() => {
        let isMounted=true;
        if(String(postJoinCode) !== 'null') {
            postGroupCode(postJoinCode).then((response) => {
                console.log(response.data);
                if(isMounted) {
                    localStorage.setItem("groupCode", joinCode)
                }
                
            }).catch(
                input => {console.log(input.response)}
            )
        }
        return () => {isMounted = false}
    }, [postJoinCode])

    useEffect(() => {
        let isMounted=true;
        getFoodsStores().then((response) => {
            const foodResult = response.data.filter(data => data.StoreName.includes(search));
            if(foodResult.length !== 0 && isMounted){
                setFoodData(foodResult);
            }
        })
        getDrinksStores().then((response) => {
            const drinkResult = response.data.filter(data => data.StoreName.includes(search));
            if(drinkResult.length !== 0 && isMounted) {
                setDrinkData(drinkResult);
            }
        })
        return () => {isMounted = false}
    }, [deleteStore])

    useEffect(() => {
        let isMounted = true;
        if(isMounted) {
            setUserID({
                user: localStorage.getItem("userID")
            })
            if(String(localStorage.getItem("groupCode")) !== 'undefined') {
                dispatch({
                    type: SET_GROUP_ORDER_CODE,
                    payload: localStorage.getItem("groupCode")
                })
                setGroupCode(localStorage.getItem("groupCode"))
            } else {
                dispatch({
                    type: SET_GROUP_ORDER_CODE,
                    payload: 'get a code'
                })
                dispatch({
                    type: SET_GROUP_ORDER_MODAL_VISIBLE,
                    payload: true
                })
                setJoinCode('')
            }
        }
        return () => {isMounted=false}
    }, [])

    useEffect(() => {
        let isMounted = true
        if(entrySearchBtn === null) {
            dispatch({
                type: SET_SEARCH_VALUE,
                payload: ``
            })
        } else {
            getFoodsStores().then((response) => {
                const foodResult = response.data.filter(data => data.StoreName.includes(search));
                if(foodResult.length !== 0 && isMounted){
                    setFoodData(foodResult);
                }
            })
            getDrinksStores().then((response) => {
                const drinkResult = response.data.filter(data => data.StoreName.includes(search));
                if(drinkResult.length !== 0 && isMounted) {
                    setDrinkData(drinkResult);
                }
            })   
            dispatch({
                type: SET_ENTRY_SEARCH_BTN,
                payload: null
            })    
        }
        return () => {isMounted = false}
    }, [entrySearchBtn])

    useEffect(() => {
        let isMounted = true;
        if(search === ``) {
            getFoodsStores().then((response) => {
                if(response.data.length !== 0 && isMounted){
                    setFoodData(response.data);
                }
            })
            getDrinksStores().then((response) => {
                if(response.data.length !== 0 && isMounted) {
                    setDrinkData(response.data);
                }
            })
        }
        return () => {isMounted = false}
    }, [search])

    const onClickSearch = () => {
        getFoodsStores().then((response) => {
            const foodResult = response.data.filter(data => data.StoreName.includes(search));
            setFoodData(foodResult);
        })
        getDrinksStores().then((response) => {
            const drinkResult = response.data.filter(data => data.StoreName.includes(search));
            setDrinkData(drinkResult);
        })
    }
    const onClickSearchDeleteBtn = () => {
        dispatch({
            type: SET_SEARCH_VALUE,
            payload: ``
        })
    }
    const onClickDraw = () => {
        setDrawVisible(true);
    }
    const handleCancel = () => {
        setDrawVisible(false);
        dispatch({
            type: SET_GROUP_ORDER_MODAL_VISIBLE,
            payload: false
        })
    }
    const onClickDrawFood = () => {
        let i = 0;
        foodDatas.map(() => {
            return(i = i + 1)
        })
        if(foodDatas.length !== 0) {
            setDrawFoodResult(foodDatas[Math.floor(Math.random()*i)].StoreName);
        }
        
    }
    const onClickDrawDrink = () => {
        let i = 0;
        drinkDatas.map(() => {
            return(i = i + 1)
        })
        if (drinkDatas.length !== 0){
            setDrawDrinkResult(drinkDatas[Math.floor(Math.random()*i)].StoreName);
        } 
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
    const onClickGroupOrderBtn = () => {
        dispatch({
            type: SET_GROUP_ORDER_MODAL_VISIBLE,
            payload: true
        })
    }
    const onClickToSigninAlert = () => {
        message.warning("請先登入即可開始團購")
        history.push('/signin');
    }
    const onClickToSigninAlert2 = () => {
        message.warning("請先登入即可開始新增店家")
    }
    const onClickGetCode = () => {
        if(String(localStorage.getItem("userID")) !== 'undefined') {
            if(String(localStorage.getItem("orderSoloCode")) !== 'undefined') {
                localStorage.setItem("orderSoloCode", undefined);
            }
            if(String(localStorage.getItem("groupCode")) === 'undefined') {
                getCode(userID).then((response) => {
                    console.log(response.data);
                    setGroupCode(response.data.groupBuyCode)
                    dispatch({
                        type: SET_GROUP_ORDER_CODE,
                        payload: response.data.groupBuyCode
                    })
                    localStorage.setItem("groupCode", response.data.groupBuyCode)
                    localStorage.setItem("groupStatus", 'main');
                }).catch(
                    input => {console.log(input.response)}
                )
            } else {
                message.warning("已經取得過團購碼了哦！")
            }
        } else {
            message.warning("請先登入即可開始團購")
            dispatch({
                type: SET_GROUP_ORDER_MODAL_VISIBLE,
                payload: false
            })
            history.push('/signin');
        }
    }

    const onClickJoin = () => {
        if(getAuthToken !== 'undefined') {
            if(joinCode !== '') {
                if(localStorage.getItem("groupCode") !== joinCode) {
                    setPostJoinCode({
                        member: localStorage.getItem("userID"),
                        groupBuyCode: joinCode
                    })
                    localStorage.setItem("groupStatus", 'members');
                } else {
                    message.warning("已經在此團購訂單中囉！")
                    form.resetFields();
                }
            } else {
                message.warning("不可空白提交哦！")
            }
        } else {
            message.warning("請先登入即可開始團購")
            history.push('/signin');
        }
    }

    const onClickCancelGroupOrder = () => {
        if(code !== 'get a code') {
            if(localStorage.getItem("groupStatus") === 'main') {
                deleteGroupByLeader(localStorage.getItem("userID")).then((response) => {
                    console.log(response.data)
                }).catch(
                    input => {console.log(input.response)}
                )
            } else {
                deleteGroupByMembers(code, localStorage.getItem("userID")).then((response) => {
                    console.log(response.data)
                }).catch(
                    input => {console.log(input.response)}
                )
            }
        }
        dispatch({
            type: SET_DRAWER_SUM,
            payload: 0
        })
        localStorage.setItem("groupCode", undefined);
        localStorage.setItem("groupStatus", undefined);
    }

    return(
        <div className={storeBgc}>
            <Row>
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
                {sm ? 
                    <Col span={5} className="storeSlogan groupStoresSlogan">
                        <div>Now: Group order</div>
                        <div><img className="groupStoreListStraightLine" alt="" src={straightLine} /></div>
                    </Col> : 
                    <Col span={24} className="storeSloganMobile">
                        Choose what to eat...
                    </Col>
                }
                {
                    getAuthToken() !== 'undefined' ?
                    <Col sm={{span:4}} className="groupStoreListGetACode" onClick={onClickGroupOrderBtn}>
                        <div>{code}</div>
                        <div><img className="groupStoreListStraightLine" alt="" src={straightLine} /></div>
                    </Col> : 
                    <Col sm={{span:4}} className="groupStoreListGetACode" onClick={onClickGroupOrderBtn}>
                        <div>{code}</div>
                        <div><img className="groupStoreListStraightLine" alt="" src={straightLine} /></div>
                    </Col> 
                }
                <Modal
                    visible={groupOrderModalVisible}
                    className="groupOrderModalBox"
                    width={'70vw'}
                    footer={null}
                    onCancel={handleCancel}
                >
                    <Row>
                        <Col span={11} className="groupOrderModalInnerBox">
                            <div onClick={onClickGetCode}><img alt="" src={getCodeBtn} className="getCodeBtn" /></div>
                            <div className="getCodeText">Your group order code:</div>
                            {
                                code === 'get a code' ?
                                <div className="code"></div> :
                                <div className="code">{code}</div>
                            }
                            <div className="shareCodeText">Please share the code with your members.</div>
                        </Col>
                        <Col span={2} className="groupOrderModalOrLineBox"><img alt="" src={groupOrderModalOrLine} className="groupOrderModalOrLine" /></Col>
                        <Col span={11} className="groupOrderModalInnerBox">
                            <div className="inputCodeText inputCodeText1">Join other's group order.</div>
                            <div className="inputCodeText">Please enter the code below.</div>
                            <Form
                                form={form}
                                name="inputCode"
                                style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}
                            >
                                <div className="inputCodeBox">
                                    <Form.Item
                                        name="codeString"
                                        rules={[
                                            {required:true}
                                        ]}
                                    >
                                        <Input
                                            value={joinCode}
                                            autoComplete="off"
                                            onChange={(e) => setJoinCode(e.target.value)}
                                            className="inputCode"
                                        />
                                    </Form.Item>
                                </div>
                                <Form.Item>
                                    <Button
                                        htmlType="submit"
                                        className="confirmCode"
                                        onClick={onClickJoin}
                                    >
                                        Join
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Modal>
                <Col span={5} className="groupStoreListCancel">
                    <Link to="stores" className="groupStoreListCancel" onClick={onClickCancelGroupOrder}>
                        Cancel
                    </Link>
                </Col>
                <Col sm={{span:7}} span={21} className={storeSearchBgc}>
                    <input
                        name='searchBar'
                        type='text'
                        onChange={e => {
                            dispatch({
                                type: SET_SEARCH_VALUE,
                                payload: e.target.value
                            })
                        }}
                        placeholder='搜尋店家...'
                        value={search}
                        className={storeSearchInput}
                        autoComplete='off'
                    /> 
                    <div 
                        className="searchDeleteBox"
                        onClick={onClickSearchDeleteBtn}
                    >
                        <img src={searchDelete} className={searchDeleteClass} alt="" />
                    </div>
                    <button
                        className={searchBtn}
                        onClick={onClickSearch}
                    >
                        Search
                    </button>
                </Col>
                
                {sm ? 
                    <>
                    {
                        getAuthToken() !== 'undefined' ?
                        <Col span={3}>
                            <Link to="/addStore" className="groupAddMenuBtn"><span className="addMenuPlus">+</span> Add a store</Link> 
                        </Col> :
                        <Col span={3}>
                            <Link to="/signin" className="groupAddMenuBtn" onClick={onClickToSigninAlert2}><span className="addMenuPlus">+</span> Add menu</Link> 
                        </Col>
                    } 
                    </> : 
                    <>
                    {
                        getAuthToken() !== 'undefined' ?
                        <Col span={4} className="addStoreBoxMobile">
                            <Link to="/addStore"><img className="addStoreMobile" src={addStoreMobile} alt="" /></Link> 
                        </Col> :
                        <Col span={4} className="addStoreBoxMobile">
                            <Link to="/signin" onClick={onClickToSigninAlert2}><img className="addStoreMobile" src={addStoreMobile} alt="" /></Link> 
                        </Col>
                    } 
                    </>
                }
            </Row>
            <Row className={listBgc}>
                {sm ? 
                    <>
                        <Col span={11} className="listBox">
                            <div className="listTitleAll"><img src={storeDot} className="storeDot" alt=""/><span className="listTitle">Foods</span></div>
                            <div className="cardBox">
                                {
                                    foodDatas ? foodDatas.map(store => 
                                    <Cards key={store._id} id={store._id} name={store.StoreName} phone={store.Phone} restDay={store.RestDate} type={store.StoreType} menuUrl={store.MenuUrl}/>)
                                     : <Empty style={{marginTop:'10vh'}} />
                                }
                            </div>
                        </Col>
                        <Col span={11} offset={2} className="listBox">
                            <div className="listTitleAll"><img src={storeDot} className="storeDot" alt=""/><span className="listTitle">Drinks</span></div>
                            <div className="cardBox">
                                {
                                    drinkDatas ? drinkDatas.map(store => 
                                    <Cards key={store._id} id={store._id} name={store.StoreName} phone={store.Phone} restDay={store.RestDate} type={store.StoreType} menuUrl={store.MenuUrl}/>)
                                     : <Empty style={{marginTop:'10vh'}} />
                                }
                            </div>
                        </Col>
                    </> : 
                    <Tabs defaultActiveKey="1" centered className="tabBox" tabBarStyle={{borderBottom:'0.1vh solid #A0B9B6'}}>
                        <TabPane tab="Foods" key="1" className="listBox">
                            <div className="cardBoxMobile">
                                {
                                    foodDatas ? foodDatas.map(store => 
                                    <Cards key={store._id} id={store._id} name={store.StoreName} phone={store.Phone} restDay={store.RestDate} type={store.StoreType} menuUrl={store.MenuUrl}/>)
                                     : <Empty style={{marginTop:'10vh'}} />
                                }
                            </div>
                        </TabPane>
                        <TabPane tab="Drinks" key="2" className="listBox">
                            <div className="cardBoxMobile">
                                {
                                    drinkDatas ? drinkDatas.map(store => 
                                    <Cards key={store._id} id={store._id} name={store.StoreName} phone={store.Phone} restDay={store.RestDate} type={store.StoreType} menuUrl={store.MenuUrl}/>)
                                     : <Empty style={{marginTop:'10vh'}} />
                                }
                            </div>
                        </TabPane>
                    </Tabs>
                }
            </Row>
        </div>
    );
}