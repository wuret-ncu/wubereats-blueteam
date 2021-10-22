import React from 'react';
import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import Entry from '../components/Entry';
import HomeHeader from '../components/HomeHeader';
import AllFooter from '../components/Footer';

const {Header, Content, Footer } = Layout;

function Home() {
    const [layoutHomeHeader, setlayoutHomeHeader] = useState("transparent")

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
                <Header style={{position: 'fixed', zIndex: 1, backgroundColor: layoutHomeHeader}}>
                    <HomeHeader />
                </Header>
                <Content>
                    <Entry />
                </Content>
                <Footer className="layout-footer-home">
                    <AllFooter />
                </Footer>
            </Layout>         
        </Layout>
    );
}

export default Home;