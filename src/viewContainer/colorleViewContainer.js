import React, { useEffect, useState } from "react";
import CardView from "../components/CardView";
import WelcomeComponent from "../components/WelcomeComponent";
import { colorCardsData } from "../assets/data";

function ColorleViewContainer(){

    const [gameState, setGameState] = useState("notStarted")
    const [gameStartState, setGameStartState] = useState([])
    const [gameResultState, setGameResultState] = useState([])

    function startGame(){
        renerateGameData()
        setGameState("started")
    }

    function resetGame(){
        setGameState("notStarted")
        renerateGameData()
    }

    function renerateGameData(){
        const gameDataStart = shuffle([...colorCardsData]);
        setGameStartState(gameDataStart)
        const gameDataEnd = shuffle([...colorCardsData]);
        setGameResultState(gameDataEnd)
    }

    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
          }
        return arr;
    }

    useEffect(()=>{
        // startGame()
    },[])
      

    return(
        <div>
            {(() => {
                switch (gameState) {
                    case "notStarted":
                        return <WelcomeComponent startGame={startGame}/>
                    case "started":
                        return <CardView initialData={gameStartState} finalData={gameResultState} resetGame={resetGame}/>
                        break;
                    default:
                        break;
                }
            })()}
        </div>
    )
}

export default ColorleViewContainer;