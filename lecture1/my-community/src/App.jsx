import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Header from './components/common/Header';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';
import CreatePostPage from './pages/CreatePostPage';
import useAuth from './hooks/useAuth';

/**
 * ProtectedRoute 컴포넌트
 * 로그인한 사용자만 접근 가능한 라우트 보호
 *
 * Props:
 * @param {ReactNode} children - 보호할 컴포넌트 [Required]
 */
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress sx={{ color: '#00f5ff' }} />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to='/login' />;
  }

  return children;
}

/**
 * App 루트 컴포넌트
 * HashRouter 사용 (GitHub Pages 호환)
 */
function App() {
  return (
    <HashRouter>
      <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Routes>
          {/* 헤더 없는 페이지 */}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />

          {/* 헤더 있는 페이지 */}
          <Route
            path='/*'
            element={
              <>
                <Header />
                <Box component='main' sx={{ flex: 1 }}>
                  <Routes>
                    <Route path='/' element={<PostListPage />} />
                    <Route path='/posts/:id' element={<PostDetailPage />} />
                    <Route
                      path='/posts/create'
                      element={
                        <ProtectedRoute>
                          <CreatePostPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route path='*' element={<Navigate to='/' />} />
                  </Routes>
                </Box>
              </>
            }
          />
        </Routes>
      </Box>
    </HashRouter>
  );
}

export default App;
