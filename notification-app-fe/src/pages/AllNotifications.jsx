import { useNotifications } from "../hooks/useNotifications";
import NotificationCard from "../components/NotificationCard";

export default function AllNotifications() {
  const { data, loading } = useNotifications();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>All Notifications</h2>

      {data.map((item) => (
        <NotificationCard key={item.ID} item={item} />
      ))}
    </div>
  );
}