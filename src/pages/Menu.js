import React from 'react';
import { Layout } from 'antd';
import AllHeader from '../components/Header';
import MenuDetail from '../components/MenuDetail';
import AllFooter from '../components/Footer';

const {Header, Content, Footer } = Layout;

export default function Menu() {
    return(
        <Layout className="container main-layout">
            <Layout>
                <Header style={{position: 'fixed', zIndex: 1, backgroundColor: "rgba(249, 249, 249, 0.8)"}}>
                    <AllHeader />
                </Header>
                <Content>
                    <MenuDetail />
                </Content>
                <Footer className="layout-footer-home">
                    <AllFooter />
                </Footer>
            </Layout>         
        </Layout>
    );
}