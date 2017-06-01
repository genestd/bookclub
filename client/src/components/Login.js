import React from 'react'
import {Link} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../store/actions'
import axios from 'axios'

class Login extends React.Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){
    $(document).foundation();
    //var elem = new Foundation.Abide(document.getElementById('email'));
  }

  handleLogin(event){
    event.preventDefault()

    let email = document.getElementById("email").value
    let password = document.getElementById("password").value

    axios.post('/login', {"email": email, "password": password})
      .then( result=>{
        //error returned by passport server
        if(!result.data.success){
          //update the error message in the callout
          document.getElementById("errHeader").innerHTML = result.data.msg.header
          document.getElementById("errMessage").innerHTML = result.data.msg.body
          //show callout if it isn't already displayed
          if( document.getElementById('loginErrorCallout').classList.contains("hide")){
            $("#loginErrorCallout").foundation("toggle")
          }
        } else {
          //Login Success!
          //hide error callout if it is displayed
          if( !document.getElementById('loginErrorCallout').classList.contains("hide")){
            $("#loginErrorCallout").foundation("toggle")
          }
          document.getElementById("successHeader").innerHTML = "Success!"
          document.getElementById("successMessage").innerHTML = "You are logged in, returning to last page"
          $("#loginSuccessCallout").foundation("toggle")
          this.props.actions.login(result.data.user)
          //Go back to homepage
          window.setTimeout(()=>{
            this.props.router.push(this.props.books.referrer)
          }, 1500)
          //Load all books
          axios.get('/allbooks')
            .then( result=>{
              this.props.actions.setAllBooks(result.data)
            })
        }
      })
      .catch( error=>{
        console.log(error)
      })
  }

  render(){
    return(
      <div className="login" id="hero">
        <form className="login-form-centered" data-abide noValidate>
          <div className="row">
            <div className="large-9 small-9 columns text-center">
              <h3>Login</h3>
            </div>
            <div className="large-3 small-3 columns">
              <h3 className="float-right"><Link to="/"><i className="material-icons">home</i></Link></h3>
            </div>
          </div>
          <div className="row">
            <div className="large-12 columns">
              <label>Email:
                <input id="email" type="email" placeholder="email" pattern="email" required />
                <span className="form-error">Valid email required!</span>
              </label>
            </div>
            <div className="large-12 columns">
              <label>Password:
                <input id="password" type="password" placeholder="password" />
              </label>
            </div>
            <div className="large-12 columns">
              <div className="alert callout hide" data-toggler=".hide" id="loginErrorCallout">
                <h5 id="errHeader"></h5>
                <p id="errMessage"></p>
                <button className="close-button" aria-label="Dismiss alert" type="button" id="errClose" data-toggle="loginErrorCallout">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
          </div>
          <div className="large-12 columns">
            <div className="success callout hide" data-closable="" data-toggler=".hide" id="loginSuccessCallout">
              <h5 id="successHeader"></h5>
              <p id="successMessage"></p>
              <button className="close-button" aria-label="Dismiss alert" type="button" id="errClose" data-close="">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="large-12 columns">
              <input className="button" type="submit" name="login" value="Log In" onClick={(e)=>this.handleLogin(e)}/>
            </div>
          </div>
          <div className="row">
            Or <Link to='/signup'>sign up</Link> for a new account
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
export default connect(mapStateToProps, mapDispatchToProps)(Login)
