import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import { postCart, getAStore } from '../api';
import { SET_VISIBLE } from '../utils/constants';
import { StoreContext } from '../store';

export default function MenuDetail(menuDetailProps) {
    const { dispatch } = useContext(StoreContext);
    const [imgUrl, setImgUrl] = useState("/");
    const [orderItem, setOrderItem] = useState('');
    const [orderSum, setOrderSum] = useState('');
    const [addToCart, setAddToCart] = useState(null);
    const [form] = Form.useForm();
    const { TextArea } = Input;

    const onClickAddToCart = async (e) => {
        setAddToCart({
            Meals: orderItem,
            Price: orderSum
        })
        form.resetFields();
    }

    useEffect(() => {
        if(addToCart !== null) {
           postCart(addToCart).then((response) => {
            console.log(response);
            dispatch({
                type: SET_VISIBLE,
                payload: true
            })
            }).catch(
                input => {console.log(input.response)}
            ) 
        }
    }, [addToCart])

    return(
        <Row className="menuBox">
            <Col span={13} className="menuLeftBox">
                <Row className="menuImgHead">
                    <Link to="/stores" className="MenubackToStore">{'<'} 返回Stores</Link>
                    <Link to={imgUrl} className="MenuToUrl">菜單網址</Link>
                </Row>
                <Row className="menuImg"></Row>
            </Col>
            <Col span={11} className="menuRightBox">
                <div className="orderBox">
                    <Form 
                        form={form}
                    >
                        <div className="orderTitle">今天想吃點什麼？</div>
                        <Form.Item
                            name="order"
                        >
                            <TextArea
                                rows={2} 
                                value={orderItem}
                                className="inputOrder"
                                autoComplete="off"
                                onChange={(e) => setOrderItem(e.target.value)}
                            />
                        </Form.Item>
                        <div className="sumAndSend">
                            <div className="inputSumBox">
                                <div className="orderTitle sumTitle">餐點價格：</div>
                                <Form.Item
                                    name="sum"
                                >
                                    <Input
                                        value={orderSum}
                                        className="inputSum"
                                        autoComplete="off"
                                        onChange={(e) => setOrderSum(e.target.value)}
                                    />
                                </Form.Item>
                            </div>
                            <Form.Item>
                                <Button
                                    htmlType="submit"
                                    className="sendOrderBtn"
                                    onClick={onClickAddToCart}
                                >
                                    送出餐點
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
                <Row className="rateBox">
                    <div className="orderTitle">評論區</div>
                    <div className="commentsBox">
                        <div className="aComment">
                            <div className="commentName">Jenny</div>
                            <div className="commentsAndTime">
                                <div className="comments">這家炒飯好吃!</div>
                                <div className="commentTime">2021/09/06 14:44</div>
                            </div>
                        </div>
                        {/* <div className="aComment">
                            <div className="commentName">Jenny</div>
                            <div className="commentsAndTime">
                                <div className="comments">這家炒飯好吃</div>
                                <div className="commentTime">2021/09/06 14:44</div>
                            </div>
                        </div>
                        <div className="aComment">
                            <div className="commentName">Jenny</div>
                            <div className="commentsAndTime">
                                <div className="comments">這家炒飯好吃</div>
                                <div className="commentTime">2021/09/06 14:44</div>
                            </div>
                        </div>
                        <div className="aComment">
                            <div className="commentName">Jenny</div>
                            <div className="commentsAndTime">
                                <div className="comments">這家炒飯好吃</div>
                                <div className="commentTime">2021/09/06 14:44</div>
                            </div>
                        </div> */}
                    </div>
                    <div className="rateNickname">{localStorage.getItem("nickname")}</div>
                    
                </Row>
            </Col>
        </Row>
    );
}