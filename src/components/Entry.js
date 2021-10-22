import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import homeTitle from '../img/img-home-title.png';
import banner from '../img/img-home-banner.png';

export default function Entry() {
    return(
        <Row>
            <Col span={10} className="entryLeft">
                <img className="homeTitle" src={homeTitle} />
                <Link to="/" className="entryLeftImg toLogin"></Link>    
                <Link to="/Stores" className="entryLeftImg toStores"></Link>
            </Col>
            <Col span={14}>
                <img className="banner" src={banner} />
            </Col>
        </Row>
    );
}