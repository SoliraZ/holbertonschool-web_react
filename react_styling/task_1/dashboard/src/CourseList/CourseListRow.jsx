function CourseListRow({ isHeader = false, textFirstCell, textSecondCell = null }) {
  const rowBgClass = isHeader
    ? 'bg-[var(--color-table-header)] opacity-[66%]'
    : 'bg-[var(--color-table-rows)] opacity-[45%]'

  if (isHeader) {
    return textSecondCell === null ? (
      <tr className={rowBgClass}>
        <th className="border border-gray-400" colSpan={2}>
          {textFirstCell}
        </th>
      </tr>
    ) : (
      <tr className={rowBgClass}>
        <th className="border border-gray-400">{textFirstCell}</th>
        <th className="border border-gray-400">{textSecondCell}</th>
      </tr>
    )
  }

  return (
    <tr className={rowBgClass}>
      <td className="border border-gray-400 pl-2">{textFirstCell}</td>
      <td className="border border-gray-400 pl-2">{textSecondCell}</td>
    </tr>
  )
}

export default CourseListRow
