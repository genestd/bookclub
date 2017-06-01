import React from 'react'

export default class App extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="bookclub">
        {this.props.children}
      </div>
    )
  }
}
