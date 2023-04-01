import { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { GuestRoute, PrivateRoute, SeniorRoute } from '../auth';
import { routePaths } from '../constants';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import GuestTemplate from '../templates/GuestTemplate/GuestTemplate';
import LogInPage from '../pages/LogInPage/LogInPage';
import PrivateTemplate from '../templates/PrivateTemplate/PrivateTemplate';
import SwipePage from '../pages/SwipePage/SwipePage';
import LandingPage from '../pages/LandingPage/LandingPage';
import CreateTicketPage from '../pages/CreateTicketPage/CreateTicketPage';

const NavigationRoutes = () => {
  const location = useLocation();
  return (
    <Suspense fallback={null}>
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          // Private pages
          <Route element={<SeniorRoute />}>
            <Route path={routePaths.swipe} element={<SwipePage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route element={<PrivateTemplate />}>
              {/* <Route path={routePaths.settings} element={<SettingsPage />} /> */}
            </Route>
          </Route>
          // Guest pages
          <Route element={<GuestRoute />}>
            <Route path={routePaths.home} element={<LandingPage />} />
            <Route element={<GuestTemplate />}>
              <Route path={routePaths.login} element={<LogInPage />} />
              <Route path={routePaths.signup} element={<SignUpPage />} />
              <Route path={routePaths.createTicket} element={<CreateTicketPage />} />
            </Route>
          </Route>
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

export default NavigationRoutes;
