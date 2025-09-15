import React, { useState } from 'react';
import { Product, SocialLink } from '../types';

interface AdminPanelProps {
  headerTitle: string;
  setHeaderTitle: (title: string) => void;
  headerSubtitle: string;
  setHeaderSubtitle: (subtitle: string) => void;
  logoUrl: string | null;
  setLogoUrl: (url: string | null) => void;
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
  socialLinks: SocialLink[];
  updateSocialLink: (name: string, url: string) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  headerTitle,
  setHeaderTitle,
  headerSubtitle,
  setHeaderSubtitle,
  logoUrl,
  setLogoUrl,
  products,
  addProduct,
  removeProduct,
  socialLinks,
  updateSocialLink,
  onClose,
}) => {
  const [newProductName, setNewProductName] = useState('');
  const [newProductImageUrl, setNewProductImageUrl] = useState('');
  const [newProductAffiliateUrl, setNewProductAffiliateUrl] = useState('');

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProductName && newProductImageUrl && newProductAffiliateUrl) {
      const newProduct: Product = {
        id: Date.now(),
        name: newProductName,
        imageUrl: newProductImageUrl,
        affiliateUrl: newProductAffiliateUrl,
      };
      addProduct(newProduct);
      setNewProductName('');
      setNewProductImageUrl('');
      setNewProductAffiliateUrl('');
    }
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProductImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end" onClick={onClose}>
      <div 
        className="w-full max-w-sm h-full bg-white shadow-2xl p-6 overflow-y-auto" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Header Settings */}
        <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold border-b pb-2">Header Settings</h3>
            <div>
                <label htmlFor="headerTitle" className="block text-sm font-medium text-gray-700">Header Title</label>
                <input type="text" id="headerTitle" value={headerTitle} onChange={(e) => setHeaderTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
                <label htmlFor="headerSubtitle" className="block text-sm font-medium text-gray-700">Header Subtitle</label>
                <input type="text" id="headerSubtitle" value={headerSubtitle} onChange={(e) => setHeaderSubtitle(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
        </div>

        {/* Logo Settings */}
        <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold border-b pb-2">Logo Settings</h3>
            <div>
                <label htmlFor="logoUpload" className="block text-sm font-medium text-gray-700">Upload Logo</label>
                <input
                    type="file"
                    id="logoUpload"
                    onChange={handleLogoUpload}
                    accept="image/*"
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                />
                {logoUrl && (
                    <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700">Logo Preview:</p>
                        <img src={logoUrl} alt="Logo Preview" className="mt-2 w-24 h-24 rounded-full border border-gray-200 object-cover" />
                    </div>
                )}
            </div>
        </div>
        
        {/* Social Links */}
        <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold border-b pb-2">Social Media Links</h3>
            {socialLinks.map(link => (
                 <div key={link.name}>
                    <label htmlFor={`social-${link.name}`} className="block text-sm font-medium text-gray-700">{link.name} URL</label>
                    <input type="text" id={`social-${link.name}`} value={link.url} onChange={(e) => updateSocialLink(link.name, e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
            ))}
        </div>

        {/* Add Product */}
        <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold border-b pb-2">Add Product</h3>
            <form onSubmit={handleAddProduct} className="space-y-4">
                 <div>
                    <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input type="text" id="productName" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                </div>
                <div>
                  <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">Product Image</label>
                  <input
                    type="file"
                    id="productImage"
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                    required
                  />
                  {newProductImageUrl && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700">Image Preview:</p>
                      <img src={newProductImageUrl} alt="Product Preview" className="mt-2 w-full h-auto rounded-lg border border-gray-200 object-cover" />
                    </div>
                  )}
                </div>
                 <div>
                    <label htmlFor="affiliateUrl" className="block text-sm font-medium text-gray-700">Affiliate Link</label>
                    <input type="text" id="affiliateUrl" value={newProductAffiliateUrl} onChange={(e) => setNewProductAffiliateUrl(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required/>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">Add Product</button>
            </form>
        </div>

        {/* Manage Products */}
        <div>
            <h3 className="text-lg font-semibold border-b pb-2">Manage Products</h3>
            <div className="mt-4 space-y-3 max-h-60 overflow-y-auto">
                {products.length === 0 ? <p className="text-sm text-gray-500">No products yet.</p> :
                 products.map(product => (
                    <div key={product.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                        <span className="text-sm text-gray-800 truncate pr-2">{product.name}</span>
                        <button onClick={() => removeProduct(product.id)} className="text-red-500 hover:text-red-700 font-semibold text-sm">Remove</button>
                    </div>
                 ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;