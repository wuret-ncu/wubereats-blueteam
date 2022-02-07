import React from 'react';
import { Layout } from 'antd';
import AllHeader from '../components/Header';
import AllFooter from '../components/Footer';
import ProfileDetail from '../components/ProfileDetail';

const {Header, Content, Footer } = Layout;

export default function Profile() {
    return(
        <Layout className="container main-layout">
            <Layout>
                <Header style={{position: 'fixed', zIndex: 1, backgroundColor: "rgba(249, 249, 249, 0.8)"}}>
                    <AllHeader />
                </Header>
                <Content>
                    <ProfileDetail />
                </Content>
                <Footer className="layout-footer-home">
                    <AllFooter />
                </Footer>
            </Layout>         
        </Layout>
    );
}