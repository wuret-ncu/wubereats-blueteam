import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Row, Col, Empty } from 'antd';
import logo from '../img/btn-Logo.png';
import homeBag from '../img/btn-home-bag.png';
import homeMember from '../img/btn-home-member.png';
import bag from '../img/btn-bag.png';
import member from '../img/btn-member.png';
import { StoreContext } from '../store';
import { SET_VISIBLE,
         SET_TOTAL_PRICE,
         GET_CARTS_DATA
} from '../utils/constants';
import drawerLine from '../img/img_drawer_line.png';
import { getCarts } from '../api';

function JustOrdered(props) {
    return(
        <>
            <Row>
                <Col className="drawerContent" span={10}>大嗑蔬菜蛋餅</Col>
                <Col className="drawerContent" span={8}>{props.item}</Col>
                <Col className="drawerContent" span={6}>{props.sum}</Col>
            </Row>
            <div className="drawerLineBox">
            <img className="drawerLine" src={drawerLine} /> 
            </div>
        </>   
    );
}

export default function HomeHeader() {
    const { state: { visible, total, cartsData }, dispatch} = useContext(StoreContext);
    const [headerNameColor, setHeaderNameColor] = useState("#FFF")
    const [bagColor, setBagColor] = useState(homeBag)
    const [memberColor, setMemberColor] = useState(homeMember)
    var lodash = require('lodash');
    
    useEffect(() => {
        getCarts().then((response) => {
            dispatch({
                type: GET_CARTS_DATA,
                payload: response.data
            })
        })
        let a = [];
        let b = [];
        a = cartsData ? cartsData.map(s => {
            b.push(s.Price);
        }) : ""
        dispatch({
            type: SET_TOTAL_PRICE,
            payload: lodash.sum(b)
        })
    }, [visible === true]);

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

    // 監聽滾動，改變header樣貌
    const listenScrollEvent = () => {
        window.scrollY > 100 ? setHeaderNameColor("#496030") : setHeaderNameColor("#FFF")
        window.scrollY > 100 ? setBagColor(bag) : setBagColor(homeBag)
        window.scrollY > 100 ? setMemberColor(member) : setMemberColor(homeMember)
    }
    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent)
    })

    return(
        <header className="headerBgc">
            <div>
                <Link to="/">
                    <img className="logo" src={logo} alt="" />
                </Link> 
            </div>
            <div style={{display:'flex'}}>
                <Link to="/" className="homeHeaderName mgl-4" style={{color: headerNameColor}}>
                    Home
                </Link>
                <Link to="/stores" className="homeHeaderName mgl-4" style={{color: headerNameColor}}>
                    Stores
                </Link>
                <div onClick={showDrawer}>
                    <img className="homeBag mgl-4 pdb-10" src={bagColor} alt="" />
                </div>
                <Link to="/" >
                    <img className="homeMember mgl-4 pdb-10" src={memberColor} alt="" />
                </Link>
            </div>
            <Drawer placement="right" onClose={onClose} visible={visible} width={'30vw'}>
                <div className="drawerName">餐點資料</div>
                <Row>
                    <Col className="drawerTitle" span={10}>店家</Col>
                    <Col className="drawerTitle" span={8}>品項</Col>
                    <Col className="drawerTitle" span={6}>價格</Col>
                </Row>
                {
                    cartsData ? cartsData.map(data =>
                    <JustOrdered key={data._id} item={data.Meals} sum={data.Price} />)
                    : <Empty style={{margin:"8vh auto"}}/>
                }
                <Row>
                    <Col className="drawerContentRight" span={3} offset={15}>總價</Col>
                    <Col className="drawerContent" span={6}>{total}</Col>
                </Row>
                <Link className="drawerBtnBox" to="/cart" onClick={onClose}>
                    <div className="drawerBtnToCart">前往購物車 {'>>'}</div>
                </Link>    
            </Drawer> 
        </header>
    );
}