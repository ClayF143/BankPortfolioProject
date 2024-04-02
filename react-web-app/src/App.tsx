import './App.css';
import { createElement, useState } from 'react';
import Dashboard from './pages/Dashboard';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, MenuProps } from 'antd';
import Login from './misc-components/Login';
import Transactions from './pages/transactions/Transactions';

const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));
  
const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

function App() {
  const [content, setContent] = useState(<></>);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuSelection: MenuProps['onClick'] = (e) => {
    switch(e.key) {
      case "1":
        setContent(<div>hoi</div>);
        break;
      case "2":
        setContent(
          <Transactions />
        )
        break;
      default:
        setContent(<Dashboard/>);
    }
  };

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
        <Login />
      </Header>
      <Layout
        style={{ padding: '0 0 24px', background: colorBgContainer, borderRadius: borderRadiusLG }}
      >
        <Sider style={{ background: colorBgContainer }} width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
            onClick={handleMenuSelection}
          />
        </Sider>
        <Content style={{ padding: '24px 24px', minHeight: 400 }}>
          {content}
          {/*isAuthenticated && (
            <UserList
              getAccessTokenSilently={ getAccessTokenSilently }
            />
          )*/}
          {/*<Dashboard />*/}
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default App;