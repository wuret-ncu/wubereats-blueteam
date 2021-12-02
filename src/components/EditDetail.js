import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, Button, Input, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { postStore, getStores, postMenu } from '../api';
import storeDot from '../img/img-store-dot.png';
import { StoreContext } from '../store';
import { SET_EDIT_ITEM } from '../utils/constants';


export default function EditDetail(appProps) {
    const { state: { editItem: { StoreType, StoreName, Phone, RestDate, MenuUrl } } , dispatch } = useContext(StoreContext);
    const [type, setType] = useState('Foods');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [restDay, setRestDay] = useState('');
    const [menuURL, setMenuURL] = useState('');
    const [storeObj, setStoreObj] = useState(null);
    const [allStores, setAllStores] = useState([]);
    const [menu, setMenu] = useState([]);
    const activeFoodsBtn = "activeFoodsBtn"
    const activeDrinksBtn = "activeDrinksBtn"
    const typeBtn = "typeBtn"
    const [form] = Form.useForm();
    const history = useHistory();
    const Dragger = Upload.Dragger;

    useEffect(() => {
        getStores().then((response) => {
            setAllStores(response.data);
        })
    }, [])
    useEffect(() => {
        setStoreObj(allStores.filter((item) => item._id === appProps.storeId));
    }, [allStores])
    useEffect(() => {
        storeObj ? storeObj.map(s => {
            s.StoreType.map(t => setType(t))
        }): console.log('non');
    }, [storeObj])
    console.log(type);
    const onClickConfirm = () => {
        // setStoreObj({
        //     StoreType: type,
        //     StoreName: StoreName,
        //     Phone: phone,
        //     RestDate: restDay,
        //     MuneUrl: menuURL
        // })
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
                <div className="typeBtnBox">
                    <div 
                        className={`${StoreType === 'Foods' ? activeFoodsBtn : typeBtn}`}
                        onClick={()=>{
                            dispatch({
                                type: SET_EDIT_ITEM,
                                payload: {
                                    StoreType: 'Foods'
                                }
                            })
                        }}
                    >
                        Foods
                    </div>
                    <div 
                        className={`${StoreType === 'Drinks' ? activeDrinksBtn : typeBtn}`}
                        onClick={()=>{
                            dispatch({
                                type: SET_EDIT_ITEM,
                                payload: {
                                    StoreType: 'Drinks'
                                }
                            })
                        }}
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
                                    value={StoreName}
                                    defaultValue={StoreName}
                                    className="addInputs"
                                    disabled={true}
                                    // autoComplete="off"
                                    // onChange={(e) => setName(e.target.value)}
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
                                    defaultValue={Phone}
                                    className="addInputs" 
                                    autoComplete="off"
                                    onChange={(e) => {
                                        dispatch({
                                            type: SET_EDIT_ITEM,
                                            payload: {
                                                Phone: e.target.value
                                            }
                                        })
                                    }}
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
                                    defaultValue={RestDate}
                                    className="addInputs" 
                                    autoComplete="off"
                                    onChange={(e) => {
                                        dispatch({
                                            type: SET_EDIT_ITEM,
                                            payload: {
                                                RestDate: e.target.value
                                            }
                                        })
                                    }}
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
                                    defaultValue={MenuUrl}
                                    className="addInputs" 
                                    autoComplete="off"
                                    onChange={(e) => {
                                        dispatch({
                                            type: SET_EDIT_ITEM,
                                            payload: {
                                                MenuUrl: e.target.value
                                            }
                                        })
                                    }}
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
            </Col>
        </Row>
    );
}