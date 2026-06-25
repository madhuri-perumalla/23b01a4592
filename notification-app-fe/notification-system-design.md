# Notification System Design
# Notification System Design - Stage 1

## Overview
This system implements a Priority Inbox that displays top N notifications based on type priority and recency.

---

## Priority Rules

We assign priority based on notification type:

- Placement → Highest Priority (3)
- Result → Medium Priority (2)
- Event → Lowest Priority (1)

---

## Sorting Strategy

Notifications are sorted using:

1. Type priority (descending)
2. Timestamp (descending for same type)

This ensures most important and latest notifications appear first.

---

## Algorithm

1. Fetch notifications from API
2. Assign priority weight
3. Sort notifications
4. Extract top N (default 10)

---

## Optimization for Real-Time Updates

To handle continuous incoming notifications efficiently:

We use a Min Heap of size N:

- Insert new notification
- If heap size > N, remove lowest priority
- Ensures O(log N) performance

---

## Complexity

- Sorting approach: O(n log n)
- Heap optimization: O(n log N)

---

## Conclusion

This approach ensures a scalable, real-time priority inbox suitable for high-volume notification systems.