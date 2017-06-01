import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../store/actions'
import BookNav from '../components/BookNav'
import AddBookForm from '../components/AddBookForm'
import Book from '../components/Book'
import Footer from '../components/Footer'
import axios from 'axios'

class MyBooks extends React.Component{
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    $(document).foundation()
    $(window).trigger('load.zf.sticky');
  }

  componentWillUnMount(){
    $('[data-toggle]').foundation('destroy')
  }

  componentDidUpdate(){
    $('[data-toggle]').foundation()
    Foundation.reInit($('[data-sticky]'))
    Foundation.reInit($('[sticky-container]'))
    $(window).trigger('load.zf.sticky');
  }

  handleSubmit(e){
    e.preventDefault()
    //hide callout if it is already displayed
    if( !document.getElementById('searchErrorCallout').classList.contains("hide")){
      $("#searchErrorCallout").foundation("toggle")
    }
    let title = document.getElementById('title').value
    let author_last = document.getElementById('author-last').value
    let author_first = document.getElementById('author-first').value
    let author_full = (author_first === '' ? author_last : author_last + "," + author_first)
    axios.post('http://localhost:8080/coversearch', {title: title, author: author_full})
      .then( result=>{
        //If we got a volume from google books, take the first coverImage
        //And build a Book object for DB
        if(result.data.totalItems > 0){
          //add book to database
          let book = result.data.items[0].volumeInfo
          let bookObj = {
            title: book.title,
            author: book.authors.join(', '),
            coverImage: book.imageLinks.thumbnail,
            owner: this.props.books.user.username,
            available: true,
            dueDate: null,
            borrows: 0
          }
          //Add the book to the DB
          axios.post('http://localhost:8080/addbook', bookObj)
            .then( result=>{
              //Hide error callout
              if( !document.getElementById('searchErrorCallout').classList.contains("hide")){
                $("#searchErrorCallout").foundation("toggle")
              }
              //Set success message and show success callout
              document.getElementById("successHeader").innerHTML = "Book Added"
              document.getElementById("successMessage").innerHTML = bookObj.title
              //show callout if it isn't already displayed
              if( document.getElementById('addSuccessCallout').classList.contains("hide")){
                $("#addSuccessCallout").foundation("toggle")
              }
              //Hide the message
              window.setTimeout( function(){
                $('#successClose').click()
              }, 3000)
              //Reset the form-error
              $('#frmAddBook')[0].reset()
              //Add this to all books
              this.props.actions.setAllBooks(result.data)

            })
            .catch( error=>{
              console.log(error)
              document.getElementById("errHeader").innerHTML = "404 - Book not Found"
              document.getElementById("errMessage").innerHTML = "Google Books could not find a matching book"
              //show callout if it isn't already displayed
              if( document.getElementById('searchErrorCallout').classList.contains("hide")){
                $("#searchErrorCallout").foundation("toggle")
              }
            })
        //If no volume found, return an error message
        } else {
          //update the error message in the callout
          document.getElementById("errHeader").innerHTML = "404 - Book not Found"
          document.getElementById("errMessage").innerHTML = "Google Books could not find a matching book"
          //show callout if it isn't already displayed
          if( document.getElementById('searchErrorCallout').classList.contains("hide")){
            $("#searchErrorCallout").foundation("toggle")
          }
        }
      })
      .catch( error=>{
        console.log(error)
      })

  }
  render(){

    return(
      <div className="mybooks">
        <div className="mybooks-img-header" id="hero"></div>
        <BookNav router={this.props.router}/>

        <p className="text-center mybooks-p-pad">
          <button type="button" className="success button" data-toggle="panel">Add a Book to your Shelf</button>
        </p>
        <div className="hidden" id="panel" data-toggler data-animate="fade-in fade-out" data-closable>
          <AddBookForm submit={this.handleSubmit}/>
        </div>

        <div className="row text-center mybooks-filter">
          <div className={"columns small-4" + (this.props.books.filter === "all" ? " mybooks-filter-highlight" : "")}>
            <a href="#" onClick={(e)=>{ e.preventDefault(); this.props.actions.setFilter("all")}}><h3>My Books</h3></a>
          </div>
          <div className={"columns small-4" + (this.props.books.filter === "borrowed" ? " mybooks-filter-highlight" : "")}>
            <a href="#" onClick={(e)=>{ e.preventDefault(); this.props.actions.setFilter("borrowed")}}><h3>Borrowed Books</h3></a>
          </div>
          <div className={"columns small-4" + (this.props.books.filter === "loaned" ? " mybooks-filter-highlight" : "")}>
            <a href="#" onClick={(e)=>{ e.preventDefault(); this.props.actions.setFilter("loaned")}}><h3>Loaned Books</h3></a>
          </div>
        </div>
        <div className="row small-up-2 medium-up-3 large-up-6 section-paper">
          {
            this.props.books.allBooks.map( book=>{
              if(book.owner === this.props.books.user.username || book.borrowedBy === this.props.books.user.username){
                let filter = this.props.books.filter
                if( filter==='all' || (filter==="borrowed" && book.borrowedBy === this.props.books.user.username) || (filter==='loaned' && book.available===false && book.borrowedBy !== this.props.books.user.username)){
                  return(
                    <Book key={book._id} book={book} router={this.props.router}/>
                  )
                }
              }
            })
          }
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return( {books: state.books})
}
const mapDispatchToProps = (dispatch) => {
  return({
    actions: bindActionCreators(Actions, dispatch)
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(MyBooks)
