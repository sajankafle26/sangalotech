import { notFound } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';
import { connectToDatabase } from '@/lib/mongodb';
import type { Product } from '@/types';
import { Metadata } from 'next';

// ✅ Disable pre-rendering to prevent build-time DB connection
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: { id: string };
}

// ✅ Optional runtime metadata (no DB call at build)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `${params.id} | Sangalo Tech Products`,
    description: `Details about ${params.id} product from Sangalo Tech.`,
  };
}

// ✅ Fetch product only at runtime
const getProduct = async (id: string): Promise<Product | null> => {
  try {
    const { db } = await connectToDatabase();
    const product = await db.collection<Product>('products').findOne({ id });
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

const ProductPage = async ({ params }: PageProps) => {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={JSON.parse(JSON.stringify(product))} />;
};

export default ProductPage;
