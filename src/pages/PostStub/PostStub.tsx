import { UrlPath } from '@enums';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const PostStub = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(UrlPath.HOME);
  }, []);

  return <></>;
};
