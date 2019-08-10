import React from 'react'
import styles from './index.module.scss'
import NavHeader from 'common/Navheader/index'

const BMap = window.BMap
class Map extends React.Component {
  componentDidMount() {
    const map = new BMap.Map('container')
    const point = new BMap.Point(121.61887341233741, 31.040603951746952)

    map.centerAndZoom(point, 18)
    const marker = new BMap.Marker(point)
    map.addOverlay(marker)
  }

  render() {
    return (
      <div className={styles.map}>
        <NavHeader>地图找房</NavHeader>
        <div id="container" />
      </div>
    )
  }
}

export default Map
