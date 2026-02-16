import { AppBar, Toolbar, Button } from '@mui/material';

const navItems = ['About me', 'History', 'Skills', 'Project', 'Contact'];

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

export default function Navigation() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'var(--color-bg-primary)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'center', gap: { xs: 1, sm: 4 } }}>
        {navItems.map((item) => (
          <Button
            key={item}
            onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
            sx={{
              color: 'var(--color-text-primary)',
              fontFamily: '"Playfair Display", serif',
              fontSize: { xs: '0.8rem', sm: '1rem' },
              fontWeight: 500,
              letterSpacing: '0.05em',
              borderRadius: 0,
              px: { xs: 1, sm: 3 },
              '&:hover': {
                color: 'var(--color-primary)',
                bgcolor: 'transparent',
              },
            }}
          >
            {item}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
}
