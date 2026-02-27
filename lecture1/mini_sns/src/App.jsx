import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';

import useAuth from './hooks/useAuth';
import BottomNav from './components/common/BottomNav';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';
import CreatePostPage from './pages/CreatePostPage';
import MyPage from './pages/MyPage';
import EditProfilePage from './pages/EditProfilePage';
import UserProfilePage from './pages/UserProfilePage';
import NotificationsPage from './pages/NotificationsPage';

/**
 * PrivateRoute 컴포넌트
 * 인증된 사용자만 접근 가능한 라우트 래퍼
 *
 * Props:
 * @param {ReactNode} children - 보호할 컴포넌트 [Required]
 * @param {object} user - 현재 인증된 사용자 객체 [Required]
 */
function PrivateRoute({ children, user }) {
  if (!user) return <Navigate to='/login' replace />;
  return children;
}

function App() {
  const { user, profile, loading, signOut, refetchProfile } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#F8FFFE',
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: '4px solid #E8F4FA',
            borderTop: '4px solid #87CEEB',
            animation: 'spin 1s linear infinite',
            '@keyframes spin': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' },
            },
          }}
        />
      </Box>
    );
  }

  return (
    <HashRouter>
      <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#F8FFFE' }}>
        <Routes>
          {/* 인증 불필요 */}
          <Route path='/login' element={ <LoginPage /> } />
          <Route path='/register' element={ <RegisterPage /> } />

          {/* 인증 필요 */}
          <Route
            path='/'
            element={
              <PrivateRoute user={ user }>
                <HomePage user={ user } profile={ profile } />
              </PrivateRoute>
            }
          />
          <Route
            path='/list'
            element={
              <PrivateRoute user={ user }>
                <PostListPage user={ user } />
              </PrivateRoute>
            }
          />
          <Route
            path='/post/:id'
            element={
              <PrivateRoute user={ user }>
                <PostDetailPage user={ user } profile={ profile } />
              </PrivateRoute>
            }
          />
          <Route
            path='/create'
            element={
              <PrivateRoute user={ user }>
                <CreatePostPage user={ user } profile={ profile } />
              </PrivateRoute>
            }
          />
          <Route
            path='/my'
            element={
              <PrivateRoute user={ user }>
                <MyPage user={ user } profile={ profile } onSignOut={ signOut } />
              </PrivateRoute>
            }
          />
          <Route
            path='/edit-profile'
            element={
              <PrivateRoute user={ user }>
                <EditProfilePage user={ user } profile={ profile } onRefetch={ refetchProfile } onSignOut={ signOut } />
              </PrivateRoute>
            }
          />
          <Route
            path='/user/:username'
            element={
              <PrivateRoute user={ user }>
                <UserProfilePage user={ user } />
              </PrivateRoute>
            }
          />
          <Route
            path='/notifications'
            element={
              <PrivateRoute user={ user }>
                <NotificationsPage user={ user } />
              </PrivateRoute>
            }
          />

          {/* 기본 리다이렉트 */}
          <Route path='*' element={ <Navigate to={ user ? '/' : '/login' } replace /> } />
        </Routes>

        {/* 인증된 사용자에게만 하단 네비게이션 표시 */}
        { user && <BottomNav /> }
      </Box>
    </HashRouter>
  );
}

export default App;
