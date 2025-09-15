
export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  affiliateUrl: string;
}

export interface SocialLink {
  name: 'Facebook' | 'Instagram' | 'YouTube' | 'TikTok';
  url: string;
}
