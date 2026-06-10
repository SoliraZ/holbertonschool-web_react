import React from 'react'
import closeButton from '../assets/close-button.png'
import NotificationItem from './NotificationItem.jsx'

class Notifications extends React.Component {
  static defaultProps = {
    notifications: [],
    displayDrawer: true,
    handleDisplayDrawer: () => {},
    handleHideDrawer: () => {},
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.notifications.length !== this.props.notifications.length ||
      nextProps.displayDrawer !== this.props.displayDrawer
    )
  }

  handleClick = () => {
    console.log('Close button has been clicked')
    this.props.handleHideDrawer()
  }

  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`)
  }

  render() {
    const { notifications, displayDrawer, handleDisplayDrawer } = this.props
    const isEmpty = notifications.length === 0

    const rootClasses = displayDrawer
      ? 'root-notifications fixed top-0 right-0 z-50 flex w-[min(600px,25vw)] min-w-[200px] flex-col items-end max-[912px]:inset-0 max-[912px]:h-full max-[912px]:w-full max-[912px]:min-w-0 max-[912px]:bg-white'
      : 'root-notifications fixed top-0 right-0 z-50 flex flex-col items-end'

    const titleClasses = displayDrawer
      ? 'notification-title w-full min-w-[200px] max-w-[600px] text-right max-[912px]:max-w-none max-[912px]:px-3 max-[912px]:pt-3'
      : 'notification-title text-right pr-2 pt-1 text-sm cursor-pointer'

    return (
      <div className={rootClasses}>
        <div className={titleClasses} onClick={handleDisplayDrawer}>
          Your notifications
        </div>
        {displayDrawer ? (
          <>
            {isEmpty ? (
              <div className="notification-items w-full min-w-[200px] max-w-[600px] border border-dashed border-[var(--main-color)] p-[6px] max-[912px]:m-3 max-[912px]:min-w-0 max-[912px]:max-w-none max-[912px]:flex-1 max-[912px]:overflow-auto max-[912px]:p-3">
                <p>No new notification for now</p>
              </div>
            ) : (
              <>
                <div className="notification-items relative w-full min-w-[200px] max-w-[600px] border border-dashed border-[var(--main-color)] p-[6px] max-[912px]:m-3 max-[912px]:min-w-0 max-[912px]:max-w-none max-[912px]:flex-1 max-[912px]:overflow-auto max-[912px]:p-3">
                  <p>Here is the list of notifications</p>
                  <ul className="max-[912px]:mt-2 max-[912px]:list-none">
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
                <button
                  type="button"
                  aria-label="Close"
                  className="absolute top-2.5 right-5 h-5 w-5 border-0 bg-transparent p-0 max-[912px]:top-3 max-[912px]:right-3 max-[912px]:z-10"
                  onClick={this.handleClick}
                >
                  <img src={closeButton} alt="close-button" className="h-full w-full" />
                </button>
              </>
            )}
          </>
        ) : null}
      </div>
    )
  }
}

export default Notifications
