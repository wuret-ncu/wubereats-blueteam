import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, Button, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { postCart, postScores, getScores, postComments, getComments } from '../api';
import { SET_VISIBLE, SET_COMMENTS } from '../utils/constants';
import { StoreContext } from '../store';
import { Rating } from 'react-simple-star-rating';
import star from '../img/img-menu-star.png';
import filledStar from '../img/img-menu-filledStar.png';

function Comments(commentProps) {
    function countStar(){
        let filled = []
        if(commentProps.score !== 0) {
            for(let i = 1; i < commentProps.score + 1; i = i + 1) {
                filled.push(<img className="contentStars" key={nanoid()} alt="" src={filledStar} />)
            }
            if(5 - commentProps.score !== 0) {
                for(let j = 1; j < 6 - commentProps.score; j = j + 1) {
                    filled.push(<img className="contentStars" key={nanoid()} alt="" src={star} />)
                }
            }
        }
        return filled
    }
    // console.log(commentProps.content)
    return(
        <div className="aComment">
            <div className="commentName">{commentProps.name}</div>
            <div>{countStar()}</div>
            <div className="commentsAndTime">
                <div className="comments">{commentProps.content}</div>
                <div className="commentTime">{commentProps.time}</div>
            </div>
        </div>
    );
}

export default function MenuDetail(menuDetailProps) {
    const { state : { list : { listItems } } , dispatch } = useContext(StoreContext);
    const [imgUrl, setImgUrl] = useState("/");
    const [orderItem, setOrderItem] = useState('');
    const [orderSum, setOrderSum] = useState('');
    const [addToCart, setAddToCart] = useState(null);
    const [rating, setRating] = useState(0);
    const [sendRate, setSendRate] = useState(null);
    const [comments, setComments] = useState(null);
    const [sendComments, setSendComments] = useState(null);
    const [allComments, setAllComments] = useState([]);
    const [form] = Form.useForm();
    const { TextArea } = Input;

    useEffect(() => {
        let trytry = true;
        (async() => {
            getComments(menuDetailProps.storeId).then((response) => {
                response.data.comment.map(b => {
                    dispatch({
                        type: SET_COMMENTS,
                        payload: {
                            id: nanoid(),
                            commentName: b.User[0].NickName,
                            commentContent: b.Comment,
                            commentTime: b.date,
                            commentScore:0
                        }
                    })
                })
            }).catch(
                input => {console.log(input.response)}
            )
            getScores(menuDetailProps.storeId).then((response) => {
                response.data[0].score.map(a => {
                    dispatch({
                        type: SET_COMMENTS,
                        payload: {
                            id: nanoid(),
                            commentName: a.User[0].NickName,
                            commentContent:'',
                            commentScore: a.Score,
                            commentTime: a.date
                        }
                    })
                })
                
            }).catch(
                input => {console.log(input.response)}
            )
        })();
        return () => (trytry = false)
    }, [])
    
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

    const handleRating = (rate) => {
        setRating(rate/20);
    }

    const onClickSendComment = async (e) => {
        if(rating !== 0) {
            setSendRate({
                storeprofiles: menuDetailProps.storeId,
                userprofiles: localStorage.getItem("userID"),
                Score: rating
            })
        }
        if(String(comments) !== 'null') {
            setSendComments({
                storeprofiles: menuDetailProps.storeId,
                userprofiles: localStorage.getItem("userID"),
                Comment: comments
            })
        }
    }

    useEffect(() => {
        if(String(sendRate) !== 'null') {
            postScores(sendRate).then((response) => {
                console.log(response);
                setRating(0);
                setSendRate(null);
                message.success("評論已送出！")
            }).catch(
                input => {console.log(input.response)}
            )
        }
    }, [sendRate])

    useEffect(() => {
        if(String(sendComments) !== 'null') {
            postComments(sendComments).then((response) => {
                console.log(response);
                setComments(null);
                setSendComments(null);
            })
        }
    }, [sendComments])

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
                        {listItems.length !== 0 ? listItems.map(element => 
                            <Comments key={element.id} name={element.commentName} score={element.commentScore} content={element.commentContent} time={element.commentTime} />
                        ) : ""}
                    </div>
                    <div className="starRateRow">
                        <div className="rateNickname">{localStorage.getItem("nickname")}</div>
                        <div className="starBtnsBox">
                            <Rating
                                onClick={handleRating} 
                                ratingValue={rating}
                                fillColor='#EBC649'
                                transition={true}
                            />
                        </div> 
                    </div>
                    <Form
                        form={form}
                    >
                        <Form.Item
                            name='comment'
                        >
                            <TextArea
                                row={2}
                                value={comments}
                                className="inputOrder"
                                autoComplete="off"
                                onChange={(e) => setComments(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item>
                            <div style={{display:'flex', justifyContent:'flex-end'}}>
                            <Button
                                htmlType="submit"
                                className="sendOrderBtn"
                                onClick={onClickSendComment}
                            >
                                送出評論
                            </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Row>
            </Col>
        </Row>
    );
}