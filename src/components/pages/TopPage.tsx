// src/components/pages/TopPage.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Box } from '@mui/material';
import Button from '../atoms/Button';
import ParallaxText from '../atoms/ParallaxText';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import '../../styles.css';

const images = [
  '/images/top1.avif',
  '/images/top2.jpg',
  '/images/top3.jpg'
];

const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`;
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`;

function Image({ src, id, scrollYProgress }: { src: string; id: string; scrollYProgress: any }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <motion.div
      id={id}
      initial={false}
      animate={
        isLoaded && isInView
          ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
          : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
      }
      transition={{ duration: 1, delay: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => setIsInView(true)}
      style={{ width: '100%', maxWidth: '1200px', marginBottom: '100px', aspectRatio: '16/9', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <motion.img
        src={src}
        alt=""
        onLoad={() => setIsLoaded(true)}
        style={{ width: '100%', height: 'auto', borderRadius: '10px', objectFit: 'cover', scale }}
      />
    </motion.div>
  );
}

const TopPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { scrollY, scrollYProgress } = useViewportScroll();
  const [backgroundColor, setBackgroundColor] = useState('#0d1b2a');

  useEffect(() => {
    const handleScroll = () => {
      const image2Position = document.getElementById('top2')?.offsetTop ?? 0;
      const image3Position = document.getElementById('top3')?.offsetTop ?? 0;

      if (scrollY.get() >= image2Position && scrollY.get() < image3Position) {
        setBackgroundColor('#373A40'); // 変更したい背景色
      } else {
        setBackgroundColor('#0d1b2a'); // デフォルトの背景色
      }
    };

    handleScroll(); // 初期読み込み時にも背景色を設定
    return scrollY.onChange(handleScroll);
  }, [scrollY]);

  return (
    <motion.div
      initial={{ backgroundColor: '#0d1b2a' }}
      animate={{ backgroundColor }}
      transition={{ duration: 0.5 }}
      style={{ minHeight: '100vh', paddingTop: '128px' }} // ヘッダーの高さ分の余白を追加
    >
      <Box
        sx={{
          minHeight: '100vh',
          color: '#EEEEEE',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '50px',
          width: '100%' // 親要素に幅を設定
        }}
      >
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', mb: 8, width: '100%', mt: 8 }}> {/* ここで余白を追加 */}
          <Box sx={{ width: '100vw', overflow: 'hidden', mt: 30 }}> {/* ここで余白を追加 */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100vw' }}>
              <ParallaxText baseVelocity={-5}>Welcome to the Top Page</ParallaxText>
            </Box>
          </Box>
          <Box sx={{ width: '100vw', overflow: 'hidden', mb: 8 }}> {/* ここで余白を追加 */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100vw' }}>
              <ParallaxText baseVelocity={5}>Enjoy Your Stay</ParallaxText>
            </Box>
          </Box>
        </Box>
        {!isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5, type: 'spring', stiffness: 100 }}
            style={{ display: 'flex', gap: '16px', marginBottom: '100px', marginTop: '100px' }}
          >
            <motion.div
              whileHover={{ scale: 1.1, transition: { yoyo: Infinity, duration: 0.3 } }}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Button 
                component={Link} 
                to="/register" 
                sx={{ 
                  textDecoration: 'none', 
                  color: '#FFFFFF', 
                  position: 'relative', 
                  '&:hover': {
                    color: '#FF8C00',
                    '&::after': {
                      transform: 'scaleX(1)',
                    }
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    transform: 'scaleX(0)',
                    height: '2px',
                    bottom: 0,
                    left: 0,
                    backgroundColor: '#FF8C00',
                    transformOrigin: 'bottom right',
                    transition: 'transform 0.25s ease-out',
                  }
                }}
              >
                Sign Up
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, transition: { yoyo: Infinity, duration: 0.3 } }}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Button 
                component={Link} 
                to="/login" 
                sx={{ 
                  textDecoration: 'none', 
                  color: '#FFFFFF', 
                  position: 'relative', 
                  '&:hover': {
                    color: '#FF8C00',
                    '&::after': {
                      transform: 'scaleX(1)',
                    }
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    transform: 'scaleX(0)',
                    height: '2px',
                    bottom: 0,
                    left: 0,
                    backgroundColor: '#FF8C00',
                    transformOrigin: 'bottom right',
                    transition: 'transform 0.25s ease-out',
                  }
                }}
              >
                Log In
              </Button>
            </motion.div>
          </motion.div>
        )}
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '100px', mt: 4, pb: '500px' }}> {/* 下の余白を増やす */}
          {images.map((src, index) => (
            <Image key={index} src={src} id={`top${index + 1}`} scrollYProgress={scrollYProgress} />
          ))}
        </Box>
      </Box>
    </motion.div>
  );
};

export default TopPage;
