import React from 'react';
import { Layout } from 'antd';
import AllHeader from '../components/Header';
import MenuDetail from '../components/MenuDetail';

const {Header, Content } = Layout;

export default function Menu(pageMenuProps) {
    return(
        <Layout className="container main-layout">
            <Layout>
                <Header style={{position: 'fixed', zIndex: 1, backgroundColor: "rgba(249, 249, 249, 0.8)", boxShadow:"0 0.4vh 0.4vh 0.1vh rgba(114, 114, 114, 0.1)"}}>
                    <AllHeader />
                </Header>
                <Content className="ant-layout-content">
                    <MenuDetail storeId={pageMenuProps.storeId} />
                </Content>
            </Layout>         
        </Layout>
    );
}