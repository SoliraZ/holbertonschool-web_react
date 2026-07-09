import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  headerRow: {
    backgroundColor: '#deb5b545'
  },
  row: {
    backgroundColor: '#f5f5f5ab'
  }
});

export default function CourseListRow({
  isHeader = false,
  textFirstCell = '',
  textSecondCell = null,
  id = null,
  isSelected = false,
  changeRow = null,
}) {
  const rowStyle = isHeader ? styles.headerRow : styles.row;

  if (isHeader) {
    return (
      <tr className={css(rowStyle)}>
        <th colSpan={textSecondCell ? 1 : 2}>{textFirstCell}</th>
        {textSecondCell ? <th>{textSecondCell}</th> : null}
      </tr>
    );
  }

  return (
    <tr className={css(rowStyle)}>
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => changeRow && changeRow(id, e.target.checked)}
        />
        {textFirstCell}
      </td>
      <td>{textSecondCell}</td>
    </tr>
  );
}
