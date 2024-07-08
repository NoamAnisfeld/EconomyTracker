import { createContext } from "react";

interface UserInfoContext {
    name: string,
    setName: (name: string) => void,
}

const initialUserInfoContext = {
    name: '',
    setName: () => {},
}

export const UserInfoContext = createContext<UserInfoContext>(initialUserInfoContext);