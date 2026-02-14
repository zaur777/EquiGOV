
import React, { useState } from 'react';
import { mockMeetings, mockResolutions, mockShareholders } from '../services/mockData';
import { Vote, Resolution } from '../types';
import { Vote as VoteIcon, ShieldCheck, Fingerprint, Info, AlertCircle } from 'lucide-react';

export const VotingPortal: React.FC = () => {
  const [votes, setVotes] = useState<Record<string, 'YES' | 'NO' | 'ABSTAIN'>>({});
  const [isSigning, setIsSigning] = useState(false);
  const [signed, setSigned] = useState(false);

  const activeMeeting = mockMeetings[0];
  const resolutions = mockResolutions.filter(r => r.meetingId === activeMeeting.id);
  const shareholder = mockShareholders[0]; // Assuming current user is the first mock shareholder

  const handleVote = (resId: string, choice: 'YES' | 'NO' | 'ABSTAIN') => {
    setVotes(prev => ({ ...prev, [resId]: choice }));
  };

  const handleFinalSubmit = () => {
    if (Object.keys(votes).length < resolutions.length) {
      alert("Please cast your vote for all resolutions before signing.");
      return;
    }
    setIsSigning(true);
    // Simulate MyGovID secure signing process
    setTimeout(() => {
      setIsSigning(false);
      setSigned(true);
    }, 2500);
  };

  if (signed) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100">
          <ShieldCheck size={48} />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2 text-center">Votes Legally Signed</h2>
        <p className="text-slate-500 text-center max-w-md mb-8">
          Your votes have been securely recorded with a weight of <b>{shareholder.sharesOwned.toLocaleString()} shares</b>. 
          A digital signature hash has been generated via MyGovID.
        </p>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 font-mono text-[10px] text-slate-400 w-full max-w-lg break-all">
          SIGNATURE_HASH: 0x8f2a9c3d1e7b4f5a6c8e9d0b1a2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Secure Voting Portal</h2>
          <p className="text-slate-500">Meeting: {activeMeeting.title}</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 px-4 py-3 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
            <Info size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Voting Weight</p>
            <p className="text-sm font-bold text-blue-700">{shareholder.sharesOwned.toLocaleString()} Shares</p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex gap-3 text-amber-800">
        <AlertCircle className="shrink-0" size={20} />
        <p className="text-sm leading-relaxed">
          <b>Weight Integrity:</b> Your voting power is locked to your holdings as of the Record Date. Buying or selling shares after this window will not affect your weight for this specific meeting.
        </p>
      </div>

      <div className="space-y-6">
        {resolutions.map((res, idx) => (
          <div key={res.id} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                {idx + 1}
              </span>
              <h3 className="text-xl font-bold text-slate-800">{res.title}</h3>
            </div>
            <p className="text-slate-600 mb-8 leading-relaxed">{res.description}</p>
            
            <div className="grid grid-cols-3 gap-4">
              {(['YES', 'NO', 'ABSTAIN'] as const).map(choice => (
                <button
                  key={choice}
                  onClick={() => handleVote(res.id, choice)}
                  className={`py-4 rounded-2xl font-bold text-sm transition-all border-2 ${
                    votes[res.id] === choice 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100' 
                      : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'
                  }`}
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-8 flex justify-center">
        <button
          onClick={handleFinalSubmit}
          disabled={isSigning}
          className="bg-slate-900 text-white px-12 py-5 rounded-[32px] font-bold text-lg hover:bg-slate-800 transition-all shadow-2xl flex items-center gap-3 relative overflow-hidden group disabled:opacity-50"
        >
          {isSigning ? (
            <>
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              Authorizing via MyGovID...
            </>
          ) : (
            <>
              <Fingerprint size={24} className="group-hover:scale-110 transition-transform" />
              Sign & Submit Resolution
            </>
          )}
        </button>
      </div>
    </div>
  );
};
