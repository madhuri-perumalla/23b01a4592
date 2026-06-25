import { useState, useEffect } from "react";
import { fetchNotifications } from "../api/notifications";
import { sortNotifications } from "../utils/priority";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOn..."; // keep full token

export function useNotifications(filters = {}) {
  const [notifications, setNotifications] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchNotifications(filters, TOKEN);

      const list = data?.notifications ?? [];

      setNotifications(list);
      setTotal(list.length);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [JSON.stringify(filters)]); // IMPORTANT FIX

  const sortedNotifications = sortNotifications(notifications);

  const totalPages = Math.ceil(total / 10);

  return {
    notifications,
    sortedNotifications,
    total,
    totalPages,
    loading,
    error,
    refresh: load,
  };
}