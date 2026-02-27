import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import TopBar from '../components/common/TopBar';
import PostCard from '../components/ui/PostCard';
import { supabase } from '../utils/supabase';

/**
 * HomePage 컴포넌트
 * 메인 피드 페이지 - 팔로잉 + 추천 게시글 표시
 *
 * Props:
 * @param {object} user - 현재 로그인 사용자 [Required]
 * @param {object} profile - 현재 사용자 프로필 [Required]
 *
 * Example usage:
 * <HomePage user={user} profile={profile} />
 */
function HomePage({ user, profile }) {
  const [posts, setPosts] = useState([]);
  const [likedSet, setLikedSet] = useState(new Set());
  const [bookmarkedSet, setBookmarkedSet] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeed();
  }, [user]);

  /** 피드 게시글 로드 */
  const fetchFeed = async () => {
    setLoading(true);
    try {
      const { data: postsData } = await supabase
        .from('sns_posts')
        .select('*, sns_users(id, username, display_name, avatar_url)')
        .order('created_at', { ascending: false })
        .limit(30);

      if (postsData) setPosts(postsData);

      /** 현재 사용자 좋아요 목록 */
      const { data: likesData } = await supabase
        .from('sns_likes')
        .select('post_id')
        .eq('user_id', user.id);

      if (likesData) setLikedSet(new Set(likesData.map((l) => l.post_id)));

      /** 현재 사용자 북마크 목록 */
      const { data: bookmarksData } = await supabase
        .from('sns_bookmarks')
        .select('post_id')
        .eq('user_id', user.id);

      if (bookmarksData) setBookmarkedSet(new Set(bookmarksData.map((b) => b.post_id)));
    } catch (err) {
      console.error('피드 로드 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#F8FFFE' }}>
      <TopBar />

      {/* 상단 바 높이만큼 여백 + 하단 바 여백 */}
      <Box sx={{ pt: '64px', pb: '70px' }}>
        <Container maxWidth='sm' sx={{ px: { xs: 1, sm: 2 } }}>
          {/* 인사말 */}
          <Box sx={{ py: 2 }}>
            <Typography variant='body2' sx={{ color: '#888' }}>
              { profile?.display_name ? `${profile.display_name}님, 안녕하세요! 👋` : '안녕하세요! 👋' }
            </Typography>
            <Typography variant='h6' sx={{ fontWeight: 700, color: '#333' }}>
              오늘은 어떤 여행을 떠날까요? ✈️
            </Typography>
          </Box>

          <Divider sx={{ mb: 1.5, borderColor: '#E8F4FA' }} />

          {/* 피드 */}
          { loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress sx={{ color: '#87CEEB' }} />
            </Box>
          ) : posts.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant='h2' sx={{ mb: 1 }}>✈️</Typography>
              <Typography variant='body1' sx={{ color: '#888', mb: 0.5 }}>아직 게시물이 없습니다.</Typography>
              <Typography variant='body2' sx={{ color: '#aaa' }}>첫 번째 여행 이야기를 공유해보세요!</Typography>
            </Box>
          ) : (
            posts.map((post) => (
              <PostCard
                key={ post.id }
                post={ post }
                currentUser={ user }
                isLiked={ likedSet.has(post.id) }
                isBookmarked={ bookmarkedSet.has(post.id) }
              />
            ))
          ) }
        </Container>
      </Box>
    </Box>
  );
}

export default HomePage;
