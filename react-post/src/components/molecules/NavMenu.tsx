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
        <nav>
            {/* ハンバーガーメニュー（スマホ） */}
            <div className="sm:hidden">
                <button onClick={handleToggle} className="text-white">
                    {isOpen ? '×' : '≡'}
                </button>
                {isOpen && (
                    <div className="flex flex-col items-start bg-navy-700 p-2 mt-2 space-y-2 rounded">
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
            </div>
            {/* 横並びのナビゲーションメニュー（タブレットとPC） */}
            <div className="hidden sm:flex space-x-6">
                {!isLoggedIn && (
                    <>
                        <Link to="/login" className="py-2 px-4 text-white hover:bg-navy-700 rounded">ログイン</Link>
                        <Link to="/register" className="py-2 px-4 text-white hover:bg-navy-700 rounded">会員登録</Link>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <Link to="/create-article" className="py-2 px-4 text-white hover:bg-navy-700 rounded">新規投稿画面</Link>
                        <Link to="/article-list" className="py-2 px-4 text-white hover:bg-navy-700 rounded">投稿一覧画面</Link>
                        <Link to="/update-profile" className="py-2 px-4 text-white hover:bg-navy-700 rounded">会員情報変更</Link>
                        <Link to="/my-page" className="py-2 px-4 text-white hover:bg-navy-700 rounded">マイページ</Link>
                        <button onClick={onLogout} className="py-2 px-4 text-white hover:bg-navy-700 rounded">ログアウト</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavMenu;


