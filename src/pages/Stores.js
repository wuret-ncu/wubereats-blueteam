import React from 'react';
import { Layout } from 'antd';
import StoreList from '../components/StoreList';
import AllHeader from '../components/Header';

const {Header, Content, Footer } = Layout;

export default function Stores() {
    return(
        <Layout className="container main-layout">
            <Layout>
                <Header style={{position: 'fixed', zIndex: 1}}>
                    <AllHeader />
                </Header>
                <Content>
                    <StoreList />
                </Content>
            </Layout>         
        </Layout>
    );
}