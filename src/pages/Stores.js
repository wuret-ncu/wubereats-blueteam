import React from 'react';
import { Layout } from 'antd';
import StoreList from '../components/StoreList';
import HomeHeader from '../components/HomeHeader';

const {Header, Content, Footer } = Layout;

function Stores() {
    return(
        <Layout className="container main-layout">
            <Layout>
                <Header style={{position: 'fixed', zIndex: 1}}>
                    <HomeHeader />
                </Header>
                <Content>
                    <StoreList />
                </Content>
            </Layout>         
        </Layout>
    );
}

export default Stores;