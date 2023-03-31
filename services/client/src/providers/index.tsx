import ContextProviders from './ContextProvider/ContextProviders';
import RouterProvider from './RouterProvider/RouterProvider';

export const Providers = () => {
  return (
    <ContextProviders>
      <RouterProvider />
    </ContextProviders>
  );
};

export default Providers;
