import { notFound } from 'next/navigation';
import TechServiceDetail from '@/components/TechServiceDetail';
import { connectToDatabase } from '@/lib/mongodb';
import type { TechService } from '@/types';
import { Metadata } from 'next';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = await getTechService(params.id);
  if (!service) {
    return {
      title: 'Service Not Found'
    }
  }
  return {
    title: `${service.title} | Sangalo Tech Services`,
    description: service.description,
  }
}

export async function generateStaticParams() {
  const { db } = await connectToDatabase();
  const services = await db.collection<TechService>('tech_services').find({}, { projection: { id: 1 } }).toArray();
  return services.map((service) => ({
    id: service.id,
  }));
}

const getTechService = async (id: string): Promise<TechService | null> => {
  const { db } = await connectToDatabase();
  const service = await db.collection<TechService>('tech_services').findOne({ id });
  return service;
};

const TechServicePage = async ({ params }: PageProps) => {
  const service = await getTechService(params.id);

  if (!service) {
    notFound();
  }

  return <TechServiceDetail service={JSON.parse(JSON.stringify(service))} />;
};

export default TechServicePage;