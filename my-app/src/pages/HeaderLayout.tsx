// src/pages/HeaderLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/organisms/Header';

const HeaderLayout: React.FC = () => {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        window.location.href = '/';
    };

    return (
        <div>
            <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default HeaderLayout;

