import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PromoButton from './components/PromoButton';
import CouponBanner from './components/CouponBanner';
import WhatsAppButton from './components/WhatsAppButton';
import FeaturedProducts from './components/FeaturedProducts';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { Product, SocialLink } from './types';
import { INITIAL_SOCIAL_LINKS } from './constants';
import { db } from './firebase';
import { ref, onValue, set, push, remove as removeDb } from 'firebase/database';

const App: React.FC = () => {
  const [headerTitle, setHeaderTitle] = useState('Daraz Next Gadgets');
  const [headerSubtitle, setHeaderSubtitle] = useState('Premium Gadgets & Electronics');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(INITIAL_SOCIAL_LINKS);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  useEffect(() => {
    // Listener for header/config data
    const configRef = ref(db, 'config');
    const unsubscribeConfig = onValue(configRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setHeaderTitle(data.headerTitle || 'Daraz Next Gadgets');
        setHeaderSubtitle(data.headerSubtitle || 'Premium Gadgets & Electronics');
        setLogoUrl(data.logoUrl || null);
      }
    });

    // Listener for products
    const productsRef = ref(db, 'products');
    const unsubscribeProducts = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const productsArray: Product[] = [];
      if (data) {
        Object.keys(data).forEach(key => {
          productsArray.push({ id: key, ...data[key] });
        });
      }
      setProducts(productsArray);
    });

    // Listener for social links
    const socialLinksRef = ref(db, 'socialLinks');
    const unsubscribeSocialLinks = onValue(socialLinksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSocialLinks(data);
      } else {
        // If no links in DB, set the initial ones
        set(socialLinksRef, INITIAL_SOCIAL_LINKS);
      }
    });

    return () => {
      unsubscribeConfig();
      unsubscribeProducts();
      unsubscribeSocialLinks();
    };
  }, []);

  const handleSetHeaderTitle = (title: string) => {
    set(ref(db, 'config/headerTitle'), title);
  };

  const handleSetHeaderSubtitle = (subtitle: string) => {
    set(ref(db, 'config/headerSubtitle'), subtitle);
  };
  
  const handleSetLogoUrl = (url: string | null) => {
    set(ref(db, 'config/logoUrl'), url);
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    push(ref(db, 'products'), product);
  };

  const removeProduct = (id: string) => {
    removeDb(ref(db, `products/${id}`));
  };

  const updateSocialLink = (name: string, url: string) => {
    const linkIndex = socialLinks.findIndex(link => link.name === name);
    if (linkIndex !== -1) {
      set(ref(db, `socialLinks/${linkIndex}/url`), url);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans flex flex-col items-center p-4 sm:p-8 relative">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <Header title={headerTitle} subtitle={headerSubtitle} socialLinks={socialLinks} logoUrl={logoUrl} />
        <main className="p-4 space-y-3">
          <SearchBar />
          <PromoButton
            icon={<span className="font-bold text-orange-500 text-2xl">a</span>}
            text="Amazon Shopping"
            buttonText="Shop Now"
            bgColor="bg-yellow-50"
            borderColor="border-yellow-200"
            buttonColor="bg-blue-600"
            href="#"
          />
          <PromoButton
            text="Pakistan Up To 70% OFF"
            buttonText="Shop Now"
            bgColor="bg-blue-50"
            borderColor="border-blue-200"
            buttonColor="bg-blue-600"
            href="#"
          />
          <CouponBanner />
          <WhatsAppButton href="#"/>
          <div className="text-center text-gray-600 my-4">
            Discover amazing gadgets at unbeatable prices
          </div>
          <FeaturedProducts products={products} />
        </main>
        <Footer />
      </div>

      <button
        onClick={() => setIsAdminPanelOpen(!isAdminPanelOpen)}
        className="fixed bottom-4 right-4 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 z-50"
        aria-label="Toggle Admin Panel"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {isAdminPanelOpen && (
        <AdminPanel
          headerTitle={headerTitle}
          setHeaderTitle={handleSetHeaderTitle}
          headerSubtitle={headerSubtitle}
          setHeaderSubtitle={handleSetHeaderSubtitle}
          logoUrl={logoUrl}
          setLogoUrl={handleSetLogoUrl}
          products={products}
          addProduct={addProduct}
          removeProduct={removeProduct}
          socialLinks={socialLinks}
          updateSocialLink={updateSocialLink}
          onClose={() => setIsAdminPanelOpen(false)}
        />
      )}
    </div>
  );
}

export default App;