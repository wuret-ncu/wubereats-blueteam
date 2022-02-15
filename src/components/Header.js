import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Drawer, Row, Col, Empty, Grid, Divider, Modal, message } from 'antd';
import { nanoid } from 'nanoid';
import logo from '../img/btn-Logo.png';
import bag from '../img/btn-bag.png';
import member from '../img/btn-member.png';
import menuMobile from '../img/btn-header-menu-mobile.png';
import logoMobile from '../img/btn-header-logo-mobile.png';
import memuDrawerBg from '../img/img-menu-bg.png';
import drawerHome from '../img/icon-drawer-home.png';
import drawerStore from '../img/icon-drawer-store.png';
import drawerLogin from '../img/icon-drawer-login.png';
import { StoreContext } from '../store';
import { SET_VISIBLE,
         SET_DRAWER_SUM
} from '../utils/constants';
import drawerLine from '../img/img_drawer_line.png';
import { getAuthToken, getCarts } from '../api';
const { useBreakpoint } = Grid;

function JustOrdered(props) {
    const { sm } = useBreakpoint();
    const drawerContent = sm ? "drawerContent" : "drawerContentMobile";

    return(
        <>
            <Row>
                <Col className={drawerContent} span={10}>{props.store}</Col>
                <Col className={drawerContent} span={8}>{props.item}</Col>
                <Col className={drawerContent} span={6}>{props.sum}</Col>
            </Row>
            <div className="drawerLineBox">
            <img className="drawerLine" src={drawerLine} alt="" /> 
            </div>
        </>   
    );
}

export default function Header() {
    const { state: { visible, drawerSum }, dispatch} = useContext(StoreContext);
    const [menuVisible, setMenuVisible] = useState(false);
    // const [toLogoutVisible, setToLogoutVisible] = useState(false);
    const [drawerDatas, setDrawerDatas] = useState(null);
    var lodash = require('lodash');
    const { sm } = useBreakpoint();
    const history = useHistory();
    const displayWeb = sm ? "" : "displayNone";
    const homeBagMobile = sm ? "homeBag" : "homeBagMobile";
    const homeMemberMobile = sm ? "homeMember" : "homeMemberMobile";
    const drawerName = sm ? "drawerName" : "drawerNameMobile";
    const drawerTitle = sm ? "drawerTitle" : "drawerTitleMobile";
    const drawerContent = sm ? "drawerContent" : "drawerContentMobile";
    const drawerContentRight = sm ? "drawerContentRight" : "drawerContentRightMobile";
    const drawerBtnToCart = sm ? "drawerBtnToCart" : "drawerBtnToCartMobile";
    const drawerWidth = sm ? '35vw' : '70vw';

    useEffect(() => {
        let isMounted = true;
        if(String(localStorage.getItem("groupCode")) !== 'undefined' || String(localStorage.getItem("orderSoloCode")) !== 'undefined') {
            if(String(localStorage.getItem("groupCode")) === 'undefined') {
                getCarts(localStorage.getItem("userID"), localStorage.getItem("orderSoloCode")).then((response) => {
                    if(isMounted) {
                       setDrawerDatas(response.data); 
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
    const onClickMenu = () => {
        setMenuVisible(true);
    }
    const onCloseMenu = () => {
        setMenuVisible(false);
    }
    
    return(
        <header className="headerBgc">
            {sm ? "" : <>
            <div onClick={onClickMenu}><img className="menuMobile" src={menuMobile} alt="" /></div>
            <Drawer
                placement={'left'}
                width={'68vw'}
                onClose={onCloseMenu}
                visible={menuVisible}
                className="menuDrawer"
            >
                <Link to="/" className="drawerItem drawerItem1"><span><img className="drawerIcon1" src={drawerHome} alt="" /></span>Home</Link>
                <Link to="/stores" className="drawerItem drawerItem2"><span><img className="drawerIcon2" src={drawerStore} alt="" /></span>Stores</Link>
                <Divider className="drawerDivider"/>
                <div className="drawerItem drawerItem3"><span><img className="drawerIcon3" src={drawerLogin} alt="" /></span>Login</div>
            </Drawer>
            <div>
                <Link to="/">
                    <img className="logoMobile" src={logoMobile} alt="" />
                </Link>
            </div>
            </>}
            <div className={displayWeb}>
                <Link to="/">
                    <img className="logo" src={logo} alt="" />
                </Link> 
            </div>
            <div style={{display:'flex'}}>
                {sm ?  String(localStorage.getItem("groupCode")) !== 'undefined' ?
                    <>
                        <Link to="/" className="headerName mgl-4">
                            Home
                        </Link>
                        <Link to="/groupStores" className="headerName mgl-4">
                            Stores
                        </Link>
                    </> : 
                    <>
                        <Link to="/" className="headerName mgl-4">
                            Home
                        </Link>
                        <Link to="/stores" className="headerName mgl-4">
                            Stores
                        </Link>
                    </> : ""}
                <div onClick={showDrawer}>
                    <img className={homeBagMobile} src={bag} alt="" />
                </div>
                {
                    getAuthToken() === 'undefined' ?
                    <Link to="/signin" >
                        <img className={homeMemberMobile} src={member} alt="" />
                    </Link> : 
                    <Link to="/profile" >
                        <img className={homeMemberMobile} src={member} alt="" />
                    </Link>
                }
            </div>
            <Drawer placement="right" onClose={onClose} visible={visible} width={drawerWidth}>
                <div className={drawerName}>餐點資料</div>
                <Row>
                    <Col className={drawerTitle} span={10}>店家</Col>
                    <Col className={drawerTitle} span={8}>品項</Col>
                    <Col className={drawerTitle} span={6}>價格</Col>
                </Row>
                {
                    drawerDatas ? drawerDatas.map(data =>
                    <JustOrdered key={nanoid()} store={data.storeprofiles.StoreName} item={data.Meals} sum={data.Price} />)
                    : <Empty style={{margin:"8vh auto"}}/>
                }
                <Row>
                    <Col className={drawerContentRight} span={5} offset={13}>總價</Col>
                    <Col className={drawerContent} span={6}>{drawerSum}</Col>
                </Row>
                {
                    getAuthToken() !== 'undefined' ?
                    <Link className="drawerBtnBox" to="/cart" onClick={onClose}>
                        <div className={drawerBtnToCart}>前往購物車 {'>>'}</div>
                    </Link> :
                    <Link className="drawerBtnBox" to="/signin" onClick={onClose2}>
                        <div className={drawerBtnToCart}>前往購物車 {'>>'}</div>
                    </Link>
                }
            </Drawer> 
        </header>
    );
}