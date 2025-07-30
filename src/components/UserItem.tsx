import { UserFull } from '@types';

export const UserItem = ({ user }: { user: UserFull }) => {
  const { username, role } = user;
  return (
    <div className="p-2 bg-emerald-100 rounded-md flex flex-col items-start">
      <span>Name: {username}</span>
      <span>Role: {role}</span>
    </div>
  );
};
