import { Button, Paper, Stack, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PageHeader from "../../components/PageHeader";
import { staffService } from "../../services/staffService";

export default function TokenControlPage() {
  const queryClient = useQueryClient();
  const { data: waiting = [] } = useQuery({ queryKey: ["waitingUsers"], queryFn: staffService.waitingUsers });
  const nextMutation = useMutation({ mutationFn: staffService.nextToken, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["waitingUsers"] }) });
  const completeMutation = useMutation({ mutationFn: staffService.completeToken, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["waitingUsers"] }) });
  const skipMutation = useMutation({ mutationFn: staffService.skipToken, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["waitingUsers"] }) });
  const recallMutation = useMutation({ mutationFn: staffService.recallToken, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["waitingUsers"] }) });
  const current = waiting.find((item) => item.status === "CALLED") || waiting[0];

  return (
    <div>
      <PageHeader title="Token Control Panel" description="Call next, skip, recall, and complete tokens." />
      <Paper className="rounded-3xl p-6" sx={{ background: "rgba(15,23,42,0.75)" }}>
        <Stack spacing={3}>
          <Typography variant="h5">{current ? current.tokenNumber : "No active token"}</Typography>
          <div className="flex flex-wrap gap-3">
            <Button variant="contained" onClick={() => nextMutation.mutate()}>Call Next</Button>
            <Button variant="outlined" disabled={!current} onClick={() => skipMutation.mutate(current.tokenId)}>Skip</Button>
            <Button variant="outlined" disabled={!current} onClick={() => recallMutation.mutate(current.tokenId)}>Recall</Button>
            <Button color="success" variant="contained" disabled={!current} onClick={() => completeMutation.mutate(current.tokenId)}>Complete</Button>
          </div>
        </Stack>
      </Paper>
    </div>
  );
}
