import React, { useEffect } from 'react';
import { useContext } from 'react';
import { Row, Col, Grid, message } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import homeTitle from '../img/img-home-title.png';
import banner from '../img/img-home-banner.png';
import homeToLogin from '../img/btn-home-toLogin.png';
import homeToStore from '../img/btn-entry-toOrderSolo.png';
import homeTitleMobile from '../img/img-home-title-mobile.png';
import homeBannerMobile from '../img/img-home-banner-mobile.png';
import homeToLoginMobile from '../img/btn-home-login-mobile.png';
import homeToStoreMobile from '../img/btn-home-stores-mobile.png';
import { StoreContext } from '../store';
import { SET_SEARCH_VALUE,
         SET_ENTRY_SEARCH_BTN
} from '../utils/constants';
import { getAuthToken } from '../api';
const { useBreakpoint } = Grid;

export default function Entry() {
    const { state: { search }, dispatch } = useContext(StoreContext);
    const history = useHistory();
    const { sm } = useBreakpoint();
    const entryLeft = sm ? "entryLeft" : "entryLeftMobile"
    const entrySearchBgc = sm ? "entrySearchBgc" : "entrySearchBgcMobile";
    const searchBtnEntry = sm ? "searchBtnEntry" : "searchBtnEntryMobile";
    const entrySearchInput = sm ? "entrySearchInput" : "entrySearchInputMobile";
    const onClickEntrySearch = () => {
        dispatch({
            type: SET_ENTRY_SEARCH_BTN,
            payload: true
        })
        if(search !== ``) {
            history.push('/Stores')  
        }
    }

    const onClickToLogin = () => {
        message.error('You are already logged in.');
    }

    useEffect(() => {
        if(getAuthToken() === 'undefined' || getAuthToken() === 'null') {
            localStorage.setItem('orderSoloCode', undefined);
            localStorage.setItem('groupCode', undefined);
        }
    })

    return(
        <Row>
            <Col sm={{span:10}} span={24} className={entryLeft}>
                {sm ? <img className="homeTitle" src={homeTitle} alt="" /> :
                <img className="homeTitleMobile" src={homeTitleMobile} alt="" />}
                <div className={entrySearchBgc}>
                    <input
                        name='searchBar'
                        type='text'
                        onChange={e => {
                            dispatch({
                                type: SET_SEARCH_VALUE,
                                payload: e.target.value
                            })
                        }}
                        placeholder='????????????...'
                        value={search}
                        className={entrySearchInput}
                        autoComplete='off'
                    /> 
                    <button
                        className={searchBtnEntry}
                        onClick={onClickEntrySearch}
                    >
                        Search
                    </button>
                </div>
                {sm ? "" : <div><img className="bannerMobile" src={homeBannerMobile} /></div>}
                {sm ? 
                <>
                    {
                        getAuthToken() === 'undefined' ? 
                        <>
                            <Link to="/signin" className="entryLeftImg toLogin">
                                <img src={homeToStore} alt=""/>
                            </Link>
                            <Link to="/groupStores" className="entryLeftImg toGroupStores">
                                <img src={homeToStore} alt=""/>
                            </Link>
                            <Link to="/stores" className="entryLeftImg toStores">
                                <img src={homeToStore} alt=""/>
                            </Link>
                        </> :
                        <>
                            <div style={{cursor:'pointer'}} className="entryLeftImg toLogin" onClick={onClickToLogin}>
                                <img src={homeToLogin} alt=""/>
                            </div>
                            <Link to="/groupStores" className="entryLeftImg toGroupStores">
                                <img src={homeToStore} alt=""/>
                            </Link>
                            <Link to="/stores" className="entryLeftImg toStores">
                                <img src={homeToStore} alt=""/>
                            </Link> 
                        </>
                    }
                    </> :
                    <>
                    {
                        getAuthToken() === 'undefined' ? 
                        <Link to="/" className="homeToLoginMobile">
                            <img className="homeToImgMobile" src={homeToLoginMobile} alt=""/>
                        </Link>  :
                        <div style={{cursor:'pointer'}} className="homeToLoginMobile" onClick={onClickToLogin}>
                            <img src={homeToLoginMobile} alt=""/>
                        </div>
                    }    
                    <Link to="/stores" className="homeToStoreMobile">
                        <img className="homeToImgMobile" src={homeToStoreMobile} alt=""/>
                    </Link>
                    </>
                    
                }
                
            </Col>
            {sm ? 
            <Col sm={{span:14}} span={0}>
                <img className="banner" src={banner} alt="" />
            </Col> : ""}
            
        </Row>
    );
}