import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import useAuth from '../../hooks/useAuth';

/**
 * Header 공통 컴포넌트
 *
 * Props: 없음 (useAuth 훅에서 직접 상태를 가져옴)
 */
function Header() {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  function handleMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  async function handleSignOut() {
    await signOut();
    handleMenuClose();
    navigate('/login');
  }

  return (
    <AppBar
      position='sticky'
      sx={{
        background: 'rgba(6, 6, 16, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0, 245, 255, 0.2)',
        boxShadow: '0 0 20px rgba(0, 245, 255, 0.1)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
        {/* 로고 */}
        <Box
          component={RouterLink}
          to='/'
          sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none' }}
        >
          <SportsEsportsIcon sx={{ color: '#00f5ff', fontSize: 32 }} />
          <Typography
            variant='h6'
            sx={{
              fontFamily: '"Rajdhani", sans-serif',
              fontWeight: 700,
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              color: '#00f5ff',
              textShadow: '0 0 10px rgba(0, 245, 255, 0.8)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Game Hub
          </Typography>
        </Box>

        {/* 네비게이션 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {user ? (
            <>
              <Button
                variant='contained'
                size='small'
                onClick={() => navigate('/posts/create')}
                sx={{ display: { xs: 'none', sm: 'flex' } }}
              >
                글쓰기
              </Button>
              <IconButton onClick={handleMenuOpen} sx={{ ml: 1 }}>
                <Avatar
                  sx={{
                    bgcolor: 'rgba(0, 245, 255, 0.2)',
                    color: '#00f5ff',
                    border: '1px solid rgba(0, 245, 255, 0.5)',
                    width: 36,
                    height: 36,
                    fontSize: '0.9rem',
                    fontWeight: 700,
                  }}
                >
                  { profile?.nickname?.[0]?.toUpperCase() || 'G' }
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    background: '#0e0e1f',
                    border: '1px solid rgba(0, 245, 255, 0.2)',
                    minWidth: 140,
                  },
                }}
              >
                <MenuItem disabled sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                  { profile?.nickname || user.email }
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component={RouterLink} to='/posts/create'>
                  글쓰기
                </MenuItem>
                <MenuItem onClick={handleSignOut} sx={{ color: '#ff6b6b' }}>
                  로그아웃
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                variant='outlined'
                size='small'
                onClick={() => navigate('/login')}
              >
                로그인
              </Button>
              <Button
                variant='contained'
                size='small'
                onClick={() => navigate('/register')}
              >
                회원가입
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
