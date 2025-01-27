import { useState,useEffect } from "react"

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'


export function useCatImage ({ fact }){
  const [imageUrl, setImageUrl]= useState()

  useEffect(()=>{
    //Si no tenemos un fact no devuelvas nada.Porque? Ya que se inicializa en null
    if(!fact) return

    const threeFirstWords = fact.split(' ', 3).join(' ')
    console.log(threeFirstWords)

    fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&&json=true`) 
    .then(res=>res.json())
    .then(response=>{
      console.log(response)
      const {url}=response
      setImageUrl(url)
    })
  },[fact]) 

  return {imageUrl:`${CAT_PREFIX_IMAGE_URL}${imageUrl}`}
} // { imageUrl: 'https://}