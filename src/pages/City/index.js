import React from 'react'
import { Toast } from 'antd-mobile'
import { getCurrentCity, setCity } from 'utils/index'
import { List, AutoSizer } from 'react-virtualized'
import axios from 'axios'
import styles from './index.module.scss'
import NavHeader from 'common/Navheader/index'
const TITLE_HEIGHT = 36
const CITY_HEIGHT = 50
const CITYS = ['北京', '上海', '广州', '深圳']

class City extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shortList: [],
      cityObj: {},
      currentIndex: 0
    }
    this.listRef = React.createRef()
  }

  formatData(list) {
    const cityObj = {}

    list.forEach(item => {
      const key = item.short.slice(0, 1)
      if (key in cityObj) {
        cityObj[key].push(item)
      } else {
        cityObj[key] = [item]
      }
    })

    const shortList = Object.keys(cityObj).sort()
    return {
      cityObj,
      shortList
    }
  }
  formatTitle(title) {
    if (title === '#') {
      return '当前定位'
    } else if (title === 'hot') {
      return '热门城市'
    } else {
      return title.toUpperCase()
    }
  }
  selectCity(city) {
    if (CITYS.includes(city.label)) {
      setCity(city)
      this.props.history.go(-1)
    } else {
      Toast.info('该城市暂无房源信息', 1, null, false)
    }
  }
  async getCityList() {
    const res = await axios.get('http://localhost:8080/area/city?level=1')
    console.log(res)

    const { body } = res.data
    const { cityObj, shortList } = this.formatData(body)

    const hotRes = await axios.get('http://localhost:8080/area/hot')

    shortList.unshift('hot')
    cityObj.hot = hotRes.data.body

    const city = await getCurrentCity()
    shortList.unshift('#')
    cityObj['#'] = [city]

    this.setState({
      cityObj,
      shortList
    })
  }
  async componentDidMount() {
    await this.getCityList()
    this.listRef.current.measureAllRows()
  }
  rowRenderer({ key, index, style }) {
    const letter = this.state.shortList[index]
    const list = this.state.cityObj[letter]
    return (
      <div key={key} style={style} className="city-item">
        <div className="title">{this.formatTitle(letter)}</div>
        {list.map(item => (
          <div
            key={item.value}
            className="name"
            onClick={this.selectCity.bind(this, item)}
          >
            {item.label}
          </div>
        ))}
      </div>
    )
  }
  caclHeight({ index }) {
    const letter = this.state.shortList[index]
    const list = this.state.cityObj[letter]
    return TITLE_HEIGHT + list.length * CITY_HEIGHT
  }

  scrollToRow(index) {
    this.listRef.current.scrollToRow(index)
  }
  renderRightMenu() {
    return (
      <ul className="city-index">
        {this.state.shortList.map((item, index) => (
          <li key={item} className="city-index-item">
            <span
              className={
                index === this.state.currentIndex ? 'index-active' : ''
              }
              onClick={this.scrollToRow.bind(this, index)}
            >
              {item === 'hot' ? '热' : item.toUpperCase()}
            </span>
          </li>
        ))}
      </ul>
    )
  }
  onRowsRendered({ startIndex }) {
    if (this.state.currentIndex !== startIndex)
      this.setState({
        currentIndex: startIndex
      })
  }
  render() {
    return (
      <div className={styles.city}>
        <NavHeader>地图列表</NavHeader>
        <AutoSizer>
          {({ height, width }) => (
            <List
              ref={this.listRef}
              width={width}
              height={height}
              rowCount={this.state.shortList.length}
              rowHeight={this.caclHeight.bind(this)}
              rowRenderer={this.rowRenderer.bind(this)}
              onRowsRendered={this.onRowsRendered.bind(this)}
              scrollToAlignment="start"
            />
          )}
        </AutoSizer>
        {this.renderRightMenu()}
      </div>
    )
  }
}

export default City
