import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../store/actions'
import axios from 'axios'

class BookNav extends React.Component{

  constructor(props){
    super(props)
  }

  componentDidMount(){
    $(document).foundation()
  }

  componentDidUpdate(){
    $('[dropdown]').foundation()
  }
  logout(e){
    e.preventDefault()
    console.log('logging out')
    axios.get('/logout')
      .then(result=>{
        this.props.actions.logout()
        this.props.router.push('/')
        $('#dropdownMenu').foundation('destroy')
      })
  }

  render(){
    let dropdown = (<li><Link to='/Login' onClick={()=>{this.props.actions.setReferrer(this.props.router.location.pathname)}}>Login</Link></li>)
    let myBooks
    if(this.props.books.loggedIn){
      dropdown = (<li>Profile
                    <ul className="menu">
                      <li><Link to='/Settings'>Settings</Link></li>
                      <li><a href="#" onClick={(e)=>{this.logout(e)}}>Logout</a></li>
                    </ul>
                  </li>)
      myBooks = (<li><Link to='/MyBooks'>My Books</Link></li>)
      Foundation.reInit($('[dropdown]'))
    }
    return(
      <div className="div-full" data-sticky-container id="dsc">
        <nav className='top-bar desktop-nav' data-sticky data-top-anchor="hero:bottom" data-btm-anchor="footer" data-sticky-on="small" data-margin-top="0" id="booknav" data-events="resize">
          <div className='top-bar-left'>
            <img className='nav-img' src="/img/dg_logo.png" />
          </div>
          <div className="top-bar-right">
            <ul className="dropdown menu" data-dropdown-menu="" id="dropdownMenu">
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/AllBooks'>All Books</Link></li>
              {myBooks}
              {dropdown}
            </ul>
          </div>
        </nav>
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
export default connect(mapStateToProps, mapDispatchToProps)(BookNav)
