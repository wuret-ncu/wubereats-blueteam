import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Row, Col, Empty, Grid, message, Modal, Spin } from 'antd';
import { nanoid } from 'nanoid';
import logo from '../img/btn-Logo.png';
import homeBag from '../img/btn-home-bag.png';
import homeMember from '../img/btn-home-member.png';
import bag from '../img/btn-bag.png';
import member from '../img/btn-member.png';
// import menuMobile from '../img/btn-header-menu-mobile.png';
// import logoMobile from '../img/btn-header-logo-mobile.png';
import { StoreContext } from '../store';
import { SET_VISIBLE,
         SET_DRAWER_SUM
} from '../utils/constants';
import drawerLine from '../img/img_drawer_line.png';
import { getAuthToken, getCarts } from '../api';
// const { useBreakpoint } = Grid;
function JustOrdered(props) {
    return(
        <>
            <Row>
                <Col className="drawerContent" span={10}>{props.store}</Col>
                <Col className="drawerContent" span={8}>{props.item}</Col>
                <Col className="drawerContent" span={6}>{props.sum}</Col>
            </Row>
            <div className="drawerLineBox">
            <img className="drawerLine" src={drawerLine} alt="" /> 
            </div>
        </>   
    );
}

export default function HomeHeader() {
    const { state: { visible, drawerSum }, dispatch} = useContext(StoreContext);
    const [headerNameColor, setHeaderNameColor] = useState("#FFF")
    const [bagColor, setBagColor] = useState(homeBag)
    const [memberColor, setMemberColor] = useState(homeMember)
    const [drawerDatas, setDrawerDatas] = useState(null);
    const [toLogoutVisible, setToLogoutVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    var lodash = require('lodash');
    // const { sm } = useBreakpoint();
    // const displayNone = sm ? "displayNone" : "";
    // const displayWeb = sm ? "" : "displayNone";

    useEffect(() => {
        let isMounted = true;
        if(String(localStorage.getItem("groupCode")) !== 'undefined' || String(localStorage.getItem("orderSoloCode")) !== 'undefined') {
            if(String(localStorage.getItem("groupCode")) === 'undefined') {
                getCarts(localStorage.getItem("userID"), localStorage.getItem("orderSoloCode")).then((response) => {
                    if(isMounted) {
                        setDrawerDatas(response.data);  
                        setLoading(false)
                    }
                }).catch(
                    input => {console.log(input.response)}
                )
            } else {
                getCarts(localStorage.getItem("userID"), localStorage.getItem("groupCode")).then((response) => {
                    console.log(response.data)
                }).catch(
                    input => {console.log(input.response)}
                )
            }
        }
        return () => {isMounted = false}
    }, [visible]);

    useEffect(() => {
        if(drawerDatas) {
            let a = [];
            let b = [];
            a = drawerDatas ? drawerDatas.map(s => {
                b.push(s.Price);
            }) : ""
            dispatch({
                type: SET_DRAWER_SUM,
                payload: lodash.sum(b)
            })
        }
        
    }, [drawerDatas])

    const showDrawer = () => {
        dispatch({
            type: SET_VISIBLE,
            payload: true
        })
    }
    const onClose = () => {
        dispatch({
            type: SET_VISIBLE,
            payload: false
        })
    }
    const onClose2 = () => {
        dispatch({
            type: SET_VISIBLE,
            payload: false
        })
        message.warning("登入開始新增餐點吧！")
    }
    // 監聽滾動，改變header樣貌
    const listenScrollEvent = () => {
        window.scrollY > 100 ? setHeaderNameColor("#496030") : setHeaderNameColor("#FFF")
        window.scrollY > 100 ? setBagColor(bag) : setBagColor(homeBag)
        window.scrollY > 100 ? setMemberColor(member) : setMemberColor(homeMember)
    }
    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent)
    }, [])

    return(
        <header className="headerBgc">
            {/* <div className={displayNone}><img className="menuMobile" src={menuMobile} alt="" /></div>
            <div className={displayNone}><img src={logoMobile} alt="" /></div> */}
            <div>
                <Link to="/">
                    <img className="logo" src={logo} alt="" />
                </Link> 
            </div>
            <div style={{display:'flex'}}>
                <Link to="/" className="homeHeaderName mgl-4" style={{color: headerNameColor}}>
                    Home
                </Link>
                {
                    String(localStorage.getItem("groupCode")) !== 'undefined' ?
                    <Link to="/groupStores" className="homeHeaderName mgl-4" style={{color: headerNameColor}}>
                        Stores
                    </Link> :
                    <Link to="/stores" className="homeHeaderName mgl-4" style={{color: headerNameColor}}>
                        Stores
                    </Link>
                }
                
                <div onClick={showDrawer}>
                    <img className="homeBag mgl-4 pdb-10" src={bagColor} alt="" />
                </div>
                {
                    getAuthToken() === 'undefined' ?
                    <Link to="/signin" >
                        <img className="homeMember mgl-4 pdb-10" src={memberColor} alt="" />
                    </Link> : 
                    <Link to="/profile" >
                        <img className="homeMember mgl-4 pdb-10" src={memberColor} alt="" />
                    </Link>
                }
            </div>
            <Drawer placement="right" onClose={onClose} visible={visible} width={'35vw'}>
                <div className="drawerName">餐點資料</div>
                <Row>
                    <Col className="drawerTitle" span={10}>店家</Col>
                    <Col className="drawerTitle" span={8}>品項</Col>
                    <Col className="drawerTitle" span={6}>價格</Col>
                </Row>
                {
                    loading ? <Spin style={{display:"flex", justifyContent:"center", margin:"10vh 0"}} size="large" /> : 
                    drawerDatas ? drawerDatas.map(data =>
                    <JustOrdered key={nanoid()} store={data.storeprofiles.StoreName} item={data.Meals} sum={data.Price} />)
                    : <Empty style={{margin:"8vh auto"}}/>
                    
                }
                <Row>
                    <Col className="drawerContentRight" span={5} offset={13}>總價</Col>
                    <Col className="drawerContent" span={6}>{drawerSum}</Col>
                </Row>
                {
                    getAuthToken() !== 'undefined' ?
                    <Link className="drawerBtnBox" to="/cart" onClick={onClose}>
                        <div className='drawerBtnToCart'>前往購物車 {'>>'}</div>
                    </Link> :
                    <Link className="drawerBtnBox" to="/signin" onClick={onClose2}>
                        <div className='drawerBtnToCart'>前往購物車 {'>>'}</div>
                    </Link>
                }   
            </Drawer> 
        </header>
    );
}