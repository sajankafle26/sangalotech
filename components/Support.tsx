import React from 'react';

const Support: React.FC = () => {
    return (
        <section className="py-16 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
            <div className="max-w-6xl mx-auto px-6 md:px-0">
                <div className="text-center mb-14">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        <span className="text-[#00548B]">24/7 </span>
                        Student Support
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We're always here to help you with any questions or concerns
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="bg-white rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300">
                        <div className="p-8">
                            <div className="flex items-center mb-6">
                                <div className="bg-green-100 p-4 rounded-full text-green-600 mr-4 shadow-sm">
                                    <i className="fab fa-whatsapp text-2xl"></i>
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900">24/7 WhatsApp Support</h3>
                            </div>
                            <p className="text-gray-600 mb-6">
                                Connect instantly with our support team via WhatsApp for quick assistance.
                            </p>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-center">
                                    <i className="fas fa-clock text-gray-500 mr-3"></i> Available 24/7
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-phone-alt text-gray-500 mr-3"></i>
                                    <a href="https://wa.me/9851228383" className="text-green-600 hover:text-green-700 font-medium">
                                        +977-9851228383
                                    </a>
                                </li>
                            </ul>
                            <a href="https://wa.me/9851228383" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex w-full md:w-auto justify-center items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg">
                                <i className="fab fa-whatsapp text-lg mr-2"></i> Start WhatsApp Chat
                            </a>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300">
                        <div className="p-8">
                            <div className="flex items-center mb-6">
                                <div className="bg-blue-100 p-4 rounded-full text-[#00548B] mr-4 shadow-sm">
                                    <i className="fas fa-phone-volume text-xl"></i>
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900">Phone Support</h3>
                            </div>
                            <p className="text-gray-600 mb-6">
                                Call our landline for immediate assistance with academic or administrative queries.
                            </p>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-center">
                                    <i className="fas fa-clock text-gray-500 mr-3"></i> 10:00 AM - 5:00 PM (Sun-Fri)
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-phone-alt text-gray-500 mr-3"></i>
                                    <a href="tel:9851228383" className="text-[#00548B] hover:text-[#003f66] font-medium">
                                        9851228383 / 9841098383
                                    </a>
                                </li>
                            </ul>
                            <a href="tel:9851228383" className="mt-8 inline-flex w-full md:w-auto justify-center items-center px-6 py-3 bg-[#00548B] hover:bg-[#003f66] text-white rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg">
                                <i className="fas fa-phone mr-2"></i> Call Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Support;