import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { supabase } from '../../utils/supabase';

/**
 * PostCard 컴포넌트
 * 피드에서 사용되는 게시물 카드
 *
 * Props:
 * @param {object} post - 게시물 데이터 (id, caption, image_url, likes_count, region, themes, sns_users) [Required]
 * @param {object} currentUser - 현재 로그인한 사용자 [Required]
 * @param {boolean} isLiked - 현재 사용자가 좋아요 눌렀는지 여부 [Optional, 기본값: false]
 * @param {boolean} isBookmarked - 북마크 여부 [Optional, 기본값: false]
 * @param {function} onLikeToggle - 좋아요 토글 콜백 [Optional]
 *
 * Example usage:
 * <PostCard post={postData} currentUser={user} isLiked={false} />
 */
function PostCard({ post, currentUser, isLiked = false, isBookmarked = false, onLikeToggle }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(isLiked);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const author = post.sns_users;

  /** 좋아요 토글 */
  const handleLike = async (e) => {
    e.stopPropagation();
    if (!currentUser) return;

    const newLiked = !liked;
    setLiked(newLiked);
    setLikesCount((prev) => newLiked ? prev + 1 : prev - 1);

    if (newLiked) {
      await supabase.from('sns_likes').insert({ post_id: post.id, user_id: currentUser.id });
      await supabase.from('sns_posts').update({ likes_count: likesCount + 1 }).eq('id', post.id);
    } else {
      await supabase.from('sns_likes').delete().match({ post_id: post.id, user_id: currentUser.id });
      await supabase.from('sns_posts').update({ likes_count: likesCount - 1 }).eq('id', post.id);
    }

    onLikeToggle && onLikeToggle(post.id, newLiked);
  };

  /** 북마크 토글 */
  const handleBookmark = async (e) => {
    e.stopPropagation();
    if (!currentUser) return;

    const newBookmarked = !bookmarked;
    setBookmarked(newBookmarked);

    if (newBookmarked) {
      await supabase.from('sns_bookmarks').insert({ post_id: post.id, user_id: currentUser.id });
    } else {
      await supabase.from('sns_bookmarks').delete().match({ post_id: post.id, user_id: currentUser.id });
    }
  };

  /** 날짜 포맷 */
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - d) / 1000);
    if (diff < 60) return '방금 전';
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return `${Math.floor(diff / 86400)}일 전`;
  };

  return (
    <Card
      sx={{
        mb: 1.5,
        cursor: 'pointer',
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: '0 4px 20px rgba(135,206,235,0.25)' },
      }}
      onClick={ () => navigate(`/post/${post.id}`) }
    >
      {/* 헤더: 프로필 */}
      <CardHeader
        avatar={
          <Avatar
            src={ author?.avatar_url || '' }
            sx={{ bgcolor: '#87CEEB', cursor: 'pointer' }}
            onClick={ (e) => {
              e.stopPropagation();
              navigate(`/user/${author?.username}`);
            }}
          >
            { author?.display_name?.[0] || '?' }
          </Avatar>
        }
        title={
          <Typography
            variant='subtitle2'
            sx={{ cursor: 'pointer' }}
            onClick={ (e) => {
              e.stopPropagation();
              navigate(`/user/${author?.username}`);
            }}
          >
            { author?.display_name || '알 수 없음' }
          </Typography>
        }
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant='caption' sx={{ color: '#999' }}>
              @{ author?.username || '' }
            </Typography>
            <Typography variant='caption' sx={{ color: '#ccc' }}>·</Typography>
            <Typography variant='caption' sx={{ color: '#999' }}>
              { formatDate(post.created_at) }
            </Typography>
          </Box>
        }
        sx={{ pb: 1 }}
      />

      {/* 이미지 */}
      { post.image_url && (
        <CardMedia
          component='img'
          image={ post.image_url }
          alt='여행 사진'
          sx={{ maxHeight: 400, objectFit: 'cover' }}
        />
      ) }

      {/* 태그 */}
      { (post.region || (post.themes && post.themes.length > 0)) && (
        <CardContent sx={{ py: 1, pb: '8px !important' }}>
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            { post.region && (
              <Chip
                label={ post.region }
                size='small'
                sx={{ bgcolor: '#E8F4FA', color: '#5BA8C9', fontSize: '0.7rem' }}
              />
            ) }
            { post.themes?.map((theme) => (
              <Chip
                key={ theme }
                label={ theme }
                size='small'
                sx={{ bgcolor: '#F0FFF0', color: '#6BC86B', fontSize: '0.7rem' }}
              />
            )) }
          </Box>
        </CardContent>
      ) }

      {/* 캡션 */}
      <CardContent sx={{ py: 0.5, pb: '4px !important' }}>
        <Typography variant='body2' sx={{ color: '#444', lineHeight: 1.6 }}>
          { post.caption }
        </Typography>
      </CardContent>

      {/* 액션: 좋아요/댓글/북마크 */}
      <CardActions sx={{ px: 2, py: 0.5 }}>
        <IconButton size='small' onClick={ handleLike } sx={{ color: liked ? '#FF6B6B' : '#999' }}>
          { liked ? <FavoriteIcon fontSize='small' /> : <FavoriteBorderIcon fontSize='small' /> }
        </IconButton>
        <Typography variant='caption' sx={{ color: '#999', mr: 1 }}>{ likesCount }</Typography>

        <IconButton
          size='small'
          sx={{ color: '#999' }}
          onClick={ (e) => { e.stopPropagation(); navigate(`/post/${post.id}`); } }
        >
          <ChatBubbleOutlineIcon fontSize='small' />
        </IconButton>
        <Typography variant='caption' sx={{ color: '#999', mr: 1 }}>{ post.comments_count || 0 }</Typography>

        <Box sx={{ flex: 1 }} />
        <IconButton size='small' onClick={ handleBookmark } sx={{ color: bookmarked ? '#87CEEB' : '#999' }}>
          { bookmarked ? <BookmarkIcon fontSize='small' /> : <BookmarkBorderIcon fontSize='small' /> }
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default PostCard;
