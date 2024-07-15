import Account from "../types/Account";
import ServiceFactory from "./ServiceFactory";

const AccountService = ServiceFactory.writeOnlyService<Account>('account');

export default AccountService;