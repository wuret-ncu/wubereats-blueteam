import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import homeTitle from '../img/img-home-title.png';
import toLogin from '../img/btn-home-toLogin.png';
import toStore from '../img/btn-home-toStore.png';

export default function Entry() {
    return(
        <Row>
            <Col span={12} className="entryLeft">
                <img className="homeTitle" src={homeTitle} />
                <Link to="/">
                    <img className="entryLeftImg toLogin" src={toLogin} />
                </Link>
                <Link to="/Stores">
                    <img className="entryLeftImg" src={toStore} />
                </Link>
                  
                
            </Col>
            <Col span={12}></Col>
        </Row>
    );
}