"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

const Nav = () => {
    const [money, setMoney] = useState<number>()
    let localstorage = localStorage.getItem("money")
    useEffect(()=>{
        const moneyStored = Number(localStorage.getItem("money"))
        if(!moneyStored){
            localStorage.setItem("money", "10000")
        }
        setMoney(moneyStored)
    },[])
    function formatNumber(num:number) {
        const numString = num.toString();
        const parts = [];
        for (let i = numString.length - 1; i >= 0; i -= 3) {
          parts.unshift(numString.slice(Math.max(0, i - 2), i + 1));
        }
        return parts.join(" ");
      }
    
    return(
        <nav className="text-white bg-indigo-700 py-4">
            <div className="row flex justify-between">
                <Link href={`/`}>
                    BetMaster
                </Link>
                <ul>
                    <li>
                        Zůstatek: <b>{formatNumber(money || 0)}Kč</b>
                    </li>
                </ul>

            </div>
        </nav>
    )
}
export default Nav;