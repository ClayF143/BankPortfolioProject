type Transaction = {
  id: number,
  accountId: number,
  amount: number,
  transactionDate: Date,
  counterpartyName: string,
  counterpartyAccountId: number | null
}

export default Transaction;