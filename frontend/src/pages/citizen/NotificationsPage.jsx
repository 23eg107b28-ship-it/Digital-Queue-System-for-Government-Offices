import { Paper, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "../../components/PageHeader";
import { notificationService } from "../../services/notificationService";

export default function NotificationsPage() {
  const { data: notifications = [] } = useQuery({ queryKey: ["notifications"], queryFn: notificationService.list });

  return (
    <div>
      <PageHeader title="Notifications" description="Realtime token and queue notifications." />
      <Stack spacing={3}>
        {notifications.map((item) => (
          <Paper key={item.id} className="rounded-3xl p-5" sx={{ background: "rgba(15,23,42,0.75)" }}>
            <Typography variant="h6">{item.title}</Typography>
            <Typography color="text.secondary">{item.message}</Typography>
          </Paper>
        ))}
      </Stack>
    </div>
  );
}
