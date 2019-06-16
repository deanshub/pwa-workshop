import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from '../../components/Header'
import Content from '../../components/Content'

export default ({globalProps}) => (
  <Router>
    <React.Fragment>
      <Route component={Header} exact path="/" />
      <Switch>
        <Route exact path="/" render={routeProps => <Content {...routeProps} globalProps={globalProps} />} />
      </Switch>
    </React.Fragment>
  </Router>
)
