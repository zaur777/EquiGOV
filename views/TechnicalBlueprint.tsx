
import React from 'react';
import { Terminal, Database, Shield, Server, Workflow, CreditCard, Clock, Fingerprint } from 'lucide-react';

export const TechnicalBlueprint: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-700 max-w-5xl mx-auto pb-20">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
          <Shield size={14} /> Security-First Design
        </div>
        <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight leading-none">Platform Architecture & <br/><span className="text-blue-600">Governance Logic</span></h2>
        <p className="text-slate-500 max-w-2xl mx-auto font-medium">Full-stack technical specification for Azerbaijan's first digital corporate governance platform.</p>
      </div>

      {/* Schema Description */}
      <section className="bg-white border border-slate-200 rounded-[32px] p-10 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <Database className="text-blue-600" size={28} />
          <h3 className="text-2xl font-bold text-slate-800">1. Core Database Schema (The Engine)</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
               <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                 <Terminal size={16} /> Users & Entities
               </h4>
               <ul className="space-y-2 text-sm text-slate-500 font-mono">
                 <li><span className="text-blue-600">Users:</span> id, mygov_id_ref, role, pin_code</li>
                 <li><span className="text-blue-600">Companies:</span> id, voen, capital_structure</li>
                 <li><span className="text-blue-600">Shareholders:</span> user_id, company_id, current_weight</li>
               </ul>
            </div>
            <div className="p-6 bg-blue-900 rounded-2xl text-blue-100 shadow-xl">
               <h4 className="font-bold mb-3 flex items-center gap-2">
                 <Fingerprint size={16} /> Votes (Non-Repudiation)
               </h4>
               <ul className="space-y-2 text-sm font-mono opacity-80">
                 <li>resolution_id: UUID</li>
                 <li>shareholder_id: UUID</li>
                 <li className="text-blue-300 font-bold">weight_at_time_of_vote: INTEGER</li>
                 <li className="text-blue-300 font-bold">digital_signature_hash: VARCHAR(255)</li>
                 <li>timestamp: TIMESTAMPTZ</li>
               </ul>
               <p className="text-[10px] mt-4 opacity-60 leading-tight">
                 * Capture of weight at time of vote prevents manipulation during post-announcement share transfers.
               </p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
               <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                 <Workflow size={16} /> Meeting Lifecycle
               </h4>
               <ul className="space-y-2 text-sm text-slate-500 font-mono">
                 <li>id: UUID</li>
                 <li>scheduled_at: TIMESTAMPTZ</li>
                 <li>google_meet_link: URL</li>
                 <li>status: Draft | Published | Live | Closed</li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tier Specs */}
      <section className="bg-slate-900 rounded-[32px] p-10 text-white relative overflow-hidden shadow-2xl">
         <div className="relative z-10 flex items-center gap-3 mb-8">
            <CreditCard className="text-blue-400" size={28} />
            <h3 className="text-2xl font-bold">Billing & Commercial Logic</h3>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest">Company Tiers (Yearly)</h4>
              <div className="space-y-3 font-mono text-sm border-l-2 border-white/10 pl-6">
                <p><span className="text-slate-400">0 - 100 Shareholders:</span> 199 AZN</p>
                <p><span className="text-slate-400">100 - 300 Shareholders:</span> 499 AZN</p>
                <p><span className="text-slate-400">300 - 1000 Shareholders:</span> 1,999 AZN</p>
                <p><span className="text-slate-400">1000+ Shareholders:</span> 9,999 AZN</p>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-widest">User & Trial Terms</h4>
              <div className="space-y-3 font-mono text-sm border-l-2 border-white/10 pl-6">
                <p><span className="text-slate-400">Shareholder Link:</span> 12 AZN / Link / Year</p>
                <p><span className="text-slate-400">Initial Registration:</span> FREE (Unlimited)</p>
                <p><span className="text-slate-400">Trial Period:</span> 3 Months FULL ACCESS</p>
                <p className="text-xs text-slate-500 italic mt-4">Pricing logic is handled by a background worker calculating average shareholder count monthly.</p>
              </div>
            </div>
         </div>
         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[120px] opacity-10 -mr-32 -mt-32"></div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="text-blue-600" size={24} />
          <h3 className="text-2xl font-bold text-slate-800">2. Automated Meeting Lifecycle</h3>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-6">
           <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shrink-0 shadow-sm"><Workflow size={20} /></div>
              <div>
                <h4 className="font-bold text-slate-700">40-Day Statutory Trigger</h4>
                <p className="text-sm text-slate-500 leading-relaxed mt-1">
                  Compliance with the Civil Code of Azerbaijan requires 40-day advance notice for AGMs. Our system implements a scheduled job pattern (Redis/BullMQ) that calculates `scheduled_at - 40 days`.
                </p>
                <div className="bg-slate-900 rounded-xl p-4 mt-4 text-[11px] font-mono text-blue-300">
                  {`CRON @daily:
SELECT meeting_id, company_id 
FROM meetings 
WHERE status = 'DRAFT' 
  AND (scheduled_at - INTERVAL '40 days') <= CURRENT_TIMESTAMP;
  
=> EXECUTE notification_pipeline(meeting_id);`}
                </div>
              </div>
           </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="text-green-600" size={24} />
          <h3 className="text-2xl font-bold text-slate-800">3. Legal Integrity of Votes</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 bg-white border border-slate-200 rounded-[24px] shadow-sm">
            <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
              <CreditCard size={18} className="text-blue-600" />
              Weighted Tallies
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Voting power is dynamically captured via <span className="text-blue-600 font-mono">weight_at_time_of_vote</span> at the moment the ballot is signed, ensuring equity dilution or transfers don't invalidate results.
            </p>
          </div>
          <div className="p-8 bg-white border border-slate-200 rounded-[24px] shadow-sm">
            <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
              <Shield className="text-green-600" size={18} />
              Digital Signatures
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Every vote resolution cast via the platform is wrapped in a cryptographic hash provided by <span className="font-bold text-slate-700">MyGovID integration</span>. This provides non-repudiation required for public company resolutions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
