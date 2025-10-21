import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | Sangalo Tech',
    description: 'Learn how Sangalo Tech Pvt. Ltd. collects, uses, and protects your personal information.',
};

const PrivacyPage: React.FC = () => {
    return (
        <div className="bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <p className="text-sm text-gray-500">
                        <Link href="/" className="text-[#00548B] hover:underline focus:outline-none">Home</Link> &gt; <span className="font-medium text-gray-700">Privacy Policy</span>
                    </p>
                    <h1 className="text-4xl font-extrabold text-[#00548B] mt-2">Privacy Policy</h1>
                </div>
            </header>

            <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white p-8 rounded-lg shadow prose prose-lg max-w-none">
                    <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                    <h2>1. Information We Collect</h2>
                    <p>We may collect personal information that you voluntarily provide to us when you register for a course, contact us, or use our services. This information may include:</p>
                    <ul>
                        <li>Name</li>
                        <li>Email address</li>
                        <li>Phone number</li>
                        <li>Course enrollment details</li>
                    </ul>

                    <h2>2. How We Use Your Information</h2>
                    <p>We use the information we collect to:</p>
                    <ul>
                        <li>Provide, operate, and maintain our services.</li>
                        <li>Improve, personalize, and expand our services.</li>
                        <li>Understand and analyze how you use our services.</li>
                        <li>Communicate with you, either directly or through one of our partners, for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.</li>
                        <li>Process your transactions.</li>
                        <li>Find and prevent fraud.</li>
                    </ul>
                    
                    <h2>3. Data Security</h2>
                    <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

                    <h2>4. Cookies</h2>
                    <p>We may use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>

                    <h2>5. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info@sangalotech.com">info@sangalotech.com</a>.</p>
                </div>
            </main>
        </div>
    );
};

export default PrivacyPage;