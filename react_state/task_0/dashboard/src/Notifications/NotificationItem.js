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
      (type === 'default'
        ? 'text-[var(--default-notification-item)]'
        : 'text-[var(--urgent-notification-item)]') +
      ' text-sm sm:text-base max-[912px]:border-b max-[912px]:border-gray-200 max-[912px]:px-2 max-[912px]:py-2 max-[912px]:text-base max-[912px]:last:border-b-0'
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
