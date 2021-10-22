import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';

export default function StoreList() {
    return(
        <div className="storeBgc">
            <Row>
                <Col span={12} className="storeSlogan">
                    Choose what you want to eat.
                </Col>
                <Col span={4} offset={8}>
                    <Link to="/AddStore" className="addMenuBtn">+ 新增菜單</Link>
                </Col>
            </Row>
            <Row></Row>
        </div>
    );
}