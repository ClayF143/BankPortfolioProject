import Account from "./Account";

type User = {
    id: number,
    email: string
    firstName: string,
    lastName: string,
    fullName: string,

    accounts: Account[]
}

export default User;