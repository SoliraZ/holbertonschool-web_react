function NotificationItem({ type, value, html }) {
  if (type === 'default') {
    return (
      <li data-notification-type={type} style={{ color: 'blue' }}>
        {value}
      </li>
    )
  }

  if (type === 'urgent' && html) {
    const htmlContent =
      typeof html === 'string' ? { __html: html } : html

    return (
      <li
        data-notification-type={type}
        style={{ color: 'red' }}
        dangerouslySetInnerHTML={htmlContent}
      />
    )
  }

  if (type === 'urgent') {
    return (
      <li data-notification-type={type} style={{ color: 'red' }}>
        {value}
      </li>
    )
  }

  return null
}

export default NotificationItem
