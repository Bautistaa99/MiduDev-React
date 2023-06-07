import { useState,useEffect } from "react"
import './App.css'
import { getRandomFact } from "./services/facts"
import { useCatImage } from "./hooks/useCatImage"
// import {Otro} from './Components/Otro'


const useCatFact =()=>{
  const [fact, setFact]= useState()
  const {imageUrl}=useCatImage({fact:'Random fact'})

  const refreshFact=()=>{
    getRandomFact().then(newFact=>setFact(newFact))
  }

  //para recuperar la cita al recargar la pagina
  useEffect(refreshFact,[]) 

  return {fact,refreshFact}
}

export function App(){
  
  const {fact,refreshFact} =useCatFact()
  const {imageUrl} = useCatImage({fact})

  // para recuperar la cita al cargar la pagina

  const handleClick=async()=>{
    refreshFact()
  }

  return(
    <main>
      <h1>Prueba Gatos</h1>
      <button onClick={handleClick}>Get new fact</button> 
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={imageUrl} alt={`Image extracted using the first three
      words fro ${fact}`} />}
    </main>
  )
}