// src/pages/TopPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import Button from '../components/atoms/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const images = [
    "/icons/image1.jpg",
    "/icons/image2.jpg",
    "/icons/image3.jpg"
];

const TopPage: React.FC = () => {
    const isLoggedIn = useAppSelector(state => Boolean(state.user.token));
    const [currentImage, setCurrentImage] = useState(0);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 15000);

        setTimeout(() => setInitialLoad(false), 2000);

        return () => clearInterval(interval);
    }, []);

    const focusVariants = {
        initial: initialLoad ? { scale: 1.5, width: "100vw", height: "100vh" } : { opacity: 0, x: "-100%" },
        animate: { scale: 1, width: "100%", height: "100%", opacity: 1, x: 0 },
        exit: { opacity: 0, x: "100%" }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="min-h-screen bg-navy-800 flex flex-col items-center justify-start pt-20"
        >
            <motion.div 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="w-full max-w-2xl text-center p-6"
            >
                <h1 className="text-3xl tablet:text-4xl laptop:text-5xl font-bold mb-8 text-white">
                    ブログサービス課題
                </h1>
                <motion.p
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="mb-12 text-base tablet:text-lg laptop:text-xl text-gray-400"
                >
                    React.jsを利用したブログサービス課題です。
                </motion.p>
                {!isLoggedIn && (
                    <motion.div 
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 1.5 }}
                        className="mb-12 flex flex-col tablet:flex-row tablet:space-x-6 space-y-6 tablet:space-y-0 justify-center"
                    >
                        <Link to="/login" className="w-full tablet:w-auto">
                            <Button className="w-full tablet:w-auto bg-navy-700 hover:bg-navy-900 text-white font-bold py-3 px-6 rounded">
                                ログイン
                            </Button>
                        </Link>
                        <Link to="/register" className="w-full tablet:w-auto">
                            <Button className="w-full tablet:w-auto bg-navy-700 hover:bg-navy-900 text-white font-bold py-3 px-6 rounded">
                                会員登録
                            </Button>
                        </Link>
                    </motion.div>
                )}
                <div className="flex justify-center relative w-full h-96 overflow-hidden">
                    <AnimatePresence>
                        <motion.img 
                            key={currentImage}
                            src={images[currentImage]} 
                            alt="Description" 
                            className="absolute w-full h-full object-cover rounded-lg shadow-lg"
                            variants={focusVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 1.5 }}
                        />
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default TopPage;
