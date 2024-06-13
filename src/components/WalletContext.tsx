"use client";

import { createContext, useContext, useEffect, useState } from "react";

const loadWalletFromLocalStorage = (): number => {
    if (typeof window !== "undefined") {
        const storedMoney = localStorage.getItem("money");
        return storedMoney ? Number(storedMoney) : 10000;
    }
    return 10000;
};

const walletContext = createContext<any>(undefined);

export const WalletContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [money, setMoney] = useState<number>(loadWalletFromLocalStorage);
    useEffect(() => {
        localStorage.setItem("money", money.toString());
    }, [money]);

    return (
        <walletContext.Provider value={{ money, setMoney }}>
            {children}
        </walletContext.Provider>
    );
};

export const useWallet = () => {
    const context = useContext(walletContext);
    if (!context) {
        throw new Error("useCart must be used within a CartContextProvider");
    }
    return context;
};
