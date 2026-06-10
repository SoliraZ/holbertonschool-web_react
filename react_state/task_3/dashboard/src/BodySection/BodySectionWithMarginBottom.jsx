import BodySection from './BodySection.jsx'

function BodySectionWithMarginBottom({ title, children }) {
  return (
    <div className="bodySectionWithMargin mb-10">
      <BodySection title={title}>{children}</BodySection>
    </div>
  )
}

export default BodySectionWithMarginBottom
