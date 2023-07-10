import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 100 },
  show: { opacity: 1, y: 0, transition: { ease: 'backOut', duration: 1 } },
};

export const AnimatedLetters = ({ letters }: { letters: string[] }) => {
  return (
    <>
      <motion.div variants={container} initial="hidden" animate="show">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="inline-block z-30"
            variants={item}
          >
            {letter}&nbsp;
          </motion.span>
        ))}
      </motion.div>
    </>
  );
};
