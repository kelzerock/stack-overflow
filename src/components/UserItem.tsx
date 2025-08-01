import { UserFull } from '@types';
import { Link } from 'react-router';

export const UserItem = ({ user }: { user: UserFull }) => {
  const { username, role, id } = user;
  return (
    <div className="p-2 bg-emerald-100 rounded-md flex flex-col items-start">
      <span>Name: {username}</span>
      <span>Role: {role}</span>
      <span>ID: {id} </span>
      <Link to={`${id}`}>more information</Link>
    </div>
  );
};
