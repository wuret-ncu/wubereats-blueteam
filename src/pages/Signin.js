import React from 'react';
import { useState, useEffect } from 'react';
import { Layout, Grid } from 'antd';
import HomeHeader from '../components/HomeHeader';
import AllHeader from '../components/Header';
import AllFooter from '../components/Footer';
import SigninDetail from '../components/SigninDetail';

const {Header, Content, Footer } = Layout;
const { useBreakpoint } = Grid;

export default function Signin() {
    const [layoutHomeHeader, setlayoutHomeHeader] = useState("transparent")
    const { sm } = useBreakpoint();
    const layoutFooterHome = sm ? "layout-footer-home" : "displayNone"
    const antLayoutHeader = sm? "" : "ant-layout-header";
    // 監聽滾動，改變header樣貌
    const listenScrollEvent = () => {
        window.scrollY > 100 ? setlayoutHomeHeader("rgba(249, 249, 249, 0.8)") : setlayoutHomeHeader("transparent")
    }
    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent)
    })

    return(
        <Layout className="container main-layout">
            <Layout>
                {sm ? 
                    <Header className={antLayoutHeader} style={{position: 'fixed', zIndex: 1, backgroundColor: layoutHomeHeader}}>
                        <HomeHeader />
                    </Header> :
                    <Header className={antLayoutHeader} style={{position: 'fixed', zIndex: 1, backgroundColor: "rgba(249, 249, 249, 0.8)"}}>
                        <AllHeader/>
                    </Header>
                }
                <Content>
                    <SigninDetail />
                </Content>
                <Footer className={layoutFooterHome}>
                    <AllFooter />
                </Footer>
            </Layout>         
        </Layout>
    );
}