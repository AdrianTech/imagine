import { IUser } from "../user";

export interface IAuth {
    isLogged: boolean,
    user: IUser | null
}