import React, {useState, useEffect} from 'react'
import classnames from 'classnames'
import style from './style.css'
import Router from '../../containers/Router'

const registerServiceWorker = setInstallable => {}

export default () => {
  const [installable, setInstallable] = useState(false)
  useEffect(registerServiceWorker.bind(registerServiceWorker, setInstallable), [])

  const installApp = async () => {
    // TODO: Show prompt to user

    // TODO: Get user choice for installation and log it

    // TODO: Clean up. Prompt cannot be reused.

    setInstallable(false)
  }

  return (
    <div className={classnames(style.app)}>
      <Router globalProps={{installable, installApp}} />
    </div>
  )
}
