import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import PostCard from '../components/landing/PostCard';
import useAuth from '../hooks/useAuth';
import { supabase } from '../utils/supabase';
import { SAMPLE_POSTS } from '../data/samplePosts';

const CATEGORIES = [
  { label: '전체', value: '' },
  { label: '리뷰', value: 'review' },
  { label: '공략', value: 'guide' },
  { label: 'Q&A', value: 'qna' },
  { label: '자유게시판', value: 'general' },
];

const GAME_LIST = ['전체', '롤', '오버워치', '배틀그라운드', '발로란트', '종합게임'];

const GAME_COLORS = {
  '전체': '#a0a0cc',
  '롤': '#00f5ff',
  '오버워치': '#ff6b00',
  '배틀그라운드': '#39ff14',
  '발로란트': '#ff2045',
  '종합게임': '#bf00ff',
};

function PostListPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGame, setSelectedGame] = useState('전체');

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory, selectedGame]);

  async function fetchPosts() {
    setLoading(true);
    let query = supabase
      .from('posts')
      .select(`
        id, title, game_name, category, likes_count, created_at, user_id,
        users(nickname),
        comments(count)
      `)
      .order('created_at', { ascending: false });

    if (selectedCategory) {
      query = query.eq('category', selectedCategory);
    }
    if (selectedGame !== '전체') {
      query = query.eq('game_name', selectedGame);
    }

    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      const formatted = data.map((p) => ({
        ...p,
        comment_count: p.comments?.[0]?.count || 0,
      }));
      setPosts(formatted);
    } else {
      // 실제 데이터가 없으면 샘플 데이터 사용 (포트폴리오 데모용)
      let filtered = SAMPLE_POSTS;
      if (selectedCategory) {
        filtered = filtered.filter((p) => p.category === selectedCategory);
      }
      if (selectedGame !== '전체') {
        filtered = filtered.filter((p) => p.game_name === selectedGame);
      }
      setPosts(filtered);
    }
    setLoading(false);
  }

  function handleCategoryChange(_, newValue) {
    setSelectedCategory(newValue);
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', background: '#060610', pb: 8 }}>
      {/* 히어로 배너 */}
      <Box
        sx={{
          background: 'linear-gradient(180deg, rgba(0,245,255,0.05) 0%, transparent 100%)',
          borderBottom: '1px solid rgba(0,245,255,0.1)',
          py: { xs: 3, md: 5 },
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

      {/* 카테고리 탭 (상단 고정) */}
      <Box
        sx={{
          borderBottom: '1px solid rgba(0,245,255,0.1)',
          bgcolor: 'rgba(14,14,31,0.9)',
          backdropFilter: 'blur(8px)',
          position: 'sticky',
          top: 56,
          zIndex: 10,
        }}
      >
        <Container maxWidth='lg'>
          <Tabs
            value={selectedCategory}
            onChange={handleCategoryChange}
            textColor='inherit'
            variant='scrollable'
            scrollButtons='auto'
            sx={{
              '& .MuiTabs-indicator': { bgcolor: '#00f5ff', height: 2 },
              '& .MuiTab-root': {
                color: '#a0a0cc',
                fontWeight: 600,
                fontSize: { xs: '0.8rem', md: '0.9rem' },
                minWidth: { xs: 70, md: 90 },
                letterSpacing: '0.02em',
                '&.Mui-selected': { color: '#00f5ff' },
                '&:hover': { color: '#e0e0ff' },
              },
            }}
          >
            { CATEGORIES.map((cat) => (
              <Tab key={cat.value} label={cat.label} value={cat.value} />
            )) }
          </Tabs>
        </Container>
      </Box>

      {/* 본문: 좌측 게임 사이드바 + 우측 게시물 */}
      <Container maxWidth='lg' sx={{ pt: 4, px: { xs: 2, md: 3 } }}>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>

          {/* 좌측 게임 필터 사이드바 (데스크톱) */}
          <Box
            sx={{
              width: 180,
              flexShrink: 0,
              display: { xs: 'none', md: 'block' },
              position: 'sticky',
              top: 112,
            }}
          >
            <Box
              sx={{
                bgcolor: 'rgba(14,14,31,0.9)',
                border: '1px solid rgba(0,245,255,0.12)',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              {/* 사이드바 헤더 */}
              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  borderBottom: '1px solid rgba(0,245,255,0.1)',
                  bgcolor: 'rgba(0,245,255,0.05)',
                }}
              >
                <Typography
                  variant='caption'
                  sx={{
                    color: '#00f5ff',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontFamily: '"Rajdhani", sans-serif',
                  }}
                >
                  게임
                </Typography>
              </Box>

              {/* 게임 목록 */}
              { GAME_LIST.map((game) => {
                const isSelected = selectedGame === game;
                const color = GAME_COLORS[game] || '#a0a0cc';
                return (
                  <Box
                    key={game}
                    onClick={() => setSelectedGame(game)}
                    sx={{
                      px: 2,
                      py: 1.2,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      bgcolor: isSelected ? `${color}18` : 'transparent',
                      borderLeft: isSelected ? `3px solid ${color}` : '3px solid transparent',
                      transition: 'all 0.15s ease',
                      '&:hover': {
                        bgcolor: `${color}10`,
                        borderLeftColor: color,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        bgcolor: isSelected ? color : 'rgba(160,160,204,0.35)',
                        flexShrink: 0,
                        boxShadow: isSelected ? `0 0 6px ${color}` : 'none',
                        transition: 'all 0.15s ease',
                      }}
                    />
                    <Typography
                      variant='body2'
                      sx={{
                        color: isSelected ? color : '#a0a0cc',
                        fontWeight: isSelected ? 700 : 400,
                        fontSize: '0.85rem',
                        transition: 'color 0.15s ease',
                      }}
                    >
                      { game }
                    </Typography>
                  </Box>
                );
              }) }
            </Box>
          </Box>

          {/* 본문 우측 영역 */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* 모바일 게임 필터 (수평 스크롤 칩) */}
            <Box
              sx={{
                display: { xs: 'flex', md: 'none' },
                gap: 1,
                overflowX: 'auto',
                pb: 1.5,
                mb: 2,
                '&::-webkit-scrollbar': { display: 'none' },
              }}
            >
              { GAME_LIST.map((game) => {
                const isSelected = selectedGame === game;
                const color = GAME_COLORS[game] || '#a0a0cc';
                return (
                  <Box
                    key={game}
                    onClick={() => setSelectedGame(game)}
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      flexShrink: 0,
                      borderRadius: 1,
                      cursor: 'pointer',
                      border: isSelected ? `1px solid ${color}` : '1px solid rgba(255,255,255,0.1)',
                      bgcolor: isSelected ? `${color}20` : 'transparent',
                      color: isSelected ? color : '#a0a0cc',
                      fontSize: '0.8rem',
                      fontWeight: isSelected ? 700 : 400,
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    { game }
                  </Box>
                );
              }) }
            </Box>

            {/* 글쓰기 버튼 + 게시물 수 */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant='body2' sx={{ color: '#a0a0cc' }}>
                { loading ? '' : `게시물 ${posts.length}개` }
              </Typography>
              <Button
                variant='contained'
                size='small'
                startIcon={<AddIcon />}
                onClick={() => navigate(user ? '/posts/create' : '/login')}
                sx={{
                  bgcolor: '#00f5ff',
                  color: '#000',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  '&:hover': {
                    bgcolor: '#6effff',
                    boxShadow: '0 0 14px rgba(0,245,255,0.5)',
                  },
                }}
              >
                글쓰기
              </Button>
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
                  <Grid key={post.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                    <PostCard post={post} />
                  </Grid>
                )) }
              </Grid>
            ) }
          </Box>
        </Box>
      </Container>

      {/* 글쓰기 FAB */}
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
