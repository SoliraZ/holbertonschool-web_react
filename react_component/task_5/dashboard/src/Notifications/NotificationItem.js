import React from 'react'

class NotificationItem extends React.PureComponent {
  static defaultProps = {
    markAsRead: () => {},
  }

  handleItemClick = () => {
    const { id, markAsRead } = this.props
    markAsRead(id)
  }

  render() {
    const { type, value, html } = this.props

    return html ? (
      <li
        data-notification-type={type}
        dangerouslySetInnerHTML={{ __html: html }}
        style={{ color: type === 'default' ? 'blue' : 'red' }}
        onClick={this.handleItemClick}
      />
    ) : (
      <li
        data-notification-type={type}
        style={{ color: type === 'default' ? 'blue' : 'red' }}
        onClick={this.handleItemClick}
      >
        {value}
      </li>
    )
  }
}

export default NotificationItem
