import * as React from 'react'
import { Link } from 'react-router-dom'

const tabItems = [
  {
    label: 'overview',
    value: 'overview'
  },
  {
    label: 'summarization',
    value: 'summarization'
  },
  {
    label: 'classification',
    value: 'classification'
  },
  {
    label: 'ocr',
    value: 'ocr'
  },
  {
    label: 'page segmentation(YOLO)',
    value: 'yolo'
  },
  {
    label: 'FAQ',
    value: 'faq'
  }
]

interface TabState {
  activeTab: string
}

class Tabs extends React.Component<any, TabState>{
  constructor(props: any){
    super(props)
    this.state = {
      activeTab: 'overview'
    }
  }
  onClick = (activeTab: string) => {
    this.setState({ activeTab })
  }

  render() {
    const { activeTab } = this.state
    return <div className="mdl-layout__tab-bar mdl-js-ripple-effect mdl-layout__tab-manual-switch">
      {
        tabItems.map((item, i)=><Link
          onClick={()=>this.onClick(item.value)}
          key={i}
          to={item.value}
          className={`mdl-layout__tab ${activeTab === item.value ? 'is-active' : ''}`}>
          {item.label}
        </Link>)
      }
    </div>
  }
}

export default Tabs
