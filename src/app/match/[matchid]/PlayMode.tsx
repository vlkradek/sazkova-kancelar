"use client"

import { useEffect, useState } from "react"

const PlayMode = ({match, amount, choice}:{match:any, amount:any, choice:any}) =>{
    const [time, setTime] = useState<number>(0)
    const [win, setWin] = useState<boolean | null>(null)

    const [home, setHome] = useState<number>(0)
    const [away, setAway] = useState<number>(0)

    const [amountWon, setAmountWon] = useState<number>(0)




    const [score,setScore] = useState<{
        home:number,
        away:number
    }>({
        home:0,
        away:0
    })

    const getHome = () => {
        let goals = [];

        const homeCount = Math.floor(Math.random() * 5)
        for (let i = 0; i < homeCount; i++) {
            const randomNumber = Math.floor(Math.random() * 90); // Random number between 0 (inclusive) and 1 (exclusive)
            goals.push(randomNumber);

        }
        return goals



    }

    const getAway = () => {
        let goals = [];
        const awayCount = Math.floor(Math.random() * 5)
        for (let i = 0; i < awayCount; i++) {
            const randomNumber = Math.floor(Math.random() * 90); // Random number between 0 (inclusive) and 1 (exclusive)
            goals.push(randomNumber);
        }
        return goals


    }
    const [scores,setScores] = useState(
        {
            home: getHome(),
            away: getAway()
        }
    )

/*     const addHome = () => {
        const home = score.home
        setScore({...score, home: home + 1})
        console.log(score.home)
    }
    const addAway = () => {
        const away = score.away
        setScore({...score, away: away + 1})
        console.log(score.away)
    } */


/*     const homeCount = Math.floor(Math.random() * 5)
    const awayCount = Math.floor(Math.random() * 5)
    
    const goals: {
        home: number[],
        away: number[],

    } = {
        home: [],
        away: []
    }
    for (let i = 0; i < homeCount; i++) {
        const randomNumber = Math.floor(Math.random() * 90); // Random number between 0 (inclusive) and 1 (exclusive)
        goals.home.push(randomNumber);
    }
    for (let i = 0; i < awayCount; i++) {
        const randomNumber = Math.floor(Math.random() * 90); // Random number between 0 (inclusive) and 1 (exclusive)
        goals.away.push(randomNumber);
    } */
    
    useEffect(()=>{
        const runTime = async () =>{
            /* console.log(goals) */
            for (let i = 0; i < 91; i++) {
                let num:number

/*                 goals.home.map((item) => i && 
                    console.log(num),
                    num++
                ) */
/*                 let who;
                for (let j = 0; j < goals.home.length; j++) {
                    if(goals.home[j] == i){
                        
                       who = "home"

                    }
                }
                
                for (let j = 0; j < goals.away.length; j++) {
                    if(goals.away[j] == i){
                        who = "away"

                    }
                }
                if(who == "home"){
                    setScore({
                        ...score,home: score.home+1
                    })
                } else if (who == "away"){
                    setScore({
                        ...score,away: score.away+1
                    })
                } */



                setTime(i)
                await new Promise(resolve => setTimeout(resolve, 500));
            }   
        }
        runTime()

        console.log(scores)
    },[])
    const endGame = () => {
        let amountWon;
        switch(choice){
            case "home":
                if(score.home > score.away){
                    setWin(true)
                    setAmountWon(match.odd.home * amount)
                }
            case "away":
                if(score.away > score.home){
                    setWin(true)
                    setAmountWon(match.odd.away * amount)

                }
            case "draw":
                if(score.away == score.home){
                    setWin(true)
                    setAmountWon(match.odd.draw * amount)

                }
            default:
                setWin(false)
        }

        console.log(win)



    }

    useEffect(()=>{
        if(win){
            if (typeof window !== "undefined") {
                localStorage.setItem("money", amountWon.toString())
            }

        }
    },[win])
    useEffect(()=>{
/*         for (let j = 0; j < goals.home.length; j++) {
            if(goals.home[j] == time){
                
                setScore({
                    ...score,home: score.home+1
                })
                console.log("home")


            }
        }
        
        for (let j = 0; j < goals.away.length; j++) {
            if(goals.away[j] == time){
                setScore({
                    ...score,away: score.away+1
                })
                console.log("away")

            }
        } */
            for (let j = 0; j < scores.home.length; j++) {
                if(scores.home[j] == time){
                    setHome(home+1)
                }
            }
            for (let k = 0; k < scores.away.length; k++) {
                if(scores.away[k] == time){
                    setAway(away+1)
                }
            }
            if(time == 90){
                endGame()
            }
    },[time])


    return(
        
        <>
            <div className="rounded-xl bg-indigo-700 p-10">
                <div className="font-semibold text-2xl text-white text-center">{time}'</div>
                <div className="flex w-full text-white font-bold text-2xl mt-6">
                    <div className="flex-1">
                        {match.home}
                    </div>
                    <div className="flex text-4xl gap-2">
                        <span>
                        {home}
                        </span>
                        :
                        <span>
                        {away}
                        </span>
                        </div>
                    <div className="flex-1 text-end">
                        {match.away}
                    </div>

                </div>
            </div>
            {win != null && (
                <div>
                    {win ? (
                        <h1>Vyhráli jste{" "}{amountWon}Kč</h1>
                    ):(
                        <h1>Prohráli jste{" "}{amountWon}Kč</h1>

                    )}
                </div>

            )}
        </>
    )
}
export default PlayMode