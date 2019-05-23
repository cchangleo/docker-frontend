import * as React from 'react'

interface Sentence {
  id: number,
  value: string,
  sentenceFeedbacks: Array<any>
}

interface SummarizationState {
  article: string,
  summarySentences: Array<Sentence>
}

export default class Summarization extends React.Component<any, SummarizationState>{
  state = {
    article: '',
    summarySentences: []
  }

  handleArticleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ article: e.target.value })
  }

  handleSummarize = () => {

    fetch('http://75.98.32.151/v1/articles', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({content: this.state.article})
    })
    .then(res=>res.json())
    .then(res=>this.getSummaryList(res.id))
  }

  getSummaryList = (id: number) => {

    fetch(`http://75.98.32.151/v1/articles/${id}/summaries`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    .then(res=>res.json())
    .then(res=>this.setState({summarySentences: res.sentences}))

  }

  getRandomArticle = () => {
    fetch('http://75.98.32.151/v1/news/random', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res=>res.json())
    .then(article=>this.setState({ article: article.text }))
  }

  render(){
    const { article, summarySentences } = this.state
    return <section className='summarization'>
    <div className='mdl-grid'>
      <div className='mdl-cell mdl-cell--12-col'>
        <h3>Summarization</h3>
        <div className='mdl-card mdl-shadow--2dp mdl-card-width-lg'>
          <div className='mdl-card__title'>
            <h4 className='mdl-card__title-text'>Input</h4>
          </div>
          <textarea
            cols={150}
            rows={30}
            placeholder='Type something...'
            value={article}
            onChange={this.handleArticleChange} />
          <div className='mdl-card__actions mdl-card--border'>
            <button
              className='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect'
              onClick={this.handleSummarize}>
              Summarize
            </button>
            <button
              className='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect'
              onClick={this.getRandomArticle}>
              Random article
            </button>
          </div>
        </div>
        {
          summarySentences.length > 0 && <div className='mdl-card mdl-shadow--2dp mdl-card-width-lg'>
            <div className='mdl-card__title'>
              <h4 className='mdl-card__title-text'>Summary</h4>
            </div>
            <ul className='mdl-list'>
              {
                summarySentences.map(x=><li key={x.id} className='mdl-list__item mdl-list__item'>
                  <span className='mdl-list__item-primary-content'>
                    <span>{x.value}</span>
                  </span>
                  <span className='mdl-list__item-secondary-content'>
                    <div className='mdl-list__item-secondary-action'>
                      <i className='material-icons'>thumb_up</i>
                    </div>
                  </span>
                </li>)
              }
            </ul>
            <div className='mdl-card__actions mdl-card--border'>
              <button className='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect'>
                Submit feedback
              </button>
            </div>
          </div>
        }
      </div>
    </div>
    </section>
  }
}
