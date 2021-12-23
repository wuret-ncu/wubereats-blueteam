import React from 'react';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Row, Col, Empty, Grid } from 'antd';
import logo from '../img/btn-Logo.png';
import bag from '../img/btn-bag.png';
import member from '../img/btn-member.png';
import menuMobile from '../img/btn-header-menu-mobile.png';
import logoMobile from '../img/btn-header-logo-mobile.png';
import { StoreContext } from '../store';
import { SET_VISIBLE,
         SET_TOTAL_PRICE,
         GET_CARTS_DATA
} from '../utils/constants';
import drawerLine from '../img/img_drawer_line.png';
import { getCarts } from '../api';
const { useBreakpoint } = Grid;
function JustOrdered(props) {
    const { sm } = useBreakpoint();
    const drawerContent = sm ? "drawerContent" : "drawerContentMobile";

    return(
        <>
            <Row>
                <Col className={drawerContent} span={10}></Col>
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
    const { state: { visible, total, cartsData }, dispatch} = useContext(StoreContext);
    var lodash = require('lodash');
    const { sm } = useBreakpoint();
    const displayWeb = sm ? "" : "displayNone";
    const homeBagMobile = sm ? "homeBag" : "homeBagMobile";
    const homeMemberMobile = sm ? "homeMember" : "homeMemberMobile";
    const drawerName = sm ? "drawerName" : "drawerNameMobile";
    const drawerTitle = sm ? "drawerTitle" : "drawerTitleMobile";
    const drawerContent = sm ? "drawerContent" : "drawerContentMobile";
    const drawerContentRight = sm ? "drawerContentRight" : "drawerContentRightMobile";
    const drawerBtnToCart = sm ? "drawerBtnToCart" : "drawerBtnToCartMobile";
    const drawerWidth = sm ? '30vw' : '70vw';
    
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
    }, [visible]);

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

    return(
        <header className="headerBgc">
            {sm ? "" : <>
            <div><img className="menuMobile" src={menuMobile} alt="" /></div>
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
                {sm ? <>
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
                <Link to="/" >
                    <img className={homeMemberMobile} src={member} alt="" />
                </Link>
            </div>
            <Drawer placement="right" onClose={onClose} visible={visible} width={drawerWidth}>
                <div className={drawerName}>餐點資料</div>
                <Row>
                    <Col className={drawerTitle} span={10}>店家</Col>
                    <Col className={drawerTitle} span={8}>品項</Col>
                    <Col className={drawerTitle} span={6}>價格</Col>
                </Row>
                {
                    cartsData ? cartsData.map(data =>
                    <JustOrdered key={data._id} item={data.Meals} sum={data.Price} />)
                    : <Empty style={{margin:"8vh auto"}}/>
                }
                <Row>
                    <Col className={drawerContentRight} span={3} offset={15}>總價</Col>
                    <Col className={drawerContent} span={6}>{total}</Col>
                </Row>
                <Link className="drawerBtnBox" to="/cart" onClick={onClose}>
                    <div className={drawerBtnToCart}>前往購物車 {'>>'}</div>
                </Link>    
            </Drawer> 
        </header>
    );
}