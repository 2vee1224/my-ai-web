import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CommentSection from '../components/feed/CommentSection';
import { supabase } from '../utils/supabase';

/**
 * PostDetailPage 컴포넌트
 * 게시물 상세 페이지 (이미지 + 캡션 + 좋아요/북마크 + 댓글)
 *
 * Props:
 * @param {object} user - 현재 로그인 사용자 [Required]
 * @param {object} profile - 현재 사용자 프로필 [Required]
 *
 * Example usage:
 * <PostDetailPage user={user} profile={profile} />
 */
function PostDetailPage({ user, profile }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  /** 게시물 상세 + 좋아요/북마크 상태 조회 */
  const fetchPost = async () => {
    setLoading(true);
    try {
      const { data: postData } = await supabase
        .from('sns_posts')
        .select('*, sns_users(id, username, display_name, avatar_url)')
        .eq('id', id)
        .single();

      if (postData) {
        setPost(postData);
        setLikesCount(postData.likes_count || 0);
      }

      const { data: likeData } = await supabase
        .from('sns_likes')
        .select('id')
        .match({ post_id: id, user_id: user.id })
        .single();

      setLiked(!!likeData);

      const { data: bookmarkData } = await supabase
        .from('sns_bookmarks')
        .select('id')
        .match({ post_id: id, user_id: user.id })
        .single();

      setBookmarked(!!bookmarkData);
    } catch (err) {
      console.error('게시물 로드 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  /** 좋아요 토글 */
  const handleLike = async () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikesCount((prev) => newLiked ? prev + 1 : prev - 1);

    if (newLiked) {
      await supabase.from('sns_likes').insert({ post_id: id, user_id: user.id });
      await supabase.from('sns_posts').update({ likes_count: likesCount + 1 }).eq('id', id);
    } else {
      await supabase.from('sns_likes').delete().match({ post_id: id, user_id: user.id });
      await supabase.from('sns_posts').update({ likes_count: likesCount - 1 }).eq('id', id);
    }
  };

  /** 북마크 토글 */
  const handleBookmark = async () => {
    const newBookmarked = !bookmarked;
    setBookmarked(newBookmarked);

    if (newBookmarked) {
      await supabase.from('sns_bookmarks').insert({ post_id: id, user_id: user.id });
    } else {
      await supabase.from('sns_bookmarks').delete().match({ post_id: id, user_id: user.id });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress sx={{ color: '#87CEEB' }} />
      </Box>
    );
  }

  if (!post) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography>게시물을 찾을 수 없습니다.</Typography>
      </Box>
    );
  }

  const author = post.sns_users;

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
        <Typography variant='subtitle1' sx={{ fontWeight: 700, ml: 1 }}>게시물</Typography>
      </Box>

      <Container maxWidth='sm' sx={{ px: { xs: 0, sm: 2 } }}>
        {/* 작성자 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2 }}>
          <Avatar
            src={ author?.avatar_url || '' }
            sx={{ bgcolor: '#87CEEB', cursor: 'pointer' }}
            onClick={ () => navigate(`/user/${author?.username}`) }
          >
            { author?.display_name?.[0] || '?' }
          </Avatar>
          <Box>
            <Typography
              variant='subtitle2'
              sx={{ cursor: 'pointer', '&:hover': { color: '#5BA8C9' } }}
              onClick={ () => navigate(`/user/${author?.username}`) }
            >
              { author?.display_name }
            </Typography>
            <Typography variant='caption' sx={{ color: '#999' }}>@{ author?.username }</Typography>
          </Box>
        </Box>

        {/* 이미지 */}
        { post.image_url && (
          <CardMedia
            component='img'
            image={ post.image_url }
            alt='여행 사진'
            sx={{ width: '100%', maxHeight: 500, objectFit: 'cover' }}
          />
        ) }

        {/* 액션 버튼 */}
        <Box sx={{ display: 'flex', alignItems: 'center', px: 1.5, py: 1 }}>
          <IconButton onClick={ handleLike } sx={{ color: liked ? '#FF6B6B' : '#999' }}>
            { liked ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
          </IconButton>
          <Typography variant='body2' sx={{ color: '#666', mr: 2 }}>{ likesCount }</Typography>
          <Box sx={{ flex: 1 }} />
          <IconButton onClick={ handleBookmark } sx={{ color: bookmarked ? '#87CEEB' : '#999' }}>
            { bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon /> }
          </IconButton>
        </Box>

        {/* 태그 */}
        { (post.region || post.themes?.length > 0) && (
          <Box sx={{ display: 'flex', gap: 0.5, px: 2, pb: 1, flexWrap: 'wrap' }}>
            { post.region && (
              <Chip label={ post.region } size='small' sx={{ bgcolor: '#E8F4FA', color: '#5BA8C9' }} />
            ) }
            { post.themes?.map((theme) => (
              <Chip key={ theme } label={ `#${theme}` } size='small' sx={{ bgcolor: '#F0FFF0', color: '#6BC86B' }} />
            )) }
          </Box>
        ) }

        {/* 캡션 */}
        <Box sx={{ px: 2, pb: 2 }}>
          <Typography variant='body2' sx={{ color: '#333', lineHeight: 1.7 }}>{ post.caption }</Typography>
        </Box>

        {/* 댓글 섹션 */}
        <Box sx={{ bgcolor: '#fff', borderRadius: 2, mx: { xs: 0, sm: 0 } }}>
          <CommentSection postId={ id } currentUser={ user } currentProfile={ profile } />
        </Box>
      </Container>
    </Box>
  );
}

export default PostDetailPage;
