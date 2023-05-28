import './App.css'
import confetti from 'canvas-confetti'
import { useState } from 'react'

import {TURNS} from './constants'
import { Square } from './components/Square'
import { checkWinner,checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { resetGameStorage, saveGameStorage } from './logic/storage'

function App() {
  const [board,setBoard] = useState(()=>{
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage): Array(9).fill(null)
  })
  
  const [turn,setTurn]=useState(()=>{
    const turnFromStorage=window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  //null es que no hay ganador, false esque hay empate
  const [winner,setWinner]=useState(null)

  //Resteamos los estados
  const resetGame=()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }
  
  const updateBoard=(index)=>{
    //si en el index hay algo
    //no actualizamos la posicion
    if(board[index] || winner) return
    //actualizar el tablero
    const newBoard =[...board]
    newBoard[index]= turn // x u o 
    setBoard(newBoard)
    //cambiar de turno
    const newTurn = turn=== TURNS.X?TURNS.O:TURNS.X
    setTurn(newTurn)
    //gaurdar aqui partida
    saveGameStorage({
      board: newBoard,
      turn:newTurn
    })

    //revisar si hay un ganador
    const newWinner=checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
      }else if(checkEndGame(newBoard)){
        setWinner(false) // empate
      }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del Juego</button>
      <section className='game'>
        {
          board.map((square,index)=>{
            return(
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
                >
                  {square}
                </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn=== TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn=== TURNS.O}>{TURNS.O}</Square>

      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
