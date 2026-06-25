import dotenv from "dotenv";
dotenv.config();

const fetch = global.fetch;


import { Log } from "../../logging-middleware/index.js";

/**
 * Priority mapping:
 */
const TYPE_PRIORITY = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

async function fetchNotifications(token) {
  await Log("backend", "info", "service", "Fetching notifications");

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

  console.log("RAW RESPONSE:", data);

  return data.notifications || [];
}

function sortNotifications(notifications) {
  return notifications.sort((a, b) => {
    const diff =
      TYPE_PRIORITY[b.Type] - TYPE_PRIORITY[a.Type];

    if (diff !== 0) return diff;

    return new Date(b.Timestamp) - new Date(a.Timestamp);
  });
}

function getTopN(notifications, n = 10) {
  return notifications.slice(0, n);
}

async function main(token) {
  try {
    await Log("backend", "info", "handler", "Stage 1 started");

    const notifications = await fetchNotifications(token);

    await Log(
      "backend",
      "debug",
      "service",
      `Fetched ${notifications.length} notifications`
    );

    const sorted = sortNotifications(notifications);

    const top10 = getTopN(sorted, 10);

    await Log(
      "backend",
      "info",
      "service",
      "Top 10 prepared"
    );

    console.log("\n===== TOP 10 NOTIFICATIONS =====\n");
    console.log(top10);

    return top10;
  } catch (err) {
    await Log("backend", "fatal", "handler", "Stage 1 failed");
    console.error(err);
  }
}

/**
 * RUN
 */
const token =
  process.env.TOKEN || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtYWRodXJpc3JpcGVydW1hbGxhQGdtYWlsLmNvbSIsImV4cCI6MTc4MjM3NzQ4OCwiaWF0IjoxNzgyMzc2NTg4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMDViMjdkY2QtOGU2Ni00MjYwLWEzZjktYTQyZDFjNmFjMWJlIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibWFkaHVyaSBwZXJ1bWFsbGEiLCJzdWIiOiI5MzE0YzFmZi05NGQ4LTRjNWYtOWIyMS0xYTI5NWFiNWZlZDMifSwiZW1haWwiOiJtYWRodXJpc3JpcGVydW1hbGxhQGdtYWlsLmNvbSIsIm5hbWUiOiJtYWRodXJpIHBlcnVtYWxsYSIsInJvbGxObyI6IjIzYjAxYTQ1OTIiLCJhY2Nlc3NDb2RlIjoiYWhYanZwIiwiY2xpZW50SUQiOiI5MzE0YzFmZi05NGQ4LTRjNWYtOWIyMS0xYTI5NWFiNWZlZDMiLCJjbGllbnRTZWNyZXQiOiJKcHJYa3Z5a0dSV254RkFHIn0.oVo3fUAVj9DSQnbbadIuT1CyxoBgs-ObX6XfJssPk3Y";

await main(token);