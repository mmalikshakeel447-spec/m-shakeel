
import React from 'react';

const CouponBanner: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white text-center py-3 px-4 rounded-xl shadow-lg">
      <p className="font-semibold">
        <span className="text-yellow-400">50% OFF + FREE Domain</span> — 20% extra off coupon code:
        <span className="font-bold text-white ml-1">NextGadgets</span>
      </p>
    </div>
  );
};

export default CouponBanner;
