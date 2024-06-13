"use client";

import { useWallet } from "@/components/WalletContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PlayMode = ({
    match,
    amount,
    choice,
}: {
    match: any;
    amount: any;
    choice: any;
}) => {
    const [time, setTime] = useState<number>(0);
    const [win, setWin] = useState<boolean | null>(null);

    const [home, setHome] = useState<number>(0);
    const [away, setAway] = useState<number>(0);

    const [amountWon, setAmountWon] = useState<number>(0);

    const { money, setMoney } = useWallet();

    const router = useRouter();
    const pathname = usePathname();

    const [score, setScore] = useState<{
        home: number;
        away: number;
    }>({
        home: 0,
        away: 0,
    });

    const refreshPage = () => {
        router.push("/redirect");
    };

    const getHome = () => {
        let goals = [];

        const homeCount = Math.floor(Math.random() * 5);
        for (let i = 0; i < homeCount; i++) {
            const randomNumber = Math.floor(Math.random() * 90); // Random number between 0 (inclusive) and 1 (exclusive)
            goals.push(randomNumber);
        }
        return goals;
    };

    const getAway = () => {
        let goals = [];
        const awayCount = Math.floor(Math.random() * 5);
        for (let i = 0; i < awayCount; i++) {
            const randomNumber = Math.floor(Math.random() * 90); // Random number between 0 (inclusive) and 1 (exclusive)
            goals.push(randomNumber);
        }
        return goals;
    };
    const [scores, setScores] = useState({
        home: getHome(),
        away: getAway(),
    });

    useEffect(() => {
        const runTime = async () => {
            /* console.log(goals) */
            for (let i = 0; i < 91; i++) {
                let num: number;
                setTime(i);
                await new Promise((resolve) => setTimeout(resolve, 500));
            }
        };
        runTime();

        setWin(null);

        console.log(scores);
    }, []);
    const endGame = () => {
        console.log(choice);
        if (choice == "home" && home > away) {
            setWin(true);
            setMoney(money + match.odd.home * amount);
        } else if (choice == "away" && home < away) {
            setWin(true);
            setMoney(money + match.odd.away * amount);
        } else if (choice == "draw" && home == away) {
            setWin(true);
            setMoney(money + match.odd.draw * amount);
        } else {
            setWin(false);
        }
        // switch (choice) {
        //     case "home":
        //         if (home > away) {
        //             setWin(true);
        //             setMoney(money + match.odd.home * amount);
        //             console.log("you won");
        //         }
        //     case "away":
        //         if (away > home) {
        //             setWin(true);
        //             setMoney(money + match.odd.away * amount);
        //             console.log("you won");
        //         }
        //     case "draw":
        //         if (away == home) {
        //             setWin(true);
        //             setMoney(money + match.odd.draw * amount);
        //             console.log("you won");
        //         }
        //     default:
        //         // setWin(false);
        //         console.log("you lost");
        // }

        console.log(win);
    };
    useEffect(() => {
        if (win) {
            setMoney(money + amountWon);
        }
    }, [win]);
    useEffect(() => {
        for (let j = 0; j < scores.home.length; j++) {
            if (scores.home[j] == time) {
                setHome(home + 1);
            }
        }
        for (let k = 0; k < scores.away.length; k++) {
            if (scores.away[k] == time) {
                setAway(away + 1);
            }
        }
        if (time == 90) {
            endGame();
        }
    }, [time]);

    return (
        <>
            <div className="rounded-xl bg-indigo-700 p-10">
                <div className="font-semibold text-2xl text-white text-center">
                    {time}&apos;
                </div>
                <div className="flex w-full text-white font-bold text-2xl mt-6">
                    <div className="flex-1">{match.home}</div>
                    <div className="flex text-4xl gap-2">
                        <span>{home}</span>:<span>{away}</span>
                    </div>
                    <div className="flex-1 text-end">{match.away}</div>
                </div>
            </div>
            {win != null && (
                <div className="flex justify-center flex-col items-center mt-5">
                    {win ? <h1>Vyhráli jste</h1> : <h1>Prohráli jste</h1>}
                    <button
                        onClick={refreshPage}
                        className="text-white bg-indigo-700 rounded py-2 px-5"
                    >
                        Sázet znovu
                    </button>
                </div>
            )}
        </>
    );
};
export default PlayMode;
