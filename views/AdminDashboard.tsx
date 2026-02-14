
import React, { useState } from 'react';
import { mockCompanies as initialCompanies, mockShareholders } from '../services/mockData';
import { Company, Language } from '../types';
import { translations } from '../i18n/translations';
import { 
  Building2, 
  Users, 
  Activity, 
  ShieldCheck, 
  Search, 
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

// Updated AdminDashboard to standard component function for better type compatibility in App.tsx
export const AdminDashboard = ({ language }: { language: Language }) => {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'companies' | 'pending' | 'shareholders'>('pending');

  const t = translations[language];

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingApprovals = companies.filter(c => c.onboardingStatus === 'PENDING');

  const handleApprove = (id: string) => {
    setCompanies(prev => prev.map(c => 
      c.id === id ? { ...c, onboardingStatus: 'ACTIVE' as const } : c
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'text-green-600 bg-green-50 border-green-100';
      case 'PENDING': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'SUSPENDED': return 'text-red-600 bg-red-50 border-red-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">{t.nav.monitor}</h2>
          <p className="text-slate-500 mt-1">Platform Owner Console: Azerbaijan Registry Management.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
              {pendingApprovals.length}
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pending</p>
              <p className="text-sm font-bold text-slate-700">Approvals</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="border-b border-slate-100 flex p-2 bg-slate-50/50">
          <button 
            onClick={() => setActiveTab('pending')}
            className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-widest rounded-2xl transition-all relative ${activeTab === 'pending' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Awaiting Approval
            {pendingApprovals.length > 0 && <span className="absolute top-3 right-5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>}
          </button>
          <button 
            onClick={() => setActiveTab('companies')}
            className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-widest rounded-2xl transition-all ${activeTab === 'companies' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Registered Clients
          </button>
          <button 
            onClick={() => setActiveTab('shareholders')}
            className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-widest rounded-2xl transition-all ${activeTab === 'shareholders' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Global Registry
          </button>
        </div>

        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-white">
           <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search companies, FINs, or registration numbers..." 
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <ShieldCheck size={14} className="text-green-500" />
            VÖEN Verified Data Source
          </p>
        </div>

        <div className="overflow-x-auto bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                <th className="px-8 py-5">Details</th>
                <th className="px-8 py-5">Registration</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(activeTab === 'companies' ? filteredCompanies : pendingApprovals).map(company => (
                <tr key={company.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center font-bold text-blue-600 text-lg shadow-inner">
                        {company.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-base">{company.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                           <span className={`px-2 py-0.5 rounded-full text-[9px] font-black tracking-tighter uppercase border ${getStatusColor(company.onboardingStatus)}`}>
                            {company.onboardingStatus}
                          </span>
                           <span className="text-xs text-slate-400 font-medium">{company.shareholderCount} Users</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-slate-600 font-mono text-xs font-bold">{company.registrationNumber}</td>
                  <td className="px-8 py-6 text-slate-500 text-xs font-medium">{new Date(company.joinedAt).toLocaleDateString()}</td>
                  <td className="px-8 py-6 text-right">
                    {company.onboardingStatus === 'PENDING' ? (
                      <button 
                        onClick={() => handleApprove(company.id)}
                        className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 flex items-center gap-2"
                      >
                        <CheckCircle size={14} /> Approve
                      </button>
                    ) : (
                      <button className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all">
                        <ExternalLink size={20} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
