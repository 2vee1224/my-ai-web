import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { supabase } from '../utils/supabase';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /** 이메일 로그인 처리 */
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;
      navigate('/');
    } catch (err) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#F8FFFE',
        py: 4,
      }}
    >
      <Container maxWidth='xs'>
        {/* 로고 */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
            <FlightTakeoffIcon sx={{ fontSize: 36, color: '#87CEEB' }} />
            <Typography
              variant='h4'
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #87CEEB, #98FB98)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Travel Log
            </Typography>
          </Box>
          <Typography variant='body2' sx={{ color: '#888' }}>
            여행 이야기를 나눠보세요 ✈️
          </Typography>
        </Box>

        {/* 로그인 폼 */}
        <Box
          component='form'
          onSubmit={ handleLogin }
          sx={{
            bgcolor: '#fff',
            borderRadius: 4,
            p: 3,
            boxShadow: '0 4px 24px rgba(135,206,235,0.15)',
          }}
        >
          { error && <Alert severity='error' sx={{ mb: 2 }}>{ error }</Alert> }

          <TextField
            label='이메일'
            type='email'
            fullWidth
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label='비밀번호'
            type='password'
            fullWidth
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
            required
            sx={{ mb: 3 }}
          />

          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            disabled={ loading }
            sx={{ py: 1.5, fontSize: '1rem' }}
          >
            { loading ? '로그인 중...' : '로그인' }
          </Button>

          <Divider sx={{ my: 2.5 }}>
            <Typography variant='caption' sx={{ color: '#aaa' }}>또는</Typography>
          </Divider>

          {/* SNS 로그인 버튼 (UI만) */}
          <Button
            variant='outlined'
            fullWidth
            sx={{
              borderColor: '#ddd',
              color: '#555',
              mb: 1.5,
              '&:hover': { borderColor: '#87CEEB', bgcolor: '#F8FFFE' },
            }}
          >
            Google로 계속하기
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant='body2' sx={{ color: '#888' }}>
              계정이 없으신가요?{' '}
              <Box
                component='span'
                sx={{ color: '#5BA8C9', cursor: 'pointer', fontWeight: 600 }}
                onClick={ () => navigate('/register') }
              >
                회원가입
              </Box>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default LoginPage;
