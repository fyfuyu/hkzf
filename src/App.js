import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/Home'
import Map from './pages/Map'
import City from './pages/City'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/home" component={Home} />
        <Route path="/map" component={Map} />
        <Route path="/city" component={City} />
      </Router>
    )
  }
}

export default App
