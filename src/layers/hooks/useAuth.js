import { useDispatch, useSelector } from 'react-redux';
import {
  registerUser,
  loginUser,
  fetchMe,
  verifyEmail,
  clearAuthError,
  clearAuthSuccess,
  logout,
} from '../state/auth/auth.slice';

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, error, success } = useSelector((state) => state.auth);

  return {
    // ── State
    user,
    loading,
    error,
    success,
    isAuthenticated: !!user,

    // ── Actions
    register:          (formData)  => dispatch(registerUser(formData)),
    login:             (formData)  => dispatch(loginUser(formData)),
    getMe:             ()          => dispatch(fetchMe()),
    verifyEmail:       (token)     => dispatch(verifyEmail(token)),
    logout:            ()          => dispatch(logout()),
    clearError:        ()          => dispatch(clearAuthError()),
    clearSuccess:      ()          => dispatch(clearAuthSuccess()),
  };
};

export default useAuth;