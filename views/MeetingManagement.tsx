
import React, { useState } from 'react';
import { mockMeetings } from '../services/mockData';
// Added missing ShieldCheck import from lucide-react
import { Calendar, Video, Bell, Users, Clock, ExternalLink, MailCheck, MessageSquareMore, ShieldCheck } from 'lucide-react';

export const MeetingManagement: React.FC = () => {
  const [triggerSimulated, setTriggerSimulated] = useState(false);

  const handleSimulateTrigger = () => {
    setTriggerSimulated(true);
    alert("CRON Simulation: 40-Day mark detected. Sending invitations to 42 shareholders via Twilio WhatsApp & SendGrid Email...");
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Governance Meetings</h2>
          <p className="text-slate-500 text-sm">Schedule and manage your annual and board sessions.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleSimulateTrigger}
            className="bg-white border border-blue-200 text-blue-600 px-5 py-2.5 rounded-xl font-bold hover:bg-blue-50 transition-all text-sm flex items-center gap-2"
          >
            <Clock size={18} />
            Simulate 40-Day Cron
          </button>
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2">
            <Calendar size={18} />
            Schedule New Session
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {mockMeetings.map(meeting => (
          <div key={meeting.id} className="bg-white border border-slate-200 rounded-[32px] shadow-sm hover:shadow-xl hover:border-blue-100 transition-all overflow-hidden group">
            <div className="flex flex-col lg:flex-row">
              {/* Left Column: Info */}
              <div className="p-10 flex-1 border-r border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${
                    meeting.status === 'SCHEDULED' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {meeting.status}
                  </span>
                  <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-tighter ${triggerSimulated ? 'text-green-600' : 'text-slate-400'}`}>
                    <Clock size={16} />
                    {triggerSimulated ? "Statutory Notifications Dispatched" : "40-Day Trigger Pending"}
                  </div>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-800 mb-3">{meeting.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-2xl">
                  {meeting.description}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Meeting Date</p>
                    <p className="font-bold text-slate-700">{new Date(meeting.scheduledAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Invitees</p>
                    <p className="font-bold text-slate-700">42 Shareholders</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Weight Snapshot</p>
                    <p className="font-bold text-blue-600">Record Date Active</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</p>
                    <p className="font-bold text-slate-700">Annual (AGM)</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="p-10 bg-slate-50 lg:w-96 flex flex-col justify-center gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Notification Channels</p>
                    <div className="flex gap-2">
                      <MailCheck size={14} className={triggerSimulated ? 'text-green-500' : 'text-slate-300'} />
                      <MessageSquareMore size={14} className={triggerSimulated ? 'text-green-500' : 'text-slate-300'} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <Video size={16} className="text-blue-500" />
                    <a href={meeting.meetLink} className="text-blue-600 font-bold text-xs truncate hover:underline">
                      {meeting.meetLink}
                    </a>
                    <ExternalLink size={12} className="text-slate-400 ml-auto shrink-0" />
                  </div>
                </div>
                
                <button 
                  onClick={() => alert('Opening Secure Q&A Console...')}
                  className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all text-sm shadow-sm"
                >
                  <Bell size={18} className="text-blue-500" />
                  Moderator Console
                </button>

                <button className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl text-sm">
                  <Video size={18} />
                  Start Live Webcast
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-blue-900 p-10 rounded-[40px] text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-extrabold flex items-center gap-3">
              <ShieldCheck className="text-blue-400" />
              Statutory Compliance Engine
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
              Automatic triggers calculate the 40-day notice window based on your <span className="text-blue-400 font-mono">scheduled_at</span> timestamp. The system ensures non-repudiation by linking every notification to a unique voting token.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/10">
                <p className="text-[10px] font-bold text-blue-300 uppercase">Whatsapp API</p>
                <p className="text-xs font-medium">Twilio Verified</p>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/10">
                <p className="text-[10px] font-bold text-blue-300 uppercase">Identity Proof</p>
                <p className="text-xs font-medium">ASAN/MyGovID</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 relative">
             <div className="bg-blue-600/30 w-32 h-32 rounded-3xl flex flex-col items-center justify-center border border-blue-400/30 backdrop-blur-md">
                <span className="text-4xl font-black">40</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200">Days</span>
             </div>
             <div className="bg-white/5 w-32 h-32 rounded-3xl flex flex-col items-center justify-center border border-white/10">
                <span className="text-4xl font-black opacity-50">00</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Notice</span>
             </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[150px] opacity-10 -mr-48 -mt-48"></div>
      </div>
    </div>
  );
};
