import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useAuth from '../hooks/useAuth';
import { supabase } from '../utils/supabase';

const GAME_TAGS = ['롤', '오버워치', '배틀그라운드', '발로란트', '종합게임'];

function CreatePostPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [gameTag, setGameTag] = useState('종합게임');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    setError('');
    setLoading(true);

    const { data, error: postError } = await supabase.from('posts').insert({
      title: title.trim(),
      content: content.trim(),
      game_name: gameTag,
      user_id: user.id,
    }).select('id').single();

    if (postError) {
      setError('게시물 작성에 실패했습니다.');
    } else {
      navigate(`/posts/${data.id}`);
    }
    setLoading(false);
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', background: '#060610', py: 4 }}>
      <Container maxWidth='md' sx={{ px: { xs: 2, md: 3 } }}>
        {/* 상단 버튼 */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ color: 'text.secondary', mb: 2, '&:hover': { color: '#00f5ff' } }}
        >
          뒤로가기
        </Button>

        <Paper
          sx={{
            p: { xs: 3, md: 5 },
            background: 'rgba(14, 14, 31, 0.95)',
            border: '1px solid rgba(0, 245, 255, 0.2)',
            borderRadius: 3,
          }}
        >
          <Typography
            variant='h5'
            sx={{
              fontFamily: '"Rajdhani", sans-serif',
              fontWeight: 700,
              color: '#00f5ff',
              mb: 3,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            새 게시물 작성
          </Typography>

          <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            { error && <Alert severity='error' sx={{ bgcolor: 'rgba(255,107,107,0.1)', color: '#ff6b6b', border: '1px solid rgba(255,107,107,0.3)' }}>{ error }</Alert> }

            <TextField
              select
              label='게임 태그'
              value={gameTag}
              onChange={(e) => setGameTag(e.target.value)}
              fullWidth
              InputLabelProps={{ sx: { color: 'text.secondary' } }}
              inputProps={{ sx: { color: 'text.primary' } }}
            >
              { GAME_TAGS.map((tag) => (
                <MenuItem key={tag} value={tag}>{ tag }</MenuItem>
              )) }
            </TextField>

            <TextField
              label='제목'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
              inputProps={{ maxLength: 100, sx: { color: 'text.primary' } }}
              InputLabelProps={{ sx: { color: 'text.secondary' } }}
            />

            <TextField
              label='내용'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              fullWidth
              multiline
              rows={12}
              inputProps={{ sx: { color: 'text.primary' } }}
              InputLabelProps={{ sx: { color: 'text.secondary' } }}
            />

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant='outlined'
                onClick={() => navigate(-1)}
                sx={{ borderColor: 'rgba(255,255,255,0.2)', color: 'text.secondary' }}
              >
                취소
              </Button>
              <Button
                type='submit'
                variant='contained'
                disabled={loading}
                sx={{ minWidth: 120 }}
              >
                { loading ? '등록 중...' : '게시하기' }
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default CreatePostPage;
