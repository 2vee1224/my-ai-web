import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About Me', path: '/about' },
  { label: 'Projects', path: '/projects' },
];

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

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
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.label}
              onClick={() => navigate(item.path)}
              sx={{
                color: isActive ? 'var(--color-primary-dark)' : 'var(--color-text-primary)',
                fontFamily: '"Playfair Display", serif',
                fontSize: { xs: '0.85rem', sm: '1rem' },
                fontWeight: isActive ? 700 : 500,
                letterSpacing: '0.05em',
                borderBottom: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
                borderRadius: 0,
                px: { xs: 1.5, sm: 3 },
                '&:hover': {
                  color: 'var(--color-primary)',
                  bgcolor: 'transparent',
                  borderBottom: '2px solid var(--color-primary-light)',
                },
              }}
            >
              {item.label}
            </Button>
          );
        })}
      </Toolbar>
    </AppBar>
  );
}
