import { Box, Typography } from "@mui/material";

export default function PageHeader({ title, description, action }) {
  return (
    <Box className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <Typography variant="h4" fontWeight={700}>{title}</Typography>
        <Typography color="text.secondary">{description}</Typography>
      </div>
      {action}
    </Box>
  );
}
