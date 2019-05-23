import * as React from 'react'
import { Route, HashRouter } from 'react-router-dom'
import Overview from './overview'
import Summarization from './summarization'

export default (props: any) => {
  return <main className="mdl-layout__content">
    <Route exact path='/overview' component={Overview} />
    <Route exact path='/summarization' component={Summarization} />
  </main>
}
