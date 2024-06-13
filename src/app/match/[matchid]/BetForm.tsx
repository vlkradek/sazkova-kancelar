"use client"

import Home from "@/app/page"
import { usePathname, useRouter } from "next/navigation"
import React, { ChangeEvent, useEffect, useState } from "react"
import PlayMode from "./PlayMode"

const BetForm = ({match}:{match:any}) => {

    const [amount, setAmount] = useState<string>("")
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    const [choice, setChoice] = useState<string>("")
    const router = useRouter()
    const pathname = usePathname()


    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        if(
             amount.length > 1 && Number(amount) >= 500 && choice != "" 
        ){

            e.preventDefault()
            let money = Number(localStorage.getItem("money"))
            money = money - Number(amount)
            localStorage.setItem("money", money.toString())
            setIsPlaying(true)
        }
        

    }
    useEffect(()=>{
        console.log(choice)
    })
    const possible = match.odd[choice] * Number(amount);
    const win = Math.floor(possible)

    

    return(
        <>
            <form onSubmit={handleSubmit} className=" bg-indigo-700 mb-10 rounded-xl py-4 px-8 flex flex-col items-start" >
                <h1 className="font-bold text-2xl text-white mb-4">Vsadit na výhru</h1>
                <div className="flex items-center mb-2">
                    
                    <input type="radio" name="home" id="home" value={`home`} onChange={(e)=>setChoice(e.currentTarget.value)} checked={choice == `home`}  />
                    <label htmlFor="home" className="text-white font-medium ml-4 ">{match.home}</label>
                </div>
                
                <div className="flex items-center mb-2">
                    
                    <input type="radio" name="away" id="away" value={`away`} onChange={(e)=>setChoice(e.currentTarget.value)} checked={choice == `away`}/>
                    <label htmlFor="away" className="text-white font-medium ml-4">{match.away}</label>
                </div>


                <div className="flex items-center">
                    
                    <input type="radio" name="draw" id="draw" value={`draw`} onChange={(e)=>setChoice(e.currentTarget.value)} checked={choice == `draw`}  />
                    <label htmlFor="draw" className="text-white font-medium ml-4">Remíza</label>
                </div>
                <div className="flex items-stretch mt-4 gap-4">
                    <div className="relative w-28">
                        <input type="number" value={amount} onChange={(e)=>setAmount(e.currentTarget.value)} name="amount" id="amount" className="outline-0 w-full h-full text-white px-4 font-medium rounded border-white bg-indigo-700 border-2 appearance-none" />
                        <span className="absolute right-0 top-1/2 -translate-y-1/2 text-white font-semibold mr-2">Kč</span>
                    </div>
                    <button type="submit" className="bg-white text-indigo-700 font-medium py-2 px-16 rounded hover:bg-indigo-700 hover:outline-2 hover:text-white duration-150 outline-white outline-0 outline">
                        Vsadit
                    </button>
                </div>
                <div className="flex bg-orange-400 justify-start rounded font-medium items-center py-2 gap-3 px-5 mt-8">
                    Možná výhra
                    <span className="bg-white rounded py-1 px-3 font-bold text-indigo-800">
                        {amount.length > 0 && Number(amount) >= 500 && choice != "" ? win : "-"}Kč
                    </span>

                </div>


            </form>
            {isPlaying && (
                <PlayMode match={match} amount={amount} choice={choice}/>
            )}
        </>
    )
}

export default BetForm