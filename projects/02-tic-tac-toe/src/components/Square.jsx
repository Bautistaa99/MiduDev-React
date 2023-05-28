export const Square=({children,isSelected,updateBoard,index})=>{
  const className = `square ${isSelected ? 'is-selected':''}`

  const handleClick=()=>{
    // Sabemos en que cuadrado le da click
    updateBoard(index)
  }

  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}