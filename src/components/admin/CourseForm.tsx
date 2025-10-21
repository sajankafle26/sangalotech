'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Course } from '@/types';
import ImageUpload from './ImageUpload';

interface CourseFormProps {
    initialData: Partial<Course>;
    isEditing?: boolean;
}

const CourseForm: React.FC<CourseFormProps> = ({ initialData, isEditing = false }) => {
    const [course, setCourse] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    // --- General Change Handler ---
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const isNumber = 'type' in e.target && e.target.type === 'number';
        setCourse(prev => ({ ...prev, [name]: isNumber ? Number(value) : value }));
    };

    // --- What You Will Learn Handlers ---
    const handleLearnChange = (index: number, value: string) => {
        const newLearnItems = [...(course.whatYouWillLearn || [])];
        newLearnItems[index] = value;
        setCourse(prev => ({ ...prev, whatYouWillLearn: newLearnItems }));
    };

    const addLearnItem = () => {
        setCourse(prev => ({ ...prev, whatYouWillLearn: [...(prev.whatYouWillLearn || []), ''] }));
    };

    const removeLearnItem = (index: number) => {
        const newLearnItems = [...(course.whatYouWillLearn || [])];
        newLearnItems.splice(index, 1);
        setCourse(prev => ({ ...prev, whatYouWillLearn: newLearnItems }));
    };

    // --- Syllabus Handlers ---
    const handleSyllabusModuleChange = (moduleIndex: number, value: string) => {
        const newSyllabus = JSON.parse(JSON.stringify(course.syllabus || []));
        newSyllabus[moduleIndex].title = value;
        setCourse(prev => ({ ...prev, syllabus: newSyllabus }));
    };
    
    const handleSyllabusTopicChange = (moduleIndex: number, topicIndex: number, value: string) => {
        const newSyllabus = JSON.parse(JSON.stringify(course.syllabus || []));
        newSyllabus[moduleIndex].topics[topicIndex] = value;
        setCourse(prev => ({ ...prev, syllabus: newSyllabus }));
    };

    const addSyllabusModule = () => {
        setCourse(prev => ({ ...prev, syllabus: [...(prev.syllabus || []), { title: '', topics: [''] }] }));
    };

    const removeSyllabusModule = (moduleIndex: number) => {
        const newSyllabus = [...(course.syllabus || [])];
        newSyllabus.splice(moduleIndex, 1);
        setCourse(prev => ({ ...prev, syllabus: newSyllabus }));
    };

    const addSyllabusTopic = (moduleIndex: number) => {
        const newSyllabus = JSON.parse(JSON.stringify(course.syllabus || []));
        newSyllabus[moduleIndex].topics.push('');
        setCourse(prev => ({ ...prev, syllabus: newSyllabus }));
    };

    const removeSyllabusTopic = (moduleIndex: number, topicIndex: number) => {
        const newSyllabus = JSON.parse(JSON.stringify(course.syllabus || []));
        newSyllabus[moduleIndex].topics.splice(topicIndex, 1);
        setCourse(prev => ({ ...prev, syllabus: newSyllabus }));
    };

    // --- Instructor Handler ---
    const handleInstructorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCourse(prev => ({
            ...prev,
            instructor: { ...(prev.instructor || { name: '', title: '', bio: '', imageUrl: '' }), [name]: value }
        }));
    };
    
    // --- Testimonials Handlers ---
    const handleTestimonialChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newTestimonials = JSON.parse(JSON.stringify(course.testimonials || []));
        newTestimonials[index][name] = value;
        setCourse(prev => ({ ...prev, testimonials: newTestimonials }));
    };

    const addTestimonial = () => {
        setCourse(prev => ({ ...prev, testimonials: [...(prev.testimonials || []), { studentName: '', review: '', imageUrl: '' }] }));
    };
    
    const removeTestimonial = (index: number) => {
        const newTestimonials = [...(course.testimonials || [])];
        newTestimonials.splice(index, 1);
        setCourse(prev => ({ ...prev, testimonials: newTestimonials }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const url = isEditing ? `/api/courses/${course.id}` : '/api/courses';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(course),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || `Failed to ${isEditing ? 'update' : 'create'} course`);
            }
            router.push('/admin/dashboard');
            router.refresh(); // Invalidate cache and refetch data on dashboard
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };
    
    const inputClass = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500";
    const labelClass = "block text-sm font-medium text-gray-700";
    const fieldsetClass = "p-4 border rounded-md space-y-4";
    const legendClass = "text-lg font-semibold text-gray-800 px-2";
    const smallButtonClass = "px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600";
    const addButtonClass = "px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600";

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
            
            <fieldset className={fieldsetClass}>
                <legend className={legendClass}>Basic Information</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="id" className={labelClass}>Course ID (Unique Slug)</label>
                        <input type="text" name="id" id="id" value={course.id} onChange={handleChange} required disabled={isEditing} className={`${inputClass} disabled:bg-gray-100`} />
                    </div>
                    <div>
                        <label htmlFor="title" className={labelClass}>Title</label>
                        <input type="text" name="title" id="title" value={course.title} onChange={handleChange} required className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="category" className={labelClass}>Category</label>
                        <select name="category" id="category" value={course.category} onChange={handleChange} className={inputClass}>
                            <option value="js">JavaScript</option>
                            <option value="dm">Digital Marketing</option>
                            <option value="wp">WordPress</option>
                            <option value="laravel">PHP Laravel</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="price" className={labelClass}>Price</label>
                        <input type="text" name="price" id="price" value={course.price} onChange={handleChange} required className={inputClass} />
                    </div>
                     <div>
                        <label htmlFor="duration" className={labelClass}>Duration</label>
                        <input type="text" name="duration" id="duration" value={course.duration} onChange={handleChange} required className={inputClass} placeholder="e.g., 2 Hours per day"/>
                    </div>
                    <div>
                        <label htmlFor="tag" className={labelClass}>Tag (Optional)</label>
                        <input type="text" name="tag" id="tag" value={course.tag} onChange={handleChange} className={inputClass} placeholder="e.g., 1st month Modules I"/>
                    </div>
                </div>
            </fieldset>

            <fieldset className={fieldsetClass}>
                <legend className={legendClass}>Details & Descriptions</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label htmlFor="skillLevel" className={labelClass}>Skill Level</label>
                        <input type="text" name="skillLevel" id="skillLevel" value={course.skillLevel} onChange={handleChange} className={inputClass} placeholder="e.g., Beginner"/>
                    </div>
                     <div>
                        <label htmlFor="language" className={labelClass}>Language</label>
                        <input type="text" name="language" id="language" value={course.language} onChange={handleChange} className={inputClass} placeholder="e.g., English"/>
                    </div>
                     <div>
                        <label htmlFor="students" className={labelClass}>Students Enrolled</label>
                        <input type="number" name="students" id="students" value={course.students} onChange={handleChange} className={inputClass} />
                    </div>
                     <div>
                        <label htmlFor="rating" className={labelClass}>Rating (0-5)</label>
                        <input type="number" name="rating" id="rating" value={course.rating} onChange={handleChange} step="0.1" min="0" max="5" className={inputClass} />
                    </div>
                </div>
                 <div>
                    <label htmlFor="description" className={labelClass}>Short Description</label>
                    <textarea name="description" id="description" value={course.description} onChange={handleChange} rows={3} className={inputClass} />
                </div>
                 <div>
                    <label htmlFor="longDescription" className={labelClass}>Long Description</label>
                    <textarea name="longDescription" id="longDescription" value={course.longDescription} onChange={handleChange} rows={5} className={inputClass} />
                </div>
                 <div>
                    <ImageUpload 
                        label="Course Image"
                        value={course.imageUrl || ''}
                        onChange={(url) => setCourse(prev => ({...prev, imageUrl: url}))}
                    />
                </div>
            </fieldset>

            <fieldset className={fieldsetClass}>
                <legend className={legendClass}>What You&apos;ll Learn</legend>
                {course.whatYouWillLearn?.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <input type="text" value={item} onChange={(e) => handleLearnChange(index, e.target.value)} className={`${inputClass} w-full`} />
                        <button type="button" onClick={() => removeLearnItem(index)} className={smallButtonClass}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={addLearnItem} className={addButtonClass}>Add Item</button>
            </fieldset>
            
            <fieldset className={fieldsetClass}>
                <legend className={legendClass}>Syllabus</legend>
                {course.syllabus?.map((module, moduleIndex) => (
                    <div key={moduleIndex} className="p-4 border rounded-md bg-gray-50 space-y-3">
                        <div className="flex items-center gap-2">
                            <input type="text" placeholder="Module Title" value={module.title} onChange={(e) => handleSyllabusModuleChange(moduleIndex, e.target.value)} className={`${inputClass} w-full font-semibold`} />
                            <button type="button" onClick={() => removeSyllabusModule(moduleIndex)} className={smallButtonClass}>Remove Module</button>
                        </div>
                        <div className="pl-4 space-y-2">
                            <label className="text-sm font-medium text-gray-600">Topics</label>
                            {module.topics.map((topic, topicIndex) => (
                                <div key={topicIndex} className="flex items-center gap-2">
                                    <input type="text" placeholder="Topic" value={topic} onChange={(e) => handleSyllabusTopicChange(moduleIndex, topicIndex, e.target.value)} className={`${inputClass} w-full`} />
                                    <button type="button" onClick={() => removeSyllabusTopic(moduleIndex, topicIndex)} className={smallButtonClass}>Remove</button>
                                </div>
                            ))}
                            <button type="button" onClick={() => addSyllabusTopic(moduleIndex)} className={addButtonClass}>Add Topic</button>
                        </div>
                    </div>
                ))}
                 <button type="button" onClick={addSyllabusModule} className={addButtonClass}>Add Module</button>
            </fieldset>
            
            <fieldset className={fieldsetClass}>
                <legend className={legendClass}>Instructor Details</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="instructorName" className={labelClass}>Name</label>
                        <input type="text" name="name" id="instructorName" value={course.instructor?.name} onChange={handleInstructorChange} className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="instructorTitle" className={labelClass}>Title</label>
                        <input type="text" name="title" id="instructorTitle" value={course.instructor?.title} onChange={handleInstructorChange} className={inputClass} />
                    </div>
                     <div className="md:col-span-2">
                         <ImageUpload 
                            label="Instructor Image"
                            value={course.instructor?.imageUrl || ''}
                            onChange={(url) => setCourse(prev => ({...prev, instructor: {
                                ...(prev.instructor || { name: '', title: '', bio: '', imageUrl: '' }), 
                                imageUrl: url
                            }}))}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="instructorBio" className={labelClass}>Bio</label>
                        <textarea name="bio" id="instructorBio" value={course.instructor?.bio} onChange={handleInstructorChange} rows={3} className={inputClass} />
                    </div>
                </div>
            </fieldset>

            <fieldset className={fieldsetClass}>
                <legend className={legendClass}>Testimonials</legend>
                 {course.testimonials?.map((testimonial, index) => (
                    <div key={index} className="p-4 border rounded-md bg-gray-50 space-y-3">
                        <div className="flex justify-end">
                            <button type="button" onClick={() => removeTestimonial(index)} className={smallButtonClass}>Remove Testimonial</button>
                        </div>
                        <div>
                            <label htmlFor={`studentName-${index}`} className={labelClass}>Student Name</label>
                            <input type="text" name="studentName" id={`studentName-${index}`} value={testimonial.studentName} onChange={(e) => handleTestimonialChange(index, e)} className={inputClass} />
                        </div>
                         <div>
                            <label htmlFor={`review-${index}`} className={labelClass}>Review</label>
                            <textarea name="review" id={`review-${index}`} value={testimonial.review} onChange={(e) => handleTestimonialChange(index, e)} rows={3} className={inputClass} />
                        </div>
                         <div>
                            <ImageUpload 
                                label="Student Image"
                                value={testimonial.imageUrl || ''}
                                onChange={(url) => {
                                    const newTestimonials = JSON.parse(JSON.stringify(course.testimonials || []));
                                    newTestimonials[index].imageUrl = url;
                                    setCourse(prev => ({ ...prev, testimonials: newTestimonials }));
                                }}
                            />
                        </div>
                    </div>
                 ))}
                 <button type="button" onClick={addTestimonial} className={addButtonClass}>Add Testimonial</button>
            </fieldset>

            {error && <p className="text-sm text-red-600 text-center bg-red-100 p-2 rounded-md">{error}</p>}
            
            <div className="flex justify-end gap-4 pt-4 border-t">
                <button type="button" onClick={() => router.back()} className="px-4 py-2 font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                    Cancel
                </button>
                <button type="submit" disabled={loading} className="px-6 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 disabled:opacity-50 min-w-[120px]">
                    {loading ? <i className="fas fa-spinner fa-spin"></i> : (isEditing ? 'Update Course' : 'Create Course')}
                </button>
            </div>
        </form>
    );
};

export default CourseForm;
