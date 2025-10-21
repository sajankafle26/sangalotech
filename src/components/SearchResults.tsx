'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SearchResult } from '../types';

const SearchResultCard: React.FC<{ item: SearchResult }> = ({ item }) => {
  let type: string;
  let href: string;

  if ('price' in item) {
    // Course
    type = 'Course';
    href = `/courses/${item.id}`;
  } else if ('content' in item) {
    // Blog Post
    type = 'Blog Post';
    href = `/blogs/${item.id}`;
  } else {
    // Portfolio Item
    type = 'Portfolio Project';
    href = `/portfolio`;
  }

  return (
    <Link
      href={href}
      className="w-full text-left bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col md:flex-row"
    >
      <div className="md:w-1/3 relative h-48 md:h-auto">
        <Image
          src={item.imageUrl}
          alt={item.title}
          className="object-cover"
          fill
        />
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-red-500">
            {type}
          </p>
          <h3 className="text-2xl font-bold mt-1 text-gray-800">
            {item.title}
          </h3>
          <p className="mt-2 text-gray-600 line-clamp-3">{item.description}</p>
        </div>
        <div className="mt-4">
          <span className="text-red-500 font-semibold inline-flex items-center">
            View Details <i className="fas fa-arrow-right ml-2"></i>
          </span>
        </div>
      </div>
    </Link>
  );
};

const SearchResults: React.FC<{
  query: string;
  results: SearchResult[];
}> = ({ query, results }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-2">
            <Link
              href="/"
              className="text-[#00548B] hover:underline focus:outline-none"
            >
              Home
            </Link>{' '}
            &gt; <span>Search</span>
          </p>

          {/* ✅ Fixed quotes here */}
          <h1 className="text-3xl font-extrabold text-[#00548B]">
            Search Results for:{' '}
            <span className="text-gray-800">&quot;{query}&quot;</span>
          </h1>

          <p className="mt-2 text-gray-600">
            {results.length} result{results.length !== 1 && 's'} found.
          </p>
        </div>
      </header>

      {/* Results */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {results.length > 0 ? (
          <div className="space-y-8">
            {results.map((item) => (
              <SearchResultCard
                key={`${
                  'price' in item
                    ? 'course-'
                    : 'content' in item
                    ? 'blog-'
                    : 'portfolio-'
                }${item.id}`}
                item={item}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-700">
              No Results Found
            </h2>
            <p className="text-gray-500 mt-2">
              We couldn&apos;t find anything matching your search. Try a
              different keyword.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchResults;
