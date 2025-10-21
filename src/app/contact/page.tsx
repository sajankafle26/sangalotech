import ContactUs from '@/components/ContactUs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | Sangalo Tech',
    description: 'Get in touch with Sangalo Tech. Ask about our IT training courses, tech services, or start your project with us today. We are located in Lokenthali, Bhaktapur.',
};

const ContactPage = () => {
  return <ContactUs />;
};

export default ContactPage;