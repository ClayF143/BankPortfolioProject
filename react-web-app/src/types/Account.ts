import Transaction from "./Transaction";

type Account = {
  id: number,
  AccountNumber: number,
  userId: number
  name: string,
  type: string,
  balance: number,

  transactions: Transaction[]
}

export default Account;