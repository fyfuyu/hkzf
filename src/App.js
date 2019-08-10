import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Home from './pages/Home'
import Map from './pages/Map'
import City from './pages/City'
import NoFind from './pages/404'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={Home} />
          <Route path="/map" component={Map} />
          <Route path="/city" component={City} />
          <Route component={NoFind} />
        </Switch>
      </Router>
    )
  }
}

export default App
