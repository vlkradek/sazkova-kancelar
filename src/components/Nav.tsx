"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useWallet } from "./WalletContext";

export function formatNumber(num: number) {
    const numString = num.toString();
    const parts = [];
    for (let i = numString.length - 1; i >= 0; i -= 3) {
        parts.unshift(numString.slice(Math.max(0, i - 2), i + 1));
    }
    return parts.join(" ");
}

const Nav = () => {
    // const [money, setMoney] = useState<number>()
    // let localstorage = localStorage.getItem("money")
    // useEffect(()=>{
    //     const moneyStored = Number(localStorage.getItem("money"))
    //     if(!moneyStored){
    //         localStorage.setItem("money", "10000")
    //     }
    //     setMoney(moneyStored)
    // },[])
    const { money } = useWallet();

    return (
        <nav className="text-white bg-indigo-700 py-4">
            <div className="row flex justify-between">
                <Link href={`/`}>BetMaster</Link>
                <ul>
                    <li>
                        Zůstatek: <b>{formatNumber(Math.floor(money))}Kč</b>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
export default Nav;
