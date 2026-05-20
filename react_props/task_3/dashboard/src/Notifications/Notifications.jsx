import closeButton from '../assets/close-button.png'
import NotificationItem from './NotificationItem.jsx'
import './Notifications.css'

function Notifications({ notifications = [] }) {
  const handleClick = () => {
    console.log('Close button has been clicked')
  }

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
        onClick={handleClick}
      >
        <img src={closeButton} alt="" />
      </button>
      <ul>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            type={notification.type}
            value={notification.value}
            html={notification.html}
          />
        ))}
      </ul>
    </div>
  )
}

export default Notifications
