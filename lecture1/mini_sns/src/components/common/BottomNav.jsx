import { useNavigate, useLocation } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import GridViewIcon from '@mui/icons-material/GridView';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PersonIcon from '@mui/icons-material/Person';

/**
 * BottomNav 컴포넌트
 * 하단 고정 네비게이션 바 (홈/목록/작성/마이)
 *
 * Props: 없음 (react-router useNavigate 사용)
 *
 * Example usage:
 * <BottomNav />
 */
function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const routes = ['/', '/list', '/create', '/my'];
  const currentValue = routes.indexOf(location.pathname);

  const handleChange = (_event, newValue) => {
    navigate(routes[newValue]);
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        borderTop: '1px solid #E8F4FA',
      }}
      elevation={3}
    >
      <BottomNavigation
        value={currentValue}
        onChange={handleChange}
        sx={{
          bgcolor: '#FFFFFF',
          '& .Mui-selected': {
            color: '#5BA8C9',
          },
          '& .MuiBottomNavigationAction-root': {
            minWidth: 0,
            color: '#AAAAAA',
          },
        }}
      >
        <BottomNavigationAction label='홈' icon={ <HomeIcon /> } />
        <BottomNavigationAction label='탐색' icon={ <GridViewIcon /> } />
        <BottomNavigationAction label='작성' icon={ <AddBoxIcon sx={{ fontSize: 32 }} /> } />
        <BottomNavigationAction label='마이' icon={ <PersonIcon /> } />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNav;
