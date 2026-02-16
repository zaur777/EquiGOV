
import React, { useState } from 'react';
import { mockEmissions as initialEmissions } from '../services/mockData';
import { Emission, Language } from '../types';
import { translations } from '../i18n/translations';
import { 
  TrendingUp, 
  Plus, 
  Bell, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  FileText,
  DollarSign,
  Briefcase
} from 'lucide-react';

export const EmissionManagement: React.FC<{ language: Language }> = ({ language }) => {
  const [emissions, setEmissions] = useState<Emission[]>(initialEmissions);
  const [showNewModal, setShowNewModal] = useState(false);
  const t = translations[language];

  const handleAnnounce = (id: string) => {
    setEmissions(prev => prev.map(e => 
      e.id === id ? { ...e, status: 'ANNOUNCED' as const } : e
    ));
    alert("Emission Announced! Regulatory filing generated.");
  };

  const handleNotify = (id: string) => {
    alert("Shareholders notified! Invitations to purchase at par price have been sent via WhatsApp & Email.");
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'ANNOUNCED': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'ACTIVE': return 'bg-green-100 text-green-700 border-green-200';
      case 'CLOSED': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">{t.emissions.title}</h2>
          <p className="text-slate-500 mt-1">{t.emissions.desc}</p>
        </div>
        <button 
          onClick={() => setShowNewModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          {t.emissions.newIssue}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {emissions.map((e) => (
          <div key={e.id} className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${e.type === 'STOCK' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  {e.type === 'STOCK' ? <Briefcase size={24} /> : <FileText size={24} />}
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{e.type === 'STOCK' ? t.emissions.stock : t.emissions.bond}</p>
                  <h3 className="text-xl font-bold text-slate-800">{e.title}</h3>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(e.status)}`}>
                {e.status}
              </span>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              {e.description}
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.emissions.totalAmount}</p>
                <p className="text-lg font-bold text-slate-800">{e.totalAmount.toLocaleString()} {e.currency}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.emissions.parPrice}</p>
                <p className="text-lg font-bold text-blue-600">{e.parPrice.toFixed(2)} {e.currency}</p>
              </div>
            </div>

            <div className="flex gap-3">
              {e.status === 'DRAFT' && (
                <button 
                  onClick={() => handleAnnounce(e.id)}
                  className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all"
                >
                  {t.emissions.announce}
                </button>
              )}
              {e.status === 'ANNOUNCED' && (
                <button 
                  onClick={() => handleNotify(e.id)}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2"
                >
                  <Bell size={14} />
                  {t.emissions.notify}
                </button>
              )}
              {e.status === 'CLOSED' && (
                <div className="flex-1 bg-slate-50 text-slate-400 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-center flex items-center justify-center gap-2">
                  <ShieldCheck size={14} /> Fully Allocated
                </div>
              )}
            </div>

            {e.status === 'ANNOUNCED' && (
              <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-center gap-3 text-amber-800 text-xs">
                <TrendingUp size={16} />
                <span><b>Pre-emptive rights</b> enabled: Existing shareholders get first priority at par price.</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl">
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-4">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <DollarSign className="text-blue-400" />
                Capital Management Compliance
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
                All emissions are timestamped and linked to the official Azerbaijan Share Registry. Our system ensures that "Right to Purchase" windows are strictly managed according to the 15-day minimum statutory period.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
               <div className="flex items-center gap-3 mb-4">
                 <ShieldCheck className="text-blue-400" />
                 <span className="text-xs font-bold uppercase tracking-widest">Regulatory Link</span>
               </div>
               <p className="text-[10px] font-mono text-slate-400">STATUS: Connected to Central Bank API (Sandbox)</p>
            </div>
         </div>
         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[150px] opacity-10 -mr-48 -mt-48"></div>
      </div>

      {showNewModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowNewModal(false)}></div>
          <div className="bg-white w-full max-w-xl rounded-[40px] p-10 relative z-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">{t.emissions.newIssue}</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Issue Title</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" placeholder="e.g. Series C Funding" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Total Amount</label>
                    <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" placeholder="100000" />
                 </div>
                 <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Par Price (AZN)</label>
                    <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" placeholder="1.00" />
                 </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Type</label>
                <div className="flex gap-3">
                   <button className="flex-1 py-3 border-2 border-blue-600 bg-blue-50 text-blue-600 rounded-xl font-bold text-xs uppercase">{t.emissions.stock}</button>
                   <button className="flex-1 py-3 border-2 border-slate-100 bg-white text-slate-400 rounded-xl font-bold text-xs uppercase">{t.emissions.bond}</button>
                </div>
              </div>
            </div>
            <div className="mt-8 flex gap-3">
              <button onClick={() => setShowNewModal(false)} className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold text-sm">Cancel</button>
              <button 
                onClick={() => { setShowNewModal(false); alert('Draft created.'); }}
                className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold text-sm shadow-xl shadow-blue-100"
              >
                Create Draft
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
