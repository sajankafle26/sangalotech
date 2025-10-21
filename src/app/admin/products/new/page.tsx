import React from 'react';
import ProductForm from '@/components/admin/ProductForm';
import { Product } from '@/types';

const NewProductPage: React.FC = () => {
    const initialItemData: Partial<Product> = {
        id: 'school',
        title: '',
        description: '',
        imageUrl: '',
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h1>
            <ProductForm initialData={initialItemData} />
        </div>
    );
};

export default NewProductPage;