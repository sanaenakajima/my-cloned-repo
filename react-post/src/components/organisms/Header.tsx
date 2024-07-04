// src/components/organisms/Header.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Logo from '../atoms/Logo';
import NavMenu from '../molecules/NavMenu';

interface HeaderProps {
    isLoggedIn: boolean;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout }) => (
    <header className="fixed top-0 left-0 w-full bg-navy-800 text-white flex flex-col items-center z-50">
        <div className="flex justify-between items-center w-full max-w-screen-lg mx-auto py-8 px-4"> 
            <div className="flex-shrink-0">
                <Logo />
            </div>
            <div className="flex-grow">
                <NavMenu isLoggedIn={isLoggedIn} onLogout={onLogout} />
            </div>
        </div>
        <motion.div
            className="w-full h-0.5 bg-gray-400"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 1}}
            style={{ originX: 0 }}
        />
    </header>
);

export default Header;
