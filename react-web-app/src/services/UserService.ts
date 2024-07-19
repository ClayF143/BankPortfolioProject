import User from "../types/User";
import ServiceFactory from "./ServiceFactory";

const UserService = {
    fetchCurrentUser: ServiceFactory.fetchNoId<User>('user/getcurrentuser'),
}

export default UserService;