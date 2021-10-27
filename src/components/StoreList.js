import React from 'react';
import { Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';
import storeDot from '../img/img-store-dot.png';
import line from '../img/img-store-line.png';

export default function StoreList() {
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
                        <Card size="small" title="大嗑蔬菜蛋餅" className="card">
                            <Row align="bottom">
                                <Col span={2}><img className="storeLine" src={line} /></Col>
                                <Col span={12} className="storeInformation">
                                    <div className="informationDetail">電話： 03-577-7999</div>
                                    <div className="informationDetail">公休日： 六、日</div>
                                </Col>
                                <Col span={7} offset={3} className="storeToOrder">
                                    <Link className="storeToOrderWord">前往點餐 {'>>'}</Link>
                                </Col>
                            </Row>                        
                        </Card>
                        <Card size="small" title="大嗑蔬菜蛋餅" className="card">
                            <Row align="bottom">
                                <Col span={2}><img className="storeLine" src={line} /></Col>
                                <Col span={12} className="storeInformation">
                                    <div className="informationDetail">電話： 03-577-7999</div>
                                    <div className="informationDetail">公休日： 六、日</div>
                                </Col>
                                <Col span={7} offset={3} className="storeToOrder">
                                    <Link className="storeToOrderWord">前往點餐 {'>>'}</Link>
                                </Col>
                            </Row>                        
                        </Card>
                        <Card size="small" title="大嗑蔬菜蛋餅" className="card">
                            <Row align="bottom">
                                <Col span={2}><img className="storeLine" src={line} /></Col>
                                <Col span={12} className="storeInformation">
                                    <div className="informationDetail">電話： 03-577-7999</div>
                                    <div className="informationDetail">公休日： 六、日</div>
                                </Col>
                                <Col span={7} offset={3} className="storeToOrder">
                                    <Link className="storeToOrderWord">前往點餐 {'>>'}</Link>
                                </Col>
                            </Row>                        
                        </Card>
                        <Card size="small" title="大嗑蔬菜蛋餅" className="card">
                            <Row align="bottom">
                                <Col span={2}><img className="storeLine" src={line} /></Col>
                                <Col span={12} className="storeInformation">
                                    <div className="informationDetail">電話： 03-577-7999</div>
                                    <div className="informationDetail">公休日： 六、日</div>
                                </Col>
                                <Col span={7} offset={3} className="storeToOrder">
                                    <Link className="storeToOrderWord">前往點餐 {'>>'}</Link>
                                </Col>
                            </Row>                        
                        </Card>
                    </div>
                </Col>
                <Col span={11} offset={2} className="listBox">
                    <div className="listTitleAll"><img src={storeDot} className="storeDot"/><span className="listTitle">Drinks</span></div>
                    <div className="cardBox">
                    <Card size="small" title="大嗑蔬菜蛋餅" className="card">
                            <Row align="bottom">
                                <Col span={2}><img className="storeLine" src={line} /></Col>
                                <Col span={12} className="storeInformation">
                                    <div className="informationDetail">電話： 03-577-7999</div>
                                    <div className="informationDetail">公休日： 六、日</div>
                                </Col>
                                <Col span={7} offset={3} className="storeToOrder">
                                    <Link className="storeToOrderWord">前往點餐 {'>>'}</Link>
                                </Col>
                            </Row>                        
                        </Card>
                    </div>
                </Col>
            </Row>
            <Row></Row>
        </div>
    );
}