import GenericService from "./GenericService";
import Account from "../types/Transaction";
import axios from "axios";

class TransactionService extends GenericService<Account> {
    constructor() {
        super("transaction");
    }

    async fetchAccountTransactions(accessToken: string, accountId: number) {
        const response = await axios.get(`${this.baseControllerUrl}/GetAccountTransactions/${accountId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          return response.data;
    }
}

export default TransactionService;