import React from 'react';
import { useContext } from 'react';
import { Row, Col, Grid } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import homeTitle from '../img/img-home-title.png';
import banner from '../img/img-home-banner.png';
import homeToLogin from '../img/btn-home-toLogin.png';
import homeToStore from '../img/btn-home-toStore.png';
import homeTitleMobile from '../img/img-home-title-mobile.png';
import homeBannerMobile from '../img/img-home-banner-mobile.png';
import homeToLoginMobile from '../img/btn-home-login-mobile.png';
import homeToStoreMobile from '../img/btn-home-stores-mobile.png';
import { StoreContext } from '../store';
import { SET_SEARCH_VALUE,
         SET_ENTRY_SEARCH_BTN
} from '../utils/constants';
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
                        placeholder='搜尋店家...'
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
                    <Link to="/signin" className="entryLeftImg toLogin">
                        <img src={homeToLogin} alt=""/>
                    </Link>    
                    <Link to="/stores" className="entryLeftImg toStores">
                        <img src={homeToStore} alt=""/>
                    </Link>
                    </> :
                    <>
                    <Link to="/" className="homeToLoginMobile">
                        <img className="homeToImgMobile" src={homeToLoginMobile} alt=""/>
                    </Link>    
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