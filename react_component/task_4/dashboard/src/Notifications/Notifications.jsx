import React from 'react'
import closeButton from '../assets/close-button.png'
import NotificationItem from './NotificationItem.jsx'
import './Notifications.css'

class Notifications extends React.Component {
  static defaultProps = {
    notifications: [],
  }

  handleClick = () => {
    console.log('Close button has been clicked')
  }

  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`)
  }

  render() {
    const { notifications } = this.props

    return (
      <div className="notification-items">
        <p>Here is the list of notifications</p>
        <button
          type="button"
          aria-label="Close"
          style={{
            width: '1.75rem',
            height: '1rem',
            marginTop: '0.25rem',
            marginLeft: 'auto',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={this.handleClick}
        >
          <img src={closeButton} alt="" />
        </button>
        <ul>
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              id={notification.id}
              type={notification.type}
              value={notification.value}
              html={notification.html}
              markAsRead={this.markAsRead}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Notifications
