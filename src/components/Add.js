import React from 'react';
import { useState } from 'react';
import { Row, Col } from 'antd';

export default function Add() {
    const [type, setType] = useState('food');
    const activeFoodsBtn = "activeFoodsBtn"
    const activeDrinksBtn = "activeDrinksBtn"
    const typeBtn = "typeBtn"
    return(
        <Row className="addBgc">
            <Col span={12}></Col>
            <Col span={12} className="addForm">
                <div className="typeBtnBox">
                    <div 
                        className={`${type == 'food' ? activeFoodsBtn : typeBtn}`}
                        onClick={()=>setType('food')}
                    >
                        Foods
                    </div>
                    <div 
                        className={`${type == 'drinks' ? activeDrinksBtn : typeBtn}`}
                        onClick={()=>setType('drinks')}
                    >
                        Drinks
                    </div>
                </div>
                <Row className="formItem">
                    <Col span={6} className="formItemTitle">
                        店家名稱
                    </Col>
                    <Col span={15}></Col>
                </Row>
                <Row className="formItem">
                    <Col span={6} className="formItemTitle">
                        店家電話
                    </Col>
                    <Col span={15}></Col>
                </Row>
                <Row className="formItem">
                    <Col span={6} className="formItemTitle">
                        公休日
                    </Col>
                    <Col span={15}></Col>
                </Row>
                <Row className="formItem">
                    <Col span={6} className="formItemTitle">
                        菜單網址
                    </Col>
                    <Col span={15}></Col>
                </Row>
            </Col>
        </Row>
    );
}