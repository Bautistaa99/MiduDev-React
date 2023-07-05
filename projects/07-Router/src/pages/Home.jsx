import {navigate} from '../Link.jsx'

export default function HomePage(){
  return(
    <>
      <h1>Home</h1>
      <p>Esta es una pagina de ejemplo</p>
      <button onClick={()=>navigate('/about')}>Ir a Sobre nosotros</button>
    </>
  )
}