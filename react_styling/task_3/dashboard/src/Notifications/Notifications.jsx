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
        <div className="notification-title text-right w-full">
          Your notifications
        </div>
        <div className="notification-items relative border-2 border-dashed border-[var(--main-color)] w-full p-1.5">
          {isEmpty ? (
            <p>No new notification for now</p>
          ) : (
            <>
              <p>Here is the list of notifications</p>
              <button
                type="button"
                aria-label="Close"
                style={{
                  width: '20px',
                  height: '20px',
                  border: '0px',
                  background: 'none',
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  cursor: 'pointer',
                  padding: '0',
                }}
                onClick={this.handleClick}
              >
                <img src={closeButton} alt="" style={{ width: '100%', height: '100%' }} />
              </button>
              <ul className="list-[square] list-inside">
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
