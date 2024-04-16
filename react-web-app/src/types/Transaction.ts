type Transaction = {
  id: number | null,
  accountId: number,
  amount: number,
  transactionDate: Date,
  counterpartyName: string,
  counterpartyAccountId: number | null
}

export default Transaction;