function BodySection({ title, children }) {
  return (
    <div className="bodySection p-4">
      <h2 className="mb-2 text-lg font-bold sm:text-xl">{title}</h2>
      <div className="break-words">{children}</div>
    </div>
  )
}

export default BodySection
