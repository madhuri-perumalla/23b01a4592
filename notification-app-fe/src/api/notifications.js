export function fetchNotifications() {
    import axios from "axios";

const BASE_URL =
  "http://4.224.186.213/evaluation-service/notifications";

export const fetchNotifications = async (params, token) => {
  const res = await axios.get(BASE_URL, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
};

