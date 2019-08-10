import React from 'react'
import { Carousel, Flex, Grid } from 'antd-mobile'
import axios from 'axios'
import Nav1 from 'assets/images/nav-1.png'
import Nav2 from 'assets/images/nav-2.png'
import Nav3 from 'assets/images/nav-3.png'
import Nav4 from 'assets/images/nav-4.png'
import './index.scss'
import { Link } from 'react-router-dom'
import { getCurrentCity } from 'utils'

const NavList = [
  { title: '整租', img: Nav1, path: 'home/house' },
  { title: '合租', img: Nav2, path: 'home/house' },
  { title: '地图找房', img: Nav3, path: 'home/map' },
  { title: '出租', img: Nav4, path: 'home/rent' }
]

class Index extends React.Component {
  state = {
    swipers: [],
    groups: [],
    message: [],
    imgHeight: 212,
    isLoaded: false,
    cityName: '北京'
  }
  async getSwiper() {
    const res = await axios.get('http://localhost:8080/home/swiper')
    const { status, body } = res.data
    if (status === 200) {
      this.setState({
        swipers: body,
        isLoaded: true
      })
    }
  }
  async getGroups() {
    const res = await axios.get('http://localhost:8080/home/groups', {
      params: {
        area: 'AREA|88cff55c-aaa4-e2e0'
      }
    })
    const { status, body } = res.data
    if (status === 200) {
      this.setState({
        groups: body
      })
    }
  }
  async getMessage() {
    const res = await axios.get('http://localhost:8080/home/news', {
      params: {
        area: 'AREA|88cff55c-aaa4-e2e0'
      }
    })
    const { body, status } = res.data
    if (status === 200) {
      this.setState({
        message: body
      })
    }
  }
  renderSwiper() {
    if (!this.state.isLoaded) {
      return null
    }
    return (
      <Carousel autoplay infinite>
        {this.state.swipers.map(item => (
          <a
            key={item.id}
            href="http://itcast.cn"
            style={{
              display: 'inline-block',
              width: '100%',
              height: this.state.imgHeight
            }}
          >
            <img
              src={`http://localhost:8080${item.imgSrc}`}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                window.dispatchEvent(new Event('resize'))
                this.setState({ imgHeight: 'auto' })
              }}
            />
          </a>
        ))}
      </Carousel>
    )
  }
  renderNav() {
    return (
      <Flex>
        {NavList.map(item => (
          <Flex.Item key={item.title}>
            <Link to={item.path}>
              <img src={item.img} alt="" />
              <p>{item.title}</p>
            </Link>
          </Flex.Item>
        ))}
      </Flex>
    )
  }
  renderMessage() {
    return (
      <div>
        <h3 className="group-title">最新资讯</h3>
        {this.state.message.map(item => (
          <div className="news-item" key={item.id}>
            <div className="imgwrap">
              <img
                className="img"
                src={`http://localhost:8080${item.imgSrc}`}
                alt=""
              />
            </div>
            <Flex className="content" direction="column" justify="between">
              <h3 className="title">{item.title}</h3>
              <Flex className="info" justify="between">
                <span>{item.from}</span>
                <span>{item.date}</span>
              </Flex>
            </Flex>
          </div>
        ))}
      </div>
    )
  }
  renderGroup() {
    return (
      <dir>
        <h3 className="group-title">
          租房小组
          <span className="more">更多</span>
        </h3>
        <div className="group-content">
          <Grid
            data={this.state.groups}
            activeStyle
            columnNum={2}
            square={false}
            hasLine={false}
            renderItem={item => (
              <Flex className="group-item" justify="around">
                <div className="desc">
                  <p className="title">{item.title}</p>
                  <span className="info">{item.desc}</span>
                </div>
                <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
              </Flex>
            )}
          />
        </div>
      </dir>
    )
  }
  renderSearch() {
    return (
      <Flex className="search-box">
        <Flex className="search-form">
          <div
            className="location"
            onClick={() => this.props.history.push('/city')}
          >
            <span className="name">{this.state.cityName}</span>
            <i className="iconfont icon-arrow"> </i>
          </div>
          <div
            className="search-input"
            onClick={() => this.props.history.push('/search')}
          >
            <i className="iconfont icon-seach" />
            <span className="text">请输入小区地址</span>
          </div>
        </Flex>
        {/* 地图小图标 */}
        <i
          className="iconfont icon-map"
          onClick={() => this.props.history.push('/map')}
        />
      </Flex>
    )
  }
  async componentDidMount() {
    this.getSwiper()
    this.getGroups()
    this.getMessage()
    const city = await getCurrentCity()
    this.setState({
      cityName: city.label
    })
  }
  render() {
    return (
      <div className="index">
        <div className="swiper" style={{ height: this.state.imgHeight }}>
          {this.renderSearch()}
          {this.renderSwiper()}
        </div>

        <div className="nav">{this.renderNav()}</div>

        <div className="group">{this.renderGroup()}</div>

        <div className="message">{this.renderMessage()}</div>
      </div>
    )
  }
}
export default Index
