import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import InputAdornment from '@mui/material/InputAdornment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { supabase } from '../utils/supabase';

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
  });
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [nicknameAvailable, setNicknameAvailable] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'nickname') {
      setNicknameChecked(false);
      setNicknameAvailable(false);
    }
  }

  async function handleNicknameCheck() {
    if (!form.nickname.trim()) {
      setError('닉네임을 입력해주세요.');
      return;
    }
    const { data } = await supabase
      .from('users')
      .select('nickname')
      .eq('nickname', form.nickname.trim())
      .single();

    setNicknameChecked(true);
    setNicknameAvailable(!data);
    if (data) {
      setError('이미 사용 중인 닉네임입니다.');
    } else {
      setError('');
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError('');

    if (form.password !== form.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (form.password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      return;
    }
    if (!nicknameChecked || !nicknameAvailable) {
      setError('닉네임 중복검사를 완료해주세요.');
      return;
    }

    setLoading(true);

    const { error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          name: form.name,
          nickname: form.nickname.trim(),
          phone: form.phone,
        },
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setSuccess('회원가입이 완료되었습니다! 이메일 인증 후 로그인 가능합니다.');
    setLoading(false);
    setTimeout(() => navigate('/login'), 2500);
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(191,0,255,0.08) 0%, #060610 60%)',
        py: 4,
      }}
    >
      <Container maxWidth='sm'>
        <Paper
          sx={{
            p: { xs: 3, md: 5 },
            background: 'rgba(14, 14, 31, 0.95)',
            border: '1px solid rgba(191, 0, 255, 0.2)',
            borderRadius: 3,
            boxShadow: '0 0 40px rgba(191, 0, 255, 0.1)',
          }}
        >
          {/* 헤더 */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <SportsEsportsIcon sx={{ color: '#bf00ff', fontSize: 48, mb: 1 }} />
            <Typography
              variant='h5'
              sx={{
                fontFamily: '"Rajdhani", sans-serif',
                fontWeight: 700,
                color: '#bf00ff',
                textShadow: '0 0 20px rgba(191, 0, 255, 0.8)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              회원가입
            </Typography>
          </Box>

          <Box component='form' onSubmit={handleRegister} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            { error && <Alert severity='error' sx={{ bgcolor: 'rgba(255, 107, 107, 0.1)', color: '#ff6b6b', border: '1px solid rgba(255,107,107,0.3)' }}>{ error }</Alert> }
            { success && <Alert severity='success' sx={{ bgcolor: 'rgba(57, 255, 20, 0.1)', color: '#39ff14', border: '1px solid rgba(57,255,20,0.3)' }}>{ success }</Alert> }

            <TextField
              label='이름'
              name='name'
              value={form.name}
              onChange={handleChange}
              required
              fullWidth
              InputLabelProps={{ sx: { color: 'text.secondary' } }}
              inputProps={{ sx: { color: 'text.primary' } }}
            />
            <TextField
              label='핸드폰 번호'
              name='phone'
              value={form.phone}
              onChange={handleChange}
              fullWidth
              placeholder='010-0000-0000'
              InputLabelProps={{ sx: { color: 'text.secondary' } }}
              inputProps={{ sx: { color: 'text.primary' } }}
            />
            <TextField
              label='이메일 (로그인 아이디)'
              name='email'
              type='email'
              value={form.email}
              onChange={handleChange}
              required
              fullWidth
              autoComplete='email'
              InputLabelProps={{ sx: { color: 'text.secondary' } }}
              inputProps={{ sx: { color: 'text.primary' } }}
            />
            <TextField
              label='비밀번호 (6자 이상)'
              name='password'
              type='password'
              value={form.password}
              onChange={handleChange}
              required
              fullWidth
              autoComplete='new-password'
              InputLabelProps={{ sx: { color: 'text.secondary' } }}
              inputProps={{ sx: { color: 'text.primary' } }}
            />
            <TextField
              label='비밀번호 확인'
              name='passwordConfirm'
              type='password'
              value={form.passwordConfirm}
              onChange={handleChange}
              required
              fullWidth
              autoComplete='new-password'
              error={form.passwordConfirm !== '' && form.password !== form.passwordConfirm}
              helperText={form.passwordConfirm !== '' && form.password !== form.passwordConfirm ? '비밀번호가 일치하지 않습니다' : ''}
              InputLabelProps={{ sx: { color: 'text.secondary' } }}
              inputProps={{ sx: { color: 'text.primary' } }}
            />

            {/* 닉네임 + 중복검사 */}
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
              <TextField
                label='닉네임'
                name='nickname'
                value={form.nickname}
                onChange={handleChange}
                required
                fullWidth
                InputLabelProps={{ sx: { color: 'text.secondary' } }}
                inputProps={{ sx: { color: 'text.primary' } }}
                InputProps={{
                  endAdornment: nicknameChecked && nicknameAvailable ? (
                    <InputAdornment position='end'>
                      <CheckCircleIcon sx={{ color: '#39ff14', fontSize: 20 }} />
                    </InputAdornment>
                  ) : null,
                }}
              />
              <Button
                variant='outlined'
                onClick={handleNicknameCheck}
                sx={{
                  minWidth: 100,
                  height: 56,
                  borderColor: 'rgba(0,245,255,0.4)',
                  color: '#00f5ff',
                  flexShrink: 0,
                }}
              >
                중복검사
              </Button>
            </Box>

            <Button
              type='submit'
              variant='contained'
              fullWidth
              disabled={loading}
              sx={{
                py: 1.5,
                mt: 1,
                fontSize: '1rem',
                background: 'linear-gradient(135deg, #bf00ff 0%, #8b00cc 100%)',
                color: '#fff',
                '&:hover': {
                  background: 'linear-gradient(135deg, #f050ff 0%, #bf00ff 100%)',
                  boxShadow: '0 0 20px rgba(191, 0, 255, 0.6)',
                },
              }}
            >
              { loading ? '가입 중...' : '회원가입' }
            </Button>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              이미 계정이 있으신가요?{' '}
              <RouterLink to='/login' style={{ color: '#00f5ff', fontWeight: 600, textDecoration: 'none' }}>
                로그인
              </RouterLink>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default RegisterPage;
