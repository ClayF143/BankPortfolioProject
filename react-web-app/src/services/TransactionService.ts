import Transaction from "../types/Transaction";
import ServiceFactory from "./ServiceFactory";

const TransactionService = ServiceFactory.writeOnlyService<Transaction>('transaction');

export default TransactionService;