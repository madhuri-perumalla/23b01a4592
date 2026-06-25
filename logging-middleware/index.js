import fetch from "node-fetch";

export async function Log(stack, level, pkg, message) {
  try {
    const res = await fetch(
      "http://4.224.186.213/evaluation-service/logs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_TOKEN_HERE`,
        },
        body: JSON.stringify({
          stack,
          level,
          package: pkg,
          message,
        }),
      }
    );

    return await res.json();
  } catch (err) {
    console.error("Log failed:", err.message);
  }
}