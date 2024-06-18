// src/components/molecules/NavMenu.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface NavMenuProps {
    isLoggedIn: boolean;
    onLogout: () => void;
}

const NavMenu: React.FC<NavMenuProps> = ({ isLoggedIn, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => setIsOpen(!isOpen);

    return (
        <nav className="relative">
             {/* ハンバーガーメニュー（スマホ） */}
             <div className="sm:hidden absolute top-1/2 transform -translate-y-1/2 right-2">
                <button onClick={handleToggle} className="text-white text-4xl focus:outline-none">
                    {isOpen ? '×' : '≡'}
                </button>
            </div>
            {isOpen && (
                <div className="sm:hidden flex flex-col items-start bg-navy-700 bg-opacity-75 p-2 space-y-2 rounded absolute left-0 right-0 top-full z-10 mt-2 transform translate-y-8">
                    {!isLoggedIn && (
                        <>
                            <Link to="/login" className="block py-2 px-4 text-white">ログイン</Link>
                            <Link to="/register" className="block py-2 px-4 text-white">会員登録</Link>
                        </>
                    )}
                    {isLoggedIn && (
                        <>
                            <Link to="/create-article" className="block py-2 px-4 text-white">新規投稿画面</Link>
                            <Link to="/article-list" className="block py-2 px-4 text-white">投稿一覧画面</Link>
                            <Link to="/update-profile" className="block py-2 px-4 text-white">会員情報変更</Link>
                            <Link to="/my-page" className="block py-2 px-4 text-white">マイページ</Link>
                            <button onClick={onLogout} className="block py-2 px-4 text-white">ログアウト</button>
                        </>
                    )}
                </div>
            )}
            {/* 横並びのナビゲーションメニュー（タブレットとPC） */}
            <div className="hidden sm:flex space-x-2 md:space-x-4 lg:space-x-6 flex-grow justify-end items-center text-sm md:text-base lg:text-lg">
                {!isLoggedIn && (
                    <>
                        <Link to="/login" className="py-2 px-2 md:px-3 lg:px-4 text-white hover:bg-navy-700 rounded">ログイン</Link>
                        <Link to="/register" className="py-2 px-2 md:px-3 lg:px-4 text-white hover:bg-navy-700 rounded">会員登録</Link>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <Link to="/create-article" className="py-2 px-2 md:px-3 lg:px-4 text-white hover:bg-navy-700 rounded truncate">新規投稿画面</Link>
                        <Link to="/article-list" className="py-2 px-2 md:px-3 lg:px-4 text-white hover:bg-navy-700 rounded truncate">投稿一覧画面</Link>
                        <Link to="/update-profile" className="py-2 px-2 md:px-3 lg:px-4 text-white hover:bg-navy-700 rounded truncate">会員情報変更</Link>
                        <Link to="/my-page" className="py-2 px-2 md:px-3 lg:px-4 text-white hover:bg-navy-700 rounded truncate">マイページ</Link>
                        <button onClick={onLogout} className="py-2 px-2 md:px-3 lg:px-4 text-white hover:bg-navy-700 rounded truncate">ログアウト</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavMenu;



















