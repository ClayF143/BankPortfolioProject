import GenericService from "./GenericService";
import Account from "../types/Transaction";

class TransactionService extends GenericService<Account> {
    constructor() {
        super("transaction");
    }
}

export default TransactionService;