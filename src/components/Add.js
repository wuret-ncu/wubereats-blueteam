import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, Button, Input, Upload, Grid, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { postStore, getStores } from '../api';
import { StoreContext } from '../store';
import storeDot from '../img/img-store-dot.png';
const { useBreakpoint } = Grid;

export default function Add() {
    const [type, setType] = useState('Foods');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [restDay, setRestDay] = useState('');
    const [menuURL, setMenuURL] = useState('');
    const [storeObj, setStoreObj] = useState(null);
    const [allStores, setAllStores] = useState([]);
    const [menu, setMenu] = useState(null);
    const [form] = Form.useForm();
    const history = useHistory();
    const Dragger = Upload.Dragger;
    const { sm } = useBreakpoint();
    const activeFoodsBtn = sm ? "activeFoodsBtn" : "activeFoodsBtnMobile";
    const activeDrinksBtn = sm ? "activeDrinksBtn" : "activeDrinksBtnMobile";
    const typeBtn = sm ? "typeBtn" : "typeBtnMobile";
    const addBgc = sm ? "addBgc" : "addBgcMobile";
    const uploadTitle = sm ? "uploadTitle" : "uploadTitleMobile";
    const storeDotClass = sm ? "storeDot" : "storeDotMobile";
    const dragger = sm ? "dragger" : "draggerMobile";
    const uploadMenuBox = sm ? "uploadMenuBox" : "uploadMenuBoxMobile";
    const addForm = sm ? "addForm" : "addFormMobile";
    const typeBtnBox = sm ? "typeBtnBox" : "typeBtnBoxMobile";
    const formItemTitle = sm ? "formItemTitle" : "formItemTitleMobile";
    const formItem = sm ? "formItem" : "formItemMobile";
    const addCancelBtn = sm ? "addCancelBtn" : "addCancelBtnMobile";
    const addCreateBtn = sm ? "addCreateBtn" : "addCreateBtnMobile";
    const addBtns = sm ? "addBtns" : "addBtnsMobile"; 
    const addInputs = sm ? "addInputs" : "addInputsMobile";
   
    useEffect(() => {
        getStores().then((response) => {
            setAllStores(response.data);
        })
    }, [])
    
    const onClickCreate = () => {
        if(menu === null) {
            message.warning('請記得上傳菜單圖片！');
        } else if(!isNaN(Number(phone))) {
            message.warning('電話欄位只能填數字哦！')
        } else {
            setStoreObj(new Map([
                ['StoreType', type],
                ['StoreName', name],
                ['Phone', phone],
                ['RestDate', restDay],
                ['MenuUrl', menuURL],
                ['image', menu[0].originFileObj]
            ]));
        }
        form.resetFields();
    }

    useEffect(() => {
        if(String(storeObj) !== 'null') {
            const num = allStores.findIndex(store => store.StoreName === storeObj.get('StoreName'))
            if(num === -1) {
                let formData = new FormData();
                for(let [key, value] of storeObj) {
                    formData.append(key, value)
                }
                postStore(formData).then((response) => {
                    console.log(response);
                    history.push('/stores')
                    setStoreObj(null);
                    message.success("Successfully added！")
                }).catch(
                    input => {console.log(input.response)}
                )
            }
            else if(num !== -1 && storeObj !==null) {
                alert('此店家已存在。')
            }
            setType('Foods');
            setMenu(null);
            setName('');
            setPhone('');
            setRestDay('');
            setMenuURL('');
        }
    }, [storeObj])
    
    const props = {
        name: 'image',
        beforeUpload: ()=>false,
        onChange:({fileList}) => {
            setMenu(fileList);
        }
    };
    
    return(
        <Row className={addBgc}>
            <Col sm={{span: 12}} span={24} className={uploadMenuBox}>
                <div className="listTitleAll"><img src={storeDot} className={storeDotClass} alt=""/><span className={uploadTitle}>請在此處上傳菜單</span></div>
                <Dragger {...props}
                    className={dragger}
                >
                    <p className="ant-upload-drag-icon" style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                        <InboxOutlined />
                        <div style={{fontSize:'1.6vw', color:'#222E16', fontWeight:'400', marginTop:'5vh', width:'80%', letterSpacing:'0.1vw'}}>Click or drag the menu to this area to upload</div>
                    </p>
                </Dragger>
            </Col>
            <Col sm={{span:12}} span={24} className={addForm}>
                <div className={typeBtnBox}>
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
                    <Row className={formItem}>
                        <Col span={6} className={formItemTitle}>
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
                                    className={addInputs} 
                                    autoComplete="off"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className={formItem}>
                        <Col span={6} className={formItemTitle}>
                            店家電話
                        </Col>
                        <Col span={15}>
                            <Form.Item
                                name="storePhone"
                            >
                                <Input 
                                    value={phone}
                                    className={addInputs}
                                    autoComplete="off"
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className={formItem}>
                        <Col span={6} className={formItemTitle}>
                            公休日
                        </Col>
                        <Col span={15}>
                            <Form.Item
                                name="storeRestDay"
                            >
                                <Input 
                                    value={restDay}
                                    className={addInputs} 
                                    autoComplete="off"
                                    onChange={(e) => setRestDay(e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className={formItem}>
                        <Col span={6} className={formItemTitle}>
                            菜單網址
                        </Col>
                        <Col span={15}>
                            <Form.Item
                                name="storeMenuURL"
                            >
                                <Input
                                    value={menuURL}
                                    className={addInputs} 
                                    autoComplete="off"
                                    onChange={(e) => setMenuURL(e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className={addBtns}>
                        <Col sm={{span:8, offset:7}} span={9} offset={3}>
                            <Link to="/stores">
                                <div className={addCancelBtn}>Cancel</div>
                            </Link>
                        </Col>
                        <Col sm={{span:8, offset:1}} span={11} offset={1}>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className={addCreateBtn}
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