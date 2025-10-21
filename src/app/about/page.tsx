import AboutUs from '@/components/AboutUs';
import { Metadata } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { TeamMember, CompanyValue } from '@/types';

export const metadata: Metadata = {
    title: 'About Us | Sangalo Tech',
    description: 'Learn about Sangalo Tech\'s mission to empower tech talent and deliver innovative software solutions in Nepal. Meet our team and discover our core values.',
};

async function getTeamMembers() {
    const { db } = await connectToDatabase();
    const members = await db.collection<TeamMember>('team_members').find({}).toArray();
    return members;
}

async function getCompanyValues() {
    // This data is less likely to change, but we'll fetch it for consistency.
    // The user should seed the `company_values` collection.
    const { db } = await connectToDatabase();
    const values = await db.collection<CompanyValue>('company_values').find({}).toArray();
    return values;
}

const AboutPage = async () => {
  const teamMembers = await getTeamMembers();
  const companyValues = await getCompanyValues();

  return <AboutUs teamMembers={JSON.parse(JSON.stringify(teamMembers))} companyValues={JSON.parse(JSON.stringify(companyValues))} />;
};

export default AboutPage;