import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <a
      href={product.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
    >
      <div className="relative h-32 bg-gray-800">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2 text-center">
          <h3 className="font-semibold text-sm text-white truncate">{product.name}</h3>
        </div>
      </div>
    </a>
  );
};

export default ProductCard;