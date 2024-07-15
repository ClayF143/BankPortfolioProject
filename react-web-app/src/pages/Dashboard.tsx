import { createElement, useEffect, useState } from 'react';
import { UserOutlined, DollarOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, MenuProps } from 'antd';
import Login from '../misc-components/Login';
import Transactions from './transactions/Transactions';
import UserList from '../misc-components/UserList';
import User from '../types/User';
import { useAuth } from '../MyAuthProvider';
import UserService from '../services/UserService';

const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps['items'] = [
  {
    key: 'transactions',
    icon: createElement(DollarOutlined),
    label: 'Transactions'
  },
  {
    key: 'accounts',
    icon: createElement(UserOutlined),
    label: 'Accounts'
  },
  {
    key: 'users',
    icon: createElement(UserOutlined),
    label: 'User List'
  },
  {
    key: 'linegraph',
    icon: createElement(UserOutlined),
    label: 'Line Graph'
  }
]

function Dashboard() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('transactions');

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuSelection: MenuProps['onClick'] = (e) => {
    setSelectedMenuItem(e.key);
  };

  return (
    <Layout style={{minHeight: '100vh'}}>
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
            defaultSelectedKeys={['transactions']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
            onClick={handleMenuSelection}
          />
        </Sider>
        <Content style={{ padding: '24px 24px' }}>
          {selectedMenuItem === 'transactions' && (
            <Transactions />
          )}
          {selectedMenuItem === 'accounts' && (
            <>Account wip</>
          )}
          {selectedMenuItem === 'users' && (
            <UserList />
          )}
          {selectedMenuItem === 'linegraph' && (
            <></>
          )}
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>
        Cents & Sensibility Trust Fund, {new Date().getFullYear()} Created by Clay Fike
      </Footer>
    </Layout>
  );
}

export default Dashboard;