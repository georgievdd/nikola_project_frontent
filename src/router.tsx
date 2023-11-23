import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import { PATH } from './consts';
import Wrapper from './pages/Wrapper';
import HomePage from './pages/home';
import HousePage from './pages/house';
import HouseIdPage from './pages/house/id';



export const Router = createBrowserRouter([
    {
      path: PATH.HOME,
      element: <Wrapper />,
      children: [
        {
          path: PATH.HOME,
          element: <HomePage />
        },
        {
          path: PATH.HOUSE,
          element: <HousePage />
        },
        {
          path: PATH.HOUSE + '/:id',
          element: <HouseIdPage />
        },
      ]
    },
]);
