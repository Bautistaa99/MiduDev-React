import { WINNER_COMBOS } from "../constants"

export const checkWinner =(boardToCheck)=>{
  //revisamos todas las combinaciones ganadoras
  //para ver si X u O gano
  for(const combo of WINNER_COMBOS){
    const[a,b,c]=combo
    if(
      //Primero voy a mirar si en el casillero ej. 0 hay x u o
      boardToCheck[a]&&
      //Despues si el casillero a coincide con el b, es decir 2 x o 2 o
      boardToCheck[a]===boardToCheck[b]&&
      //Despues si el casillero a coincide con el b, es decir 2 x o 2 o
      boardToCheck[a]===boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
    
  }
  //si no hay ganador
  return null
}

export const checkEndGame=(newBoard)=>{
  //revisamos si hay un empate
  //si no hay espacios vacios 
  //en el tablero
  return newBoard.every((square)=>square!==null)
}