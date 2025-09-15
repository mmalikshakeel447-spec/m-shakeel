
import React from 'react';

interface PromoButtonProps {
  icon?: React.ReactNode;
  text: string;
  buttonText: string;
  bgColor: string;
  borderColor: string;
  buttonColor: string;
  href: string;
}

const PromoButton: React.FC<PromoButtonProps> = ({ icon, text, buttonText, bgColor, borderColor, buttonColor, href }) => {
  return (
    <div className={`flex justify-between items-center p-3 rounded-xl border ${bgColor} ${borderColor}`}>
      <div className="flex items-center space-x-3">
        {icon && <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm">{icon}</div>}
        <span className="font-semibold text-gray-700">{text}</span>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`px-4 py-2 text-sm font-bold text-white ${buttonColor} rounded-lg shadow-md hover:opacity-90 transition-opacity`}
      >
        {buttonText}
      </a>
    </div>
  );
};

export default PromoButton;
