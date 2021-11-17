import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Drawer } from 'antd';
import logo from '../img/btn-Logo.png';
import bag from '../img/btn-bag.png';
import member from '../img/btn-member.png';
import { StoreContext } from '../store';
import { SET_VISIBLE } from '../utils/constants';

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
            <Drawer placement="right" onClose={onClose} visible={visible}>
                
            </Drawer> 
        </header>
    );
}