import { useTransform, useViewportScroll, MotionValue } from 'framer-motion';
import { useRef } from 'react';

const useZoomOnScroll = (index: number, imageRefs: React.RefObject<(HTMLDivElement | null)[]>): MotionValue<number> => {
  const { scrollY } = useViewportScroll();
  const imagePosition = imageRefs.current ? (imageRefs.current[index]?.offsetTop ?? 0) : 0;
  return useTransform(scrollY, [imagePosition - 500, imagePosition + 500], [0.8, 1.2]);
};

export default useZoomOnScroll;
