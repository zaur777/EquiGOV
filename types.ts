
export enum UserRole {
  ADMIN = 'ADMIN',
  COMPANY = 'COMPANY',
  SHAREHOLDER = 'SHAREHOLDER'
}

export type Language = 'AZ' | 'TR' | 'EN' | 'RU';

export type VerificationStatus = 'VERIFIED' | 'PENDING' | 'FAILED' | 'UNVERIFIED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  myGovIdVerified: boolean;
  avatar?: string;
}

export interface Company {
  id: string;
  name: string;
  registrationNumber: string;
  totalShares: number;
  onboardingStatus: 'ACTIVE' | 'PENDING' | 'SUSPENDED';
  joinedAt: string;
  trialEndDate: string;
  shareholderCount: number;
}

export interface Shareholder {
  id: string;
  companyId: string;
  userId: string;
  name: string;
  sharesOwned: number;
  votingPower: number; // usually percentage
  contactMethod: 'email' | 'whatsapp';
  verificationStatus: VerificationStatus;
  billingStatus: 'PAID' | 'UNPAID';
}

export interface Meeting {
  id: string;
  companyId: string;
  title: string;
  description: string;
  scheduledAt: string;
  status: 'SCHEDULED' | 'LIVE' | 'COMPLETED';
  meetLink?: string;
  documents: Document[];
}

export interface Document {
  id: string;
  title: string;
  url: string;
  timestamp: string;
  type: 'ANNUAL_REPORT' | 'RESOLUTION' | 'MINUTES';
}

export interface Vote {
  id: string;
  meetingId: string;
  shareholderId: string;
  resolutionId: string;
  choice: 'YES' | 'NO' | 'ABSTAIN';
  timestamp: string;
  weightAtVote: number; // Weight captured at time of vote
  digitalSignatureHash: string; // MyGovID authorized signature proof
}

export interface Resolution {
  id: string;
  meetingId: string;
  title: string;
  description: string;
}
