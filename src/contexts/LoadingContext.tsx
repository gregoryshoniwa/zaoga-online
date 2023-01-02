import { createContext,useState } from "react"

export type LoadingData = boolean

type LoadingContextProviderProps = {
    children: React.ReactNode
}

type LoadingContextType = {
    loading: LoadingData,
    setLoading: React.Dispatch<React.SetStateAction<LoadingData>>
}

export const LoadingContext = createContext<LoadingContextType | null>(null)

export const LoadingContextProvider = ({children} : LoadingContextProviderProps) =>{
    const [loading, setLoading] = useState<LoadingData>(false);

    return(
        <LoadingContext.Provider value={{loading, setLoading}}>
            {children}
        </LoadingContext.Provider>
    )
}

