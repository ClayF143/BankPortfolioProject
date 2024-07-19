import Transaction from "../types/Transaction";
import ServiceFactory from "./ServiceFactory";

const TransactionService = {
  add: ServiceFactory.add<Transaction>('transaction/add'),
  update: ServiceFactory.update<Transaction>('transaction/update'),
}

export default TransactionService;