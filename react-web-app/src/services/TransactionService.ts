import GenericService from "./GenericService";
import Account from "../types/Transaction";
import axios from "axios";

class TransactionService extends GenericService<Account> {
    constructor() {
        super("transaction");
    }
}

export default TransactionService;