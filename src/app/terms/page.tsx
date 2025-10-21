import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms & Conditions | Sangalo Tech',
    description: 'Read the terms and conditions for using the Sangalo Tech Pvt. Ltd. website and services.',
};

const TermsPage: React.FC = () => {
    return (
        <div className="bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <p className="text-sm text-gray-500">
                        <Link href="/" className="text-[#00548B] hover:underline focus:outline-none">
                            Home
                        </Link>{' '}
                        &gt; <span className="font-medium text-gray-700">Terms &amp; Conditions</span>
                    </p>
                    <h1 className="text-4xl font-extrabold text-[#00548B] mt-2">Terms &amp; Conditions</h1>
                </div>
            </header>

            <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white p-8 rounded-lg shadow prose prose-lg max-w-none">
                    <p>
                        Last updated:{' '}
                        {new Date().toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </p>

                    <h2>1. Introduction</h2>
                    <p>
                        Welcome to Sangalo Tech Pvt. Ltd. (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;). These Terms and Conditions govern your use of our website located at [Your Website URL] and any related services provided by us.
                    </p>
                    <p>
                        By accessing our website, you agree to abide by these Terms and Conditions and to comply with all applicable laws and regulations. If you do not agree with these Terms and Conditions, you are prohibited from using or accessing this website.
                    </p>

                    <h2>2. Use License</h2>
                    <p>
                        Permission is granted to temporarily download one copy of the materials (information or software) on Sangalo Tech Pvt. Ltd.&apos;s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                    </p>
                    <ul>
                        <li>modify or copy the materials;</li>
                        <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                        <li>attempt to decompile or reverse engineer any software contained on our website;</li>
                        <li>remove any copyright or other proprietary notations from the materials; or</li>
                        <li>transfer the materials to another person or &quot;mirror&quot; the materials on any other server.</li>
                    </ul>
                    <p>
                        This license shall automatically terminate if you violate any of these restrictions and may be terminated by Sangalo Tech Pvt. Ltd. at any time.
                    </p>

                    <h2>3. Disclaimer</h2>
                    <p>
                        The materials on our website are provided on an &apos;as is&apos; basis. Sangalo Tech Pvt. Ltd. makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>

                    <h2>4. Limitations</h2>
                    <p>
                        In no event shall Sangalo Tech Pvt. Ltd. or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we or an authorized representative has been notified orally or in writing of the possibility of such damage.
                    </p>

                    <h2>5. Governing Law</h2>
                    <p>
                        These terms and conditions are governed by and construed in accordance with the laws of Nepal and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default TermsPage;
