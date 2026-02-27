import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Alert from '@mui/material/Alert';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { supabase } from '../utils/supabase';

const THEMES = ['힐링', '맛집', '데이트', '혼자여행', '가족여행', '액티비티', '문화'];

const UNSPLASH_ACCESS_KEY = 'ix5TXvHH7a9o8jT4awwy-S2hG2sL9dIUiDW7w2qWMv4';

const UNSPLASH_KEYWORDS = [
  { label: '여행', query: 'travel' },
  { label: '바다', query: 'ocean beach' },
  { label: '산', query: 'mountain hiking' },
  { label: '카페', query: 'cafe coffee' },
  { label: '도시', query: 'city urban' },
  { label: '자연', query: 'nature landscape' },
  { label: '음식', query: 'food restaurant' },
  { label: '일몰', query: 'sunset golden hour' },
  { label: '거리', query: 'street alley' },
  { label: '숙소', query: 'hotel resort' },
];

/**
 * CreatePostPage 컴포넌트
 * 여행 게시물 작성 (이미지 URL 입력 또는 Unsplash 랜덤 선택)
 *
 * Props:
 * @param {object} user - 현재 로그인 사용자 [Required]
 * @param {object} profile - 현재 사용자 프로필 [Required]
 *
 * Example usage:
 * <CreatePostPage user={user} profile={profile} />
 */
