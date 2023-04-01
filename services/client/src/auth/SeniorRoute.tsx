import { Outlet, Navigate } from 'react-router-dom';

import { routePaths } from '../constants';

const SeniorRoute = () => {
  return window.localStorage.getItem('ticket') === null ? (
    <Navigate to={routePaths.createTicket} />
  ) : (
    <Outlet />
  );
};

export default SeniorRoute;
