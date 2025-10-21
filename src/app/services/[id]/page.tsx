import { notFound } from 'next/navigation';
import TechServiceDetail from '@/components/TechServiceDetail';
import { connectToDatabase } from '@/lib/mongodb';
import type { TechService } from '@/types';
import { Metadata } from 'next';

// ✅ Prevent pre-rendering (avoids DB connection during build)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: { id: string };
}

// ✅ Simple metadata — no DB fetch at build
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `${params.id} | Sangalo Tech Services`,
    description: `Learn more about our ${params.id} service at Sangalo Tech.`,
  };
}

// ✅ Fetch only at runtime
const getTechService = async (id: string): Promise<TechService | null> => {
  try {
    const { db } = await connectToDatabase();
    const service = await db.collection<TechService>('tech_services').findOne({ id });
    return service;
  } catch (error) {
    console.error('Error fetching tech service:', error);
    return null;
  }
};

const TechServicePage = async ({ params }: PageProps) => {
  const service = await getTechService(params.id);

  if (!service) {
    notFound();
  }

  return <TechServiceDetail service={JSON.parse(JSON.stringify(service))} />;
};

export default TechServicePage;
