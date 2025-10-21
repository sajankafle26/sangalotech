import UpcomingClasses from '@/components/UpcomingClasses';
import { Metadata } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { UpcomingClass } from '@/types';

export const metadata: Metadata = {
    title: 'Upcoming Classes Schedule | Sangalo Tech',
    description: 'View the schedule for our upcoming IT training sessions. Book your spot now in our MERN Stack, Digital Marketing, and other job-ready courses.',
};

async function getClasses(): Promise<UpcomingClass[]> {
    const { db } = await connectToDatabase();
    const classes = await db.collection<UpcomingClass>('upcoming_classes').find({}).sort({ startDate: 1 }).toArray();
    return classes;
}


const UpcomingClassesPage = async () => {
    const classes = await getClasses();
    return <UpcomingClasses classes={JSON.parse(JSON.stringify(classes))} />;
};

export default UpcomingClassesPage;