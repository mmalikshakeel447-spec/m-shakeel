import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Featured Products</h2>
      {products.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No products available</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;