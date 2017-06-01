import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../store/actions'
import axios from 'axios'
import moment from 'moment'

class Book extends React.Component{
  constructor(props){
    super(props)
  }

  borrow(id){
    axios.post('http://localhost:8080/borrow', {bookId: id, user: this.props.books.user.username})
      .then( result=>{
        if( result.data.success){
          this.props.actions.setAllBooks(result.data.books)
        }
      })
      .catch( error =>{
        console.log(error)
      })

  }

  return(id){
    axios.post('http://localhost:8080/return', {bookId: id})
      .then( result=>{
        if( result.data.success){
          this.props.actions.setAllBooks(result.data.books)
        }
      })
      .catch( error =>{
        console.log(error)
      })

  }

  getButton(){
    let button
    if(this.props.books.loggedIn){
      //Owned by me
      if(this.props.book.owner === this.props.books.user.username){
        button = <button className="button success button-centered" onClick={()=>{}}>Owned by you!</button>
        //Not owned by me
      } else {
        //available
        if(this.props.book.available){
          button = <button className="button success button-centered" onClick={()=>{this.borrow(this.props.book._id)}}>Borrow</button>
        } else if(!this.props.book.available && this.props.book.borrowedBy === this.props.books.user.username){
          button = <button className="button success button-centered" onClick={()=>{this.return(this.props.book._id)}}>Return Book</button>
        } else {
          button = <button className="button alert button-centered" onClick={()=>{}}>Available: {moment(this.props.book.dueDate).format("MMM Do, YYYY")}</button>
        }
      }
    } else {
      button = <button className="button warning button-centered" onClick={()=>{this.props.router.push('/Login')}}>Login to Borrow</button>
    }
    return button
  }

  render(){
    return(
      <div key={this.props.book._id} className="column column-block div-book" data-toggle={this.props.book._id}>
        <img src={this.props.book.coverImage} className="thumbnail mybooks-center" alt="" />
        <div id={this.props.book._id} className="div-book-inner hidden" data-toggler="" data-animate="fade-in fade-out">
          {this.getButton()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return({
    books: state.books
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    actions: bindActionCreators(Actions, dispatch)
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Book)
