import { Outlet } from 'react-router-dom';

const GuestTemplate = () => {
  return (
    <div className="flex w-screen min-h-screen justify-center items-center p-8 bg-green-400">
      <Outlet />
    </div>
  );
};

export default GuestTemplate;
