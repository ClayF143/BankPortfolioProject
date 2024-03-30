import './App.css';
import { useAuth0 } from "@auth0/auth0-react";
import Profile from './Profile';
import UserList from './UserList';
import { createElement, useState } from 'react';
import Dashboard from './pages/Dashboard';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, MenuProps } from 'antd';
import Login from './misc-components/Login';

const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
  }));
  
  const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
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
    },
  );

  

function App() {
    const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect, logout, getAccessTokenWithPopup } = useAuth0();

    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

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
          <Login 
            user={user}
            loginWithRedirect={loginWithRedirect}
            logout={logout}
          />
        </Header>
        <Content style={{ padding: '0 48px' }}>
          <Layout
            style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
          >
            <Sider style={{ background: colorBgContainer }} width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
                items={items2}
              />
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 400 }}>
              {isAuthenticated && (
                <UserList
                  getAccessTokenSilently={ getAccessTokenSilently }
                />
              )}
              <Dashboard />
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED

        </Footer>
      </Layout>
    );
}

export default App;