import { useEffect, useState } from 'react'
import './App.css'
import {EVENTS} from './consts'
import HomePage from './pages/Home.jsx'
import AboutPage from './pages/About.jsx'


const NAVEGATION_EVENT = 'pushstate'

function App() {
  const [currentPath, setCurrentPath]=useState(window.location.pathname)

  useEffect(()=>{
    const onLocationChange=()=>{
      setCurrentPath(window.location.pathname)
    }
    //Cuando ejecutamos onLocationChange?
    //Cada vez que tengamos navegation event, es decir guardamos la nueva path
    window.addEventListener(NAVEGATION_EVENT,onLocationChange)

    //popstate es el evento que escucha cuando vamos hacia atras
    window.addEventListener(EVENTS.POPSTATE,onLocationChange)

    return()=>{
      window.removeEventListener(NAVEGATION_EVENT, onLocationChange)
    }
    
  },[])
  return (
    <main>
      {currentPath === '/' && <HomePage />}
      {currentPath === '/about' && <AboutPage />}
    </main>
  )
}

export default App
