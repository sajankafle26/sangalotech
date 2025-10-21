'use client';

import React, { useState, useEffect } from 'react';

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set up the event listener
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    // Scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className={`fixed bottom-5 right-5 z-50 p-3 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 ease-in-out transform hover:-translate-y-1
            ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        >
            <i className="fas fa-arrow-up text-lg"></i>
        </button>
    );
};

export default ScrollToTopButton;