import * as React from 'react'
import Tabs from './tabs'

export default (props: any) => {
  return <header className="mdl-layout__header">
    <div className="mdl-layout__header-row">
      <span className="mdl-layout-title">Data Service - Text Summarization and Classification</span>
    </div>
    <Tabs />
  </header>
}
