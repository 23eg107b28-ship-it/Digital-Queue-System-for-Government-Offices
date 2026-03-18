import { Paper, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { queueService } from "../services/queueService";

export default function DisplayBoardPage() {
  const { data: tokens = [] } = useQuery({ queryKey: ["display-board"], queryFn: queueService.getMyTokens, retry: false });

  return (
    <div>
      <Typography variant="h3" fontWeight={800} className="mb-6 text-center">Queue Display Board</Typography>
      <Stack spacing={3}>
        {tokens.slice(0, 8).map((token) => (
          <Paper key={token.tokenId} className="rounded-3xl p-6" sx={{ background: "rgba(15,23,42,0.75)" }}>
            <div className="flex items-center justify-between">
              <Typography variant="h4">{token.tokenNumber}</Typography>
              <Typography variant="h5" color="primary.light">{token.status}</Typography>
            </div>
          </Paper>
        ))}
      </Stack>
    </div>
  );
}
