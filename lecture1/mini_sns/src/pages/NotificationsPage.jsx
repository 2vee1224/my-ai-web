import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { supabase } from '../utils/supabase';

/**
 * NotificationsPage 컴포넌트
 * 알림 목록 페이지 (좋아요, 팔로우, 댓글 알림)
 *
 * Props:
 * @param {object} user - 현재 로그인 사용자 [Required]
 *
 * Example usage:
 * <NotificationsPage user={user} />
 */
function NotificationsPage({ user }) {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  /** 알림 목록 조회 */
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from('sns_notifications')
        .select('*, actor:sns_users!actor_id(id, username, display_name, avatar_url)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (data) setNotifications(data);

      /** 읽음 처리 */
      await supabase
        .from('sns_notifications')
        .update({ is_read: true })
        .eq('user_id', user.id)
        .eq('is_read', false);
    } catch (err) {
      console.error('알림 로드 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  /** 알림 유형별 아이콘 */
  const getNotifIcon = (type) => {
    if (type === 'like') return <FavoriteIcon sx={{ fontSize: 16, color: '#FF6B6B' }} />;
    if (type === 'follow') return <PersonAddIcon sx={{ fontSize: 16, color: '#87CEEB' }} />;
    if (type === 'comment') return <ChatBubbleIcon sx={{ fontSize: 16, color: '#98FB98' }} />;
    return null;
  };

  /** 알림 메시지 */
  const getNotifMessage = (notif) => {
    const name = notif.actor?.display_name || '누군가';
    if (notif.type === 'like') return `${name}님이 회원님의 게시물을 좋아합니다.`;
    if (notif.type === 'follow') return `${name}님이 회원님을 팔로우하기 시작했습니다.`;
    if (notif.type === 'comment') return `${name}님이 댓글을 달았습니다: ${notif.message || ''}`;
    return notif.message || '';
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
        <Typography variant='subtitle1' sx={{ fontWeight: 700, ml: 1 }}>알림</Typography>
      </Box>

      <Container maxWidth='sm' sx={{ px: { xs: 1, sm: 2 } }}>
        { loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: '#87CEEB' }} />
          </Box>
        ) : notifications.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant='h2' sx={{ mb: 1 }}>🔔</Typography>
            <Typography variant='body1' sx={{ color: '#888' }}>아직 알림이 없습니다.</Typography>
          </Box>
        ) : (
          <Box sx={{ bgcolor: '#fff', borderRadius: 3, mt: 1, overflow: 'hidden', boxShadow: '0 2px 12px rgba(135,206,235,0.1)' }}>
            { notifications.map((notif, idx) => (
              <Box
                key={ notif.id }
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  px: 2,
                  py: 1.5,
                  bgcolor: notif.is_read ? '#fff' : '#F0F8FF',
                  borderBottom: idx < notifications.length - 1 ? '1px solid #F0F8FF' : 'none',
                  cursor: notif.post_id ? 'pointer' : 'default',
                }}
                onClick={ () => notif.post_id && navigate(`/post/${notif.post_id}`) }
              >
                <Box sx={{ position: 'relative', flexShrink: 0 }}>
                  <Avatar
                    src={ notif.actor?.avatar_url || '' }
                    sx={{ width: 40, height: 40, bgcolor: '#87CEEB', cursor: 'pointer' }}
                    onClick={ (e) => {
                      e.stopPropagation();
                      notif.actor?.username && navigate(`/user/${notif.actor.username}`);
                    }}
                  >
                    { notif.actor?.display_name?.[0] || '?' }
                  </Avatar>
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: -2,
                      right: -2,
                      bgcolor: '#fff',
                      borderRadius: '50%',
                      width: 20,
                      height: 20,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    { getNotifIcon(notif.type) }
                  </Box>
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography variant='body2' sx={{ color: '#333', lineHeight: 1.5 }}>
                    { getNotifMessage(notif) }
                  </Typography>
                  <Typography variant='caption' sx={{ color: '#aaa' }}>
                    { formatDate(notif.created_at) }
                  </Typography>
                </Box>

                { !notif.is_read && (
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#87CEEB', flexShrink: 0 }} />
                ) }
              </Box>
            )) }
          </Box>
        ) }
      </Container>
    </Box>
  );
}

export default NotificationsPage;
