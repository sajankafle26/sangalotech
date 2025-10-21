import { notFound } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';
import { connectToDatabase } from '@/lib/mongodb';
import type { Product } from '@/types';
import { Metadata } from 'next';

interface PageProps {
  params: {
    id: 'school' | 'news' | 'clinic';
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProduct(params.id);
  if (!product) {
    return {
      title: 'Product Not Found'
    }
  }
  return {
    title: `${product.title} | Sangalo Tech Products`,
    description: product.description,
  }
}

// Statically generate routes for known products
export async function generateStaticParams() {
  const { db } = await connectToDatabase();
  const products = await db.collection<Product>('products').find({}, { projection: { id: 1 } }).toArray();
  return products.map((product) => ({
    id: product.id,
  }));
}

const getProduct = async (id: string): Promise<Product | null> => {
  const { db } = await connectToDatabase();
  const product = await db.collection<Product>('products').findOne({ id });
  return product;
};

const ProductPage = async ({ params }: PageProps) => {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={JSON.parse(JSON.stringify(product))} />;
};

export default ProductPage;