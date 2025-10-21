import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '../types';

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group flex flex-col"><div className="relative overflow-hidden aspect-[16/9]"><Image
        src={post.imageUrl}
        alt={post.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-lg"
      /><div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div></div><div className="p-6 space-y-4 flex flex-col flex-grow"><div className="flex items-center text-sm text-gray-500"><i className="far fa-calendar-alt h-4 w-4 mr-1"></i>
        {post.date}
      </div><h3 className="text-xl font-bold text-gray-800 line-clamp-2 flex-grow">{post.title}</h3><p className="text-gray-600 line-clamp-2">{post.description}</p><div className="pt-2"><Link
          href={`/blogs/${post.id}`}
          className="inline-flex items-center text-red-500 font-medium group-hover:text-red-600 transition-colors duration-300"
        >
          Read more
          <i className="fas fa-arrow-right h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"></i></Link></div></div></div>
);

const Blogs: React.FC<{ posts: BlogPost[] }> = ({ posts }) => {
  return (
    <section className="blog py-10 bg-gray-100"><div className="max-w-[1200px] mx-auto space-y-5 md:px-0 px-3"><div className="flex justify-between items-center"><div className="md:w-[50%]"><h2 className="text-[32px] font-bold md:text-[26px] lg:text-[30px] xl:text-[38px] leading-[110%]">
              Blogs
            </h2><p className="text-sm italic">
              Explore ideas, tips, and trends in coding, tech, and innovation. From tutorials to
              career advice, our blogs are here to inform, inspire, and empower your journey.
            </p></div><div className="hidden lg:block"><a
              href="#"
              className="text-[var(--red)] font-semibold hover:underline flex items-center gap-1.5 text-[15px] justify-center mt-4 mb-5"
            >
              View All <i className="fa-solid fa-arrow-right"></i></a></div></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div><div className="text-center pt-5 lg:hidden mb-5"><a
            href="#"
            className="text-[var(--red)] font-semibold hover:underline flex items-center gap-1.5 text-[15px] justify-center mt-4"
          >
            View All <i className="fa-solid fa-arrow-right"></i></a></div></div></section>
  );
};

export default Blogs;
