import Account from "../types/Account";
import ServiceFactory from "./ServiceFactory";

const AccountService = {
  add: ServiceFactory.add<Account>('account/add'),
  update: ServiceFactory.update<Account>('account/update'),
}

export default AccountService;