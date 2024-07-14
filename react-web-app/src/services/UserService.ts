import User from "../types/User";
import axios from "axios";
import config from "../config";

const baseControllerUrl = `${config.baseApiUrl}/user`;

const UserService = {
    fetchCurrentUser: async (accessToken: string) => {
        return (await axios.get(`${baseControllerUrl}/getcurrentuser`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })).data;
    }
}

export default UserService;