import { createContext,useState } from "react"

export type AuthUser = {
    id:string,
    username: string,
    firstname: string,
    lastname: string,
    role: string,
    rank: string,
    token: string,
}

type UserContextProviderProps = {
    children: React.ReactNode
}

type UserContextType = {
    user: AuthUser | null,
    setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>
}

export const UserContext = createContext<UserContextType | null>(null)

export const UserContextProvider = ({children} : UserContextProviderProps) =>{
    const [user, setUser] = useState<AuthUser | null>(null);

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

