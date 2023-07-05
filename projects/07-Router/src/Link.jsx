import {EVENTS} from './consts'
export function navigate(href) {
  window.history.pushState({}, '',href)
  // crear un evento personalizado para avisar a lo que ueramos que hemos 
  //cambiado la url

  const navigationEvent = new Event(EVENTS.PUSHSTATE);
  window.dispatchEvent(navigationEvent)
}