import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import CardMedia from '@mui/material/CardMedia';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TopBar from '../components/common/TopBar';
import { supabase } from '../utils/supabase';

const REGIONS = ['전체', '국내', '해외'];
const THEMES = ['힐링', '맛집', '데이트', '혼자여행', '가족여행', '액티비티', '문화'];

/**
 * PostListPage 컴포넌트
 * 격자형 3열 게시글 탐색 + 지역/테마 필터 + 검색
 *
 * Props:
 * @param {object} user - 현재 로그인 사용자 [Required]
 *
 * Example usage:
 * <PostListPage user={user} />
 */
function PostListPage({ user }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [selectedThemes, setSelectedThemes] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, [selectedRegion, selectedThemes]);

  /** 게시글 목록 조회 */
  const fetchPosts = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('sns_posts')
        .select('id, image_url, likes_count, caption, region, themes')
        .order('created_at', { ascending: false });

      if (selectedRegion !== '전체') query = query.eq('region', selectedRegion);
      if (selectedThemes.length > 0) query = query.overlaps('themes', selectedThemes);

      const { data } = await query;
      if (data) setPosts(data);
    } catch (err) {
      console.error('게시글 목록 로드 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  /** 테마 토글 */
  const toggleTheme = (theme) => {
    setSelectedThemes((prev) =>
      prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme]
    );
  };

  /** 검색 필터 */
  const filteredPosts = posts.filter((p) =>
    !search || p.caption?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#F8FFFE' }}>
      <TopBar title='탐색' isShowSearch={ false } isShowNotification={ false } />

      <Box sx={{ pt: '64px', pb: '70px' }}>
        <Container maxWidth='sm' sx={{ px: { xs: 1, sm: 2 } }}>
          {/* 검색 */}
          <Box sx={{ py: 1.5 }}>
            <TextField
              placeholder='여행지나 키워드 검색...'
              fullWidth
              value={ search }
              onChange={ (e) => setSearch(e.target.value) }
              variant='outlined'
              size='small'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon sx={{ color: '#aaa', fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 20,
                  bgcolor: '#fff',
                  '& fieldset': { borderColor: '#E8F4FA' },
                },
              }}
            />
          </Box>

          {/* 지역 필터 */}
          <Box sx={{ display: 'flex', gap: 1, py: 1, overflowX: 'auto' }}>
            { REGIONS.map((region) => (
              <Chip
                key={ region }
                label={ region }
                onClick={ () => setSelectedRegion(region) }
                sx={{
                  flexShrink: 0,
                  bgcolor: selectedRegion === region ? '#87CEEB' : '#fff',
                  color: selectedRegion === region ? '#fff' : '#555',
                  border: '1px solid #E8F4FA',
                  fontWeight: selectedRegion === region ? 700 : 400,
                  '&:hover': { bgcolor: selectedRegion === region ? '#5BA8C9' : '#F8FFFE' },
                }}
              />
            )) }
          </Box>

          {/* 테마 필터 */}
          <Box sx={{ display: 'flex', gap: 0.8, py: 0.5, overflowX: 'auto', mb: 1 }}>
            { THEMES.map((theme) => (
              <Chip
                key={ theme }
                label={ `#${theme}` }
                size='small'
                onClick={ () => toggleTheme(theme) }
                sx={{
                  flexShrink: 0,
                  bgcolor: selectedThemes.includes(theme) ? '#98FB98' : 'transparent',
                  color: selectedThemes.includes(theme) ? '#333' : '#888',
                  border: '1px solid',
                  borderColor: selectedThemes.includes(theme) ? '#98FB98' : '#ddd',
                  fontSize: '0.75rem',
                }}
              />
            )) }
          </Box>

          {/* 격자형 3열 게시글 */}
          { loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress sx={{ color: '#87CEEB' }} />
            </Box>
          ) : filteredPosts.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant='h2' sx={{ mb: 1 }}>🔍</Typography>
              <Typography variant='body1' sx={{ color: '#888' }}>게시글이 없습니다.</Typography>
            </Box>
          ) : (
            <Grid container spacing={ 0.5 }>
              { filteredPosts.map((post) => (
                <Grid size={ 4 } key={ post.id }>
                  <Box
                    sx={{
                      position: 'relative',
                      aspectRatio: '1',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      '&:hover .overlay': { opacity: 1 },
                    }}
                    onClick={ () => navigate(`/post/${post.id}`) }
                  >
                    <CardMedia
                      component='img'
                      image={
                        post.image_url ||
                        `https://picsum.photos/seed/${post.id}/300/300`
                      }
                      alt={ post.caption }
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {/* 호버 오버레이 */}
                    <Box
                      className='overlay'
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        bgcolor: 'rgba(0,0,0,0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        opacity: 0,
                        transition: 'opacity 0.2s',
                      }}
                    >
                      <FavoriteIcon sx={{ color: '#fff', fontSize: 18 }} />
                      <Typography variant='body2' sx={{ color: '#fff', fontWeight: 600 }}>
                        { post.likes_count || 0 }
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              )) }
            </Grid>
          ) }
        </Container>
      </Box>
    </Box>
  );
}

export default PostListPage;
