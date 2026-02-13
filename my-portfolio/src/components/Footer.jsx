import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: 'var(--color-primary-dark)',
        color: 'white',
        py: 3,
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" sx={{ opacity: 0.8 }}>
        &copy; 2025 YJ Portfolio. All rights reserved.
      </Typography>
    </Box>
  );
}
