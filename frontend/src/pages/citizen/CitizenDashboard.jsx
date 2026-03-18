import { Button, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import TokenStatusCard from "../../components/TokenStatusCard";
import { queueService } from "../../services/queueService";

export default function CitizenDashboard() {
  const { data: tokens = [] } = useQuery({ queryKey: ["myTokens"], queryFn: queueService.getMyTokens });
  const activeToken = tokens.find((token) => ["WAITING", "CALLED", "SKIPPED"].includes(token.status));

  return (
    <div>
      <PageHeader
        title="Citizen Portal"
        description="Join a queue, watch your token move in real time, and submit service feedback."
        action={<Button component={Link} to="/citizen/join" variant="contained">Join Queue</Button>}
      />
      <Grid container spacing={3} className="mb-6">
        <Grid size={{ xs: 12, md: 4 }}><StatCard title="Total Tokens" value={tokens.length} subtitle="Your complete history" /></Grid>
        <Grid size={{ xs: 12, md: 4 }}><StatCard title="Active Tokens" value={tokens.filter((t) => t.status === "WAITING").length} subtitle="Currently waiting" /></Grid>
        <Grid size={{ xs: 12, md: 4 }}><StatCard title="Completed" value={tokens.filter((t) => t.status === "COMPLETED").length} subtitle="Services delivered" /></Grid>
      </Grid>
      {activeToken ? (
        <TokenStatusCard token={activeToken} />
      ) : (
        <Paper className="rounded-3xl p-8" sx={{ background: "rgba(15,23,42,0.75)" }}>
          <Typography variant="h6">No active token</Typography>
          <Typography color="text.secondary">Create a new token to start tracking your queue position.</Typography>
        </Paper>
      )}
    </div>
  );
}
