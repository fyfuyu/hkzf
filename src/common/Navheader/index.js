import React from 'react'
import { NavBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import styles from 'common/Navheader/index.module.scss'
import { withRouter } from 'react-router-dom'

class NavHeader extends React.Component {
  static propTypes = {
    children: PropTypes.string.isRequired
  }
  render() {
    return (
      <NavBar
        className={styles.navBar}
        mode="light"
        icon={<i className="iconfont icon-back" />}
        onLeftClick={() => this.props.history.go(-1)}
      >
        {this.props.children}
      </NavBar>
    )
  }
}
export default withRouter(NavHeader)
