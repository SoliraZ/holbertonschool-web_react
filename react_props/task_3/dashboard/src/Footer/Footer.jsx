import React from 'react'
import { getCurrentYear, getFooterCopy } from '../utils/utils.js'
import './Footer.css'

class Footer extends React.Component {
  render() {
    return (
      <div className="App-footer">
        <p>
          Copyright {getCurrentYear()} - {getFooterCopy(true)}
        </p>
      </div>
    )
  }
}

export default Footer
