import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Row, Col, Card, Empty } from 'antd';
import { Link } from 'react-router-dom';
import storeDot from '../img/img-store-dot.png';
import line from '../img/img-store-line.png';
import searchDelete from '../img/btn_cart_delete.png';
import { getDrinksStores, getFoodsStores } from '../api/index';
import { StoreContext } from '../store';
import { SET_SEARCH_VALUE } from '../utils/constants';

function Cards(props) {
    return(
        <Card size="small" key={props.id} title={props.name} className="card">
            <Row align="bottom">
                <Col span={2}><img className="storeLine" src={line} alt="" /></Col>
                <Col span={12} className="storeInformation">
                    <div className="informationDetail">電話： {props.phone}</div>
                    <div className="informationDetail">公休日： {props.restDay}</div>
                </Col>
                <Col span={7} offset={3} className="storeToMenu">
                    <Link to={`/menu/${props.id}`} className="storeToMenuWord">前往點餐 {'>>'}</Link>
                </Col>
            </Row>                        
        </Card>
    );
}

export default function StoreList() {
    const { state: { search }, dispatch } = useContext(StoreContext);
    const [foodDatas, setFoodData] = useState(null);
    const [drinkDatas, setDrinkData] = useState(null);
    
    useEffect(() => {
        getFoodsStores().then((response) => {
            const foodResult = response.data.filter(data => data.StoreName.includes(search));
            setFoodData(foodResult);
        })
        getDrinksStores().then((response) => {
            const drinkResult = response.data.filter(data => data.StoreName.includes(search));
            setDrinkData(drinkResult);
        })
    }, [])

    useEffect(() => {
        if(search === ``) {
            getFoodsStores().then((response) => {
                setFoodData(response.data);
            })
            getDrinksStores().then((response) => {
                setDrinkData(response.data);
            })
        }
    }, [search])

    const onClickSearch = () => {
        if(foodDatas !== null && search !== ``){
            const foodResult = foodDatas.filter(data => data.StoreName.includes(search));
            setFoodData(foodResult);
        }
        if(drinkDatas !== null && search !== ``){
            const drinkResult = drinkDatas.filter(data => data.StoreName.includes(search));
            setDrinkData(drinkResult);
        }
    }
    const onClickSearchDeleteBtn = () => {
        dispatch({
            type: SET_SEARCH_VALUE,
            payload: ``
        })
    }

    return(
        <div className="storeBgc">
            <Row>
                <Col span={12} className="storeSlogan">
                    Choose what you want to eat.
                </Col>
                <Col span={7} offset={1} className="storeSearchBgc">
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
                        className="storeSearchInput"
                        autoComplete='off'
                    /> 
                    <div 
                        className="searchDeleteBox"
                        onClick={onClickSearchDeleteBtn}
                    >
                        <img src={searchDelete} className="searchDelete" />
                    </div>
                    
                    <button
                        className="searchBtn"
                        onClick={onClickSearch}
                    >
                        Search
                    </button>
                </Col>
                <Col span={4}>
                    <Link to="/addStore" className="addMenuBtn"><span className="addMenuPlus">+</span> Add menu</Link> 
                </Col>
            </Row>
            <Row className="listBgc">
                <Col span={11} className="listBox">
                    <div className="listTitleAll"><img src={storeDot} className="storeDot" alt=""/><span className="listTitle">Foods</span></div>
                    <div className="cardBox">
                        {
                            foodDatas ? foodDatas.map(store => 
                            <Cards key={store._id} id={store._id} name={store.StoreName} phone={store.Phone} restDay={store.RestDate}/>)
                             : <Empty style={{marginTop:'10vh'}} />
                        }
                    </div>
                </Col>
                <Col span={11} offset={2} className="listBox">
                    <div className="listTitleAll"><img src={storeDot} className="storeDot" alt=""/><span className="listTitle">Drinks</span></div>
                    <div className="cardBox">
                        {
                            drinkDatas ? drinkDatas.map(store => 
                            <Cards key={store._id} id={store._id} name={store.StoreName} phone={store.Phone} restDay={store.RestDate}/>)
                             : <Empty style={{marginTop:'10vh'}} />
                        }
                    </div>
                </Col>
            </Row>
        </div>
    );
}