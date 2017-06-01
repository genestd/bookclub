export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SET_STATS = 'SET_STATS'
export const SET_FILTER = 'SET_FILTER'
export const SET_ALL_BOOKS = 'SET_ALL_BOOKS'
export const SET_REFERRER = 'SET_REFERRER'
export const UPDATE_USER = 'UPDATE_USER'

export function login(user){
  return({
    type: LOGIN,
    payload: user
  })
}

export function logout(){
  return({
    type: LOGOUT
  })
}
export function setStats(stats){
  return({
    type: SET_STATS,
    payload: stats
  })
}

export function setFilter(filter){
  return({
    type: SET_FILTER,
    payload: filter
  })
}

export function setAllBooks(books){
  return({
    type: SET_ALL_BOOKS,
    payload: books
  })
}

export function setReferrer(ref){
  return({
    type: SET_REFERRER,
    payload: ref
  })
}

export function updateUser(user){
  return({
    type: UPDATE_USER,
    payload: user
  })
}
