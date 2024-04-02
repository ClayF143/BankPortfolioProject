import config from "../config";
import User from "../types/User";

const UserServices = {
    fetchUsers: async (accessToken: string) => {
        const response = await fetch(`${config.baseApiUrl}/user/getall`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return await response.json();
    },
    
    fetchCurrentUser: async (accessToken: string) : Promise<User> => {
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