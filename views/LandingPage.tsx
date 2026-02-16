
import React, { useState } from 'react';
import { UserRole, Language } from '../types';
import { translations } from '../i18n/translations';
import { 
  Shield, 
  Users, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  UserCircle,
  Clock,
  Globe
} from 'lucide-react';

interface LandingPageProps {
  onLogin: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin, language, setLanguage }) => {
  const [modalMode, setModalMode] = useState<'login' | 'register'>('login');
  const [showModal, setShowModal] = useState(false);
  const [regStep, setRegStep] = useState<'choice' | 'form'>('choice');
  const [selectedRegType, setSelectedRegType] = useState<UserRole | null>(null);

  const t = translations[language];

  const handleEnter = (role: UserRole) => {
    onLogin(role);
  };

  const handleRegisterClick = () => {
    setModalMode('register');
    setRegStep('choice');
    setShowModal(true);
  };

  const startRegistration = (role: UserRole) => {
    setSelectedRegType(role);
    setRegStep('form');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden font-inter">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">E</div>
            <span className="text-2xl font-bold tracking-tight text-slate-800">EquiGov</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-1 border-r pr-6 border-slate-100">
               {(['AZ', 'TR', 'EN', 'RU'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    language === lang 
                      ? 'bg-slate-100 text-blue-600' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
            <button 
              onClick={() => { setModalMode('login'); setShowModal(true); }}
              className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors"
            >
              {t.hero.signIn}
            </button>
            <button 
              onClick={handleRegisterClick}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
            >
              {t.hero.register}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase border border-blue-100">
              <Clock size={14} />
              {t.hero.tag}
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              {t.hero.title}
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
              {t.hero.desc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleRegisterClick}
                className="bg-slate-900 text-white px-8 py-5 rounded-[24px] font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group shadow-2xl"
              >
                {t.hero.getStarted}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white border border-slate-200 text-slate-700 px-8 py-5 rounded-[24px] font-bold text-lg hover:bg-slate-50 transition-all">
                {t.hero.demo}
              </button>
            </div>
          </div>
          <div className="relative">
             <div className="bg-gradient-to-tr from-blue-600/10 to-indigo-600/10 rounded-[64px] p-10 border border-slate-100 shadow-2xl relative">
              <img 
                src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1000" 
                alt="New York Stock Exchange Interior" 
                className="rounded-[40px] shadow-2xl border border-white object-cover aspect-video"
              />
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[32px] shadow-2xl border border-slate-100 animate-in slide-in-from-left-8 duration-700">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center">
                    <Shield size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Digital Trust</p>
                    <p className="font-bold text-slate-800">MyGovID Verified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="bg-white w-full max-w-lg rounded-[40px] overflow-hidden relative z-10 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-300">
            <div className="flex border-b border-slate-100">
              <button 
                onClick={() => setModalMode('login')}
                className={`flex-1 py-6 font-bold text-xs uppercase tracking-widest transition-all ${modalMode === 'login' ? 'text-blue-600 border-b-2 border-blue-600 bg-white' : 'text-slate-400 bg-slate-50 hover:text-slate-600'}`}
              >
                {t.hero.signIn}
              </button>
              <button 
                onClick={() => { setModalMode('register'); setRegStep('choice'); }}
                className={`flex-1 py-6 font-bold text-xs uppercase tracking-widest transition-all ${modalMode === 'register' ? 'text-blue-600 border-b-2 border-blue-600 bg-white' : 'text-slate-400 bg-slate-50 hover:text-slate-600'}`}
              >
                {t.hero.register}
              </button>
            </div>

            <div className="p-12">
              {modalMode === 'login' ? (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-800">{t.auth.title}</h3>
                    <p className="text-slate-500 text-sm">{t.auth.desc}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <button onClick={() => handleEnter(UserRole.COMPANY)} className="flex items-center gap-4 p-5 rounded-2xl border border-slate-100 hover:bg-blue-50 transition-all text-left group">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all"><Building2 size={24} /></div>
                      <div><p className="font-bold text-slate-800">{t.auth.company}</p><p className="text-xs text-slate-400 italic">{t.auth.companySub}</p></div>
                    </button>
                    <button onClick={() => handleEnter(UserRole.SHAREHOLDER)} className="flex items-center gap-4 p-5 rounded-2xl border border-slate-100 hover:bg-blue-50 transition-all text-left group">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all"><UserCircle size={24} /></div>
                      <div><p className="font-bold text-slate-800">{t.auth.shareholder}</p><p className="text-xs text-slate-400 italic">{t.auth.shareholderSub}</p></div>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="animate-in fade-in duration-300">
                  {regStep === 'choice' ? (
                    <div className="space-y-8">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-slate-800">{t.auth.regTitle}</h3>
                        <p className="text-slate-500 text-sm">{t.auth.regDesc}</p>
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        <button onClick={() => startRegistration(UserRole.COMPANY)} className="flex items-center gap-4 p-5 rounded-2xl border border-slate-100 hover:bg-blue-50 transition-all text-left group">
                          <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all"><Building2 size={24} /></div>
                          <div><p className="font-bold text-slate-800">{t.auth.company}</p><p className="text-xs text-slate-400 italic">{t.auth.companySub}</p></div>
                        </button>
                        <button onClick={() => startRegistration(UserRole.SHAREHOLDER)} className="flex items-center gap-4 p-5 rounded-2xl border border-slate-100 hover:bg-blue-50 transition-all text-left group">
                          <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all"><UserCircle size={24} /></div>
                          <div><p className="font-bold text-slate-800">{t.auth.shareholder}</p><p className="text-xs text-slate-400 italic">{t.auth.shareholderSub}</p></div>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-slate-800">
                          {selectedRegType === UserRole.COMPANY ? 'Register Company' : 'Register Shareholder'}
                        </h3>
                        <p className="text-slate-500 text-sm">Please provide your {selectedRegType === UserRole.COMPANY ? 'official company' : 'personal identification'} details.</p>
                      </div>
                      <div className="space-y-4">
                        <div className="relative">
                          {selectedRegType === UserRole.COMPANY ? <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} /> : <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />}
                          <input 
                            type="text" 
                            placeholder={selectedRegType === UserRole.COMPANY ? "Company Legal Name" : "Full Legal Name"} 
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" 
                          />
                        </div>
                        <div className="relative">
                           <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                           <input 
                            type="text" 
                            placeholder={selectedRegType === UserRole.COMPANY ? "VÖEN / Tax ID" : "FIN / ID Serial Number"} 
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" 
                          />
                        </div>
                      </div>
                      <button 
                        onClick={() => selectedRegType && handleEnter(selectedRegType)} 
                        className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold shadow-xl hover:bg-blue-700 transition-all active:scale-95"
                      >
                        {t.hero.getStarted}
                      </button>
                      <button 
                        onClick={() => setRegStep('choice')}
                        className="w-full text-center text-xs font-bold text-blue-600 uppercase tracking-widest hover:underline"
                      >
                        Back to Selection
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              <button 
                onClick={() => setShowModal(false)}
                className="mt-8 w-full text-center text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600"
              >
                {t.auth.cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
