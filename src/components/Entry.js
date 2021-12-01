import React from 'react';
import { useContext } from 'react';
import { Row, Col } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import homeTitle from '../img/img-home-title.png';
import banner from '../img/img-home-banner.png';
import homeToLogin from '../img/btn-home-toLogin.png';
import homeToStore from '../img/btn-home-toStore.png';
import { StoreContext } from '../store';
import { SET_SEARCH_VALUE,
         SET_ENTRY_SEARCH_BTN
} from '../utils/constants';

export default function Entry() {
    const { state: { search }, dispatch } = useContext(StoreContext);
    const history = useHistory();

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
            <Col span={10} className="entryLeft">
                <img className="homeTitle" src={homeTitle} alt="" />
                <div className="entrySearchBgc">
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
                        className="entrySearchInput"
                        autoComplete='off'
                    /> 
                    <button
                        className="searchBtnEntry"
                        onClick={onClickEntrySearch}
                    >
                        Search
                    </button>
                </div>
                <Link to="/" className="entryLeftImg toLogin">
                    <img src={homeToLogin} alt=""/>
                </Link>    
                <Link to="/stores" className="entryLeftImg toStores">
                    <img src={homeToStore} alt=""/>
                </Link>
            </Col>
            <Col span={14}>
                <img className="banner" src={banner} alt="" />
            </Col>
        </Row>
    );
}