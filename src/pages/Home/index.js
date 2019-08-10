import React from 'react'
import { Route } from 'react-router-dom'
import House from './House'
import Index from './Index/index.js'
import My from './My'
import News from './News'
import './index.scss'
import { TabBar } from 'antd-mobile'

const itemList = [
  { tile: '首页', icon: 'iconfont icon-ind', path: '/home' },
  { tile: '找房', icon: 'iconfont icon-findHouse', path: '/home/house' },
  { tile: '咨询', icon: 'iconfont icon-infom', path: '/home/news' },
  { tile: '我的', icon: 'iconfont icon-my', path: '/home/my' }
]

class TabBarExample extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: props.location.pathname
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        selectedTab: this.props.location.pathname
      })
    }
  }
  renderItem() {
    return itemList.map(item => (
      <TabBar.Item
        title={item.tile}
        key={item.tile}
        icon={<i className={item.icon} />}
        selectedIcon={<i className={item.icon} />}
        selected={item.path == this.state.selectedTab}
        onPress={() => {
          this.props.history.push(item.path)
        }}
      />
    ))
  }

  render() {
    return (
      <div className="home">
        <Route exact path="/home" component={Index} />
        <Route path="/home/house" component={House} />
        <Route path="/home/news" component={News} />
        <Route path="/home/my" component={My} />
        <div className="tabBar">
          <TabBar
            unselectedTintColor="#888"
            tintColor="#21b97a"
            barTintColor="white"
            noRenderContent={true}
          >
            {this.renderItem()}
          </TabBar>
        </div>
      </div>
    )
  }
}

export default TabBarExample
