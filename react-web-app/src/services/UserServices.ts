import { GetTokenSilentlyOptions } from "@auth0/auth0-react";
import config from "../config";
import ServiceUtils from "./ServiceUtils";
import User from "../types/User";

interface IServiceProp {
    getAccessTokenSilently: (options?: GetTokenSilentlyOptions | undefined) => Promise<string>;
}

const UserServices = {
    fetchUsers: async ({ getAccessTokenSilently }: IServiceProp) : Promise<User[]> => {
        const accessToken = await ServiceUtils.getAccessToken({ getAccessTokenSilently });
        const response = await fetch(`${config.baseApiUrl}/user/getall`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return await response.json();
    },
    
    fetchCurrentUser: async ({ getAccessTokenSilently }: IServiceProp) : Promise<User> => {
        const accessToken = await ServiceUtils.getAccessToken({ getAccessTokenSilently });
        const response = await fetch(`${config.baseApiUrl}/user/getcurrentuser`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log(`${config.baseApiUrl}/user/getcurrentuser`);
        return await response.json();
    }
};

export default UserServices;