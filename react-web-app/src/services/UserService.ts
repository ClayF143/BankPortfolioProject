import GenericService from "./GenericService";
import User from "../types/User";
import axios from "axios";

class UserService extends GenericService<User> {
    constructor() {
        super("user");
    }

    async fetchCurrentUser(accessToken: string): Promise<User> {
        const response = await axios.get(`${this.baseControllerUrl}/get`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    }
}

export default UserService;