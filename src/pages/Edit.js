import React from 'react';
import { Layout } from 'antd';
import AllHeader from '../components/Header';
import AllFooter from '../components/Footer';
import EditDetail from '../components/EditDetail';

const {Header, Content, Footer } = Layout;

export default function Edit(pageEditProps) {
    return(
        <Layout className="container main-layout">
            <Layout>
                <Header style={{position: 'fixed', zIndex: 1, backgroundColor: "rgba(249, 249, 249, 0.8)", boxShadow:"0 0.4vh 0.4vh 0.1vh rgba(114, 114, 114, 0.1)"}}>
                    <AllHeader />
                </Header>
                <Content>
                    <EditDetail storeId={pageEditProps.storeId}/>
                </Content>
                <Footer className="layout-footer-home">
                    <AllFooter />
                </Footer>
            </Layout>         
        </Layout>
    );
}