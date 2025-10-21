import { notFound } from 'next/navigation';
import CourseDetail from '@/components/CourseDetail';
import { connectToDatabase } from '@/lib/mongodb';
import type { Course } from '@/types';
import { Metadata } from 'next';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const course = await getCourse(params.id);
  if (!course) {
    return {
      title: 'Course Not Found'
    }
  }
  return {
    title: `${course.title} | Sangalo Tech`,
    description: course.longDescription,
  }
}

export async function generateStaticParams() {
  const { db } = await connectToDatabase();
  const courses = await db.collection<Course>('courses').find({}, { projection: { id: 1 } }).toArray();
  return courses.map((course) => ({
    id: course.id,
  }));
}

const getCourse = async (id: string): Promise<Course | null> => {
  const { db } = await connectToDatabase();
  const course = await db.collection<Course>('courses').findOne({ id });
  return course;
};

const CoursePage = async ({ params }: PageProps) => {
  const course = await getCourse(params.id);

  if (!course) {
    notFound();
  }

  return <CourseDetail course={JSON.parse(JSON.stringify(course))} />;
};

export default CoursePage;