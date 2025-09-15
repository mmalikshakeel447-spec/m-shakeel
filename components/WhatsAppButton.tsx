
import React from 'react';

interface WhatsAppButtonProps {
    href: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({href}) => {
  return (
    <div className="flex justify-between items-center p-3 rounded-xl border bg-green-50 border-green-200">
      <span className="font-semibold text-gray-700">Join WhatsApp Group</span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 text-sm font-bold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition-colors"
      >
        Join Now
      </a>
    </div>
  );
};

export default WhatsAppButton;
