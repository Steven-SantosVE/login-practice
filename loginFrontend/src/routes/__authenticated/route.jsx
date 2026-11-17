import { createFileRoute, redirect, Outlet } from '@tanstack/react-router';
import checkAuth from '../../api/auth';

export const Route = createFileRoute('/__authenticated')({
  beforeLoad: async () => {
    const isAuth = await checkAuth();

    if (!isAuth) {
      throw redirect({
        to: '/login',
      });
    }
  },

  component: () => <Outlet />,
});