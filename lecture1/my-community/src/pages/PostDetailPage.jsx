import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteIcon from '@mui/icons-material/Delete';
import useAuth from '../hooks/useAuth';
import { supabase } from '../utils/supabase';
import { SAMPLE_POSTS } from '../data/samplePosts';

function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  useEffect(() => {
    if (user && post) {
      checkLiked();
    }
  }, [user, post]);

  async function fetchPost() {
    const { data } = await supabase
      .from('posts')
      .select('*, users(nickname)')
      .eq('id', id)
      .single();
    if (data) {
      setPost(data);
      setLikesCount(data.likes_count);
    } else {
      // 샘플 데이터에서 찾기 (포트폴리오 데모용)
      const samplePost = SAMPLE_POSTS.find((p) => String(p.id) === String(id));
      if (samplePost) {
        setPost(samplePost);
        setLikesCount(samplePost.likes_count);
      }
    }
    setLoading(false);
  }

  async function fetchComments() {
    const { data } = await supabase
      .from('comments')
      .select('*, users(nickname)')
      .eq('post_id', id)
      .is('parent_id', null)
      .order('created_at', { ascending: true });

    if (data) {
      const withReplies = await Promise.all(
        data.map(async (comment) => {
          const { data: replies } = await supabase
            .from('comments')
            .select('*, users(nickname)')
            .eq('parent_id', comment.id)
            .order('created_at', { ascending: true });
          return { ...comment, replies: replies || [] };
        })
      );
      setComments(withReplies);
    }
  }

  async function checkLiked() {
    const { data } = await supabase
      .from('post_likes')
      .select('id')
      .eq('user_id', user.id)
      .eq('post_id', id)
      .single();
    setLiked(!!data);
  }

  async function handleLike() {
    if (!user) {
      navigate('/login');
      return;
    }
    if (liked) {
      await supabase.from('post_likes').delete().eq('user_id', user.id).eq('post_id', id);
      setLiked(false);
      setLikesCount((prev) => Math.max(prev - 1, 0));
    } else {
      await supabase.from('post_likes').insert({ user_id: user.id, post_id: Number(id) });
      setLiked(true);
      setLikesCount((prev) => prev + 1);
    }
  }

  async function handleComment(e) {
    e.preventDefault();
    if (!user || !commentText.trim()) return;
    setSubmitting(true);
    await supabase.from('comments').insert({
      content: commentText.trim(),
      user_id: user.id,
      post_id: Number(id),
    });
    setCommentText('');
    await fetchComments();
    setSubmitting(false);
  }

  async function handleReply(e) {
    e.preventDefault();
    if (!user || !replyText.trim() || !replyTo) return;
    setSubmitting(true);
    await supabase.from('comments').insert({
      content: replyText.trim(),
      user_id: user.id,
      post_id: Number(id),
      parent_id: replyTo,
    });
    setReplyText('');
    setReplyTo(null);
    await fetchComments();
    setSubmitting(false);
  }

  async function handleDeleteComment(commentId) {
    await supabase.from('comments').delete().eq('id', commentId);
    await fetchComments();
  }

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleString('ko-KR', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit',
    });
  }

  const gameTagColors = {
    '롤': '#00f5ff', '오버워치': '#ff6b00',
    '배틀그라운드': '#39ff14', '발로란트': '#ff2045', '종합게임': '#bf00ff', '기타': '#a0a0cc',
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#060610' }}>
        <CircularProgress sx={{ color: '#00f5ff' }} />
      </Box>
    );
  }

  if (!post) {
    return (
      <Box sx={{ textAlign: 'center', py: 8, background: '#060610', minHeight: '100vh' }}>
        <Typography sx={{ color: 'text.secondary' }}>게시물을 찾을 수 없습니다.</Typography>
        <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>목록으로</Button>
      </Box>
    );
  }

  const tagColor = gameTagColors[post.game_name] || '#bf00ff';

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', background: '#060610', py: 4 }}>
      <Container maxWidth='md' sx={{ px: { xs: 2, md: 3 } }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ color: 'text.secondary', mb: 2, '&:hover': { color: '#00f5ff' } }}
        >
          목록으로
        </Button>

        {/* 게시물 */}
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            background: 'rgba(14, 14, 31, 0.95)',
            border: `1px solid ${tagColor}30`,
            borderRadius: 3,
            mb: 3,
          }}
        >
          <Chip
            label={post.game_name}
            size='small'
            sx={{ bgcolor: `${tagColor}20`, color: tagColor, border: `1px solid ${tagColor}60`, fontWeight: 700, mb: 2 }}
          />

          <Typography
            variant='h5'
            sx={{ color: 'text.primary', fontWeight: 700, mb: 2, lineHeight: 1.4 }}
          >
            { post.title }
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ width: 28, height: 28, bgcolor: `${tagColor}30`, color: tagColor, fontSize: '0.8rem', fontWeight: 700 }}>
                { post.users?.nickname?.[0]?.toUpperCase() || 'G' }
              </Avatar>
              <Typography variant='body2' sx={{ color: 'text.secondary', fontWeight: 600 }}>
                { post.users?.nickname || '익명' }
              </Typography>
            </Box>
            <Typography variant='body2' sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
              { formatDate(post.created_at) }
            </Typography>
          </Box>

          <Divider sx={{ borderColor: 'rgba(0,245,255,0.1)', mb: 3 }} />

          <Typography
            variant='body1'
            sx={{ color: 'text.primary', whiteSpace: 'pre-wrap', lineHeight: 1.9, mb: 3 }}
          >
            { post.content }
          </Typography>

          <Divider sx={{ borderColor: 'rgba(0,245,255,0.1)', mb: 2 }} />

          {/* 좋아요 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={handleLike} sx={{ color: liked ? '#ff6b6b' : 'text.secondary', '&:hover': { color: '#ff6b6b' } }}>
              { liked ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
            </IconButton>
            <Typography variant='body2' sx={{ color: liked ? '#ff6b6b' : 'text.secondary', fontWeight: 600 }}>
              { likesCount }
            </Typography>
          </Box>
        </Paper>

        {/* 댓글 섹션 */}
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            background: 'rgba(14, 14, 31, 0.95)',
            border: '1px solid rgba(0,245,255,0.1)',
            borderRadius: 3,
          }}
        >
          <Typography variant='h6' sx={{ color: '#00f5ff', fontWeight: 700, mb: 3, fontFamily: '"Rajdhani", sans-serif', letterSpacing: '0.05em' }}>
            댓글 { comments.length }
          </Typography>

          {/* 댓글 목록 */}
          { comments.map((comment) => (
            <Box key={comment.id} sx={{ mb: 2 }}>
              {/* 댓글 */}
              <Box
                sx={{
                  p: 2,
                  bgcolor: 'rgba(0,245,255,0.03)',
                  border: '1px solid rgba(0,245,255,0.08)',
                  borderRadius: 2,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 24, height: 24, bgcolor: 'rgba(0,245,255,0.2)', color: '#00f5ff', fontSize: '0.7rem', fontWeight: 700 }}>
                      { comment.users?.nickname?.[0]?.toUpperCase() || 'G' }
                    </Avatar>
                    <Typography variant='body2' sx={{ color: '#00f5ff', fontWeight: 600, fontSize: '0.85rem' }}>
                      { comment.users?.nickname || '익명' }
                    </Typography>
                    <Typography variant='body2' sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                      { formatDate(comment.created_at) }
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    { user && (
                      <IconButton
                        size='small'
                        onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                        sx={{ color: 'text.secondary', '&:hover': { color: '#00f5ff' } }}
                      >
                        <ReplyIcon fontSize='small' />
                      </IconButton>
                    ) }
                    { user?.id === comment.user_id && (
                      <IconButton size='small' onClick={() => handleDeleteComment(comment.id)} sx={{ color: 'text.secondary', '&:hover': { color: '#ff6b6b' } }}>
                        <DeleteIcon fontSize='small' />
                      </IconButton>
                    ) }
                  </Box>
                </Box>
                <Typography variant='body2' sx={{ color: 'text.primary', pl: 4 }}>
                  { comment.content }
                </Typography>
              </Box>

              {/* 대댓글 */}
              { comment.replies?.map((reply) => (
                <Box
                  key={reply.id}
                  sx={{
                    ml: 3,
                    mt: 1,
                    p: 1.5,
                    bgcolor: 'rgba(191,0,255,0.03)',
                    border: '1px solid rgba(191,0,255,0.08)',
                    borderRadius: 2,
                    borderLeft: '2px solid rgba(191,0,255,0.3)',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 20, height: 20, bgcolor: 'rgba(191,0,255,0.2)', color: '#bf00ff', fontSize: '0.65rem', fontWeight: 700 }}>
                        { reply.users?.nickname?.[0]?.toUpperCase() || 'G' }
                      </Avatar>
                      <Typography variant='body2' sx={{ color: '#bf00ff', fontWeight: 600, fontSize: '0.8rem' }}>
                        { reply.users?.nickname || '익명' }
                      </Typography>
                      <Typography variant='body2' sx={{ color: 'text.secondary', fontSize: '0.72rem' }}>
                        { formatDate(reply.created_at) }
                      </Typography>
                    </Box>
                    { user?.id === reply.user_id && (
                      <IconButton size='small' onClick={() => handleDeleteComment(reply.id)} sx={{ color: 'text.secondary', '&:hover': { color: '#ff6b6b' } }}>
                        <DeleteIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    ) }
                  </Box>
                  <Typography variant='body2' sx={{ color: 'text.primary', pl: 3.5, fontSize: '0.85rem' }}>
                    { reply.content }
                  </Typography>
                </Box>
              )) }

              {/* 대댓글 입력 */}
              { replyTo === comment.id && user && (
                <Box component='form' onSubmit={handleReply} sx={{ ml: 3, mt: 1, display: 'flex', gap: 1 }}>
                  <TextField
                    size='small'
                    placeholder={`${comment.users?.nickname || ''}에게 답글...`}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    fullWidth
                    autoFocus
                    inputProps={{ sx: { color: 'text.primary', fontSize: '0.85rem' } }}
                    InputLabelProps={{ sx: { color: 'text.secondary' } }}
                  />
                  <Button type='submit' size='small' variant='outlined' disabled={submitting} sx={{ flexShrink: 0, borderColor: '#bf00ff', color: '#bf00ff' }}>
                    <SendIcon fontSize='small' />
                  </Button>
                </Box>
              ) }
            </Box>
          )) }

          { comments.length === 0 && (
            <Typography variant='body2' sx={{ color: 'text.secondary', textAlign: 'center', py: 3 }}>
              첫 번째 댓글을 남겨보세요!
            </Typography>
          ) }

          <Divider sx={{ borderColor: 'rgba(0,245,255,0.1)', my: 3 }} />

          {/* 댓글 입력 */}
          { user ? (
            <Box component='form' onSubmit={handleComment} sx={{ display: 'flex', gap: 1 }}>
              <TextField
                placeholder='댓글을 입력하세요...'
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                fullWidth
                multiline
                maxRows={3}
                inputProps={{ sx: { color: 'text.primary' } }}
              />
              <Button type='submit' variant='contained' disabled={submitting || !commentText.trim()} sx={{ flexShrink: 0, minWidth: 80 }}>
                <SendIcon />
              </Button>
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant='body2' sx={{ color: 'text.secondary', mb: 1 }}>
                댓글을 작성하려면 로그인이 필요합니다.
              </Typography>
              <Button variant='outlined' size='small' onClick={() => navigate('/login')}>
                로그인
              </Button>
            </Box>
          ) }
        </Paper>
      </Container>
    </Box>
  );
}

export default PostDetailPage;
