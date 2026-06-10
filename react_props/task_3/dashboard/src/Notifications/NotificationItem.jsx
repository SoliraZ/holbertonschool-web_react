function NotificationItem({ type, value, html }) {
  const colorStyle = { color: type === 'default' ? 'blue' : 'red' }

  return html ? (
    <li
      data-notification-type={type}
      style={colorStyle}
      dangerouslySetInnerHTML={html}
    />
  ) : (
    <li data-notification-type={type} style={colorStyle}>
      {value}
    </li>
  )
}

export default NotificationItem
