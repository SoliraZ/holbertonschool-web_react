import { getCurrentYear, getFooterCopy } from '../utils/utils.js'
import './Footer.css'

export default function Footer() {
  return (
    <div className="App-footer">
      <p>
        Copyright {getCurrentYear()} {getFooterCopy(false)}
      </p>
    </div>
  )
}
