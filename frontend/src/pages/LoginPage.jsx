import { Alert, Button, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const defaults = {
  citizen: { email: "citizen@govqueue.com", password: "Citizen@123" },
  staff: { email: "staff@govqueue.com", password: "Staff@123" },
  admin: { email: "admin@govqueue.com", password: "Admin@123" }
};

export default function LoginPage() {
  const [form, setForm] = useState(defaults.citizen);
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(form);
      navigate(user.role === "ROLE_ADMIN" ? "/admin" : user.role === "ROLE_STAFF" ? "/staff" : "/citizen");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Paper className="mx-auto max-w-xl rounded-[32px] p-8" sx={{ background: "rgba(15,23,42,0.82)" }}>
      <Typography variant="h4" fontWeight={700} className="mb-6">Portal Login</Typography>
      {error ? <Alert severity="error" className="mb-4">{error}</Alert> : null}
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <TextField select label="Quick role preset" defaultValue="citizen" onChange={(e) => setForm(defaults[e.target.value])}>
          <MenuItem value="citizen">Citizen</MenuItem>
          <MenuItem value="staff">Staff</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </TextField>
        <TextField label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <TextField label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <Button type="submit" variant="contained" disabled={loading}>Login</Button>
      </form>
      <Typography className="mt-4">Need an account? <Link to="/register">Register</Link></Typography>
    </Paper>
  );
}
