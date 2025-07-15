import { UrlPath } from '@enums';
import { Box, Button, TextField, Typography } from '@mui/material';
import { User } from '@types';
import { isAPIErrorResponse, isValidationError, requestRegistration } from '@utils';
import { ToastContext } from 'context/ToastContext';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';

type RegistrationForm = User & { confirmPassword: string };

const initialFormData: RegistrationForm = {
  username: '',
  password: '',
  confirmPassword: '',
};

export const RegistrationPage = () => {
  const [registrationFormData, setRegistrationFormData] =
    useState<RegistrationForm>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const { pushToast } = useContext(ToastContext);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof RegistrationForm
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

      const response = await requestRegistration(user);
      console.log({ response });
      if (response.ok) {
        const data = await response.json();
        pushToast({ type: 'success', message: String(data.message) });
        navigate(UrlPath.SIGN_IN);
      }
    } catch (error) {
      if (error instanceof Error) {
        if ('body' in error && isAPIErrorResponse(error.body)) {
          const { body } = error;
          pushToast({ type: 'error', message: body.message });
          if (
            'errors' in body &&
            Array.isArray(body.errors) &&
            body.errors.every(isValidationError)
          ) {
            body.errors.forEach((error) =>
              error.failures.forEach((e) => pushToast({ type: 'error', message: e }))
            );
          }
        } else {
          pushToast({ type: 'error', message: error.message });
        }
      }
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
        Registration form
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
      <TextField
        placeholder="Confirm Password"
        type="password"
        label="Confirm Password"
        disabled={isSubmitting}
        value={registrationFormData.password}
        onChange={(event) => {
          handleChange(event, 'confirmPassword');
        }}
      />
      <Button
        variant="contained"
        className=" self-center"
        size="large"
        type="submit"
        disabled={isSubmitting}
      >
        Registration
      </Button>
      <Button
        variant="contained"
        className=" self-center"
        size="small"
        type="button"
        color="success"
        disabled={isSubmitting}
        onClick={() => navigate(UrlPath.SIGN_IN)}
      >
        Already registered? Go to the login page
      </Button>
    </Box>
  );
};
