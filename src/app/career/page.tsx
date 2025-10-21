import CareerPage from '@/components/CareerPage';
import { Metadata } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { Job } from '@/types';

export const metadata: Metadata = {
    title: 'Career & Internships | Sangalo Tech',
    description: 'Join our team! Explore career and internship opportunities at Sangalo Tech and help us build the future of technology in Nepal.',
};

async function getJobs(): Promise<Job[]> {
    const { db } = await connectToDatabase();
    const jobs = await db.collection<Job>('jobs').find({}).sort({ postedAt: -1 }).toArray();
    return jobs;
}

const Career = async () => {
    const jobs = await getJobs();
    return <CareerPage jobs={JSON.parse(JSON.stringify(jobs))} />;
};

export default Career;
