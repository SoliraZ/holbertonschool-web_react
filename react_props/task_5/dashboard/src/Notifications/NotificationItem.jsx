function NotificationItem({ type, value, html }) {
  const colorStyle = { color: type === 'default' ? 'blue' : 'red' }

  if (html) {
    const htmlContent =
      typeof html === 'string' ? { __html: html } : html

    return (
      <li
        data-notification-type={type}
        style={colorStyle}
        dangerouslySetInnerHTML={htmlContent}
      />
    )
  }

  return (
    <li data-notification-type={type} style={colorStyle}>
      {value}
    </li>
  )
}

export default NotificationItem
