import { Button, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import PageHeader from "../../components/PageHeader";
import { adminService } from "../../services/adminService";

export default function OfficeManagementPage() {
  const [form, setForm] = useState({ name: "", address: "", city: "", state: "", contactNumber: "" });
  const mutation = useMutation({ mutationFn: adminService.createOffice });

  return (
    <div>
      <PageHeader title="Office Management" description="Create and maintain government office branches." />
      <Paper className="max-w-3xl rounded-3xl p-6" sx={{ background: "rgba(15,23,42,0.75)" }}>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={(e) => { e.preventDefault(); mutation.mutate(form); }}>
          <TextField label="Office Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <TextField label="Contact Number" value={form.contactNumber} onChange={(e) => setForm({ ...form, contactNumber: e.target.value })} />
          <TextField label="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <TextField label="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          <TextField label="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
          <Button type="submit" variant="contained">Create Office</Button>
        </form>
      </Paper>
    </div>
  );
}
