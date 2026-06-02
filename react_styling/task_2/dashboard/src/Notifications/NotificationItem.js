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
    const colorClass =
      type === 'default'
        ? 'text-[var(--default-notification-item)]'
        : 'text-[var(--urgent-notification-item)]'
    const colorStyle = {
      color: type === 'default' ? 'blue' : 'red',
    }

    return html ? (
      <li
        data-notification-type={type}
        className={colorClass}
        style={colorStyle}
        dangerouslySetInnerHTML={{ __html: html }}
        onClick={this.handleItemClick}
      />
    ) : (
      <li
        data-notification-type={type}
        className={colorClass}
        style={colorStyle}
        onClick={this.handleItemClick}
      >
        {value}
      </li>
    )
  }
}

export default NotificationItem
