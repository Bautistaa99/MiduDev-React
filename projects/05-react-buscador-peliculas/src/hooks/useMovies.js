import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies({search, sort}){
  const [movies,setMovies]=useState([])
  const [loading,setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef(search)
  //useRef: Algo que persiste aunque se renderice de nuevo.

  const getMovies= useCallback(async({search})=>{
    if(search === previousSearch.current)return
    try{
      setLoading(true)
      setError(null)
      previousSearch.current= search
      console.log(previousSearch.current)
      const newMovies= await searchMovies({search})
      setMovies(newMovies)
    } catch(e){
      setError(e.message)
    } finally{
      //esto se ejecuta tanto en el try como en el catch
      setLoading(false)
    }
  },[])
  
  // const getMovies= useMemo(()=>{
  //   return async({search})=>{
  //     if(search === previousSearch.current)return
  //     try{
  //       setLoading(true)
  //       setError(null)
  //       previousSearch.current= search
  //       console.log(previousSearch.current)
  //       const newMovies= await searchMovies({search})
  //       setMovies(newMovies)
  //     } catch(e){
  //       setError(e.message)
  //     } finally{
  //       //esto se ejecuta tanto en el try como en el catch
  //       setLoading(false)
  //     }
  //   }
  // },[])

  const sortedMovies = useMemo(()=>{
    return sort 
    ? [...movies].sort((a,b)=>a.title.localeCompare(b.title))
    : movies
    //LocaleCompare es mas que nada por si la letra con la que comienza 
    //tiene un acento
  },[sort,movies])
 


  return{movies: sortedMovies, getMovies, loading }
}