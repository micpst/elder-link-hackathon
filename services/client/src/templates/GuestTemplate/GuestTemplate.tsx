import { Outlet } from 'react-router-dom';

const GuestTemplate = () => {
  return (
    <div className="relative flex flex-col w-screen min-h-screen justify-center items-center p-8 bg-white overflow-hidden">
      <div className="absolute top-4 left-8 text-green-400 flex justify-start w-screen flex-col">
        <span className="font-bold text-3xl">Elder</span>
        <span className="font-medium text-2xl tracking-widest">Link</span>
      </div>
      <Outlet />
    </div>
  );
};

export default GuestTemplate;
