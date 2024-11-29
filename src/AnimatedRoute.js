import React from "react";
import { motion } from "framer-motion";

// Анимация при монтировании компонента
const AnimatedRoute = ({ children }) => {
  const defaultAnimation = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
    transition: { duration: 0.8 },
  };

  return (
    <motion.div
      initial={defaultAnimation.initial}
      animate={defaultAnimation.animate}
      exit={defaultAnimation.exit}
      transition={defaultAnimation.transition}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedRoute;
