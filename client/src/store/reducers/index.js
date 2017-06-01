import {combineReducers} from 'redux'
import books from '../reducers/books'


const rootReducer = combineReducers({
  books: books,
})

export default rootReducer
