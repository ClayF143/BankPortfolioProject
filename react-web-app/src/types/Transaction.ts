type Transaction = {
  id: number | null,
  accountId: number,
  amount: number,
  balanceSnapshot: number | null,
  transactionDate: Date,
  counterpartyName: string,
  counterpartyAccountId: number | null
}

export default Transaction;