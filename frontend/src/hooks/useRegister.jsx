import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '@/redux/auth/actions';
import { useNavigate } from 'react-router-dom';

const useRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess]);

  const registerUser = (values) => {
    dispatch(register(values));
  };

  return { registerUser, isLoading };
};

export default useRegister;