// src/pages/TopPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/store';

const TopPage: React.FC = () => {
    const isLoggedIn = useAppSelector(state => Boolean(state.user.token));

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-start pt-20">
            <div className="w-full max-w-2xl text-center p-6">
                <h1 className="text-3xl tablet:text-4xl laptop:text-5xl font-bold mb-8 text-navy-800">ブログサービス課題</h1>
                <p className="mb-12 text-base tablet:text-lg laptop:text-xl text-navy-600">React.jsを利用したブログサービス課題です。</p>
                {!isLoggedIn && (
                    <div className="mb-12 flex flex-col tablet:flex-row tablet:space-x-6 space-y-6 tablet:space-y-0 justify-center">
                        <Link to="/login" className="bg-navy-700 hover:bg-navy-900 text-white font-bold py-3 px-6 rounded">
                            ログイン
                        </Link>
                        <Link to="/register" className="bg-navy-700 hover:bg-navy-900 text-white font-bold py-3 px-6 rounded">
                            会員登録
                        </Link>
                    </div>
                )}
                <div className="flex justify-center">
                    <img src="/icons/jorge-quinteros-dock-ipad-wallpaper-2048x2048-500x500.jpg" alt="Description" className="w-3/4 rounded-lg shadow-lg"/>
                </div>
            </div>
        </div>
    );
};

export default TopPage;







