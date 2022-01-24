import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, Button, Input, Upload, message, Spin } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import storeDot from '../img/img-store-dot.png';
import axios from 'axios';
import { getAStore, postEditedStore } from '../api';

export default function EditDetail(appProps) {
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [restDay, setRestDay] = useState('');
    const [menuURL, setMenuURL] = useState('');
    const [storeObj, setStoreObj] = useState(null);
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const activeFoodsBtn = "activeFoodsBtn"
    const activeDrinksBtn = "activeDrinksBtn"
    const typeBtn = "typeBtn"
    const [form] = Form.useForm();
    const history = useHistory();
    const Dragger = Upload.Dragger;

    useEffect(() => {
        let trytry = true;
        console.log(appProps.storeId);
        (async  () => {
            getAStore(appProps.storeId).then(
            function(response) {
                console.log(response.data);
                setName(response.data.StoreName)
                setType(response.data.StoreType[0][0])
                setPhone(response.data.Phone)
                setRestDay(response.data.RestDate)
                setMenuURL(response.data.MenuUrl)
                setLoading(false);
            }).catch((error) => {
                console.log(error);
            });
        })();
        return () => (trytry = false)
    }, [appProps.storeId])
    
    useEffect(() => {
        if(storeObj !== null) {
            postEditedStore(storeObj, appProps.storeId).then((res) => {
                console.log(res.data);
                history.push('/stores');
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [storeObj, appProps.storeId, history])

    const onClickConfirm = () => {
        setStoreObj({
            StoreType: type,
            Phone: phone,
            RestDate: restDay,
            MuneUrl: menuURL
        })
        console.log('onClickConfirm');
    }

    const props = {
        beforeUpload: file => {
            if(file.type !== 'image/png') {
                message.error(`${file.name} is not an image file`);
            }
            return true
        },
        onChange: info => {
            console.log(info.fileList);
        }
    };
    return(
        <Row className="addBgc">
            <Col span={12} className="uploadMenuBox">
                <div className="listTitleAll"><img src={storeDot} className="storeDot" alt=""/><span className="uploadTitle">可在此處重新上傳菜單</span></div>
                <Dragger {...props}
                    className="dragger"
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                </Dragger>
            </Col>
            <Col span={12} className="addForm">
            {loading ? <Spin style={{display:"flex", justifyContent:"center", marginTop:"25vh"}} size="large" /> :
            <>
                <div className="typeBtnBox">
                    <div 
                        className={`${type === 'Foods' ? activeFoodsBtn : typeBtn}`}
                        onClick={()=>setType('Foods')}
                    >
                        Foods
                    </div>
                    <div 
                        className={`${type === 'Drinks' ? activeDrinksBtn : typeBtn}`}
                        onClick={()=>setType('Drinks')}
                    >
                        Drinks
                    </div>
                </div>
                <Form
                    form={form} 
                    name="addStore"
                    initialValues={{storeName:name, storePhone:phone, storeRestDay:restDay, storeMenuURL:menuURL}}
                >
                    <Row className="formItem">
                        <Col span={6} className="formItemTitle">
                            店家名稱
                        </Col>
                        <Col span={15}>
                            <Form.Item
                                name="storeName"
                            >
                                <Input
                                    value={name}
                                    className="addInputs"
                                    disabled={true}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className="formItem">
                        <Col span={6} className="formItemTitle">
                            店家電話
                        </Col>
                        <Col span={15}>
                            <Form.Item
                                name="storePhone"
                            >
                                <Input 
                                    value={phone}
                                    className="addInputs" 
                                    autoComplete="off"
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className="formItem">
                        <Col span={6} className="formItemTitle">
                            公休日
                        </Col>
                        <Col span={15}>
                            <Form.Item
                                name="storeRestDay"
                            >
                                <Input
                                    value={restDay}
                                    className="addInputs" 
                                    autoComplete="off"
                                    onChange={(e) => setRestDay(e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className="formItem">
                        <Col span={6} className="formItemTitle">
                            菜單網址
                        </Col>
                        <Col span={15}>
                            <Form.Item
                                name="storeMenuURL"
                            >
                                <Input
                                    value={menuURL}
                                    className="addInputs" 
                                    autoComplete="off"
                                    onChange={(e) => setMenuURL(e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className="addBtns">
                        <Col span={8} offset={7}>
                            <Link to="/stores">
                                <div className="addCancelBtn">Cancel</div>
                            </Link>
                        </Col>
                        <Col span={8} offset={1}>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="addCreateBtn"
                                    onClick={onClickConfirm}
                                >
                                    Confirm
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </>}
            </Col>
        </Row>
    );
}