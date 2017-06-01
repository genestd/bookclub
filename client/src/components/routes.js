import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from '../components/App'
import Home from '../components/Home'
import Login from '../components/Login'
import Signup from '../components/Signup'
import MyBooks from '../components/MyBooks'
import AllBooks from '../components/AllBooks'

var routes =
  (<Route path='/' component={App}>
    <IndexRoute component={Home}/>
    <Route path="/Login" component={Login}/>
    <Route path="/Signup" component={Signup}/>
    <Route path="/MyBooks" component={MyBooks}/>
    <Route path="/AllBooks" component={AllBooks}/>
  </Route>)

export default routes;
