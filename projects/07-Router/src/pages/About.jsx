import {navigate} from '../Link.jsx'

export default function AboutPage(){
  return(
    <>
      <h1>About</h1>
      <div>
      <img src='https://pbs.twimg.com/profile_images/1613612257015128065/oA0Is67J_400x400.jpg' alt='Foto de  midudev' />
        <p>Hola! Me llamo Miguel Angel y estoy creando un clon de Rect Router</p>
      </div>

      <button onClick={()=>navigate('/')}>Ir a la Home</button>
    </>
  )
}