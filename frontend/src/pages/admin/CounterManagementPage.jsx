import { Button, MenuItem, Paper, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import PageHeader from "../../components/PageHeader";
import { adminService } from "../../services/adminService";
import { queueService } from "../../services/queueService";

const staffUsers = [{ id: 2, label: "Counter Staff" }];

export default function CounterManagementPage() {
  const [officeId, setOfficeId] = useState("");
  const [form, setForm] = useState({ departmentId: "", staffUserId: 2, name: "", status: "ACTIVE" });
  const { data: catalog } = useQuery({ queryKey: ["catalog"], queryFn: queueService.catalog });
  const mutation = useMutation({ mutationFn: adminService.createCounter });
  const departments = useMemo(() => (catalog?.departments ?? []).filter((item) => item.office?.id === Number(officeId)), [catalog, officeId]);

  return (
    <div>
      <PageHeader title="Counter Management" description="Assign staff to counters and activate queue control points." />
      <Paper className="max-w-3xl rounded-3xl p-6" sx={{ background: "rgba(15,23,42,0.75)" }}>
        <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); mutation.mutate({ ...form, officeId: Number(officeId), departmentId: Number(form.departmentId), staffUserId: Number(form.staffUserId) }); }}>
          <TextField select label="Office" value={officeId} onChange={(e) => setOfficeId(e.target.value)}>
            {(catalog?.offices ?? []).map((office) => <MenuItem key={office.id} value={office.id}>{office.name}</MenuItem>)}
          </TextField>
          <TextField select label="Department" value={form.departmentId} onChange={(e) => setForm({ ...form, departmentId: e.target.value })}>
            {departments.map((department) => <MenuItem key={department.id} value={department.id}>{department.name}</MenuItem>)}
          </TextField>
          <TextField label="Counter Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <TextField select label="Staff" value={form.staffUserId} onChange={(e) => setForm({ ...form, staffUserId: e.target.value })}>
            {staffUsers.map((staff) => <MenuItem key={staff.id} value={staff.id}>{staff.label}</MenuItem>)}
          </TextField>
          <Button type="submit" variant="contained">Create Counter</Button>
        </form>
      </Paper>
    </div>
  );
}
