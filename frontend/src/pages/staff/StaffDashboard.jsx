import { Button, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import { staffService } from "../../services/staffService";

export default function StaffDashboard() {
  const { data: waiting = [] } = useQuery({ queryKey: ["waitingUsers"], queryFn: staffService.waitingUsers });

  return (
    <div>
      <PageHeader title="Staff Counter Dashboard" description="Manage token flow at the assigned counter." action={<Button component={Link} to="/staff/control" variant="contained">Open Control Panel</Button>} />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}><StatCard title="Waiting Users" value={waiting.filter((item) => item.status === "WAITING").length} /></Grid>
        <Grid size={{ xs: 12, md: 4 }}><StatCard title="Called Tokens" value={waiting.filter((item) => item.status === "CALLED").length} /></Grid>
        <Grid size={{ xs: 12, md: 4 }}><StatCard title="Skipped Tokens" value={waiting.filter((item) => item.status === "SKIPPED").length} /></Grid>
      </Grid>
    </div>
  );
}
