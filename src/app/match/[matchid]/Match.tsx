"use client"

const Match = ({match}:{match:any}) => {
    return(
        <div className="flex justify-center gap-10 my-10">
            <div className="flex flex-col items-center">
                <h3>{match.home}</h3>
                <div>
                    Kurz
                    <span className="rounded py-2 px-4 ">{match.odd.home}</span>
                </div>
            </div>
            <div>:</div>
            
            <div className="flex flex-col items-center">
                <h3>{match.away}</h3>
                <div>
                    Kurz
                    <span className="rounded py-2 px-4 ">{match.odd.away}</span>
                </div>
            </div>
        </div>
    )
}
export default Match;