import * as React from 'react'

export default class Overview extends React.Component{
  render(){
    return <section className='overview'>
    <div className='mdl-grid'>
      <div className='mdl-cell mdl-cell--12-col'>
        <h3>Overview</h3>
        <ul className='demo-list-item mdl-list'>
          <li className='mdl-list__item'>
            <span className='mdl-list__item-primary-content'>
              Text Summarization
            </span>
          </li>
          <li className='mdl-list__item'>
            <span className='mdl-list__item-primary-content'>
              Text Classification
            </span>
          </li>
          <li className='mdl-list__item'>
            <span className='mdl-list__item-primary-content'>
              Image - OCR
            </span>
          </li>
          <li className='mdl-list__item'>
            <span className='mdl-list__item-primary-content'>
              Image - Page Segmentation
            </span>
          </li>
        </ul>
      </div>
    </div>
    </section>
  }
}
