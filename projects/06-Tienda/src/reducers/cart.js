export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

//Update localStorage with state for cart
export const updateLocalStorage = state =>{
  window.localStorage.setItem('cart',JSON.stringify(state))
}

export const cartReducer =(state,action)=>{
  const {type:actionType , payload: actionPayload} = action

  switch(actionType){
    case 'ADD_TO_CART': {
      const {id} = actionPayload
      const productInCartIndex= state.findIndex(item=>item.id=== id)

      if(productInCartIndex >= 0){
        //2 formas de hacerlos
        //1:
        //structuredClone realiza copias profundas de los arrays y de los objetos
        // const newState = structuredClone(state)
        // newState[productInCartIndex].quantity += 1

        //2:
        const newState=state.map(item=>{
          if(item.id===id){
            return{
              ...item,
              quantity:item.quantity + 1
            }
          }
          return item
        })
        
        //fin de la segunda
        updateLocalStorage(newState)
        return newState
      }
      const newState =[
        ...state,{
          ...actionPayload, // product
          quantity:1
        }
      ]

      updateLocalStorage(newState)
      return newState
    }
    case 'REMOVE_FROM_CART':{
      const {id} = actionPayload
      const newState = state.filter(item=>item.id!==id)
      updateLocalStorage(newState)
      return newState
    }
    case 'CLEAR_CART':{
      updateLocalStorage([])
      return []
    }
  }
  return state
}