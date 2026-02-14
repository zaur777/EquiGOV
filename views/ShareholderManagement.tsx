
import React, { useState } from 'react';
import { mockShareholders as initialShareholders } from '../services/mockData';
import { Shareholder, VerificationStatus, Language } from '../types';
import { Upload, FileDown, Search, Plus, Filter, Mail, MessageSquare, ShieldCheck, ShieldAlert, ShieldEllipsis, RefreshCcw } from 'lucide-react';

// Added language prop to ShareholderManagement to satisfy App.tsx requirements
export const ShareholderManagement = ({ language }: { language: Language }) => {
  const [shareholders, setShareholders] = useState<Shareholder[]>(initialShareholders);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = shareholders.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const triggerVerification = (id: string) => {
    setShareholders(prev => prev.map(s => {
      if (s.id === id) {
        // Simulate a transition to pending
        return { ...s, verificationStatus: 'PENDING' as VerificationStatus };
      }
      return s;
    }));

    // Mock an async update to simulate the MyGovID process outcome
    setTimeout(() => {
      setShareholders(prev => prev.map(s => {
        if (s.id === id) {
          // 80% chance to succeed for the demo
          const success = Math.random() > 0.2;
          return { ...s, verificationStatus: (success ? 'VERIFIED' : 'FAILED') as VerificationStatus };
        }
        return s;
      }));
    }, 2000);
  };

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case 'VERIFIED':
        return (
          <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
            <ShieldCheck size={14} />
            <span className="text-xs font-bold uppercase tracking-wider">Verified</span>
          </div>
        );
      case 'PENDING':
        return (
          <div className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100 animate-pulse">
            <ShieldEllipsis size={14} />
            <span className="text-xs font-bold uppercase tracking-wider">Pending</span>
          </div>
        );
      case 'FAILED':
        return (
          <div className="flex items-center gap-1.5 text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
            <ShieldAlert size={14} />
            <span className="text-xs font-bold uppercase tracking-wider">Failed</span>
          </div>
        );
      case 'UNVERIFIED':
      default:
        return (
          <div className="flex items-center gap-1.5 text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200">
            <ShieldEllipsis size={14} />
            <span className="text-xs font-bold uppercase tracking-wider">Unverified</span>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Shareholder Registry</h2>
          <p className="text-slate-500 text-sm">Manage individual profiles and bulk-update equity data.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
            <FileDown size={18} />
            Export CSV
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-md">
            <Plus size={18} />
            Add Shareholder
          </button>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-inner">
          <Upload size={24} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="font-bold text-blue-900">Bulk Upload Portal</h4>
          <p className="text-sm text-blue-700">Drag and drop your shareholder CSV or Excel file to synchronize the registry.</p>
        </div>
        <input 
          type="file" 
          id="file-upload" 
          className="hidden" 
          onChange={() => alert('File received! Processing bulk import...')}
        />
        <label 
          htmlFor="file-upload" 
          className="cursor-pointer bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-blue-700 active:scale-95 transition-all"
        >
          Select File
        </label>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50">
            <Filter size={18} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="px-6 py-4">Shareholder Name</th>
                <th className="px-6 py-4 text-center">Shares Owned</th>
                <th className="px-6 py-4 text-center">Voting Power</th>
                <th className="px-6 py-4">Verification</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                        {s.name.charAt(0)}
                      </div>
                      {s.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-mono text-slate-600">{s.sharesOwned.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold">
                      {s.votingPower}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      {getStatusBadge(s.verificationStatus)}
                      {s.verificationStatus === 'FAILED' && (
                        <button 
                          onClick={() => triggerVerification(s.id)}
                          className="flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-blue-700 uppercase tracking-tighter"
                        >
                          <RefreshCcw size={10} />
                          Resend Verification
                        </button>
                      )}
                      {(s.verificationStatus === 'UNVERIFIED') && (
                        <button 
                          onClick={() => triggerVerification(s.id)}
                          className="flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-blue-700 uppercase tracking-tighter"
                        >
                          <ShieldCheck size={10} />
                          Trigger MyGovID
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        {s.contactMethod === 'email' ? <Mail size={16} /> : <MessageSquare size={16} />}
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors">
                        Edit
                      </button>
                    </div>
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
