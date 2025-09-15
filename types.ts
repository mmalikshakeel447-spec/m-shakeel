export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  affiliateUrl: string;
}

export interface SocialLink {
  name: 'Facebook' | 'Instagram' | 'YouTube' | 'TikTok';
  url: string;
}