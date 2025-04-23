import { motion } from 'framer-motion';
import React from 'react';
import { Spinner } from '@/components/ui';

interface LoadingPageProps {
  message?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  },
  exit: { opacity: 0 }
};


const LoadingPage: React.FC<LoadingPageProps> = ({ message = 'Loading...' }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Spinner Container */}
        <motion.div
          className="relative"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            rotate: {
              repeat: Infinity,
              duration: 1.5,
              ease: "linear"
            },
            scale: {
              repeat: Infinity,
              duration: 1.2,
              ease: "easeInOut"
            }
          }}
        >
          <Spinner className="w-16 h-16 text-indigo-600 dark:text-indigo-400" />
        </motion.div>

        {/* Animated Text */}
        <motion.div
          className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.h2
            className="text-2xl font-bold text-gray-800 dark:text-gray-200"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {message}
          </motion.h2>
          
          {/* Progress Dots */}
          <motion.div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full"
                animate={{
                  y: ["0%", "-50%", "0%"],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        </motion.div>

      </div>

    </motion.div>
  );
};

export default LoadingPage;