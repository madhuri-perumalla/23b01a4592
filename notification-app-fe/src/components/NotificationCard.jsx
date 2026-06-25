import { Card, CardContent, Typography } from "@mui/material";

export default function NotificationCard({ item }) {
  return (
    <Card style={{ marginBottom: 10 }}>
      <CardContent>
        <Typography variant="h6">{item.Type}</Typography>
        <Typography>{item.Message}</Typography>
        <Typography variant="caption">
          {item.Timestamp}
        </Typography>
      </CardContent>
    </Card>
  );
}