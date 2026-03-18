import { AppBar, Box, Button, Container, MenuItem, Select, Toolbar, Typography } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";

const roleHome = {
  ROLE_CITIZEN: "/citizen",
  ROLE_STAFF: "/staff",
  ROLE_ADMIN: "/admin"
};

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  return (
    <Box>
      <AppBar position="sticky" color="transparent" sx={{ backdropFilter: "blur(18px)", borderBottom: "1px solid rgba(148,163,184,0.15)" }}>
        <Toolbar className="mx-auto flex w-full max-w-7xl justify-between">
          <Typography component={Link} to={user ? roleHome[user.role] : "/"} className="no-underline" color="inherit" fontWeight={800}>
            {t("title")}
          </Typography>
          <div className="flex items-center gap-3">
            <Select size="small" value={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
              <MenuItem value="en">EN</MenuItem>
              <MenuItem value="hi">HI</MenuItem>
              <MenuItem value="te">TE</MenuItem>
            </Select>
            {user ? (
              <>
                <Typography variant="body2">{user.fullName}</Typography>
                <Button variant="contained" onClick={() => { logout(); navigate("/login"); }}>Logout</Button>
              </>
            ) : (
              <Button variant="contained" component={Link} to="/login">Login</Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" className="py-8">
        <Outlet />
      </Container>
    </Box>
  );
}
