'use client';

import React, { useState, useEffect } from 'react';
import { SiteSettings, SocialLinks } from '@/types';
import ImageUpload from '@/components/admin/ImageUpload';

const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<Partial<SiteSettings>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/settings');
        if (!res.ok) throw new Error('Failed to fetch settings');
        const data = await res.json();
        setSettings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      socials: {
        ...prev.socials,
        [name]: value,
      } as SocialLinks,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to save settings');
      }
      setSuccess('Settings saved successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred.');
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    'mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500';
  const labelClass = 'block text-sm font-medium text-gray-700';

  if (loading) {
    return <p>Loading settings...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Site Settings</h1>

      {error && (
        <p className="text-sm text-red-600 text-center bg-red-100 p-3 rounded-md">{error}</p>
      )}
      {success && (
        <p className="text-sm text-green-600 text-center bg-green-100 p-3 rounded-md">{success}</p>
      )}

      {/* Logos */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-gray-800">Logos</legend>
        <div>
          <ImageUpload
            label="Main Logo (for light backgrounds)"
            value={settings.logoUrl || ''}
            onChange={url => setSettings(prev => ({ ...prev, logoUrl: url }))}
          />
        </div>
        <div>
          <ImageUpload
            label="Footer Logo (for dark backgrounds)"
            value={settings.logoUrlWhite || ''}
            onChange={url => setSettings(prev => ({ ...prev, logoUrlWhite: url }))}
          />
        </div>
      </fieldset>

      {/* Contact Information */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-gray-800">Contact Information</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={settings.phone || ''}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="whatsapp" className={labelClass}>
              WhatsApp Number
            </label>
            <input
              type="text"
              name="whatsapp"
              id="whatsapp"
              value={settings.whatsapp || ''}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={settings.email || ''}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </fieldset>

      {/* Social Media Links */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-gray-800">Social Media Links</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="facebook" className={labelClass}>
              Facebook URL
            </label>
            <input
              type="text"
              name="facebook"
              id="facebook"
              value={settings.socials?.facebook || ''}
              onChange={handleSocialChange}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="youtube" className={labelClass}>
              YouTube URL
            </label>
            <input
              type="text"
              name="youtube"
              id="youtube"
              value={settings.socials?.youtube || ''}
              onChange={handleSocialChange}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="linkedin" className={labelClass}>
              LinkedIn URL
            </label>
            <input
              type="text"
              name="linkedin"
              id="linkedin"
              value={settings.socials?.linkedin || ''}
              onChange={handleSocialChange}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="instagram" className={labelClass}>
              Instagram URL
            </label>
            <input
              type="text"
              name="instagram"
              id="instagram"
              value={settings.socials?.instagram || ''}
              onChange={handleSocialChange}
              className={inputClass}
            />
          </div>
        </div>
      </fieldset>

      <div className="flex justify-end pt-4 border-t">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 disabled:opacity-50 min-w-[150px]"
        >
          {saving ? (
            <>
              <i className="fas fa-spinner fa-spin mr-2"></i>Saving...
            </>
          ) : (
            'Save Settings'
          )}
        </button>
      </div>
    </form>
  );
};

export default AdminSettingsPage;
