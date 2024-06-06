// src/pages/HeaderLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/organisms/Header';
import useAuth from '../hooks/useAuth';
import { useAppDispatch } from '../store/store';
import { logout } from '../store/userSlice';

const HeaderLayout: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAuth();

    const handleLogout = () => {
        dispatch(logout());
        window.location.href = '/';
    };

    return (
        <div>
            <Header isLoggedIn={isAuthenticated} onLogout={handleLogout} />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default HeaderLayout;