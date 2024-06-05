// src/components/organisms/Header.tsx
import React from 'react';
import Logo from '../atoms/Logo';
import NavMenu from '../molecules/NavMenu';

interface HeaderProps {
    isLoggedIn: boolean;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout }) => (
    <header className="w-full p-4 bg-navy-800 text-white flex justify-between items-center">
        <Logo />
        <NavMenu isLoggedIn={isLoggedIn} onLogout={onLogout} />
    </header>
);

export default Header;

