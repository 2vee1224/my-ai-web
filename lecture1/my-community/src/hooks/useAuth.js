import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

/**
 * 인증 상태 관리 커스텀 훅
 *
 * Returns:
 * - user: 현재 로그인한 사용자 객체 (null이면 비로그인)
 * - profile: profiles 테이블의 사용자 프로필
 * - loading: 인증 상태 로딩 여부
 * - signOut: 로그아웃 함수
 */
function useAuth() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId) {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    setProfile(data);
    setLoading(false);
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return { user, profile, loading, signOut };
}

export default useAuth;
