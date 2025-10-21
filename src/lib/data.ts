import { connectToDatabase } from './mongodb';
import { SiteSettings } from '@/types';

// Default settings to prevent the site from breaking if the database is not populated
const defaultSettings: SiteSettings = {
  logoUrl: '/logo.png',
  logoUrlWhite: '/logo-white.png',
  phone: '01-5839127',
  whatsapp: '9851228383',
  email: 'info@sangalotech.com',
  socials: {
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
  },
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const { db } = await connectToDatabase();
    // There should only be one document in the settings collection
    const settings = await db.collection('settings').findOne({});
    
    if (settings) {
      // Return a plain object to avoid serialization issues with Next.js
      return {
        _id: 'global_settings',
        logoUrl: settings.logoUrl || defaultSettings.logoUrl,
        logoUrlWhite: settings.logoUrlWhite || defaultSettings.logoUrlWhite,
        phone: settings.phone || defaultSettings.phone,
        whatsapp: settings.whatsapp || defaultSettings.whatsapp,
        email: settings.email || defaultSettings.email,
        socials: settings.socials || defaultSettings.socials,
      };
    }
    return defaultSettings;
  } catch (error) {
    console.error("Failed to fetch site settings, returning default values:", error);
    return defaultSettings;
  }
}