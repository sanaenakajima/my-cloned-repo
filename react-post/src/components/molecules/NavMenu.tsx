// src/components/molecules/NavMenu.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface NavMenuProps {
    isLoggedIn: boolean;
    onLogout: () => void;
}

const NavMenu: React.FC<NavMenuProps> = ({ isLoggedIn, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        console.log("NavMenu useEffect - isLoggedIn:", isLoggedIn);
    }, [isLoggedIn]);

    const menuVariants = {
        hidden: { opacity: 0, x: '100%' },
        visible: { opacity: 1, x: '0%' },
        exit: { opacity: 0, x: '100%' }
    };

    const iconVariants = {
        open: { rotate: 90 },
        closed: { rotate: 0 }
    };

    const line1Variants = {
        open: { d: "M3 3L21 21" },
        closed: { d: "M3 6h18" }
    };

    const line2Variants = {
        open: { opacity: 0 },
        closed: { opacity: 1 }
    };

    const line3Variants = {
        open: { d: "M3 21L21 3" },
        closed: { d: "M3 18h18" }
    };

    return (
        <nav className="relative z-50">
            {/* ハンバーガーメニューアイコン */}
            <div className="fixed top-6 right-4 z-50 sm:hidden">
                <button onClick={handleToggle} className="text-white text-4xl focus:outline-none">
                    <motion.div
                        initial="closed"
                        animate={isOpen ? "open" : "closed"}
                        variants={iconVariants}
                        transition={{ duration: 0.5 }}
                    >
                        <svg width="30" height="30" viewBox="0 0 24 24">
                            <motion.path
                                d="M3 6h18"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                variants={line1Variants}
                                transition={{ duration: 0.5 }}
                            />
                            <motion.path
                                d="M3 12h18"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                variants={line2Variants}
                                transition={{ duration: 0.5 }}
                            />
                            <motion.path
                                d="M3 18h18"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                variants={line3Variants}
                                transition={{ duration: 0.5 }}
                            />
                        </svg>
                    </motion.div>
                </button>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="sm:hidden flex flex-col items-start bg-navy-700 bg-opacity-90 p-4 space-y-4 fixed inset-0 top-0 z-40"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={menuVariants}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="mt-16 w-full">
                            {!isLoggedIn ? (
                                <>
                                    <Link to="/login" className="block py-4 px-6 text-white text-xl w-full">ログイン</Link>
                                    <Link to="/register" className="block py-4 px-6 text-white text-xl w-full">会員登録</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/create-article" className="block py-4 px-6 text-white text-xl w-full">新規投稿画面</Link>
                                    <Link to="/article-list" className="block py-4 px-6 text-white text-xl w-full">投稿一覧画面</Link>
                                    <Link to="/update-profile" className="block py-4 px-6 text-white text-xl w-full">会員情報変更</Link>
                                    <Link to="/my-page" className="block py-4 px-6 text-white text-xl w-full">マイページ</Link>
                                    <button onClick={onLogout} className="block py-4 px-6 text-white text-xl w-full text-left">ログアウト</button>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* 横並びのナビゲーションメニュー（タブレットとPC） */}
            <div className="hidden sm:flex space-x-2 md:space-x-4 lg:space-x-6 flex-grow justify-end items-center text-sm md:text-base lg:text-lg">
                {!isLoggedIn ? (
                    <>
                        <Link to="/login" className="py-2 px-2 md:px-3 lg:px-4 text-white hover:bg-navy-700 rounded">ログイン</Link>
                        <Link to="/register" className="py-2 px-2 md:px-3 lg:px-4 text-white hover:bg-navy-700 rounded">会員登録</Link>
                    </>
                ) : (
                    <>
                        <Link to="/create-article" className="py-2 px-2 md:px-3 lg:px-4 text-white hover:bg-navy-700 rounded truncate">新規投稿画面</Link>
                        <Link to="/article-list" className="py-2 px-2 md:px-3 lg:px-4 text-white hover:bg-navy-700 rounded truncate">投稿一覧画面</Link>
                        <Link to="/update-profile" className="py-2 px-2 md:px-3 lg:px-4 text-white hover:bg-navy-700 rounded truncate">会員情報変更</Link>
                        <Link to="/my-page" className="py-2 px-2 md:px-3 lg:px-4 text-white hover:bg-navy-700 rounded truncate">マイページ</Link>
                        <button onClick={onLogout} className="py-2 px-2 md:px-3 lg:px-4 text-white hover:bg-navy-700 rounded truncate focus:outline-none">ログアウト</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavMenu;
