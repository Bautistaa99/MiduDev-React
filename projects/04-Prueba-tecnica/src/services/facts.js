
const CAT_ENDPOINT_RANDOM_FACT='https://catfact.ninja/fact'
//La constante CAT_... devuelve una promesa, y como resolvemos una promesa?
//Con async y await o con .then

export const getRandomFact= async ()=>{
  const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
  const data = await res.json()
  const { fact } = data
  return fact
}