import { Box, Container, Typography } from '@mui/material';

export default function Projects() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(180deg, #E8EDF5 0%, #F0EDF7 100%)',
        minHeight: 'calc(100vh - 64px)',
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
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
          Projects
        </Typography>
        <Box
          sx={{
            mt: 5,
            p: { xs: 4, md: 6 },
            bgcolor: 'var(--color-bg-primary)',
            borderRadius: 3,
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 20px var(--color-shadow)',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: 'var(--color-text-secondary)', lineHeight: 2.2, fontSize: '1.05rem' }}
          >
            Projects 페이지가 개발될 공간입니다.
            <br />
            포트폴리오 작품들이 들어갈 예정입니다.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
