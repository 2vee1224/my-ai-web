import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { supabase } from '../utils/supabase';

/**
 * EditProfilePage 컴포넌트
 * 내 프로필 수정 (표시 이름, 닉네임, 소개글, 아바타 URL)
 *
 * Props:
 * @param {object} user - 현재 로그인 사용자 [Required]
 * @param {object} profile - 현재 사용자 프로필 [Required]
 * @param {function} onRefetch - 프로필 재조회 콜백 [Optional]
 *
 * Example usage:
 * <EditProfilePage user={user} profile={profile} onRefetch={refetchProfile} />
 */
function EditProfilePage({ user, profile, onRefetch, onSignOut }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    displayName: profile?.display_name || '',
    username: profile?.username || '',
    bio: profile?.bio || '',
    avatarUrl: profile?.avatar_url || '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  /** 프로필 저장 */
  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: updateError } = await supabase
        .from('sns_users')
        .update({
          display_name: form.displayName,
          username: form.username,
          bio: form.bio,
          avatar_url: form.avatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (updateError) {
        if (updateError.message?.includes('unique')) {
          throw new Error('이미 사용 중인 닉네임입니다.');
        }
        throw updateError;
      }

      setSuccess(true);
      onRefetch && onRefetch();
      setTimeout(() => navigate('/my'), 1200);
    } catch (err) {
      setError(err.message || '저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#F8FFFE' }}>
      {/* 헤더 */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          bgcolor: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #E8F4FA',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 1,
          py: 0.5,
          minHeight: 56,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={ () => navigate(-1) }>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant='subtitle1' sx={{ fontWeight: 700, ml: 1 }}>프로필 수정</Typography>
        </Box>
        <Button
          variant='contained'
          color='primary'
          size='small'
          onClick={ handleSave }
          disabled={ loading }
          sx={{ mr: 1 }}
        >
          { loading ? '저장 중...' : '저장' }
        </Button>
      </Box>

      <Container maxWidth='sm' sx={{ py: 3, px: { xs: 2, sm: 3 } }}>
        { error && <Alert severity='error' sx={{ mb: 2 }}>{ error }</Alert> }
        { success && <Alert severity='success' sx={{ mb: 2 }}>저장되었습니다! ✓</Alert> }

        {/* 아바타 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={ form.avatarUrl || '' }
              sx={{ width: 96, height: 96, bgcolor: '#87CEEB', fontSize: '2.5rem', mb: 1 }}
            >
              { form.displayName?.[0] || '?' }
            </Avatar>
            <Box
              sx={{
                position: 'absolute',
                bottom: 8,
                right: 0,
                bgcolor: '#87CEEB',
                borderRadius: '50%',
                width: 28,
                height: 28,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CameraAltIcon sx={{ fontSize: 16, color: '#fff' }} />
            </Box>
          </Box>
          <Typography variant='caption' sx={{ color: '#888' }}>아래 URL을 입력하여 사진 변경</Typography>
        </Box>

        {/* 아바타 URL */}
        <TextField
          label='프로필 사진 URL (선택)'
          fullWidth
          value={ form.avatarUrl }
          onChange={ handleChange('avatarUrl') }
          placeholder='https://...'
          sx={{ mb: 2.5 }}
        />

        <TextField
          label='표시 이름'
          fullWidth
          value={ form.displayName }
          onChange={ handleChange('displayName') }
          required
          sx={{ mb: 2.5 }}
        />
        <TextField
          label='닉네임'
          fullWidth
          value={ form.username }
          onChange={ handleChange('username') }
          required
          helperText='영문, 숫자, 언더스코어(_) 사용 가능'
          sx={{ mb: 2.5 }}
        />
        <TextField
          label='소개글'
          fullWidth
          multiline
          rows={ 3 }
          value={ form.bio }
          onChange={ handleChange('bio') }
          placeholder='자신을 소개해보세요 (선택)'
          inputProps={{ maxLength: 150 }}
          helperText={ `${form.bio.length}/150` }
          sx={{ mb: 4 }}
        />

        {/* 로그아웃 */}
        <Box sx={{ borderTop: '1px solid #F0F8FF', pt: 3 }}>
          <Button
            variant='outlined'
            fullWidth
            onClick={ onSignOut }
            sx={{ borderColor: '#ddd', color: '#aaa', borderRadius: 20, py: 1 }}
          >
            로그아웃
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default EditProfilePage;
