import { UserFull } from '@types';
import { Link } from 'react-router';
import { FcInfo } from 'react-icons/fc';
import { Tooltip } from '@mui/material';

export const UserItem = ({ user }: { user: UserFull }) => {
  const { username, role, id } = user;
  return (
    <div className=" bg-emerald-100 rounded-md flex justify-between basis-full sm:basis-1/2 md:basis-1/4 p-3">
      <div className="flex flex-col">
        <span>Name: {username}</span>
        <span>Role: {role}</span>
        <span>ID: {id} </span>
      </div>
      <Tooltip title="Get more info" placement="top">
        <Link
          to={`${id}`}
          className="basis-1/3 bg-stone-300 flex justify-center items-center rounded-2xl hover:bg-stone-400"
        >
          <FcInfo className="text-4xl" />
        </Link>
      </Tooltip>
    </div>
  );
};
