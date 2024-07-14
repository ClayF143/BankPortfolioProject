import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import User from '../types/User'

const myData = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  // ...
];

const calculateData = (user: User) => {
  return user.accounts.map((account) => {
    return account.transactions.map((transaction) => {
      return {
        account: account.name,
        balance: transaction.balanceSnapshot,
        date: transaction.transactionDate,
      };
    });
  });
};

interface LineGraphProps {
  user: User;
}

const LineGraph = ({ user }: LineGraphProps) => (
  <LineChart width={500} height={300} data={calculateData(user)}>
    <XAxis dataKey="name" />
    <YAxis />
    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
  </LineChart>
);

export default LineGraph;