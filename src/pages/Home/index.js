import React from 'react'
import { NavLink, Route } from 'react-router-dom'
import House from './House'
import Index from './Index/index.js'
import My from './My'
import News from './News'
import './index.scss'

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Route path="/home/index" component={Index} />
        <Route path="/home/house" component={House} />
        <Route path="/home/news" component={News} />
        <Route path="/home/my" component={My} />
        <div className="nav">
          <ul>
            <li>
              <NavLink to="/home/index">首页</NavLink>
            </li>
            <li>
              <NavLink to="/home/house">找房</NavLink>
            </li>
            <li>
              <NavLink to="/home/news">新闻</NavLink>
            </li>
            <li>
              <NavLink to="/home/my">我的</NavLink>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Home
