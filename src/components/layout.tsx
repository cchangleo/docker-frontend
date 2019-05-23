import * as React from 'react'
import { HashRouter } from 'react-router-dom'
import Header from './header'
import Main from './main'
import Footer from './footer'

export default () => <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <HashRouter>
    <Header />
    <Main />
    <Footer />
  </HashRouter>
</div>
