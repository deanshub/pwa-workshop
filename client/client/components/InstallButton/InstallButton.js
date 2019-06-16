import React from 'react'
import style from './style.css'

export default ({install}) => {
  return (
    <button className={style.installButton} onClick={install}>
      Install App
    </button>
  )
}
