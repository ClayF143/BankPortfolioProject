import { createElement, useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined, DollarOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, MenuProps } from 'antd';
import Login from '../misc-components/Login';
import Transactions from './transactions/Transactions';
import UserList from '../misc-components/UserList';
import LineGraph from './LineGraphPrototype';

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

const lineGraphData = [
  { x: new Date('2024-01-01'), y: 100 },
  { x: new Date('2024-02-01'), y: 200 },
  { x: new Date('2024-03-01'), y: 150 },
  // Add more data points as needed
];

function Dashboard() {
    const [content, setContent] = useState(<Transactions />);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuSelection: MenuProps['onClick'] = (e) => {
    switch(e.key) {
      case 'transactions':
        setContent(
          <Transactions />
        );
        break;
      case 'accounts':
        setContent(
          <>Account wip</>
        );
        break;
      case 'users':
        setContent(
          <UserList />
        );
        break;
      case 'linegraph':
        setContent(
          <LineGraph data={lineGraphData} />
        );
        break;
      default:
        setContent(<></>);
        break;
    }
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
          {content}
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>
        Cents & Sensibility Trust Fund, {new Date().getFullYear()} Created by Clay Fike
      </Footer>
    </Layout>
  );
}

export default Dashboard;