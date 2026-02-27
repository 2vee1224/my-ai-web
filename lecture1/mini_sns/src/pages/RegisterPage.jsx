import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { supabase } from '../utils/supabase';

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '', username: '', displayName: '' });
  const [error, setError] = useState('');
  const [usernameStatus, setUsernameStatus] = useState(''); // 'available' | 'taken' | ''
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (field === 'username') setUsernameStatus('');
  };

  /** 닉네임 중복 확인 */
  const checkUsername = async () => {
    if (!form.username || form.username.length < 2) {
      setError('닉네임은 2자 이상 입력해주세요.');
      return;
    }
    const { data } = await supabase
      .from('sns_users')
      .select('username')
      .eq('username', form.username)
      .single();

    setUsernameStatus(data ? 'taken' : 'available');
  };

  /** 회원가입 처리 */
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (form.password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      return;
    }
    if (usernameStatus === 'taken') {
      setError('이미 사용 중인 닉네임입니다.');
      return;
    }

    setLoading(true);
    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });
      if (authError) throw authError;

      /** sns_users 프로필 생성 */
      if (data.user) {
        const { error: profileError } = await supabase.from('sns_users').insert({
          id: data.user.id,
          username: form.username,
          display_name: form.displayName || form.username,
        });
        if (profileError) throw profileError;
      }

      navigate('/');
    } catch (err) {
      if (err.message?.includes('already registered')) {
        setError('이미 사용 중인 이메일입니다.');
      } else {
        setError(err.message || '회원가입 중 오류가 발생했습니다.');
      }
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
        {/* 뒤로가기 + 로고 */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton onClick={ () => navigate('/login') } sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <FlightTakeoffIcon sx={{ fontSize: 24, color: '#87CEEB' }} />
            <Typography
              variant='h6'
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
        </Box>

        <Typography variant='h6' sx={{ fontWeight: 700, mb: 2.5, color: '#333' }}>
          회원가입
        </Typography>

        <Box
          component='form'
          onSubmit={ handleRegister }
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
            value={ form.email }
            onChange={ handleChange('email') }
            required
            sx={{ mb: 2 }}
          />

          {/* 닉네임 + 중복확인 */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              label='닉네임 (영문/숫자)'
              fullWidth
              value={ form.username }
              onChange={ handleChange('username') }
              required
              error={ usernameStatus === 'taken' }
              helperText={
                usernameStatus === 'available'
                  ? '✓ 사용 가능한 닉네임입니다.'
                  : usernameStatus === 'taken'
                  ? '이미 사용 중입니다.'
                  : ''
              }
              FormHelperTextProps={{
                sx: { color: usernameStatus === 'available' ? '#6BC86B' : '#d32f2f' },
              }}
              InputProps={{
                endAdornment: usernameStatus === 'available' && (
                  <CheckCircleIcon sx={{ color: '#6BC86B', fontSize: 20 }} />
                ),
              }}
            />
            <Button
              variant='outlined'
              onClick={ checkUsername }
              sx={{ minWidth: 80, borderColor: '#87CEEB', color: '#5BA8C9', flexShrink: 0, height: 56, alignSelf: 'flex-start' }}
            >
              중복확인
            </Button>
          </Box>

          <TextField
            label='표시 이름'
            fullWidth
            value={ form.displayName }
            onChange={ handleChange('displayName') }
            placeholder='닉네임과 다른 표시 이름 (선택)'
            sx={{ mb: 2 }}
          />
          <TextField
            label='비밀번호 (6자 이상)'
            type='password'
            fullWidth
            value={ form.password }
            onChange={ handleChange('password') }
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label='비밀번호 확인'
            type='password'
            fullWidth
            value={ form.confirmPassword }
            onChange={ handleChange('confirmPassword') }
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
            { loading ? '가입 중...' : '가입하기' }
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant='body2' sx={{ color: '#888' }}>
              이미 계정이 있으신가요?{' '}
              <Box
                component='span'
                sx={{ color: '#5BA8C9', cursor: 'pointer', fontWeight: 600 }}
                onClick={ () => navigate('/login') }
              >
                로그인
              </Box>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default RegisterPage;
