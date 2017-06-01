import React from 'react'
import {Link} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../store/actions'
import BookNav from '../components/BookNav'
import Book from '../components/Book'
import Footer from '../components/Footer'
import axios from 'axios'

class Home extends React.Component{
  constructor(props){
    super(props)

  }

  componentDidMount(){
    //this triggers recalc of the sticky parameters, which are getting reset when
    // react-router loads different pages
    if(window.jQuery){
      $(document).foundation()
      $(window).trigger('load.zf.sticky');
    }
    // get data to populatet the website statistics
    axios.get('/stats')
      .then( result=>{
        this.props.actions.setStats(result.data)
      })
      .catch( error=>{
        console.log(error)
      })

    // get data to populate the "what's hot" section
    axios.get('/allbooks')
      .then( result=>{
        this.props.actions.setAllBooks(result.data)
      })
      .catch( error=>{
        console.log(error)
      })
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


  render(){
    return(
      <div className="home">
        <header className="hero" id="hero">
        </header>
        <BookNav router={this.props.router}/>
        <section className="main">
          <h1 className="text-center">Bookshelf</h1>
          <h2 className="subheader text-center">A community for trading books</h2>
          <div className="row div-stats">
            <div className="columns small-4 text-center">
              <div className="circle">
                <div className="stat">{this.props.books.stats.users || '...'}</div>
              </div>
              <h3>Users</h3>
            </div>
            <div className="columns small-4 text-center">
              <div className="circle">
                <div className="stat">{this.props.books.stats.books || '...'}</div>
              </div>
              <h3>Books</h3>
            </div>
            <div className="columns small-4 text-center">
              <div className="circle">
                <div className="stat">{this.props.books.stats.borrows || '...'}</div>
              </div>
              <h3>Loans</h3>
            </div>
          </div>
        </section>

        <section className="section-paper">
          <h3 className="text-center">What's Hot</h3>
          <div className="row small-up-2 medium-up-3 large-up-4">
            {this.props.books.popularBooks.map( book =>{
              return( <Book key={book._id} router={this.props.router} book={book}/>)
            })}
          </div>
        </section>
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
export default connect(mapStateToProps, mapDispatchToProps)(Home)
