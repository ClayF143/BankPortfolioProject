import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import User from '../../types/User'
import { useAuth } from '../../MyAuthProvider';

// for each account, should only use the last transaction of each day
const prepareData = (user: User) => {
  const dataMap: { [key: string]: { [key: string]: number } } = {};

  user.accounts.forEach(account => {
    account.transactions.forEach(transaction => {
      const date = new Date(transaction.transactionDate).toISOString().split('T')[0];
      if (!dataMap[date]) {
        dataMap[date] = {};
      }
      dataMap[date][account.name] = transaction.balanceSnapshot ?? 0;
    });
  });

  const data = Object.keys(dataMap).map(date => {
    return { date, ...dataMap[date] };
  });

  return data;
};

const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00c49f', '#ffbb28', '#0088fe', '#d0ed57'];

// doesn't scale the dates at all
// if transactions only occured on days 1, 2, and 100
// day 1 and 2 will be the same distance appart as day 2 and 100
const TransactionLineGraph = () => {
  const { myUser } = useAuth();
  const data = myUser != null ? prepareData(myUser) : [];
  const accountNames = myUser != null ? myUser.accounts.map(account => account.name) : [];

  return (
    <>
      {myUser && (
        <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {accountNames.map((accountName, index) => (
            <Line
              key={accountName}
              type="monotone"
              dataKey={accountName}
              stroke={colors[index % colors.length]}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      )}
    </>
  );
}

export default TransactionLineGraph;