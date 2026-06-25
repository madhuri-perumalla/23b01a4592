require("dotenv").config();
const token = process.env.TOKEN;
const fetch = require("node-fetch");
const { Log } = require("../../logging-middleware");

// Priority mapping
const TYPE_PRIORITY = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

// Fetch notifications from API
async function fetchNotifications(token) {
  await Log("backend", "info", "service", "Fetching notifications from API");

  const response = await fetch(
    "http://4.224.186.213/evaluation-service/notifications",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  return data.notifications;
}

// Sorting logic
function sortNotifications(notifications) {
  return notifications.sort((a, b) => {
    const priorityDiff =
      TYPE_PRIORITY[b.Type] - TYPE_PRIORITY[a.Type];

    if (priorityDiff !== 0) return priorityDiff;

    // Recency comparison
    return new Date(b.Timestamp) - new Date(a.Timestamp);
  });
}

// Get Top N notifications
function getTopN(notifications, n = 10) {
  return notifications.slice(0, n);
}

// Main function
async function main(token) {
  try {
    await Log("backend", "info", "handler", "Stage 1 execution started");

    const notifications = await fetchNotifications(token);

    await Log(
      "backend",
      "debug",
      "service",
      `Fetched ${notifications.length} notifications`
    );

    const sorted = sortNotifications(notifications);

    await Log(
      "backend",
      "info",
      "service",
      "Notifications sorted by priority"
    );

    const top10 = getTopN(sorted, 10);

    await Log(
      "backend",
      "info",
      "service",
      "Top 10 notifications prepared"
    );

    console.log("\n===== TOP 10 NOTIFICATIONS =====\n");
    console.log(top10);

    return top10;
  } catch (error) {
    await Log(
      "backend",
      "fatal",
      "handler",
      "Error in Stage 1 execution"
    );

    console.error(error);
  }
}

// Export for testing
module.exports = { main };