import { Component } from 'react'
import Tooltip from 'react-tooltip'
import ActivityIndicator from './components/activity-indicator'
import Document from './components/document'
import ErrorMessage from './components/error-message'
import { executeAction, update } from './api'
import state from './state'
import Sitemap from './components/sitemap'

export default class App extends Component {
  constructor() {
    super()
    this.state = state.get()
  }

  componentDidMount() {
    state.on('update', state => this.setState(state))
  }

  render() {
    return (
      <div className='ct-app'>
        <Tooltip
          class='ct-error-tooltip'
          effect='solid'
          multiline
          place='bottom'
          type='error' />
        <ErrorMessage error={this.state.error} />
        <ActivityIndicator requests={this.state.requests} />
        <Sitemap 
          resource={this.state.resources[this.state.resources.sitemap]} />
        <Document
          executeAction={executeAction}
          resource={this.state.resources[this.state.resources.current]}
          update={update} />
      </div>
    )
  }
}
