import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../store/actions'
import axios from 'axios'
import BookNav from '../components/BookNav'
import Book from '../components/Book'
import Footer from '../components/Footer'

class AllBooks extends React.Component{

  constructor(props){
    super(props)
  }

  componentDidMount(){
    $(document).foundation()
    Foundation.reInit($('[data-sticky]'))
    Foundation.reInit($('[sticky-container]'))
    $(window).trigger('load.zf.sticky');
    axios.get('http://localhost:8080/allbooks')
      .then(result=>{
        this.props.actions.setAllBooks(result.data)
      })
      .catch(error=>{
        console.log(error)
      })
  }

  componentDidUpdate(){
    $('[data-toggle]').foundation()
    Foundation.reInit($('[data-sticky]'))
    Foundation.reInit($('[sticky-container]'))
    $(window).trigger('load.zf.sticky');
  }

  componentWillUnMount(){
    $('[data-toggle]').foundation('destroy')
  }

  render(){
    let books = this.props.books.allBooks.map( book=>{
      return (<div key={book._id} className="column column-block">
                <img src={book.coverImage} className="thumbnail mybooks-center" alt="" />
              </div>
            )
    })
    return(
      <div>
        <div id="hero"></div>
        <BookNav router={this.props.router}/>
        <div className="mybooks-div-pad">
          <h3 className="text-center">All Books</h3>
        </div>
        <div className="row small-up-2 medium-up-3 large-up-4 section-paper">
          {
            this.props.books.allBooks.map( book=>{
              return <Book key={book._id} book={book} router={this.props.router}/>
            })
          }
        </div>
        <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(AllBooks)
