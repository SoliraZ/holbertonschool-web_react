import { memo } from "react";

const NotificationItem = memo(function NotificationItem({
  type,
  value,
  id,
  markAsRead,
}) {
  const color = type === "urgent" ? "red" : "blue";

  return (
    <li
      style={{ color }}
      data-notification-type={type}
      onClick={() => markAsRead(id)}
    >
      {value}
    </li>
  );
});

export default NotificationItem;
