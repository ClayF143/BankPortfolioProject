import Transaction from "./Transaction";

type Account = {
  AccountNumber: number,
  userId: number
  name: string,
  type: string,
  balance: number,

  transactions: Transaction[]
}

export default Account;