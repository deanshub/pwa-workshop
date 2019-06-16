import React, {Component} from 'react'
import style from './style.css'

const done = item => new Date(item.time) - Date.now() <= 0
const changeInterval = 251
const formatNumber = num => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export default class CountDown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      now: Date.now(),
    }
  }

  componentDidMount() {
    this.resetTime()
  }

  resetTime() {
    setTimeout(() => {
      this.setState({
        now: Date.now(),
      })
      const {item} = this.props

      if (!done(item)) {
        this.resetTime()
      }
    }, changeInterval)
  }

  timeRemaining(item) {
    if (done(item)) {
      return 'Done 🥂'
    }
    return formatNumber(Math.ceil((new Date(item.time) - Date.now()) / 1000))
  }

  render() {
    const {item, remove} = this.props

    return (
      <div className={style.countDownItem}>
        <button className={style.removeButton} onClick={() => remove(item)}>
          🗑️
        </button>
        <div className={style.itemName}>{item.name}</div>
        <div className={style.itemTime}>{this.timeRemaining(item)}</div>
      </div>
    )
  }
}
