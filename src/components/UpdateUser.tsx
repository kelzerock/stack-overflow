import { ToastContext } from '@context';
import { useAppDispatch, useToastErrorHandler } from '@hooks';
import { Button } from '@mui/material';
import { useContext, useState } from 'react';
import { setUserName } from 'store/userSlice';
import { rootRequest } from 'utils/request/rootRequest';

type Passwords = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
const initialPassword = {
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

export const UpdateUser = () => {
  const [name, setName] = useState('');
  const [passwords, setPasswords] = useState<Passwords>(initialPassword);
  const { pushToast } = useContext(ToastContext);
  const handleError = useToastErrorHandler();
  const dispatch = useAppDispatch();

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      setName(e.target.value);
    }
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>, key: keyof Passwords) => {
    if (e.target) {
      setPasswords((prevState) => ({ ...prevState, [key]: e.target.value }));
    }
  };

  const handleSubmitName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (name) {
        const response = await rootRequest.patchMe({ username: name });
        if (response.ok) {
          dispatch(setUserName(name));
          pushToast({ type: 'success', message: `Your name successfully change to <<${name}>>` });
          setName('');
        }
      } else {
        pushToast({
          type: 'warning',
          message: "Fill in the input name if you'd like to change it",
        });
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (passwords.newPassword !== passwords.confirmNewPassword) {
        pushToast({
          type: 'warning',
          message: 'Check your data! Password does not equal confirmPassword data!',
        });
        return;
      }
      const response = await rootRequest.patchPassword({
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
      });
      if (response.ok) {
        pushToast({ type: 'success', message: 'Your password successfully changed!' });
        setPasswords(Object.assign({}, initialPassword));
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:justify-start gap-3">
      <form onSubmit={handleSubmitName} className="flex flex-col gap-2 bg-zinc-100 rounded-md">
        <label className="p-2 bg-zinc-200 inline-flex rounded-md justify-between items-center">
          New name
          <input
            type="text"
            onChange={handleChangeName}
            value={name}
            placeholder="Write new name"
            className=" outline-0 p-2 mx-2 font-medium bg-stone-300 border-2 border-stone-600 rounded-md"
          />
        </label>
        <Button type="submit" variant="outlined" color="primary">
          Change user name
        </Button>
      </form>
      <form onSubmit={handleSubmitPassword} className="flex flex-col gap-2 bg-zinc-100 rounded-md">
        <label className="p-2 bg-zinc-200 inline-flex rounded-md justify-between items-center">
          Old password
          <input
            type="password"
            onChange={(e) => handleChangePassword(e, 'oldPassword')}
            value={passwords.oldPassword}
            placeholder="write old password"
            className=" outline-0 p-2 mx-2 font-medium bg-stone-300 border-2 border-stone-600 rounded-md"
          />
        </label>
        <label className="p-2 bg-zinc-200 inline-flex rounded-md justify-between items-center">
          New password
          <input
            type="password"
            onChange={(e) => handleChangePassword(e, 'newPassword')}
            placeholder="write new password"
            value={passwords.newPassword}
            className=" outline-0 p-2 mx-2 font-medium bg-stone-300 border-2 border-stone-600 rounded-md"
          />
        </label>
        <label className="p-2 bg-zinc-200 inline-flex rounded-md justify-between items-center">
          Confirm new password
          <input
            type="password"
            onChange={(e) => handleChangePassword(e, 'confirmNewPassword')}
            value={passwords.confirmNewPassword}
            placeholder="write new password"
            className=" outline-0 p-2 mx-2 font-medium bg-stone-300 border-2 border-stone-600 rounded-md"
          />
        </label>
        <Button type="submit" variant="outlined" color="primary">
          Change password
        </Button>
      </form>
    </div>
  );
};
