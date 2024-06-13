"use client"

import { useContext, useState } from "react"
import { createContext } from "vm";

type WalletContextType= {
    ahoj:string
}

const loadWalletFromLocalStorage = (): string => {
    if (typeof window !== "undefined") {
        const storedMoney = localStorage.getItem("money");
        return storedMoney ? JSON.parse(storedMoney) : [];
    }
    return "";
};

const walletContext = createContext<any>(undefined);

export const WalletContextProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [money, setMoney] = useState<string>(loadWalletFromLocalStorage)
    return(
        <walletContext.Provider value={{}}>
            {children}
        </walletContext.Provider>    
    )
}

export const useWallet = () =>{
    const context = useContext(walletContext)
    if (!context) {
        throw new Error("useCart must be used within a CartContextProvider");
    }
    return context;
}