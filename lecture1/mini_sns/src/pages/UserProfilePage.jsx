import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { supabase } from '../utils/supabase';

/**
 * UserProfilePage 컴포넌트
 * 다른 사용자의 프로필 페이지 (게시물 목록 + 팔로우 버튼)
 *
 * Props:
 * @param {object} user - 현재 로그인 사용자 [Required]
 *
 * Example usage:
 * <UserProfilePage user={user} />
 */
function UserProfilePage({ user }) {
  const { username } = useParams();
  const navigate = useNavigate();
  const [targetProfile, setTargetProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (username) fetchProfile();
  }, [username]);

  /** 대상 사용자 프로필 + 게시물 조회 */
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const { data: profileData } = await supabase
        .from('sns_users')
        .select('*')
        .eq('username', username)
        .single();

      if (profileData) {
        setTargetProfile(profileData);

        const { data: postsData } = await supabase
          .from('sns_posts')
          .select('id, image_url, likes_count, caption')
          .eq('user_id', profileData.id)
          .order('created_at', { ascending: false });

        if (postsData) setPosts(postsData);

        /** 팔로우 여부 확인 */
        const { data: followData } = await supabase
          .from('sns_follows')
          .select('id')
          .match({ follower_id: user.id, following_id: profileData.id })
          .single();

        setIsFollowing(!!followData);
      }
    } catch (err) {
      console.error('프로필 로드 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  /** 팔로우/언팔로우 토글 */
  const handleFollowToggle = async () => {
    if (!targetProfile) return;

    const newFollowing = !isFollowing;
    setIsFollowing(newFollowing);

    if (newFollowing) {
      await supabase.from('sns_follows').insert({
        follower_id: user.id,
        following_id: targetProfile.id,
      });
      await supabase.from('sns_users')
        .update({ followers_count: (targetProfile.followers_count || 0) + 1 })
        .eq('id', targetProfile.id);
    } else {
      await supabase.from('sns_follows').delete().match({
        follower_id: user.id,
        following_id: targetProfile.id,
      });
      await supabase.from('sns_users')
        .update({ followers_count: Math.max(0, (targetProfile.followers_count || 0) - 1) })
        .eq('id', targetProfile.id);
    }

    setTargetProfile((prev) => ({
      ...prev,
      followers_count: newFollowing
        ? (prev.followers_count || 0) + 1
        : Math.max(0, (prev.followers_count || 0) - 1),
    }));
  };

  const isMyProfile = targetProfile?.id === user?.id;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress sx={{ color: '#87CEEB' }} />
      </Box>
    );
  }

  if (!targetProfile) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography>사용자를 찾을 수 없습니다.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#F8FFFE', pb: '70px' }}>
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
          px: 1,
          py: 0.5,
          minHeight: 56,
        }}
      >
        <IconButton onClick={ () => navigate(-1) }>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant='subtitle1' sx={{ fontWeight: 700, ml: 1 }}>
          @{ targetProfile.username }
        </Typography>
      </Box>

      <Container maxWidth='sm' sx={{ px: { xs: 1, sm: 2 } }}>
        {/* 프로필 영역 */}
        <Box sx={{ bgcolor: '#fff', borderRadius: 3, p: 2.5, mb: 1.5, mt: 1, boxShadow: '0 2px 12px rgba(135,206,235,0.1)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar
              src={ targetProfile.avatar_url || '' }
              sx={{ width: 72, height: 72, bgcolor: '#87CEEB', fontSize: '1.8rem' }}
            >
              { targetProfile.display_name?.[0] || '?' }
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant='h6' sx={{ fontWeight: 700 }}>{ targetProfile.display_name }</Typography>
              <Typography variant='body2' sx={{ color: '#888' }}>@{ targetProfile.username }</Typography>
            </Box>
          </Box>

          { targetProfile.bio && (
            <Typography variant='body2' sx={{ color: '#555', mb: 2, lineHeight: 1.6 }}>
              { targetProfile.bio }
            </Typography>
          ) }

          {/* 통계 */}
          <Box sx={{ display: 'flex', justifyContent: 'space-around', py: 1.5, borderTop: '1px solid #F0F8FF', mb: 2 }}>
            { [
              { label: '게시물', value: posts.length },
              { label: '팔로워', value: targetProfile.followers_count || 0 },
              { label: '팔로잉', value: targetProfile.following_count || 0 },
            ].map(({ label, value }) => (
              <Box key={ label } sx={{ textAlign: 'center' }}>
                <Typography variant='h6' sx={{ fontWeight: 700 }}>{ value }</Typography>
                <Typography variant='caption' sx={{ color: '#888' }}>{ label }</Typography>
              </Box>
            )) }
          </Box>

          {/* 팔로우 버튼 */}
          { !isMyProfile && (
            <Button
              variant={ isFollowing ? 'outlined' : 'contained' }
              color='primary'
              fullWidth
              onClick={ handleFollowToggle }
              sx={{ borderRadius: 20 }}
            >
              { isFollowing ? '팔로잉' : '팔로우' }
            </Button>
          ) }
        </Box>

        {/* 게시물 격자 */}
        <Box sx={{ bgcolor: '#fff', borderRadius: 3, p: 0.5 }}>
          { posts.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant='body2' sx={{ color: '#bbb' }}>아직 게시물이 없습니다.</Typography>
            </Box>
          ) : (
            <Grid container spacing={ 0.5 }>
              { posts.map((post) => (
                <Grid size={ 4 } key={ post.id }>
                  <Box
                    sx={{ aspectRatio: '1', cursor: 'pointer', overflow: 'hidden', borderRadius: 1 }}
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
  );
}

export default UserProfilePage;
