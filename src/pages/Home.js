import { Layout } from 'antd';
import { HomeHeader } from '../components/HomeHeader';

const { Header, Content, Footer } = Layout;

export default function Home() {
    return(
        <Layout className="container main-layout">
            <Layout>
                <Header style={{posution:'fixed', zIndex:1}}>
                    <HomeHeader />
                </Header>
            </Layout>
        </Layout>
    );
}