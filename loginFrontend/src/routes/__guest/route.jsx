import { createFileRoute, redirect, Outlet } from '@tanstack/react-router';
import checkAuth from '../../api/auth';

export const Route = createFileRoute('/__guest')({
    beforeLoad: async () => {
    const isAuth = await checkAuth();

    if (isAuth) {
        throw redirect({
            to: '/',
        });
        }
    },

  component: () => <Outlet />,
})
