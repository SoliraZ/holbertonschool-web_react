import BodySection from './BodySection.jsx'
import './BodySectionWithMarginBottom.css'

function BodySectionWithMarginBottom({ title, children }) {
  return (
    <div className="bodySectionWithMargin">
      <BodySection title={title}>{children}</BodySection>
    </div>
  )
}

export default BodySectionWithMarginBottom
