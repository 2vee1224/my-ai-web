import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

/**
 * TopBar 컴포넌트
 * 상단 앱 바 (로고 + 검색/알림 버튼)
 *
 * Props:
 * @param {string} title - 앱 바 제목 [Optional, 기본값: 'Travel Log']
 * @param {boolean} isShowSearch - 검색 버튼 표시 여부 [Optional, 기본값: true]
 * @param {boolean} isShowNotification - 알림 버튼 표시 여부 [Optional, 기본값: true]
 *
 * Example usage:
 * <TopBar />
 * <TopBar title="탐색" isShowSearch={false} />
 */
function TopBar({ title = 'Travel Log', isShowSearch = true, isShowNotification = true }) {
  const navigate = useNavigate();

  return (
    <AppBar
      position='fixed'
      elevation={0}
      sx={{
        bgcolor: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #E8F4FA',
        color: '#333',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: '56px !important' }}>
        {/* 로고 */}
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}
          onClick={ () => navigate('/') }
        >
          <FlightTakeoffIcon sx={{ color: '#87CEEB', fontSize: 24 }} />
          <Typography
            variant='h6'
            sx={{
              fontWeight: 800,
              fontSize: '1.1rem',
              background: 'linear-gradient(135deg, #87CEEB, #98FB98)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            { title }
          </Typography>
        </Box>

        {/* 우측 버튼들 */}
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          { isShowSearch && (
            <IconButton
              onClick={ () => navigate('/list') }
              sx={{ color: '#555' }}
            >
              <SearchIcon />
            </IconButton>
          ) }
          { isShowNotification && (
            <IconButton
              onClick={ () => navigate('/notifications') }
              sx={{ color: '#555' }}
            >
              <NotificationsNoneIcon />
            </IconButton>
          ) }
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
