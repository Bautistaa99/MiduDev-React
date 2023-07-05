import { useContext } from "react"
import {FiltersContext} from '../context/filters'

export function useFilters(){
  // eslint-disable-next-line no-undef
  const {filters,setFilters}=useContext(FiltersContext)

  const filterProducts =(products)=>{
    return products.filter(product=>{
      return(
        product.price >= filters.minPrice &&//&&= y ademas
        (
          filters.category === 'all' ||
          product.category === filters.category
        )
      )
    })
  }

  return {filters, filterProducts, setFilters}
}