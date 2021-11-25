import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Input } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { postStore, getStores } from '../api';

export default function Add() {
    const [type, setType] = useState('Foods');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [restDay, setRestDay] = useState('');
    const [menuURL, setMenuURL] = useState('');
    const [storeObj, setStoreObj] = useState(null);
    const [allStores, setAllStores] = useState([]);
    const activeFoodsBtn = "activeFoodsBtn"
    const activeDrinksBtn = "activeDrinksBtn"
    const typeBtn = "typeBtn"
    const [form] = Form.useForm();
    const history = useHistory();

    useEffect(() => {
        getStores().then((response) => {
            setAllStores(response.data);
        })
    }, [])

    const onClickCreate = async (e) => {
        setStoreObj({
            StoreType: type,
            StoreName: name,
            Phone: phone,
            RestDate: restDay,
            MuneUrl: menuURL
        })
        form.resetFields();
    }

    useEffect(() => {
        console.log(storeObj);
        const num = allStores.findIndex(store => store.StoreName === storeObj.StoreName)
            if(num === -1 && storeObj !== null) {
                postStore(storeObj).then((response) => {
                    console.log(response);
                    history.push('/Stores')
                }).catch(
                    input => {console.log(input.response)}
                )
            }
            else if(num !== -1 && storeObj !==null) {
                alert('此店家已存在。')
            }
        setName('');
        setPhone('');
        setRestDay('');
        setMenuURL('');
    }, [storeObj])

    return(
        <Row className="addBgc">
            <Col span={12}></Col>
            <Col span={12} className="addForm">
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
                >
                    <Row className="formItem">
                        <Col span={6} className="formItemTitle">
                            店家名稱
                        </Col>
                        <Col span={15}>
                            <Form.Item
                                name="storeName"
                                rules={[
                                    {
                                        required:true,
                                        message:'Please input the store name'
                                    }
                                ]}
                            >
                                <Input
                                    value={name}
                                    className="addInputs" 
                                    autoComplete="off"
                                    onChange={(e) => setName(e.target.value)}
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
                                    onClick={onClickCreate}
                                >
                                    Create
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    );
}