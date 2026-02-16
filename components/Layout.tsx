
import React from 'react';
import { UserRole, Language } from '../types';
import { translations } from '../i18n/translations';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Vote, 
  Settings, 
  ShieldCheck, 
  BookOpen,
  LogOut,
  ChevronRight,
  UserCircle,
  Building2,
  Database,
  Globe,
  TrendingUp
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      active 
        ? 'bg-blue-600 text-white shadow-md' 
        : 'text-slate-500 hover:bg-slate-100'
    }`}
  >
    <span className={`${active ? 'text-white' : 'text-slate-400'}`}>{icon}</span>
    <span className="font-medium">{label}</span>
    {active && <ChevronRight className="ml-auto w-4 h-4" />}
  </button>
);

interface LayoutProps {
  children: React.ReactNode;
  activeView: string;
  setActiveView: (view: string) => void;
  userRole: UserRole;
  userName: string;
  onRoleChange: (role: UserRole) => void;
  onLogout: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeView, 
  setActiveView, 
  userRole, 
  userName, 
  onRoleChange,
  onLogout,
  language,
  setLanguage
}) => {
  const t = translations[language];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 bg-white p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">E</div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight text-slate-800 leading-none">EquiGov</h1>
            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-1">Platform</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <p className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Main Menu</p>
          
          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            label={userRole === UserRole.ADMIN ? t.nav.monitor : t.nav.dashboard} 
            active={activeView === 'dashboard'} 
            onClick={() => setActiveView('dashboard')} 
          />

          {userRole === UserRole.ADMIN && (
            <>
              <SidebarItem 
                icon={<Building2 size={20} />} 
                label={t.nav.clients} 
                active={activeView === 'clients'} 
                onClick={() => setActiveView('dashboard')} 
              />
              <SidebarItem 
                icon={<Database size={20} />} 
                label={t.nav.logs} 
                active={activeView === 'logs'} 
                onClick={() => setActiveView('dashboard')} 
              />
            </>
          )}

          {userRole === UserRole.COMPANY && (
            <>
              <SidebarItem 
                icon={<Users size={20} />} 
                label={t.nav.shareholders} 
                active={activeView === 'shareholders'} 
                onClick={() => setActiveView('shareholders')} 
              />
              <SidebarItem 
                icon={<Calendar size={20} />} 
                label={t.nav.meetings} 
                active={activeView === 'meetings'} 
                onClick={() => setActiveView('meetings')} 
              />
              <SidebarItem 
                icon={<TrendingUp size={20} />} 
                label={t.nav.emissions} 
                active={activeView === 'emissions'} 
                onClick={() => setActiveView('emissions')} 
              />
              <SidebarItem 
                icon={<FileText size={20} />} 
                label={t.nav.reports} 
                active={activeView === 'reports'} 
                onClick={() => setActiveView('reports')} 
              />
            </>
          )}

          {userRole === UserRole.SHAREHOLDER && (
            <>
              <SidebarItem 
                icon={<Vote size={20} />} 
                label={t.nav.voting} 
                active={activeView === 'voting'} 
                onClick={() => setActiveView('voting')} 
              />
              <SidebarItem 
                icon={<FileText size={20} />} 
                label={t.nav.docs} 
                active={activeView === 'documents'} 
                onClick={() => setActiveView('documents')} 
              />
            </>
          )}

          <div className="pt-4 border-t border-slate-50 mt-4">
            <p className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reference</p>
            <SidebarItem 
              icon={<BookOpen size={20} />} 
              label={t.nav.blueprint} 
              active={activeView === 'blueprint'} 
              onClick={() => setActiveView('blueprint')} 
            />
            <SidebarItem 
              icon={<Settings size={20} />} 
              label={t.nav.settings} 
              active={activeView === 'settings'} 
              onClick={() => setActiveView('settings')} 
            />
          </div>
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100">
          <div className="flex items-center gap-3 px-2 py-3 mb-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden ring-2 ring-white shadow-sm">
              <img src={`https://ui-avatars.com/api/?name=${userName}&background=random`} alt="Avatar" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-700 truncate">{userName}</p>
              <p className="text-[10px] font-bold text-blue-500 uppercase">{userRole}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
          >
            <LogOut size={18} />
            {t.nav.logout}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-green-500" size={18} />
              <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
                {userRole === UserRole.ADMIN ? "Secure Admin Session" : "Client Portal Active"}
              </span>
            </div>
            
            {/* Language Switcher */}
            <div className="flex items-center gap-1 border-l pl-6 border-slate-100">
              <Globe size={14} className="text-slate-400 mr-2" />
              {(['AZ', 'TR', 'EN', 'RU'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${
                    language === lang 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <button className="flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors border border-blue-100 uppercase tracking-tight shadow-sm">
                <UserCircle size={14} />
                Toggle Role
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-2xl py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all z-50">
                <p className="px-4 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Select Access Level</p>
                {Object.values(UserRole).map((role) => (
                  <button
                    key={role}
                    onClick={() => onRoleChange(role)}
                    className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-slate-50 transition-colors ${userRole === role ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-slate-600'}`}
                  >
                    {role === UserRole.ADMIN ? "Platform Owner (Admin)" : role === UserRole.COMPANY ? "Client (Company)" : "Client (Shareholder)"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
