
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f172a] text-white text-center py-4 px-4 text-sm rounded-b-xl">
      &copy; {new Date().getFullYear()} Daraz Next Gadgets | All Rights Reserved
    </footer>
  );
};

export default Footer;
