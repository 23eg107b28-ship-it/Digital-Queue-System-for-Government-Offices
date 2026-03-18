import { Paper, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "../../components/PageHeader";
import TokenStatusCard from "../../components/TokenStatusCard";
import { staffService } from "../../services/staffService";

export default function QueueMonitorPage() {
  const { data: waiting = [] } = useQuery({ queryKey: ["waitingUsers"], queryFn: staffService.waitingUsers });

  return (
    <div>
      <PageHeader title="Queue Monitor" description="Observe waiting and called tokens for the current department queue." />
      <Stack spacing={3}>
        {waiting.map((token) => <TokenStatusCard key={token.tokenId} token={token} />)}
        {!waiting.length ? <Paper className="rounded-3xl p-6" sx={{ background: "rgba(15,23,42,0.75)" }}><Typography>No active queue items.</Typography></Paper> : null}
      </Stack>
    </div>
  );
}
