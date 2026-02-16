import { Box, Container, Typography } from '@mui/material';

export default function SectionBox({ id, title, description, background = 'var(--color-bg-primary)', children }) {
  return (
    <Box id={id} sx={{ background, py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            mb: 2,
            color: 'var(--color-primary-dark)',
            '&::after': {
              content: '""',
              display: 'block',
              width: 50,
              height: 3,
              bgcolor: 'var(--color-primary-light)',
              margin: '12px auto 0',
              borderRadius: 2,
            },
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            mt: 4,
            p: { xs: 3, md: 4 },
            bgcolor: 'var(--color-bg-primary)',
            borderRadius: 3,
            border: '1px solid var(--color-border)',
            boxShadow: '0 2px 12px var(--color-shadow)',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: 'var(--color-text-secondary)', lineHeight: 2 }}
          >
            {description}
          </Typography>
          {children}
        </Box>
      </Container>
    </Box>
  );
}
