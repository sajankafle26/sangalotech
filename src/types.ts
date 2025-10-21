import { ObjectId } from "mongodb";

export interface Course {
  _id?: ObjectId;
  id: string;
  category: 'js' | 'dm' | 'wp' | 'laravel';
  title: string;
  description: string;
  price: string;
  duration: string;
  imageUrl: string;
  tag?: string;
  skillLevel: string;
  language: string;
  students: number;
  rating: number;
  longDescription: string;
  whatYouWillLearn: string[];
  syllabus: {
    title: string;
    topics: string[];
  }[];
  instructor: {
    name: string;
    title: string;
    bio: string;
    imageUrl: string;
  };
  testimonials: {
    studentName: string;
    review: string;
    imageUrl: string;
  }[];
}

export interface Product {
  _id?: ObjectId;
  id: 'school' | 'news' | 'clinic';
  title: string;
  description: string;
  imageUrl: string;
}

export interface BlogPost {
  _id?: ObjectId;
  id: number;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  link: string;
  authorName: string;
  authorImageUrl: string;
  tags: string[];
  content: string;
}

export interface TechService {
  _id?: ObjectId;
  id: string;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  features: string[];
}

export interface UpcomingClass {
  _id?: ObjectId;
  id: string;
  courseId: string;
  courseTitle: string;
  startDate: string;
  day: string;
  time: string;
  instructor: string;
}

export interface PortfolioItem {
  _id?: ObjectId;
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  liveUrl?: string;
  description: string;
}

export interface TeamMember {
  _id?: ObjectId;
  id: string;
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
}

export interface CompanyValue {
    _id?: ObjectId;
    icon: string;
    title: string;
    description: string;
}

export interface StudentTestimonial {
    _id?: ObjectId;
    name: string;
    course: string;
    review: string;
    imageUrl: string;
}

export interface ClientTestimonial {
    _id?: ObjectId;
    name: string;
    company: string;
    review: string;
    imageUrl: string;
}

// Fix: Added the missing Booking interface.
export interface Booking {
  _id?: ObjectId;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  course: {
    id: string;
    title: string;
  };
  bookedAt: Date;
  status: 'pending' | 'confirmed' | 'contacted';
}

// Fix: Added missing ContactMessage interface.
export interface ContactMessage {
  _id?: ObjectId;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  receivedAt: Date;
}

// Fix: Added missing SiteSettings interface.
export interface SiteSettings {
  _id?: string | ObjectId;
  logoUrl: string;
  logoUrlWhite: string;
  phone: string;
  whatsapp: string;
  email: string;
  socials: {
    facebook: string;
    youtube: string;
    linkedin: string;
    instagram: string;
  };
}

// Fix: Added missing Partner interface.
export interface Partner {
  _id?: ObjectId;
  name: string;
  logoUrl: string;
}

// Fix: Added missing Job interface to resolve import errors.
export interface Job {
  _id?: ObjectId;
  id: string; // unique slug-like id
  title: string;
  type: 'Internship' | 'Full-time' | 'Part-time' | 'Contract';
  location: string;
  department: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  postedAt: Date;
}

export type SearchResult = Course | BlogPost | PortfolioItem;
