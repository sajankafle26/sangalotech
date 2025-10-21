import JobReady from '@/components/JobReady';
import { Metadata } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { Course } from '@/types';

export const metadata: Metadata = {
    title: 'Job-Ready Full-Stack Developer Program | Sangalo Tech',
    description: 'Our most comprehensive program designed to take you from a complete beginner to a confident, job-ready MERN stack developer in just 4 months.',
};

async function getJobReadyCourses() {
    const { db } = await connectToDatabase();
    // Assuming 'js' category courses are sorted by a specific field if order matters, e.g., 'tag' or a new 'order' field.
    const courses = await db.collection<Course>('courses').find({ category: 'js' }).sort({ tag: 1 }).limit(4).toArray();
    return courses;
}

const JobReadyPage = async () => {
  const jobReadyCourses = await getJobReadyCourses();
  return <JobReady courses={JSON.parse(JSON.stringify(jobReadyCourses))} />;
};

export default JobReadyPage;