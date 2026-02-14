
import React, { useState } from 'react';
import { UserRole } from '../types';
import { 
  Shield, 
  Users, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  UserCircle,
  Clock,
  Mail,
  Lock,
  Globe
} from 'lucide-react';

interface LandingPageProps {
  onLogin: (role: UserRole) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [modalMode, setModalMode] = useState<'login' | 'register'>('login');
  const [showModal, setShowModal] = useState(false);
  const [regStep, setRegStep] = useState(1);

  const pricingTiers = [
    { range: '0 - 100', price: '199', shareholders: 'Included' },
    { range: '100 - 300', price: '499', shareholders: 'Included' },
    { range: '300 - 1000', price: '1,999', shareholders: 'Included' },
    { range: '1000+', price: '9,999', shareholders: 'Included' },
  ];

  const handleEnter = (role: UserRole) => {
    onLogin(role);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">E</div>
            <span className="text-2xl font-bold tracking-tight text-slate-800">EquiGov</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Pricing</a>
            <button 
              onClick={() => { setModalMode('login'); setShowModal(true); }}
              className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => { setModalMode('register'); setShowModal(true); }}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
            >
              Register Company
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase border border-blue-100">
              <Clock size={14} />
              3 Months Free Trial
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              Corporate Governance <br />
              <span className="text-blue-600">Reimagined.</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
              Automated shareholder management, secure e-voting, and meeting orchestration compliant with Azerbaijan law.
            </p>
            <div className="flex flex-col sm:row gap-4">
              <button 
                onClick={() => { setModalMode('register'); setShowModal(true); }}
                className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group shadow-xl"
              >
                Get Started Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative">
             <div className="bg-gradient-to-tr from-blue-600/10 to-indigo-600/10 rounded-[40px] p-8 border border-slate-100 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000" 
                alt="Governance Analytics" 
                className="rounded-3xl shadow-2xl border border-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-slate-900">Subscription Plans</h2>
            <p className="text-slate-500">First 3 months are on us. Registration is free.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier, i) => (
              <div key={i} className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all text-center">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Shareholders</p>
                <p className="text-xl font-bold text-slate-800 mb-6">{tier.range}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-blue-600">{tier.price}</span>
                  <span className="text-slate-400 ml-1">AZN/yr</span>
                </div>
                <button 
                  onClick={() => { setModalMode('register'); setShowModal(true); }}
                  className="w-full bg-slate-50 text-slate-700 py-3 rounded-xl font-bold text-sm hover:bg-blue-600 hover:text-white transition-all"
                >
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="bg-white w-full max-w-lg rounded-[32px] overflow-hidden relative z-10 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-300">
            <div className="flex border-b border-slate-100">
              <button 
                onClick={() => setModalMode('login')}
                className={`flex-1 py-5 font-bold text-sm uppercase tracking-wider transition-all ${modalMode === 'login' ? 'text-blue-600 border-b-2 border-blue-600 bg-white' : 'text-slate-400 bg-slate-50 hover:text-slate-600'}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => setModalMode('register')}
                className={`flex-1 py-5 font-bold text-sm uppercase tracking-wider transition-all ${modalMode === 'register' ? 'text-blue-600 border-b-2 border-blue-600 bg-white' : 'text-slate-400 bg-slate-50 hover:text-slate-600'}`}
              >
                Create Account
              </button>
            </div>

            <div className="p-10">
              {modalMode === 'login' ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Persona for Demo</label>
                    <div className="grid grid-cols-1 gap-3">
                      <button onClick={() => handleEnter(UserRole.ADMIN)} className="flex items-center gap-3 p-4 rounded-2xl border border-slate-100 hover:bg-blue-50 transition-all text-left group">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all"><Shield size={20} /></div>
                        <div><p className="font-bold text-slate-800">Platform Owner</p><p className="text-xs text-slate-400 italic">Approvals & System Oversight</p></div>
                      </button>
                      <button onClick={() => handleEnter(UserRole.COMPANY)} className="flex items-center gap-3 p-4 rounded-2xl border border-slate-100 hover:bg-blue-50 transition-all text-left group">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all"><Building2 size={20} /></div>
                        <div><p className="font-bold text-slate-800">Corporate Client</p><p className="text-xs text-slate-400 italic">Manage Registry & AGM</p></div>
                      </button>
                      <button onClick={() => handleEnter(UserRole.SHAREHOLDER)} className="flex items-center gap-3 p-4 rounded-2xl border border-slate-100 hover:bg-blue-50 transition-all text-left group">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all"><UserCircle size={20} /></div>
                        <div><p className="font-bold text-slate-800">Shareholder</p><p className="text-xs text-slate-400 italic">Voting & Documents</p></div>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {regStep === 1 ? (
                    <>
                      <div className="space-y-4">
                        <div className="relative">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <input type="text" placeholder="Company Legal Name" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                        </div>
                        <div className="relative">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <input type="text" placeholder="Registration Number (VÖEN)" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                        </div>
                      </div>
                      <button onClick={() => setRegStep(2)} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                        Continue to Identity Link
                      </button>
                    </>
                  ) : (
                    <div className="text-center space-y-6">
                      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mx-auto shadow-inner">
                        <Shield size={40} />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-bold text-lg">MyGovID Verification</h4>
                        <p className="text-sm text-slate-500">Legal corporate registration requires representative identity verification via mygovid.gov.az</p>
                      </div>
                      <button onClick={() => handleEnter(UserRole.COMPANY)} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                        Link with ASAN Login
                        <ArrowRight size={18} />
                      </button>
                      <button onClick={() => setRegStep(1)} className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600">Back</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
