import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import PostCard from '../components/landing/PostCard';
import useAuth from '../hooks/useAuth';
import { supabase } from '../utils/supabase';

const GAME_TAGS = ['전체', '롤', '오버워치', '배틀그라운드', '발로란트', '종합게임'];

function PostListPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState('전체');

  useEffect(() => {
    fetchPosts();
  }, [selectedTag]);

  async function fetchPosts() {
    setLoading(true);
    let query = supabase
      .from('posts')
      .select(`
        id, title, game_name, likes_count, created_at, user_id,
        users(nickname),
        comments(count)
      `)
      .order('created_at', { ascending: false });

    if (selectedTag !== '전체') {
      query = query.eq('game_name', selectedTag);
    }

    const { data, error } = await query;
    if (!error && data) {
      const formatted = data.map((p) => ({
        ...p,
        comment_count: p.comments?.[0]?.count || 0,
      }));
      setPosts(formatted);
    }
    setLoading(false);
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', background: '#060610', pb: 8 }}>
      {/* 히어로 배너 */}
      <Box
        sx={{
          background: 'linear-gradient(180deg, rgba(0,245,255,0.05) 0%, transparent 100%)',
          borderBottom: '1px solid rgba(0,245,255,0.1)',
          py: { xs: 4, md: 6 },
          textAlign: 'center',
        }}
      >
        <Typography
          variant='h3'
          sx={{
            fontFamily: '"Rajdhani", sans-serif',
            fontWeight: 700,
            color: '#00f5ff',
            textShadow: '0 0 30px rgba(0, 245, 255, 0.8)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontSize: { xs: '1.8rem', md: '2.5rem' },
          }}
        >
          GAME HUB
        </Typography>
        <Typography variant='body1' sx={{ color: 'text.secondary', mt: 1 }}>
          리뷰 · 공략 · Q&A — 게이머들의 이야기
        </Typography>
      </Box>

      <Container maxWidth='lg' sx={{ pt: 4, px: { xs: 2, md: 3 } }}>
        {/* 태그 필터 */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
          { GAME_TAGS.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onClick={() => setSelectedTag(tag)}
              sx={{
                cursor: 'pointer',
                fontWeight: 600,
                bgcolor: selectedTag === tag ? 'rgba(0,245,255,0.15)' : 'transparent',
                color: selectedTag === tag ? '#00f5ff' : 'text.secondary',
                border: selectedTag === tag ? '1px solid #00f5ff' : '1px solid rgba(255,255,255,0.1)',
                '&:hover': { bgcolor: 'rgba(0,245,255,0.1)', color: '#00f5ff' },
              }}
            />
          )) }
        </Box>

        {/* 게시물 목록 */}
        { loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: '#00f5ff' }} />
          </Box>
        ) : posts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant='body1' sx={{ color: 'text.secondary', mb: 3 }}>
              아직 게시물이 없습니다. 첫 번째 글을 작성해보세요!
            </Typography>
            { user && (
              <Button variant='contained' onClick={() => navigate('/posts/create')}>
                글쓰기
              </Button>
            ) }
          </Box>
        ) : (
          <Grid container spacing={2}>
            { posts.map((post) => (
              <Grid key={post.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <PostCard post={post} />
              </Grid>
            )) }
          </Grid>
        ) }
      </Container>

      {/* 모바일 글쓰기 FAB */}
      { user && (
        <Fab
          color='primary'
          onClick={() => navigate('/posts/create')}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            bgcolor: '#00f5ff',
            color: '#000',
            '&:hover': { bgcolor: '#6effff', boxShadow: '0 0 20px rgba(0,245,255,0.6)' },
          }}
        >
          <AddIcon />
        </Fab>
      ) }
    </Box>
  );
}

export default PostListPage;
