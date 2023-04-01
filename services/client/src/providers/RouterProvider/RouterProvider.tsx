import { BrowserRouter } from 'react-router-dom';

import NavigationRoutes from '../../routes/NavigationRoutes';
import SwipePage from '../../pages/SwipePage/SwipePage';

const RouterProvider = () => {
  return (
    <BrowserRouter>
      <SwipePage />
    </BrowserRouter>
  );
};

export default RouterProvider;
