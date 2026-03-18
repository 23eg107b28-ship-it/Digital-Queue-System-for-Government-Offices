import { Card, CardContent, Typography } from "@mui/material";

export default function StatCard({ title, value, subtitle }) {
  return (
    <Card sx={{ background: "rgba(15, 23, 42, 0.78)", backdropFilter: "blur(14px)", boxShadow: "0 20px 45px rgba(15,118,110,0.18)" }}>
      <CardContent>
        <Typography color="primary.light" variant="overline">{title}</Typography>
        <Typography variant="h4" fontWeight={700}>{value}</Typography>
        {subtitle ? <Typography color="text.secondary">{subtitle}</Typography> : null}
      </CardContent>
    </Card>
  );
}
