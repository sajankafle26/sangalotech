'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, label }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Upload failed');
      }
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during upload.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 flex items-center space-x-4">
        {value ? (
          <Image src={value} alt="Preview" width={80} height={80} className="object-cover rounded-md bg-gray-100" />
        ) : (
          <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
            <i className="fas fa-image text-2xl"></i>
          </div>
        )}
        <input 
          type="file" 
          onChange={handleFileChange} 
          disabled={uploading} 
          accept="image/*" 
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100" 
        />
      </div>
      {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default ImageUpload;