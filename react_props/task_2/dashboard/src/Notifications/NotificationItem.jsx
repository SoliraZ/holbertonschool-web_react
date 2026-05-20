function NotificationItem({ type, value, html }) {
  if (type === 'default') {
    return (
      <li data-notification-type={type} style={{ color: 'blue' }}>
        {value}
      </li>
    )
  }

  if (type === 'urgent' && html) {
    return (
      <li
        data-notification-type={type}
        style={{ color: 'red' }}
        dangerouslySetInnerHTML={{ __html: html }}
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
