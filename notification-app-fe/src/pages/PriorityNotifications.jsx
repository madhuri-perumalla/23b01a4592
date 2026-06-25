import { useNotifications } from "../hooks/useNotifications";
import NotificationCard from "../components/NotificationCard";

export default function PriorityNotifications() {
  const { sorted } = useNotifications();

  const top10 = sorted.slice(0, 10);

  return (
    <div>
      <h2>Priority Notifications</h2>

      {top10.map((item) => (
        <NotificationCard key={item.ID} item={item} />
      ))}
    </div>
  );
}