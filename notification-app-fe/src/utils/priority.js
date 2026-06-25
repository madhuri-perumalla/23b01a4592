export const TYPE_PRIORITY = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export const sortNotifications = (data) => {
  return [...data].sort((a, b) => {
    const diff =
      TYPE_PRIORITY[b.Type] - TYPE_PRIORITY[a.Type];

    if (diff !== 0) return diff;

    return new Date(b.Timestamp) - new Date(a.Timestamp);
  });
};