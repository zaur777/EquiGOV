
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie
} from 'recharts';
import { mockShareholders, mockCompanies } from '../services/mockData';
import { getAIGovernanceAdvice } from '../services/geminiService';
import { translations } from '../i18n/translations';
import { Sparkles, Users, Calendar, CheckCircle2, AlertCircle, CreditCard, Clock } from 'lucide-react';
import { UserRole, Language } from '../types';

const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];

export const Dashboard: React.FC<{ role: UserRole, language: Language }> = ({ role, language }) => {
  const [advice, setAdvice] = useState<string>("...");
  
  const t = translations[language];

  useEffect(() => {
    getAIGovernanceAdvice(`Optimizing corporate governance and managing subscriptions for 2024. Active language: ${language}`)
      .then(setAdvice);
  }, [language]);

  const data = mockShareholders.map(s => ({
    name: s.name,
    shares: s.sharesOwned
  }));

  const pieData = [
    { name: 'Institutional', value: 65 },
    { name: 'Individual', value: 25 },
    { name: 'Insiders', value: 10 },
  ];

  const currentCompany = mockCompanies[0];
  const trialEnds = new Date(currentCompany.trialEndDate);
  const isTrialActive = trialEnds > new Date();
  
  const yearlyFee = currentCompany.shareholderCount <= 100 ? 199 : currentCompany.shareholderCount <= 300 ? 499 : 1999;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            {role === UserRole.COMPANY ? t.dashboard.overview : t.dashboard.investor}
          </h2>
          <p className="text-slate-500 mt-1">
            {role === UserRole.COMPANY ? `Governance metrics for ${currentCompany.name}.` : "Manage your holdings and upcoming general meetings."}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
          <Calendar size={18} className="text-blue-500" />
          <span className="text-sm font-bold text-slate-600">{t.dashboard.nextAgm}: April 15, 2024</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                <Users size={20} />
             </div>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t.nav.shareholders}</p>
             <p className="text-2xl font-bold text-slate-800">{currentCompany.shareholderCount}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600 mb-4">
                <CreditCard size={20} />
             </div>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t.dashboard.fee}</p>
             <p className="text-2xl font-bold text-slate-800">
               {role === UserRole.COMPANY ? `${yearlyFee} AZN` : "12 AZN"}
               <span className="text-xs text-slate-400 font-normal"> / yr</span>
             </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <div className={`w-10 h-10 rounded-lg ${isTrialActive ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'} flex items-center justify-center mb-4`}>
                {isTrialActive ? <Clock size={20} /> : <CheckCircle2 size={20} />}
             </div>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t.dashboard.status}</p>
             <p className="text-2xl font-bold text-slate-800">
               {isTrialActive ? t.dashboard.trial : t.dashboard.premium}
               <span className="text-xs text-slate-400 font-normal ml-2">
                 {isTrialActive ? `(${trialEnds.toLocaleDateString()})` : "Active"}
               </span>
             </p>
          </div>
        </div>
        
        <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-xl flex flex-col justify-between border border-slate-800">
           <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Billing Account</p>
              <p className="text-lg font-bold truncate">{currentCompany.name}</p>
           </div>
           <button className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors uppercase tracking-widest shadow-lg shadow-blue-900/20">
             {t.dashboard.pay}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6 text-slate-800">Share Distribution</h3>
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

        <div className="flex flex-col gap-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[32px] text-white shadow-xl relative overflow-hidden group">
            <Sparkles className="absolute -top-4 -right-4 text-white opacity-10 group-hover:scale-110 transition-transform" size={120} />
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Sparkles size={20} className="text-blue-300" />
              AI Advisor
            </h3>
            <p className="text-sm leading-relaxed text-blue-50 relative z-10 italic">
              "{advice}"
            </p>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
             <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Ownership Mix</h3>
             <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
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
