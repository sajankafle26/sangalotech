import React from 'react';
import PortfolioForm from '@/components/admin/PortfolioForm';
import { PortfolioItem } from '@/types';

const NewPortfolioItemPage: React.FC = () => {
    const initialItemData: Partial<PortfolioItem> = {
        id: '',
        title: '',
        category: '',
        imageUrl: '',
        liveUrl: '',
        description: '',
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Portfolio Item</h1>
            <PortfolioForm initialData={initialItemData} />
        </div>
    );
};

export default NewPortfolioItemPage;