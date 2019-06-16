import React, {Component} from 'react'
import style from './style.css'

function toDatetimeLocal(date) {
  const ten = function(i) {
      return (i < 10 ? '0' : '') + i
    },
    YYYY = date.getFullYear(),
    MM = ten(date.getMonth() + 1),
    DD = ten(date.getDate()),
    HH = ten(date.getHours()),
    II = ten(date.getMinutes()),
    SS = ten(date.getSeconds())
  return `${YYYY}-${MM}-${DD}T${HH}:${II}:${SS}`
}

export default class CountDownPanel extends Component {
  handleClick() {
    const {add} = this.props
    const name = this.nameEl.value
    const time = this.timeEl.value
    if (name && time) {
      add({
        name,
        time,
      })
    }
  }

  render() {
    return (
      <div className={style.countDownPanel}>
        <div className={style.inputBox}>
          <label className={style.label}>Name</label>
          <input className={style.input} ref={name => (this.nameEl = name)} type="text" />
        </div>
        <div className={style.inputBox}>
          <label className={style.label}>Time</label>
          <input
            className={style.input}
            defaultValue={toDatetimeLocal(new Date(Date.now() + 20000))}
            ref={time => (this.timeEl = time)}
            type="datetime-local"
          />
        </div>
        <button className={style.addButton} onClick={this.handleClick.bind(this)}>
          Add
        </button>
      </div>
    )
  }
}
