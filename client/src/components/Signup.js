import React from 'react'
import {Link} from 'react-router'
import axios from 'axios'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../store/actions'


class Signup extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    $(document).foundation()
  }

  handleSignUp(event){
    event.preventDefault()

    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let screenname = document.getElementById("username").value


    axios.post('/signup', {email: email, password: password, screenname: screenname})
      .then(result=>{
        if(!result.data.success){
          console.log('FAIL', result.data)
          document.getElementById("errHeader").innerHTML = result.data.msg.header
          document.getElementById("errMessage").innerHTML = result.data.msg.body
          if( document.getElementById('signupCallout').classList.contains('hide')){
            $("#signupCallout").foundation("toggle")
          }
        } else {
          if( !document.getElementById('signupCallout').classList.contains('hide')){
            $("#signupCallout").foundation("toggle")
          }
          console.log(result.data)
          this.props.actions.login(result.data.user)
          this.props.router.push(this.props.books.referrer)
        }

      })
      .catch(error=>{

      })
  }

  render(){
    return(
      <div className="login" id="hero">
        <form className="login-form-centered" data-abide="" noValidate>
          <div className="row text-center">
            <div className="large-9 small-9 columns text-center">
              <h3>Sign Up</h3>
            </div>
            <div className="large-3 small-3 columns text-center">
              <h3><Link to="/"><i className="material-icons">home</i></Link></h3>
            </div>
          </div>
          <div className="row">
            <div className="large-12 columns">
              <label>Screen name:
                <input id="username" type="text" placeholder="Screen name" required/>
                <span className="form-error">Screen name required!</span>
              </label>
            </div>
            <div className="large-12 columns">
              <label>Email:
                <input id="email" type="email" placeholder="email" pattern="email" required/>
                <span className="form-error">Valid email required!</span>
              </label>
            </div>
            <div className="large-12 columns">
              <label>Password:
                <input id="password" type="password" placeholder="password" required/>
              </label>
            </div>
            <div className="large-12 columns">
              <label>Re-enter Password:
                <input id="password2" type="password" placeholder="password" data-equalto="password" required/>
              </label>
            </div>
            <div className="large-12 columns">
              <div className="alert callout hide" data-closable="" data-toggler=".hide" id="signupCallout">
                <h5 id="errHeader"></h5>
                <p id="errMessage"></p>
                <button className="close-button" aria-label="Dismiss alert" type="button" id="errClose" data-close="">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="large-12 columns">
              <button type="button" className="primary button float-right" onClick={(e)=>{this.handleSignUp(e)}}>Sign Up</button>
            </div>
          </div>
          <div className="row">
            Or <Link to='/Login'>login</Link> with your existing account
          </div>
        </form>
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
export default connect(mapStateToProps, mapDispatchToProps)(Signup)
