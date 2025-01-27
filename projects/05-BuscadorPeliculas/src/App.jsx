import "./App.css";
import { useMovies } from "./hooks/useMovies";
import {Movies} from './components/Movies.jsx'
import { useEffect, useState, useRef, useCallback } from "react";
import debounce from "just-debounce-it";


function useSearch(){
  const [search,updateSearch]= useState('')
  const [error,setError]=useState(null)
  const isFirstInput = useRef(true)


  useEffect(()=>{
    if(isFirstInput.current){
      isFirstInput.current= search === ''
      return
      // Si es el primer input del usuario, vamos a cambiar su valor en el caso
      // de que el search sea distinto a String vacio
    }
    

    if(search === ''){
      setError('No se puede buscar una pelicula vacia')
      return
    }
  
    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }
  
    if(search.length < 3){
      setError('La pelicula debe tener al menos 3 caracteres')
      return
    }
  
    setError(null)
  },[search])

  return {search,updateSearch,error}
}

 
function App() {
  const [sort, setSort] = useState(false)

  const {search, updateSearch, error} = useSearch()
  const {movies, getMovies, loading} = useMovies({search, sort})

  const debouncedGetMovies = useCallback(
    debounce (search=>{
    console.log('search',search)
    getMovies({search})
  },300)
    ,[getMovies]
  )
  //handleSubmit es cuando le da al enter
  const handleSubmit=(event)=>{
    event.preventDefault()
    getMovies({search})
  }


  const handleSort = ()=>{
    setSort(!sort)
  }
  
  const handleChange=(event)=>{
    const newQuery= event.target.value
    if(newQuery.startsWith(' '))return

    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <div className="page">

      <header>
        <h1>Buscador de peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input style={{border: '1px solid transparent', borderColor:error?'red':
          'transparent'}} onChange={handleChange} value={search} name="query" 
          placeholder="Avengers, Start Wars, The Matrix..." />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{color:'red'}}>{error}</p>}
      </header>


      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }
      </main>

    </div>
  );
}

export default App;
