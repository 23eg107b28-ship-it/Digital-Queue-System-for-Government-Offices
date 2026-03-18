import { Paper, Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader";

export default function StaffManagementPage() {
  return (
    <div>
      <PageHeader title="Staff Management" description="Provision and govern staff access. Backend user seeding includes a baseline staff account." />
      <Paper className="rounded-3xl p-6" sx={{ background: "rgba(15,23,42,0.75)" }}>
        <Typography>Current seed staff account: staff@govqueue.com / Staff@123</Typography>
        <Typography color="text.secondary" className="mt-2">Extend this page with create and edit staff flows or connect it to a dedicated admin user API.</Typography>
      </Paper>
    </div>
  );
}
