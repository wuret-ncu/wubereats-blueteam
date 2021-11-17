import React from 'react';
import { Layout } from 'antd';
import AllHeader from '../components/Header';
import Add from '../components/Add'

const {Header, Content} = Layout;

export default function AddStore() {
    return(
        <Layout className="container main-layout">
            <Layout>
                <Header style={{position: 'fixed', zIndex: 1, backgroundColor: 'rgb(249,249,249)'}}>
                    <AllHeader />
                </Header>
                <Content>
                    <Add />
                </Content>
            </Layout>         
        </Layout>
    );
}