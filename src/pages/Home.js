import React from 'react';
import { Layout } from 'antd';
import Entry from '../components/Entry';
import HomeHeader from '../components/HomeHeader';

const {Header, Content, Footer } = Layout;

function Home() {
    return(
        <Layout className="container main-layout">
            <Layout>
                <Header style={{position: 'fixed', zIndex: 1}}>
                    <HomeHeader />
                </Header>
                <Content>
                    <Entry />
                </Content>
            </Layout>         
        </Layout>
    );
}

export default Home;