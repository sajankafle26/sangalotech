import SearchResults from '@/components/SearchResults';
import { connectToDatabase } from '@/lib/mongodb';
import { SearchResult, Course, BlogPost, PortfolioItem } from '@/types';
import { Metadata } from 'next';

interface PageProps {
  searchParams: {
    q?: string;
  };
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const query = searchParams.q || '';
  return {
    title: `Search Results for "${query}" | Sangalo Tech`,
    description: `Find courses, blog posts, and portfolio projects related to "${query}".`,
  }
}

const SearchPage = async ({ searchParams }: PageProps) => {
  const query = searchParams.q || '';
  let results: SearchResult[] = [];

  if (query) {
    const { db } = await connectToDatabase();
    
    const coursesPromise = db.collection<Course>('courses').find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ]
    }).toArray();
    
    const blogsPromise = db.collection<BlogPost>('blogs').find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } }
      ]
    }).toArray();

    const portfolioItemsPromise = db.collection<PortfolioItem>('portfolio_items').find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    }).toArray();

    const [courses, blogs, portfolioItems] = await Promise.all([coursesPromise, blogsPromise, portfolioItemsPromise]);

    results = [...courses, ...blogs, ...portfolioItems];
  }

  return <SearchResults query={query} results={JSON.parse(JSON.stringify(results))} />;
};

export default SearchPage;