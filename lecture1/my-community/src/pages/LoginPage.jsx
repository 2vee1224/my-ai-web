import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { supabase } from '../utils/supabase';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    } else {
      navigate('/');
    }
    setLoading(false);
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(0,245,255,0.08) 0%, #060610 60%)',
        py: 4,
      }}
    >
      <Container maxWidth='sm'>
        <Paper
          sx={{
            p: { xs: 3, md: 5 },
            background: 'rgba(14, 14, 31, 0.95)',
            border: '1px solid rgba(0, 245, 255, 0.2)',
            borderRadius: 3,
            boxShadow: '0 0 40px rgba(0, 245, 255, 0.1)',
          }}
        >
          {/* 로고 */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <SportsEsportsIcon sx={{ color: '#00f5ff', fontSize: 48, mb: 1 }} />
            <Typography
              variant='h4'
              sx={{
                fontFamily: '"Rajdhani", sans-serif',
                fontWeight: 700,
                color: '#00f5ff',
                textShadow: '0 0 20px rgba(0, 245, 255, 0.8)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Game Hub
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary', mt: 0.5 }}>
              게이머들의 커뮤니티에 오신 걸 환영합니다
            </Typography>
          </Box>

          {/* 로그인 폼 */}
          <Box component='form' onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            { error && <Alert severity='error' sx={{ bgcolor: 'rgba(255, 107, 107, 0.1)', color: '#ff6b6b', border: '1px solid rgba(255,107,107,0.3)' }}>{ error }</Alert> }

            <TextField
              label='이메일'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              autoComplete='email'
              InputLabelProps={{ sx: { color: 'text.secondary' } }}
              inputProps={{ sx: { color: 'text.primary' } }}
            />
            <TextField
              label='비밀번호'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              autoComplete='current-password'
              InputLabelProps={{ sx: { color: 'text.secondary' } }}
              inputProps={{ sx: { color: 'text.primary' } }}
            />

            <Button
              type='submit'
              variant='contained'
              fullWidth
              disabled={loading}
              sx={{ py: 1.5, mt: 1, fontSize: '1rem' }}
            >
              { loading ? '로그인 중...' : '로그인' }
            </Button>
          </Box>

          <Divider sx={{ my: 3, borderColor: 'rgba(0, 245, 255, 0.1)' }} />

          {/* 하단 링크 */}
          <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              아직 계정이 없으신가요?{' '}
              <RouterLink to='/register' style={{ color: '#00f5ff', fontWeight: 600, textDecoration: 'none' }}>
                회원가입
              </RouterLink>
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Typography variant='body2' sx={{ color: 'text.secondary', cursor: 'pointer', '&:hover': { color: '#00f5ff' } }}>
                아이디 찾기
              </Typography>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>|</Typography>
              <Typography variant='body2' sx={{ color: 'text.secondary', cursor: 'pointer', '&:hover': { color: '#00f5ff' } }}>
                비밀번호 찾기
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default LoginPage;
