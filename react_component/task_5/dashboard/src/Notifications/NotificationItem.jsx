import { PureComponent } from 'react'

class NotificationItem extends PureComponent {
  render() {
    const { type, value, html, id, markAsRead } = this.props
    const htmlContent =
      typeof html === 'string' ? { __html: html } : html
    const colorStyle = { color: type === 'default' ? 'blue' : 'red' }

    return html ? (
      <li
        data-notification-type={type}
        dangerouslySetInnerHTML={htmlContent}
        style={colorStyle}
        onClick={() => markAsRead(id)}
      />
    ) : (
      <li
        data-notification-type={type}
        style={colorStyle}
        onClick={() => markAsRead(id)}
      >
        {value}
      </li>
    )
  }
}

export default NotificationItem
