import config from "../config";

const UserServices = {
    fetchUsers: async () => {
        const response = await fetch(`${config.baseApiUrl}/user`);
        return await response.json();
    }
};

export default UserServices;