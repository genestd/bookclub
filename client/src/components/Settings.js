import React from 'react'
import {Link} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../store/actions'
import axios from 'axios'

class Settings extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      frmName: props.books.user.name,
      frmCity: props.books.user.city,
      frmState: props.books.user.state
    }
  }

  componentDidMount(){
    $(document).foundation();
  }

  handleChange(e){
    console.log(e.target, this.state)
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSettings(e){
    e.preventDefault()
    let name = $('#frmName').val() || ''
    let city = $('#frmCity').val() || ''
    let state = $('#frmState').val() || ''
    let userObj = { username: this.props.books.user.username }
    if(name !== ''){
      userObj.name = name
    }
    if(city !== ''){
      userObj.city = city
    }
    if(state !== ''){
      userObj.state = state
    }
    axios.post('/updateuser', userObj)
      .then(result=>{
        console.log('user', result.data)
        if( !document.getElementById('settingsErrorCallout').classList.contains("hide")){
          $("#settingsErrorCallout").foundation("toggle")
        }
        document.getElementById("successHeader").innerHTML = "Success!"
        document.getElementById("successMessage").innerHTML = "Your profile is updated"
        $("#settingsSuccessCallout").foundation("toggle")
        this.props.actions.updateUser(result.data.user)
        //Go back to homepage
        window.setTimeout(()=>{
          $("#successClose").click()
        }, 3000)

      })
  }

  render(){
    return(
      <div className="settings" id="settings">
        <form className="login-form-centered">
          <div className="row">
            <div className="large-9 small-9 columns text-center">
              <h3>Update Profile</h3>
            </div>
            <div className="large-3 small-3 columns">
              <h3 className="float-right"><Link to="/"><i className="material-icons">home</i></Link></h3>
            </div>
          </div>
          <div className="row">
            <div className="large-12 columns">
              <label>Name:
                <input id="frmName" type="text" placeholder="John Doe" value={this.state.frmName} onChange={(e)=>{this.handleChange(e)}}/>
              </label>
            </div>
            <div className="large-12 columns">
              <label>City:
                <input id="frmCity" type="text" placeholder="Portland" value={this.state.frmCity} onChange={(e)=>{this.handleChange(e)}}/>
              </label>
            </div>
            <div className="large-12 columns">
              <label>State:
                <input id="frmState" type="text" placeholder="OR" value={this.state.frmState} onChange={(e)=>{this.handleChange(e)}}/>
              </label>
            </div>
            <div className="large-12 columns">
              <div className="alert callout hide" data-toggler=".hide" id="settingsErrorCallout">
                <h5 id="errHeader"></h5>
                <p id="errMessage"></p>
                <button className="close-button" aria-label="Dismiss alert" type="button" id="errClose" data-toggle="settingsErrorCallout">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
          </div>
          <div className="large-12 columns">
            <div className="success callout hide" data-closable="" data-toggler=".hide" id="settingsSuccessCallout">
              <h5 id="successHeader"></h5>
              <p id="successMessage"></p>
              <button className="close-button" aria-label="Dismiss alert" type="button" id="successClose" data-toggle="settingsSuccessCallout">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="large-12 columns">
              <input className="button" type="submit" name="settings" value="Update" onClick={(e)=>this.handleSettings(e)}/>
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Settings)
