import GenericService from "./GenericService";
import Account from "../types/Account";

class AccountService extends GenericService<Account> {
    constructor() {
        super("account");
    }
}

export default AccountService;