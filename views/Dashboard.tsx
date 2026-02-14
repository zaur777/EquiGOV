
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie
} from 'recharts';
import { mockShareholders, mockCompanies } from '../services/mockData';
import { getAIGovernanceAdvice } from '../services/geminiService';
import { Sparkles, Users, Calendar, CheckCircle2, AlertCircle, CreditCard, Clock } from 'lucide-react';
import { UserRole } from '../types';

const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];

export const Dashboard: React.FC<{ role: UserRole }> = ({ role }) => {
  const [advice, setAdvice] = useState<string>("Fetching AI insight...");
  
  useEffect(() => {
    getAIGovernanceAdvice("Optimizing corporate governance and managing subscriptions for 2024")
      .then(setAdvice);
  }, []);

  const data = mockShareholders.map(s => ({
    name: s.name,
    shares: s.sharesOwned
  }));

  const pieData = [
    { name: 'Institutional', value: 65 },
    { name: 'Individual', value: 25 },
    { name: 'Insiders', value: 10 },
  ];

  // Logic for Company Pricing
  const calculateCompanyPricing = (count: number) => {
    if (count <= 100) return 199;
    if (count <= 300) return 499;
    if (count <= 1000) return 1999;
    return 9999;
  };

  const currentCompany = mockCompanies[0];
  const trialEnds = new Date(currentCompany.trialEndDate);
  const isTrialActive = trialEnds > new Date();
  const yearlyFee = calculateCompanyPricing(currentCompany.shareholderCount);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            {role === UserRole.COMPANY ? "Corporate Overview" : "Investor Portfolio"}
          </h2>
          <p className="text-slate-500">
            {role === UserRole.COMPANY ? "Governance metrics for Azerbaijan Tech Corp." : "Manage your holdings and upcoming general meetings."}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
          <Calendar size={18} className="text-blue-500" />
          <span className="text-sm font-medium text-slate-600">Next AGM: April 15, 2024</span>
        </div>
      </div>

      {/* Subscription Card */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                <Users size={20} />
             </div>
             <p className="text-sm font-medium text-slate-500">Shareholders</p>
             <p className="text-2xl font-bold text-slate-800">{currentCompany.shareholderCount}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600 mb-4">
                <CreditCard size={20} />
             </div>
             <p className="text-sm font-medium text-slate-500">Plan Fee</p>
             <p className="text-2xl font-bold text-slate-800">
               {role === UserRole.COMPANY ? `${yearlyFee} AZN` : "12 AZN"}
               <span className="text-xs text-slate-400 font-normal"> / year</span>
             </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <div className={`w-10 h-10 rounded-lg ${isTrialActive ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'} flex items-center justify-center mb-4`}>
                {isTrialActive ? <Clock size={20} /> : <CheckCircle2 size={20} />}
             </div>
             <p className="text-sm font-medium text-slate-500">Account Status</p>
             <p className="text-2xl font-bold text-slate-800">
               {isTrialActive ? "Trial" : "Premium"}
               <span className="text-xs text-slate-400 font-normal ml-2">
                 {isTrialActive ? `ends ${trialEnds.toLocaleDateString()}` : "Active"}
               </span>
             </p>
          </div>
        </div>
        
        <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg flex flex-col justify-between">
           <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-200 opacity-80 mb-1">Billing Account</p>
              <p className="text-xl font-bold">AZ Tech Corp</p>
           </div>
           <div className="mt-4">
             <button className="w-full bg-white text-blue-600 py-2 rounded-lg text-xs font-bold hover:bg-blue-50 transition-colors uppercase tracking-wider">
               Pay Invoice
             </button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6 text-slate-800">Distribution Analysis</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} fontSize={10} tick={{fill: '#64748b'}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="shares" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight Sidebar */}
        <div className="flex flex-col gap-6">
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 rounded-2xl text-white shadow-lg relative overflow-hidden">
            <Sparkles className="absolute top-4 right-4 text-white opacity-20" size={48} />
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Sparkles size={20} />
              AI Advisor
            </h3>
            <p className="text-sm leading-relaxed text-indigo-50">
              "{advice}"
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Ownership Mix</h3>
             <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={40}
                    outerRadius={65}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
