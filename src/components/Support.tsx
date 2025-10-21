import React from 'react';

const Support: React.FC = () => {
    return (
        <section className="py-16 bg-white"><div className="max-w-6xl mx-auto px-6 md:px-0"><div className="text-center mb-14"><h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"><span className="text-[#00548B]">24/7 </span>
                        Student Support
                    </h2><p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We&apos;re always here to help you succeed. Our dedicated support team is just a message or a call away.
                    </p></div><div className="grid grid-cols-1 md:grid-cols-2 gap-10"><div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 p-8 text-center"><div className="bg-green-100 p-4 rounded-full text-green-600 text-3xl mb-4 inline-block shadow-sm"><i className="fab fa-whatsapp"></i></div><h3 className="text-2xl font-semibold text-gray-900">24/7 WhatsApp Support</h3><p className="text-gray-600 my-4">
                            Connect instantly with our support team for quick assistance with your queries.
                        </p><a href="https://wa.me/9851228383" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center justify-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"><i className="fab fa-whatsapp text-lg mr-2"></i> Start Chat
                        </a></div><div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 p-8 text-center"><div className="bg-blue-100 p-4 rounded-full text-[#00548B] text-3xl mb-4 inline-block shadow-sm"><i className="fas fa-phone-volume"></i></div><h3 className="text-2xl font-semibold text-gray-900">Phone Support</h3><p className="text-gray-600 my-4">
                            Call us for immediate assistance with academic or administrative questions during office hours.
                        </p><a href="tel:9851228383" className="mt-4 inline-flex items-center justify-center px-6 py-3 bg-[#00548B] hover:bg-[#003f66] text-white rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"><i className="fas fa-phone mr-2"></i> Call Now
                        </a></div></div></div></section>
    );
};

export default Support;