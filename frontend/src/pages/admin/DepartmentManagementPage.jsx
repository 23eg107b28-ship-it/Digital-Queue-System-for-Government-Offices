import { Button, MenuItem, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import PageHeader from "../../components/PageHeader";
import { adminService } from "../../services/adminService";
import { queueService } from "../../services/queueService";

export default function DepartmentManagementPage() {
  const [form, setForm] = useState({ officeId: "", name: "", description: "" });
  const { data: catalog } = useQuery({ queryKey: ["catalog"], queryFn: queueService.catalog });
  const mutation = useMutation({ mutationFn: adminService.createDepartment });

  return (
    <div>
      <PageHeader title="Department Management" description="Create office-specific departments." />
      <Paper className="max-w-3xl rounded-3xl p-6" sx={{ background: "rgba(15,23,42,0.75)" }}>
        <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); mutation.mutate({ ...form, officeId: Number(form.officeId) }); }}>
          <TextField select label="Office" value={form.officeId} onChange={(e) => setForm({ ...form, officeId: e.target.value })}>
            {(catalog?.offices ?? []).map((office) => <MenuItem key={office.id} value={office.id}>{office.name}</MenuItem>)}
          </TextField>
          <TextField label="Department Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <TextField label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <Button type="submit" variant="contained">Create Department</Button>
        </form>
      </Paper>
    </div>
  );
}
