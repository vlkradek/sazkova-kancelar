"use client"

import { match } from "../../../../test"
import BetForm from "./BetForm"
import Match from "./Match"

const BetContent = () => {
    return(
        <>
            <Match match={match}/>
            <BetForm match={match}/>
        </>
    )
}

export default BetContent