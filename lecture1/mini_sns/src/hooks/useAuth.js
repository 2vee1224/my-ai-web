import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

/**
 * useAuth 훅
 * Supabase 인증 상태를 관리하는 커스텀 훅
 */
function useAuth() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /** 현재 세션 가져오기 */
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    /** 인증 상태 변경 구독 */
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

  /** sns_users 프로필 조회 */
  const fetchProfile = async (userId) => {
    try {
      const { data } = await supabase
        .from('sns_users')
        .select('*')
        .eq('id', userId)
        .single();
      setProfile(data);
    } catch {
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  /** 로그아웃 */
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { user, profile, loading, signOut, refetchProfile: () => user && fetchProfile(user.id) };
}

export default useAuth;
