
import React, { useState } from 'react';
import { mockMeetings as initialMeetings } from '../services/mockData';
import { Language, Meeting, AgendaItem } from '../types';
import { 
  Calendar, 
  Video, 
  Bell, 
  Users, 
  Clock, 
  ExternalLink, 
  MailCheck, 
  MessageSquareMore, 
  ShieldCheck, 
  ListOrdered, 
  ChevronUp, 
  ChevronDown, 
  Plus, 
  Trash2, 
  User, 
  AlignLeft,
  X
} from 'lucide-react';

export const MeetingManagement = ({ language }: { language: Language }) => {
  const [meetings, setMeetings] = useState<Meeting[]>(initialMeetings);
  const [triggerSimulated, setTriggerSimulated] = useState(false);
  const [editingAgendaMeetingId, setEditingAgendaMeetingId] = useState<string | null>(null);
  const [newAgendaItem, setNewAgendaItem] = useState({ title: '', description: '', assignee: '' });

  const handleSimulateTrigger = () => {
    setTriggerSimulated(true);
    alert("CRON Simulation: 40-Day mark detected. Sending invitations to 42 shareholders via Twilio WhatsApp & SendGrid Email...");
  };

  const moveAgendaItem = (meetingId: string, index: number, direction: 'up' | 'down') => {
    setMeetings(prev => prev.map(m => {
      if (m.id !== meetingId || !m.agenda) return m;
      const newAgenda = [...m.agenda];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      
      if (targetIndex >= 0 && targetIndex < newAgenda.length) {
        [newAgenda[index], newAgenda[targetIndex]] = [newAgenda[targetIndex], newAgenda[index]];
      }
      return { ...m, agenda: newAgenda };
    }));
  };

  const addAgendaItem = (meetingId: string) => {
    if (!newAgendaItem.title) return;
    
    setMeetings(prev => prev.map(m => {
      if (m.id !== meetingId) return m;
      const newItem: AgendaItem = {
        id: `a-${Date.now()}`,
        ...newAgendaItem
      };
      return { ...m, agenda: [...(m.agenda || []), newItem] };
    }));
    setNewAgendaItem({ title: '', description: '', assignee: '' });
  };

  const removeAgendaItem = (meetingId: string, itemId: string) => {
    setMeetings(prev => prev.map(m => {
      if (m.id !== meetingId || !m.agenda) return m;
      return { ...m, agenda: m.agenda.filter(i => i.id !== itemId) };
    }));
  };

  const editingMeeting = meetings.find(m => m.id === editingAgendaMeetingId);

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
        {meetings.map(meeting => (
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

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
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

                {/* Agenda Preview */}
                <div className="border-t border-slate-50 pt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                      <ListOrdered size={14} className="text-blue-500" />
                      Session Agenda
                    </h4>
                    <button 
                      onClick={() => setEditingAgendaMeetingId(meeting.id)}
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      Manage Agenda
                    </button>
                  </div>
                  <div className="space-y-3">
                    {meeting.agenda?.slice(0, 3).map((item, idx) => (
                      <div key={item.id} className="flex items-start gap-3 text-sm">
                        <span className="text-slate-300 font-bold font-mono w-4">{idx + 1}.</span>
                        <div>
                          <p className="font-bold text-slate-700">{item.title}</p>
                          <p className="text-slate-400 text-xs">{item.assignee}</p>
                        </div>
                      </div>
                    ))}
                    {(meeting.agenda?.length || 0) > 3 && (
                      <p className="text-[10px] text-slate-400 font-bold italic ml-7">
                        + {meeting.agenda!.length - 3} more items...
                      </p>
                    )}
                    {(!meeting.agenda || meeting.agenda.length === 0) && (
                      <p className="text-xs text-slate-400 italic">No agenda items defined yet.</p>
                    )}
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

      {/* Agenda Manager Modal */}
      {editingAgendaMeetingId && editingMeeting && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setEditingAgendaMeetingId(null)}></div>
          <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-[40px] shadow-2xl overflow-hidden relative z-10 flex flex-col animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="text-2xl font-extrabold text-slate-800">Manage Agenda</h3>
                <p className="text-sm text-slate-500">{editingMeeting.title}</p>
              </div>
              <button 
                onClick={() => setEditingAgendaMeetingId(null)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X size={24} className="text-slate-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {/* Add New Item Form */}
              <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-[24px] space-y-4">
                <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                  <Plus size={16} /> New Agenda Item
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative">
                    <AlignLeft className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Title" 
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                      value={newAgendaItem.title}
                      onChange={e => setNewAgendaItem({...newAgendaItem, title: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Assignee" 
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                      value={newAgendaItem.assignee}
                      onChange={e => setNewAgendaItem({...newAgendaItem, assignee: e.target.value})}
                    />
                  </div>
                </div>
                <textarea 
                  placeholder="Description..." 
                  rows={2}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  value={newAgendaItem.description}
                  onChange={e => setNewAgendaItem({...newAgendaItem, description: e.target.value})}
                ></textarea>
                <button 
                  onClick={() => addAgendaItem(editingMeeting.id)}
                  disabled={!newAgendaItem.title}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Plus size={18} />
                  Add to Agenda
                </button>
              </div>

              {/* Current Agenda Items */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Planned Items</h4>
                <div className="space-y-3">
                  {editingMeeting.agenda?.map((item, idx) => (
                    <div key={item.id} className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center gap-4 group hover:border-blue-200 transition-all">
                      <div className="flex flex-col gap-1">
                        <button 
                          onClick={() => moveAgendaItem(editingMeeting.id, idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-blue-600 disabled:opacity-30"
                        >
                          <ChevronUp size={16} />
                        </button>
                        <button 
                          onClick={() => moveAgendaItem(editingMeeting.id, idx, 'down')}
                          disabled={idx === (editingMeeting.agenda?.length || 0) - 1}
                          className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-blue-600 disabled:opacity-30"
                        >
                          <ChevronDown size={16} />
                        </button>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-300 font-mono font-bold">{idx + 1}.</span>
                          <p className="font-bold text-slate-700">{item.title}</p>
                          <span className="text-[10px] font-bold text-blue-500 uppercase bg-blue-50 px-2 py-0.5 rounded ml-auto">
                            {item.assignee}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                      </div>

                      <button 
                        onClick={() => removeAgendaItem(editingMeeting.id, item.id)}
                        className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                  {(!editingMeeting.agenda || editingMeeting.agenda.length === 0) && (
                    <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-[32px]">
                      <p className="text-slate-400 font-medium italic">Your agenda is empty. Start by adding items above.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-50 border-t border-slate-100">
               <button 
                onClick={() => setEditingAgendaMeetingId(null)}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-slate-800 transition-all"
               >
                 Close Manager
               </button>
            </div>
          </div>
        </div>
      )}

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
