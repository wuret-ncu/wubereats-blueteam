import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Row, Col } from 'antd';
import logo from '../img/btn-Logo.png';
import bag from '../img/btn-bag.png';
import member from '../img/btn-member.png';
import { StoreContext } from '../store';
import { SET_VISIBLE } from '../utils/constants';
import drawerLine from '../img/img_drawer_line.png';

export default function Header() {
    const { state: { visible }, dispatch} = useContext(StoreContext);
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
            <div>
                <Link to="/">
                    <img className="logo" src={logo} alt="" />
                </Link> 
            </div>
            <div style={{display:'flex'}}>
                <Link to="/" className="headerName mgl-4">
                    Home
                </Link>
                <Link to="/stores" className="headerName mgl-4">
                    Stores
                </Link>
                <div onClick={showDrawer}>
                    <img className="homeBag mgl-4 pdb-10" src={bag} alt="" />
                </div>
                <Link to="/" >
                    <img className="homeMember mgl-4 pdb-10" src={member} alt="" />
                </Link>
            </div>
            <Drawer placement="right" onClose={onClose} visible={visible} width={'30vw'}>
                <div className="drawerName">餐點資料</div>
                <Row>
                    <Col className="drawerTitle" span={10}>店家</Col>
                    <Col className="drawerTitle" span={8}>品項</Col>
                    <Col className="drawerTitle" span={6}>價格</Col>
                </Row>
                <Row>
                    <Col className="drawerContent" span={10}>大嗑蔬菜蛋餅</Col>
                    <Col className="drawerContent" span={8}>肉絲蛋炒飯</Col>
                    <Col className="drawerContent" span={6}>70</Col>
                </Row>
                <div className="drawerLineBox">
                   <img className="drawerLine" src={drawerLine} /> 
                </div>
                <Row>
                    <Col className="drawerContentRight" span={3} offset={15}>總價</Col>
                    <Col className="drawerContent" span={6}>70</Col>
                </Row>
                <Link className="drawerBtnBox" to="/cart" onClick={onClose}>
                    <div className="drawerBtnToCart">前往購物車 {'>>'}</div>
                </Link>    
            </Drawer> 
        </header>
    );
}