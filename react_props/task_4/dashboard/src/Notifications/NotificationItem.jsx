function NotificationItem({ type, value, html }) {
  const colorStyle = { color: type === 'default' ? 'blue' : 'red' }

  const htmlContent =
    typeof html === 'string' ? { __html: html } : html

  return html ? (
    <li
      data-notification-type={type}
      style={colorStyle}
      dangerouslySetInnerHTML={htmlContent}
    />
  ) : (
    <li data-notification-type={type} style={colorStyle}>
      {value}
    </li>
  )
}

export default NotificationItem
