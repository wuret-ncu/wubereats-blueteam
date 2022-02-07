import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Row, Col, Card, Empty, Popover, Divider, Popconfirm, message, Grid, Tabs, Modal } from 'antd';
import { Link, useHistory } from 'react-router-dom';
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
import { getDrinksStores, getFoodsStores, deleteAStore, getUsingUser, getAuthToken, setAuthToken } from '../api/index';
import { StoreContext } from '../store';
import { SET_SEARCH_VALUE,
         SET_ENTRY_SEARCH_BTN,
         SET_DELETE_STORE
} from '../utils/constants';
const { useBreakpoint } = Grid;
const { TabPane } = Tabs;
function Cards(props) {
    const { state: { deleteStore } , dispatch } = useContext(StoreContext);
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
                    <div className={informationDetail}>電話： {props.phone}</div>
                    <div className={informationDetail2}>公休日： {props.restDay}</div>
                </Col>
                <Col span={7} offset={3} className={storeToMenu}>
                    {getAuthToken() !== 'null' ? 
                        <Link to={`/menu/${props.id}`} className={storeToMenuWord}>前往點餐 {'>>'}</Link> :
                        <div className={storeToMenuWord} onClick={onClickToSigninAlert}>前往點餐 {'>>'}</div>
                    }
                </Col>
            </Row>                        
        </Card>
    );
}

export default function StoreList() {
    const { state: { search, entrySearchBtn, deleteStore }, dispatch } = useContext(StoreContext);
    const [foodDatas, setFoodData] = useState(null);
    const [drinkDatas, setDrinkData] = useState(null);
    const [drawVisible, setDrawVisible] = useState(false);
    const [drawFoodResult, setDrawFoodResult] = useState("");
    const [drawDrinkResult, setDrawDrinkResult] = useState("");
    const [drawUserResult, setDrawUserResult] = useState("");
    const [groupOrderVisible, setGroupOrderVisible] = useState(false);
    const { sm } = useBreakpoint();
    const history = useHistory();
    const storeBgc = sm ? "storeBgc" : "storeBgcMobile"
    const storeSearchBgc = sm ? "storeSearchBgc" : "storeSearchBgcMobile";
    const storeSearchInput = sm ? "storeSearchInput" : "storeSearchInputMobile";
    const searchDeleteClass = sm ? "searchDeleteClass" : "searchDeleteClassMobile";
    const searchBtn = sm ? "searchBtn" : "searchBtnMobile";
    const listBgc = sm ? "listBgc" : "listBgcMobile";

    useEffect(() => {
        getFoodsStores().then((response) => {
            const foodResult = response.data.filter(data => data.StoreName.includes(search));
            if(foodResult.length !== 0){
                setFoodData(foodResult);
            }
        })
        getDrinksStores().then((response) => {
            const drinkResult = response.data.filter(data => data.StoreName.includes(search));
            if(drinkResult.length !== 0) {
                setDrinkData(drinkResult);
            }
        })
    }, [deleteStore])

    useEffect(() => {
        if(entrySearchBtn === null) {
            dispatch({
                type: SET_SEARCH_VALUE,
                payload: ``
            })
        } else {
            getFoodsStores().then((response) => {
                const foodResult = response.data.filter(data => data.StoreName.includes(search));
                if(foodResult.length !== 0){
                    setFoodData(foodResult);
                }
                
            })
            getDrinksStores().then((response) => {
                const drinkResult = response.data.filter(data => data.StoreName.includes(search));
                if(drinkResult.length !== 0) {
                    setDrinkData(drinkResult);
                }
                
            })   
            dispatch({
                type: SET_ENTRY_SEARCH_BTN,
                payload: null
            })    
        }  
    }, [entrySearchBtn])

    useEffect(() => {
        if(search === ``) {
            getFoodsStores().then((response) => {
                if(response.data.length !== 0){
                    setFoodData(response.data);
                }
            })
            getDrinksStores().then((response) => {
                if(response.data.length !== 0) {
                    setDrinkData(response.data);
                }
            })
        }
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
        setGroupOrderVisible(false);
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
        getUsingUser().then((response) => {
            let i = 0;
            response.data.map(() => {
                return(i = i + 1)
            })
            setDrawUserResult(response.data[0].User_info[Math.floor(Math.random()*i)].UserName);
        })
    }
    const onClickGroupOrderBtn = () => {
        setGroupOrderVisible(true);
    }
    const onClickToSigninAlert = () => {
        message.warning("請先登入即可開始團購")
        history.push('/signin');
    }
    const onClickToSigninAlert2 = () => {
        message.warning("請先登入即可開始新增店家")
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
                {/* {sm ? 
                    <Col span={12} className="storeSlogan">
                        Choose what you want to eat.
                    </Col> : 
                    <Col span={24} className="storeSloganMobile">
                        Choose what to eat...
                    </Col>
                } */}
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
                {
                    getAuthToken() !== 'undefined' ?
                    <Col sm={{span:5, offset:8}} className="groupOrderBtnBox" onClick={onClickGroupOrderBtn}>
                        <img alt="" src={groupOrderBtn} className="groupOrderBtn" />
                        <img alt="" src={groupOrderHover} className="groupOrderHover" />
                    </Col> : 
                    <Col sm={{span:5, offset:8}} className="groupOrderBtnBox" onClick={onClickToSigninAlert}>
                        <img alt="" src={groupOrderBtn} className="groupOrderBtn" />
                        <img alt="" src={groupOrderHover} className="groupOrderHover" />
                    </Col>
                }
                
                <Modal
                    visible={groupOrderVisible}
                    className="groupOrderModalBox"
                    width={'70vw'}
                    footer={null}
                    onCancel={handleCancel}
                >
                    <Row>
                        <Col span={11} className="groupOrderModalInnerBox">
                            <div><img alt="" src={getCodeBtn} className="getCodeBtn" /></div>
                            <div className="getCodeText">Your group order code:</div>
                            <div className="code">01274700</div>
                            <div className="shareCodeText">Please share the code with your members.</div>
                        </Col>
                        <Col span={2} className="groupOrderModalOrLineBox"><img alt="" src={groupOrderModalOrLine} className="groupOrderModalOrLine" /></Col>
                        <Col span={11} className="groupOrderModalInnerBox">
                            <div className="inputCodeText inputCodeText1">Join other's group order.</div>
                            <div className="inputCodeText">Please enter the code below.</div>
                            <div className="inputCodeBox"><input className="inputCode" /></div>
                            <div className="confirmCode">Join</div>
                        </Col>
                    </Row>
                </Modal>
                {sm ? 
                    <>
                    {
                        getAuthToken() !== '' ?
                        <Col span={4}>
                            <Link to="/addStore" className="addMenuBtn"><span className="addMenuPlus">+</span> Add a store</Link> 
                        </Col> :
                        <Col span={4}>
                            <Link to="/signin" className="addMenuBtn" onClick={onClickToSigninAlert2}><span className="addMenuPlus">+</span> Add menu</Link> 
                        </Col>
                    } 
                    </> : 
                    <>
                    {
                        getAuthToken() !== 'undefined' ?
                        <Col span={3} className="addStoreBoxMobile">
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