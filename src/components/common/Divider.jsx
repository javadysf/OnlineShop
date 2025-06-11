import React from 'react'

const Divider = ({ className = '' }) => {
  return (
    <div className={`w-full h-3 my-12 bg-gradient-to-r from-transparent via-amber-500/80 dark:via-amber-400/80 to-transparent shadow-xl rounded-full ${className}`} />
  );
};

export default Divider;