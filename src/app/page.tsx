import Hero from '@/components/Hero';
import Courses from '@/components/Courses';
import Support from '@/components/Support';
import Products from '@/components/Products';
import Testimonials from '@/components/Testimonials';
import Blogs from '@/components/Blogs';
import Partners from '@/components/Partners';
import Portfolio from '@/components/Portfolio';
import UpcomingClassesHome from '@/components/UpcomingClassesHome';
import { connectToDatabase } from '@/lib/mongodb';
import { BlogPost, PortfolioItem, UpcomingClass } from '@/types';

async function getRecentBlogs() {
    const { db } = await connectToDatabase();
    const blogs = await db.collection<BlogPost>('blogs').find({}).sort({ date: -1 }).limit(3).toArray();
    return blogs;
}

async function getRecentPortfolioItems() {
    const { db } = await connectToDatabase();
    const items = await db.collection<PortfolioItem>('portfolio_items').find({}).sort({ _id: -1 }).limit(6).toArray();
    return items;
}

async function getUpcomingClasses() {
    const { db } = await connectToDatabase();
    const classes = await db.collection<UpcomingClass>('upcoming_classes').find({}).sort({ startDate: 1 }).limit(4).toArray();
    return classes;
}


export default async function HomePage() {
  const recentBlogs = await getRecentBlogs();
  const recentPortfolioItems = await getRecentPortfolioItems();
  const upcomingClasses = await getUpcomingClasses();

  return (
    <>
      <Hero />
      <Courses />
      <UpcomingClassesHome classes={JSON.parse(JSON.stringify(upcomingClasses))} />
      <Support />
      <Products />
      <Testimonials />
      <Portfolio items={JSON.parse(JSON.stringify(recentPortfolioItems))} />
      <Partners />
      <Blogs posts={JSON.parse(JSON.stringify(recentBlogs))} />
    </>
  );
}