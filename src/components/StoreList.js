import React from 'react';
import { useContext } from 'react';
import { Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';
import { StoreContext } from '../store';
import storeDot from '../img/img-store-dot.png';
import line from '../img/img-store-line.png';

function Cards(props) {
    return(
        <Card size="small" key={props.id} title={props.name} className="card">
            <Row align="bottom">
                <Col span={2}><img className="storeLine" src={line} /></Col>
                <Col span={12} className="storeInformation">
                    <div className="informationDetail">電話： {props.phone}</div>
                    <div className="informationDetail">公休日： {props.restDay}</div>
                </Col>
                <Col span={7} offset={3} className="storeToMenu">
                    <Link to="/menu" className="storeToMenuWord">前往點餐 {'>>'}</Link>
                </Col>
            </Row>                        
        </Card>
    );
}

export default function StoreList() {
    const { state: { stores: { foodStores }}} = useContext(StoreContext);

    return(
        <div className="storeBgc">
            <Row>
                <Col span={12} className="storeSlogan">
                    Choose what you want to eat.
                </Col>
                <Col span={4} offset={8}>
                    <Link to="/AddStore" className="addMenuBtn"><span className="addMenuPlus">+</span> Add menu</Link> 
                </Col>
            </Row>
            <Row className="listBgc">
                <Col span={11} className="listBox">
                    <div className="listTitleAll"><img src={storeDot} className="storeDot"/><span className="listTitle">Foods</span></div>
                    <div className="cardBox">
                        {
                            foodStores.map(store => <Cards key={store.id} id={store.id} name={store.name} phone={store.phone} restDay={store.restDay}/>
                        )}
                    </div>
                </Col>
                <Col span={11} offset={2} className="listBox">
                    <div className="listTitleAll"><img src={storeDot} className="storeDot"/><span className="listTitle">Drinks</span></div>
                    <div className="cardBox">
                        <Card size="small" title="Master of tea" className="card">
                            <Row align="bottom">
                                <Col span={2}><img className="storeLine" src={line} /></Col>
                                <Col span={12} className="storeInformation">
                                    <div className="informationDetail">電話： 03-579-7889</div>
                                    <div className="informationDetail">公休日： 六、日</div>
                                </Col>
                                <Col span={7} offset={3} className="storeToMenu">
                                    <Link to="/menu" className="storeToMenuWord">前往點餐 {'>>'}</Link>
                                </Col>
                            </Row>                        
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    );
}