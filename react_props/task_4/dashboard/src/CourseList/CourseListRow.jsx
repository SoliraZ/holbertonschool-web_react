function CourseListRow({
  isHeader = false,
  textFirstCell = '',
  textSecondCell = null,
}) {
  let trContent = (
    <>
      <td>{textFirstCell}</td>
      <td>{textSecondCell}</td>
    </>
  )

  if (isHeader) {
    if (textSecondCell === null) {
      trContent = <th colSpan={2}>{textFirstCell}</th>
    } else {
      trContent = (
        <>
          <th>{textFirstCell}</th>
          <th>{textSecondCell}</th>
        </>
      )
    }
  }

  return <tr>{trContent}</tr>
}

export default CourseListRow
