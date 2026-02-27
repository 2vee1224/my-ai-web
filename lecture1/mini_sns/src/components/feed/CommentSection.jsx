import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import { supabase } from '../../utils/supabase';

/**
 * CommentSection 컴포넌트
 * 게시글 댓글 목록 및 작성 영역
 *
 * Props:
 * @param {number|string} postId - 게시글 ID [Required]
 * @param {object} currentUser - 현재 로그인한 사용자 [Required]
 * @param {object} currentProfile - 현재 사용자 프로필 [Required]
 *
 * Example usage:
 * <CommentSection postId={1} currentUser={user} currentProfile={profile} />
 */
function CommentSection({ postId, currentUser, currentProfile }) {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  /** 댓글 목록 조회 */
  const fetchComments = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from('sns_comments')
        .select('*, sns_users(id, username, display_name, avatar_url)')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (data) setComments(data);
    } catch (err) {
      console.error('댓글 로드 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  /** 댓글 작성 */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || submitting) return;

    setSubmitting(true);
    try {
      const { data } = await supabase
        .from('sns_comments')
        .insert({ post_id: postId, user_id: currentUser.id, content: newComment.trim() })
        .select('*, sns_users(id, username, display_name, avatar_url)')
        .single();

      if (data) {
        setComments((prev) => [...prev, data]);
        setNewComment('');
      }
    } catch (err) {
      console.error('댓글 작성 실패:', err);
    } finally {
      setSubmitting(false);
    }
  };

  /** 시간 포맷 */
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
    <Box>
      <Typography variant='subtitle2' sx={{ px: 2, py: 1.5, color: '#333' }}>
        댓글 { comments.length }개
      </Typography>

      {/* 댓글 목록 */}
      { loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
          <CircularProgress size={ 24 } sx={{ color: '#87CEEB' }} />
        </Box>
      ) : (
        <Box sx={{ px: 2, mb: 2 }}>
          { comments.map((comment) => (
            <Box key={ comment.id } sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
              <Avatar
                src={ comment.sns_users?.avatar_url || '' }
                sx={{ width: 32, height: 32, bgcolor: '#87CEEB', cursor: 'pointer', flexShrink: 0 }}
                onClick={ () => navigate(`/user/${comment.sns_users?.username}`) }
              >
                { comment.sns_users?.display_name?.[0] || '?' }
              </Avatar>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant='caption'
                    sx={{ fontWeight: 700, cursor: 'pointer', '&:hover': { color: '#5BA8C9' } }}
                    onClick={ () => navigate(`/user/${comment.sns_users?.username}`) }
                  >
                    { comment.sns_users?.display_name || '알 수 없음' }
                  </Typography>
                  <Typography variant='caption' sx={{ color: '#aaa' }}>
                    { formatDate(comment.created_at) }
                  </Typography>
                </Box>
                <Typography variant='body2' sx={{ color: '#444', mt: 0.3 }}>
                  { comment.content }
                </Typography>
              </Box>
            </Box>
          )) }

          { comments.length === 0 && (
            <Typography variant='body2' sx={{ color: '#bbb', textAlign: 'center', py: 2 }}>
              첫 번째 댓글을 작성해보세요 💬
            </Typography>
          ) }
        </Box>
      ) }

      {/* 댓글 입력 */}
      <Box
        component='form'
        onSubmit={ handleSubmit }
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 2,
          py: 1.5,
          borderTop: '1px solid #E8F4FA',
          bgcolor: '#FAFFFE',
        }}
      >
        <Avatar
          src={ currentProfile?.avatar_url || '' }
          sx={{ width: 32, height: 32, bgcolor: '#87CEEB', flexShrink: 0 }}
        >
          { currentProfile?.display_name?.[0] || '?' }
        </Avatar>
        <TextField
          value={ newComment }
          onChange={ (e) => setNewComment(e.target.value) }
          placeholder='댓글 달기...'
          variant='standard'
          fullWidth
          InputProps={{ disableUnderline: true }}
          sx={{ '& input': { fontSize: '0.9rem', color: '#444' } }}
        />
        <IconButton
          type='submit'
          disabled={ !newComment.trim() || submitting }
          sx={{ color: newComment.trim() ? '#5BA8C9' : '#ccc' }}
        >
          <SendIcon fontSize='small' />
        </IconButton>
      </Box>
    </Box>
  );
}

export default CommentSection;
