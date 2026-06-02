import React from 'react'
import closeButton from '../assets/close-button.png'
import NotificationItem from './NotificationItem.jsx'

class Notifications extends React.Component {
  static defaultProps = {
    notifications: [],
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.notifications.length !== this.props.notifications.length
  }

  handleClick = () => {
    console.log('Close button has been clicked')
  }

  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`)
  }

  render() {
    const { notifications } = this.props
    const isEmpty = notifications.length === 0

    return (
      <>
        <div className="notification-title text-right w-1/4 ml-auto">
          Your notifications
        </div>
        <div className="notification-items relative border border-dashed border-[var(--main-color)] w-1/4 ml-auto p-1.5">
          {isEmpty ? (
            <p>No new notification for now</p>
          ) : (
            <>
              <p>Here is the list of notifications</p>
              <button
                type="button"
                aria-label="Close"
                style={{
                  width: '8px',
                  height: '8px',
                  border: '0px',
                  background: 'none',
                  position: 'absolute',
                  top: '10px',
                  right: '20px',
                }}
                onClick={this.handleClick}
              >
                <img src={closeButton} alt="" />
              </button>
              <ul className="list-square">
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
            </>
          )}
        </div>
      </>
    )
  }
}

export default Notifications
