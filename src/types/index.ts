import React from 'react';

export interface NavItem {
  label: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: React.ElementType; // For potential icons in nav
}

export interface Allergen {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string;
  category: string; // e.g., "Entrées", "Plats", "Desserts"
  allergenIds?: string[];
  tags?: string[]; // e.g., "Nouveau", "Populaire", "Signature"
}

export interface MenuCategory {
  name: string;
  icon?: React.ElementType;
  items: MenuItem[];
  description?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  stars: number;
  avatar?: string; // URL to avatar image
}

export interface GalleryMedia {
  type: 'image' | 'video';
  src: string;
  alt: string;
  thumbnail?: string; // For videos - Added thumbnail property
}

// You can expand these types as your application grows
