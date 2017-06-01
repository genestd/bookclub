import {LOGIN, LOGOUT, SET_STATS, SET_POPULAR, SET_FILTER, SET_ALL_BOOKS, SET_REFERRER, UPDATE_USER} from '../actions'
import update from 'immutability-helper'

const INITIAL_STATE = {
  loggedIn: false,
  user: {},
  referrer: '',
  stats: {users: undefined,
          books: undefined,
          borrows: undefined
        },
  allBooks: [],
  filter: 'all',
  popularBooks: [{img:"//placehold.it/600x600",
                  _id: "id1"},
                  {img:"//placehold.it/600x600",
                   _id: "id2"},
                  {img:"//placehold.it/600x600",
                   _id: "id3"},
                  {img:"//placehold.it/600x600",
                   _id: "id4"},
                  {img:"//placehold.it/600x600",
                   _id: "id5"},
                  {img:"//placehold.it/600x600",
                   _id: "id6"},
                  {img:"//placehold.it/600x600",
                   _id: "id7"},
                  {img:"//placehold.it/600x600",
                   _id: "id8"}]
}
function books(state=INITIAL_STATE, action){

  switch(action.type){
    case LOGIN:
      return Object.assign({}, state, {loggedIn: true, user: action.payload})
      break

    case LOGOUT:
      return Object.assign({}, state, {loggedIn: false, user: {}, referrer: '', filter: 'all'})
      break

    case SET_STATS:
      return update(state, {stats: {$set: action.payload}})
      break

    case SET_FILTER:
      return Object.assign({}, state, {filter: action.payload})
      break

    case SET_ALL_BOOKS:
      return update(state, {allBooks: {$set: action.payload.all}, popularBooks: {$set: action.payload.popular}})
      break

    case SET_REFERRER:
      return Object.assign({}, state, {referrer: action.payload})
      break

    case UPDATE_USER:
      return Object.assign({}, state, {user: action.payload})
    default:
      return state
  }
}
export default books;
