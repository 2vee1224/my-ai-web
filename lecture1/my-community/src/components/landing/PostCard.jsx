import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

/**
 * PostCard 컴포넌트 - 게시물 목록에서 사용하는 카드
 *
 * Props:
 * @param {object} post - 게시물 데이터 [Required]
 * @param {number} post.id - 게시물 ID
 * @param {string} post.title - 게시물 제목
 * @param {string} post.game_name - 게임 태그
 * @param {number} post.likes - 좋아요 수
 * @param {string} post.created_at - 작성일
 * @param {object} post.profiles - 작성자 프로필
 * @param {number} post.comment_count - 댓글 수
 *
 * Example usage:
 * <PostCard post={postData} />
 */
function PostCard({ post }) {
  const navigate = useNavigate();

  const gameTagColors = {
    '롤': '#00f5ff',
    '오버워치': '#ff6b00',
    '배틀그라운드': '#39ff14',
    '발로란트': '#ff2045',
    '종합게임': '#bf00ff',
  };

  const tagColor = gameTagColors[post.game_name] || '#a0a0cc';

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = (now - date) / 1000;
    if (diff < 60) return '방금 전';
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return date.toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' });
  }

  return (
    <Card
      sx={{
        background: 'rgba(14, 14, 31, 0.9)',
        border: '1px solid rgba(0, 245, 255, 0.1)',
        borderRadius: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          border: `1px solid ${tagColor}`,
          boxShadow: `0 0 20px ${tagColor}30`,
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardActionArea onClick={() => navigate(`/posts/${post.id}`)}>
        <CardContent sx={{ p: 2.5 }}>
          {/* 게임 태그 */}
          <Chip
            label={post.game_name}
            size='small'
            sx={{
              bgcolor: `${tagColor}20`,
              color: tagColor,
              border: `1px solid ${tagColor}60`,
              fontWeight: 700,
              fontSize: '0.7rem',
              mb: 1,
            }}
          />

          {/* 제목 */}
          <Typography
            variant='body1'
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              mb: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.5,
            }}
          >
            { post.title }
          </Typography>

          {/* 메타 정보 */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant='body2' sx={{ color: 'text.secondary', fontWeight: 500 }}>
              { post.users?.nickname || '익명' }
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <FavoriteIcon sx={{ fontSize: 13, color: '#ff6b6b' }} />
                <Typography variant='body2' sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                  { post.likes_count }
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CommentIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                <Typography variant='body2' sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                  { post.comment_count || 0 }
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AccessTimeIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                <Typography variant='body2' sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                  { formatDate(post.created_at) }
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PostCard;
