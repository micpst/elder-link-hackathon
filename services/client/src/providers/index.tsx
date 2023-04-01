import { Provider } from 'react-redux';

import ContextProviders from './ContextProvider/ContextProviders';
import RouterProvider from './RouterProvider/RouterProvider';
import { store } from '../redux/store';

export const Providers = () => {
  return (
    <Provider store={store}>
      <ContextProviders>
        <RouterProvider />
      </ContextProviders>
    </Provider>
  );
};

export default Providers;
