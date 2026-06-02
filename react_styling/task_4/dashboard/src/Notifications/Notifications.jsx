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

    const rootClasses = isEmpty
      ? 'root-notifications fixed top-0 right-0 z-50 flex w-[min(600px,25vw)] min-w-[200px] flex-col items-end max-[912px]:inset-0 max-[912px]:h-full max-[912px]:w-full max-[912px]:min-w-0'
      : 'root-notifications fixed top-0 right-0 z-50 flex w-[min(600px,25vw)] min-w-[200px] flex-col items-end max-[912px]:pointer-events-none'

    const titleClasses = isEmpty
      ? 'notification-title w-full min-w-[200px] max-w-[600px] text-right max-[912px]:hidden'
      : 'notification-title w-full min-w-[200px] max-w-[600px] text-right max-[912px]:max-w-none max-[912px]:pointer-events-auto'

    const panelClasses = isEmpty
      ? 'notification-items relative w-full min-w-[200px] max-w-[600px] border border-dashed border-[var(--main-color)] p-[6px] max-[912px]:m-0 max-[912px]:h-full max-[912px]:min-h-0 max-[912px]:max-w-none max-[912px]:flex-1 max-[912px]:overflow-auto max-[912px]:p-3'
      : 'notification-items relative w-full min-w-[200px] max-w-[600px] border border-dashed border-[var(--main-color)] p-[6px] max-[912px]:m-3 max-[912px]:min-w-0 max-[912px]:max-w-none max-[912px]:flex-1 max-[912px]:overflow-auto max-[912px]:p-3 max-[912px]:pointer-events-auto max-[912px]:relative'

    return (
      <div className={rootClasses}>
        <div className={titleClasses}>Your notifications</div>
        <div className={panelClasses}>
          {isEmpty ? (
            <p>No new notification for now</p>
          ) : (
            <>
              <p>Here is the list of notifications</p>
              <button
                type="button"
                aria-label="Close"
                className="absolute top-2.5 right-5 h-2 w-2 border-0 bg-transparent p-0 max-[912px]:top-3 max-[912px]:right-3 max-[912px]:z-10"
                onClick={this.handleClick}
              >
                <img src={closeButton} alt="" className="h-2 w-2" />
              </button>
              <ul className="list-square max-[912px]:mt-2 max-[912px]:list-disc max-[912px]:space-y-3 max-[912px]:pl-6">
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
      </div>
    )
  }
}

export default Notifications
