import { Button, Paper, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import TokenStatusCard from "../../components/TokenStatusCard";
import PageHeader from "../../components/PageHeader";
import { queueService } from "../../services/queueService";

export default function MyTokensPage() {
  const { data: tokens = [], refetch } = useQuery({ queryKey: ["myTokens"], queryFn: queueService.getMyTokens });
  const { data: payments = [] } = useQuery({ queryKey: ["payments"], queryFn: queueService.getPayments });

  return (
    <div>
      <PageHeader title="My Tokens" description="Track, refresh, or cancel active tokens." action={<Button variant="outlined" onClick={() => refetch()}>Refresh</Button>} />
      <Stack spacing={3}>
        {tokens.map((token) => <TokenStatusCard key={token.tokenId} token={token} />)}
      </Stack>
      <Paper className="mt-6 rounded-3xl p-6" sx={{ background: "rgba(15,23,42,0.75)" }}>
        <Typography variant="h6" className="mb-4">Payment History</Typography>
        <Stack spacing={2}>
          {payments.map((payment) => (
            <div key={payment.paymentId} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-700 p-4">
              <Typography>{payment.tokenNumber}</Typography>
              <Typography color="text.secondary">Rs. {payment.amount}</Typography>
              <Typography color="text.secondary">{payment.method}</Typography>
              <Typography color="text.secondary">{payment.referenceNumber}</Typography>
              <Typography color="text.secondary">{payment.status}</Typography>
            </div>
          ))}
          {!payments.length ? <Typography color="text.secondary">No payments recorded yet.</Typography> : null}
        </Stack>
      </Paper>
    </div>
  );
}