function CreatePostPage({ user, profile }) {
  const navigate = useNavigate();
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [region, setRegion] = useState('국내');
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState('');

  /** 테마 토글 */
  const toggleTheme = (theme) => {
    setSelectedThemes((prev) =>
      prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme]
    );
  };

  /** Unsplash API로 랜덤 이미지 가져오기 */
  const getRandomUnsplashImage = async (query) => {
    setImageLoading(true);
    setImageUrl('');
    try {
      const res = await fetch(
        `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      if (!res.ok) throw new Error('Unsplash 요청 실패');
      const data = await res.json();
      setImageUrl(data.urls.regular);
    } catch (err) {
      console.error('Unsplash 이미지 로드 실패:', err);
      /** 실패 시 picsum 폴백 */
      const seed = Math.floor(Math.random() * 1000);
      setImageUrl(`https://picsum.photos/seed/${seed}/800/600`);
    } finally {
      setImageLoading(false);
    }
  };

  /** 게시물 작성 */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!caption.trim()) {
      setError('내용을 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: insertError } = await supabase.from('sns_posts').insert({
        user_id: user.id,
        caption: caption.trim(),
        image_url: imageUrl || null,
        region,
        themes: selectedThemes,
        likes_count: 0,
      });

      if (insertError) throw insertError;

      /** 게시물 수 업데이트 */
      await supabase
        .from('sns_users')
        .update({ posts_count: (profile?.posts_count || 0) + 1 })
        .eq('id', user.id);

      navigate('/');
    } catch (err) {
      setError('게시물 작성 중 오류가 발생했습니다.');
      console.error(err);
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
          <Typography variant='subtitle1' sx={{ fontWeight: 700, ml: 1 }}>새 게시물</Typography>
        </Box>
        <Button
          variant='contained'
          color='primary'
          size='small'
          onClick={ handleSubmit }
          disabled={ loading }
          sx={{ mr: 1 }}
        >
          { loading ? '공유 중...' : '공유' }
        </Button>
      </Box>

      <Container maxWidth='sm' sx={{ py: 2, px: { xs: 2, sm: 3 }, pb: '80px' }}>
        { error && <Alert severity='error' sx={{ mb: 2 }}>{ error }</Alert> }

        {/* 이미지 미리보기 */}
        <Box
          sx={{
            width: '100%',
            aspectRatio: '4/3',
            bgcolor: '#EFF8FF',
            borderRadius: 3,
            border: '2px dashed #87CEEB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          { imageLoading ? (
            <Box sx={{ textAlign: 'center', color: '#87CEEB' }}>
              <CircularProgress sx={{ color: '#87CEEB', mb: 1 }} />
              <Typography variant='body2' sx={{ color: '#aaa' }}>Unsplash에서 불러오는 중...</Typography>
            </Box>
          ) : imageUrl ? (
            <CardMedia
              component='img'
              image={ imageUrl }
              alt='미리보기'
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={ () => setImageUrl('') }
            />
          ) : (
            <Box sx={{ textAlign: 'center', color: '#aaa' }}>
              <AddPhotoAlternateIcon sx={{ fontSize: 48, mb: 1 }} />
              <Typography variant='body2'>이미지 URL을 입력하거나<br />아래 키워드로 Unsplash 이미지를 선택하세요</Typography>
            </Box>
          ) }
        </Box>

        {/* 이미지 URL 입력 */}
        <TextField
          label='이미지 URL (선택)'
          fullWidth
          value={ imageUrl }
          onChange={ (e) => setImageUrl(e.target.value) }
          placeholder='https://...'
          size='small'
          sx={{ mb: 1.5 }}
        />

        {/* Unsplash 랜덤 이미지 선택 */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
            <AutoAwesomeIcon sx={{ fontSize: 16, color: '#87CEEB' }} />
            <Typography variant='caption' sx={{ color: '#888', fontWeight: 600 }}>
              Unsplash 랜덤 이미지 선택
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
            { UNSPLASH_KEYWORDS.map((kw) => (
              <Chip
                key={ kw.label }
                label={ kw.label }
                size='small'
                disabled={ imageLoading }
                onClick={ () => getRandomUnsplashImage(kw.query) }
                sx={{
                  bgcolor: '#EFF8FF',
                  color: '#5BA8C9',
                  border: '1px solid #87CEEB',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#87CEEB', color: '#fff' },
                  '&.Mui-disabled': { opacity: 0.5 },
                }}
              />
            )) }
          </Box>
        </Box>

        {/* 캡션 */}
        <TextField
          label='여행 이야기를 공유해보세요'
          multiline
          rows={ 4 }
          fullWidth
          value={ caption }
          onChange={ (e) => setCaption(e.target.value) }
          required
          sx={{ mb: 2 }}
          inputProps={{ maxLength: 500 }}
          helperText={ `${caption.length}/500` }
        />

        {/* 지역 선택 */}
        <Box sx={{ mb: 2 }}>
          <Typography variant='body2' sx={{ color: '#666', mb: 1, fontWeight: 600 }}>지역</Typography>
          <ToggleButtonGroup
            value={ region }
            exclusive
            onChange={ (_e, val) => val && setRegion(val) }
            size='small'
          >
            <ToggleButton
              value='국내'
              sx={{
                px: 3,
                borderRadius: '20px !important',
                border: '1px solid #E8F4FA !important',
                '&.Mui-selected': { bgcolor: '#87CEEB', color: '#fff', borderColor: '#87CEEB !important' },
              }}
            >
              국내
            </ToggleButton>
            <ToggleButton
              value='해외'
              sx={{
                px: 3,
                ml: 1,
                borderRadius: '20px !important',
                border: '1px solid #E8F4FA !important',
                '&.Mui-selected': { bgcolor: '#87CEEB', color: '#fff', borderColor: '#87CEEB !important' },
              }}
            >
              해외
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* 테마 선택 */}
        <Box sx={{ mb: 3 }}>
          <Typography variant='body2' sx={{ color: '#666', mb: 1, fontWeight: 600 }}>테마 (복수 선택 가능)</Typography>
          <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
            { THEMES.map((theme) => (
              <Chip
                key={ theme }
                label={ `#${theme}` }
                onClick={ () => toggleTheme(theme) }
                sx={{
                  bgcolor: selectedThemes.includes(theme) ? '#98FB98' : 'transparent',
                  color: selectedThemes.includes(theme) ? '#333' : '#888',
                  border: '1px solid',
                  borderColor: selectedThemes.includes(theme) ? '#98FB98' : '#ddd',
                  fontWeight: selectedThemes.includes(theme) ? 700 : 400,
                  '&:hover': { bgcolor: selectedThemes.includes(theme) ? '#6BC86B' : '#F0FFF0' },
                }}
              />
            )) }
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default CreatePostPage;
