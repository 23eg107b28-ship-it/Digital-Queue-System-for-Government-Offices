import { Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
      <div className="space-y-6">
        <Typography variant="h2" fontWeight={800}>Digital Queue Management for Government Offices</Typography>
        <Typography variant="h6" color="text.secondary">
          Citizens can join queues remotely, staff can manage counters in real time, and administrators can monitor service delivery with live analytics.
        </Typography>
        <div className="flex gap-4">
          <Button component={Link} to="/register" variant="contained" size="large">Citizen Signup</Button>
          <Button component={Link} to="/login" variant="outlined" size="large">Portal Login</Button>
        </div>
      </div>
      <Paper className="rounded-[32px] p-8" sx={{ background: "linear-gradient(180deg, rgba(20,184,166,0.18), rgba(15,23,42,0.88))" }}>
        <div className="grid gap-4">
          {[
            "FIFO + priority support",
            "Realtime queue board updates",
            "Staff counter controls",
            "Citizen notifications and feedback",
            "Admin analytics dashboards"
          ].map((item) => <Typography key={item}>• {item}</Typography>)}
        </div>
      </Paper>
    </div>
  );
}
