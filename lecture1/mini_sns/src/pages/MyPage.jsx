import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import TopBar from '../components/common/TopBar';
import { supabase } from '../utils/supabase';

/**
 * MyPage 컴포넌트
 * 마이페이지 (프로필 + 내 게시물/스크랩 탭)
 *
 * Props:
 * @param {object} user - 현재 로그인 사용자 [Required]
 * @param {object} profile - 현재 사용자 프로필 [Required]
 * @param {function} onSignOut - 로그아웃 콜백 [Required]
 *
 * Example usage:
 * <MyPage user={user} profile={profile} onSignOut={signOut} />
 */
function MyPage({ user, profile, onSignOut }) {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [myPosts, setMyPosts] = useState([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyContent();
  }, [user]);

  /** 내 게시물 + 북마크 조회 */
  const fetchMyContent = async () => {
    setLoading(true);
    try {
      const { data: postsData } = await supabase
        .from('sns_posts')
        .select('id, image_url, likes_count, caption')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (postsData) setMyPosts(postsData);

      const { data: bookmarksData } = await supabase
        .from('sns_bookmarks')
        .select('sns_posts(id, image_url, likes_count, caption)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (bookmarksData) setBookmarkedPosts(bookmarksData.map((b) => b.sns_posts).filter(Boolean));
    } catch (err) {
      console.error('내 컨텐츠 로드 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  const displayPosts = tabValue === 0 ? myPosts : bookmarkedPosts;

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#F8FFFE' }}>
      <TopBar isShowSearch={ false } isShowNotification={ true } />

      <Box sx={{ pt: '64px', pb: '70px' }}>
        <Container maxWidth='sm' sx={{ px: { xs: 1, sm: 2 } }}>
          {/* 프로필 영역 */}
          <Box sx={{ bgcolor: '#fff', borderRadius: 3, p: 2.5, mb: 1.5, boxShadow: '0 2px 12px rgba(135,206,235,0.1)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Avatar
                src={ profile?.avatar_url || '' }
                sx={{ width: 72, height: 72, bgcolor: '#87CEEB', fontSize: '1.8rem' }}
              >
                { profile?.display_name?.[0] || user.email?.[0]?.toUpperCase() || '?' }
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant='h6' sx={{ fontWeight: 700 }}>
                  { profile?.display_name || '이름 없음' }
                </Typography>
                <Typography variant='body2' sx={{ color: '#888' }}>
                  @{ profile?.username || '' }
                </Typography>
              </Box>
              <IconButton onClick={ () => navigate('/edit-profile') } sx={{ color: '#888' }}>
                <SettingsIcon />
              </IconButton>
            </Box>

            {/* 소개글 */}
            { profile?.bio && (
              <Typography variant='body2' sx={{ color: '#555', mb: 2, lineHeight: 1.6 }}>
                { profile.bio }
              </Typography>
            ) }

            {/* 통계 */}
            <Box sx={{ display: 'flex', justifyContent: 'space-around', py: 1, borderTop: '1px solid #F0F8FF' }}>
              { [
                { label: '게시물', value: profile?.posts_count || 0 },
                { label: '팔로워', value: profile?.followers_count || 0 },
                { label: '팔로잉', value: profile?.following_count || 0 },
              ].map(({ label, value }) => (
                <Box key={ label } sx={{ textAlign: 'center' }}>
                  <Typography variant='h6' sx={{ fontWeight: 700, color: '#333' }}>{ value }</Typography>
                  <Typography variant='caption' sx={{ color: '#888' }}>{ label }</Typography>
                </Box>
              )) }
            </Box>

            {/* 프로필 수정 */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                variant='outlined'
                size='small'
                onClick={ () => navigate('/edit-profile') }
                sx={{ borderColor: '#87CEEB', color: '#5BA8C9', borderRadius: 20, px: 3, fontSize: '0.8rem' }}
              >
                프로필 수정
              </Button>
            </Box>
          </Box>

          {/* 탭: 내 게시물 / 스크랩 */}
          <Box sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 12px rgba(135,206,235,0.1)' }}>
            <Tabs
              value={ tabValue }
              onChange={ (_e, v) => setTabValue(v) }
              variant='fullWidth'
              sx={{
                '& .MuiTab-root': { color: '#aaa' },
                '& .Mui-selected': { color: '#5BA8C9' },
                '& .MuiTabs-indicator': { bgcolor: '#87CEEB' },
              }}
            >
              <Tab label={ `게시물 ${myPosts.length}` } />
              <Tab label={ `스크랩 ${bookmarkedPosts.length}` } />
            </Tabs>

            { loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                <CircularProgress sx={{ color: '#87CEEB' }} />
              </Box>
            ) : displayPosts.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography variant='body1' sx={{ color: '#bbb' }}>
                  { tabValue === 0 ? '아직 게시물이 없습니다.' : '스크랩한 게시물이 없습니다.' }
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={ 0.5 } sx={{ p: 0.5 }}>
                { displayPosts.map((post) => post && (
                  <Grid size={ 4 } key={ post.id }>
                    <Box
                      sx={{
                        aspectRatio: '1',
                        cursor: 'pointer',
                        overflow: 'hidden',
                        borderRadius: 1,
                      }}
                      onClick={ () => navigate(`/post/${post.id}`) }
                    >
                      <CardMedia
                        component='img'
                        image={ post.image_url || `https://picsum.photos/seed/${post.id}/300/300` }
                        alt={ post.caption }
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Box>
                  </Grid>
                )) }
              </Grid>
            ) }
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default MyPage;
