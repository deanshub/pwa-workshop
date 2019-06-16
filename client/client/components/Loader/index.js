import React, {Component} from 'react'
import classnames from 'classnames'
import style from './style.css'

export default class Loader extends Component {
  render() {
    return <div className={classnames(style.loader)}>Loading...</div>
  }
}
