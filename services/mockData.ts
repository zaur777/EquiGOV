
import { User, UserRole, Company, Meeting, Shareholder, Document, Resolution, Emission } from '../types';

export const mockCurrentUser: User = {
  id: 'u-1',
  name: 'Platform Administrator',
  email: 'admin@equigov.az',
  role: UserRole.ADMIN,
  myGovIdVerified: true,
  avatar: 'https://picsum.photos/seed/admin/200'
};

const threeMonthsAgo = new Date();
threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

const oneMonthAgo = new Date();
oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

export const mockCompanies: Company[] = [
  {
    id: 'c-1',
    name: 'Azerbaijan Tech Corp',
    registrationNumber: 'AZ-99827361',
    totalShares: 1000000,
    onboardingStatus: 'ACTIVE',
    joinedAt: threeMonthsAgo.toISOString(),
    trialEndDate: new Date(threeMonthsAgo.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    shareholderCount: 45
  },
  {
    id: 'c-2',
    name: 'Baku Energy Solutions',
    registrationNumber: 'AZ-11223344',
    totalShares: 500000,
    onboardingStatus: 'ACTIVE',
    joinedAt: oneMonthAgo.toISOString(),
    trialEndDate: new Date(oneMonthAgo.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    shareholderCount: 150
  },
  {
    id: 'c-3',
    name: 'Ganja Logistics Ltd',
    registrationNumber: 'AZ-55667788',
    totalShares: 250000,
    onboardingStatus: 'PENDING',
    joinedAt: new Date().toISOString(),
    trialEndDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    shareholderCount: 12
  },
  {
    id: 'c-4',
    name: 'Caspian Fin Services',
    registrationNumber: 'AZ-44332211',
    totalShares: 800000,
    onboardingStatus: 'SUSPENDED',
    joinedAt: '2023-05-10',
    trialEndDate: '2023-08-10',
    shareholderCount: 1200
  }
];

export const mockShareholders: Shareholder[] = [
  { id: 'sh-1', companyId: 'c-1', userId: 'u-101', name: 'James Wilson', sharesOwned: 250000, votingPower: 25, contactMethod: 'email', verificationStatus: 'VERIFIED', billingStatus: 'PAID' },
  { id: 'sh-2', companyId: 'c-1', userId: 'u-102', name: 'Leyla Mammadova', sharesOwned: 150000, votingPower: 15, contactMethod: 'whatsapp', verificationStatus: 'PENDING', billingStatus: 'UNPAID' },
  { id: 'sh-3', companyId: 'c-1', userId: 'u-103', name: 'Global Investment Fund', sharesOwned: 500000, votingPower: 50, contactMethod: 'email', verificationStatus: 'VERIFIED', billingStatus: 'PAID' },
  { id: 'sh-4', companyId: 'c-1', userId: 'u-104', name: 'Individual Investor A', sharesOwned: 100000, votingPower: 10, contactMethod: 'email', verificationStatus: 'FAILED', billingStatus: 'UNPAID' },
  { id: 'sh-5', companyId: 'c-1', userId: 'u-105', name: 'Farhad Guliyev', sharesOwned: 50000, votingPower: 5, contactMethod: 'email', verificationStatus: 'UNVERIFIED', billingStatus: 'PAID' },
];

export const mockMeetings: Meeting[] = [
  {
    id: 'm-1',
    companyId: 'c-1',
    title: 'Annual General Meeting 2024',
    description: 'Discussion of Q4 results and appointment of new Board Members.',
    scheduledAt: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'SCHEDULED',
    meetLink: 'https://meet.google.com/abc-defg-hij',
    documents: [
      { id: 'd-1', title: 'Annual Report 2023', url: '#', timestamp: '2024-01-15T10:00:00Z', type: 'ANNUAL_REPORT' },
      { id: 'd-2', title: 'Board Re-election Proposal', url: '#', timestamp: '2024-02-01T14:30:00Z', type: 'RESOLUTION' }
    ]
  }
];

export const mockResolutions: Resolution[] = [
  { id: 'res-1', meetingId: 'm-1', title: 'Approve 2023 Financial Statements', description: 'Formal approval of audited financial reports.' },
  { id: 'res-2', meetingId: 'm-1', title: 'Elect Sarah Jenkins to Board', description: 'Appointment of independent director.' }
];

export const mockEmissions: Emission[] = [
  {
    id: 'e-1',
    companyId: 'c-1',
    type: 'STOCK',
    totalAmount: 500000,
    parPrice: 2.0,
    currency: 'AZN',
    status: 'ANNOUNCED',
    title: 'Series B Common Stock Issue',
    description: 'Capital increase for expansion into regional markets.',
    createdAt: oneMonthAgo.toISOString()
  },
  {
    id: 'e-2',
    companyId: 'c-1',
    type: 'BOND',
    totalAmount: 1000000,
    parPrice: 100.0,
    currency: 'AZN',
    status: 'CLOSED',
    title: 'Corporate Green Bonds 2023',
    description: 'Financing for sustainable infrastructure projects.',
    createdAt: threeMonthsAgo.toISOString()
  }
];
