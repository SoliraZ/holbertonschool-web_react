function BodySection({ title, children }) {
  return (
    <div className="bodySection p-4">
      {title ? (
        <h2 className="mb-2 text-lg font-semibold sm:text-xl">{title}</h2>
      ) : null}
      <div className="break-words">{children}</div>
    </div>
  )
}

export default BodySection
