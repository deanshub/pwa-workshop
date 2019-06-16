import React, {Component} from 'react'
import classnames from 'classnames'
import style from './style.css'

export default class Header extends Component {
  render() {
    return <header className={classnames(style.header)}>Countdown</header>
  }
}
