import { UrlPath } from '@enums';
import { useToastErrorHandler } from '@hooks';
import { Box, Button, TextField, Typography } from '@mui/material';
import { User } from '@types';
import { isResponseUserFull } from '@utils';
import { ToastContext } from 'context/ToastContext';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { AppDispatch } from 'store/store';
import { setUser } from 'store/userSlice';
import { rootRequest } from 'utils/request/rootRequest';

const initialFormData: User = {
  username: '',
  password: '',
};

export const SignInPage = () => {
  const [registrationFormData, setRegistrationFormData] = useState<User>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const { pushToast } = useContext(ToastContext);
  const handleError = useToastErrorHandler();
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof User
  ) => {
    if (e.target) {
      setRegistrationFormData((prevData) => {
        return { ...prevData, [key]: e.target.value };
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, user: User) => {
    try {
      setIsSubmitting(true);
      event.preventDefault();

      const response = await rootRequest.login(user);
      if (response.ok) {
        console.log({ response: response.headers.getSetCookie() });
        const data = await response.json();
        console.log({ data });
        if (isResponseUserFull(data)) {
          pushToast({ type: 'success', message: String(data.message) });
          dispatch(setUser(data.data));
          navigate(UrlPath.HOME);
        } else {
          pushToast({ type: 'error', message: 'Try one more time. Unexpected error!' });
        }
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 'md',
        marginInline: 'auto',
      }}
      onSubmit={(event) => {
        handleSubmit(event, registrationFormData);
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: 600, fontSize: '2rem' }}>
        Login form
      </Typography>
      <TextField
        placeholder="Username"
        type="text"
        label="Username"
        disabled={isSubmitting}
        value={registrationFormData.username}
        onChange={(event) => {
          handleChange(event, 'username');
        }}
      />
      <TextField
        placeholder="Password"
        type="password"
        label="Password"
        disabled={isSubmitting}
        value={registrationFormData.password}
        onChange={(event) => {
          handleChange(event, 'password');
        }}
      />
      <Button
        variant="contained"
        className=" self-center"
        size="large"
        type="submit"
        disabled={isSubmitting}
      >
        Login
      </Button>
    </Box>
  );
};
