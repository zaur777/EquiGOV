
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './views/Dashboard';
import { AdminDashboard } from './views/AdminDashboard';
import { ShareholderManagement } from './views/ShareholderManagement';
import { MeetingManagement } from './views/MeetingManagement';
import { TechnicalBlueprint } from './views/TechnicalBlueprint';
import { LandingPage } from './views/LandingPage';
import { VotingPortal } from './views/VotingPortal';
import { UserRole, Language } from './types';
import { mockCurrentUser } from './services/mockData';
import { translations } from './i18n/translations';
import { CreditCard } from 'lucide-react';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [language, setLanguage] = useState<Language>('AZ');
  const [currentUser, setCurrentUser] = useState({
    ...mockCurrentUser,
    role: UserRole.ADMIN 
  });

  const t = translations[language];

  const handleLogin = (role: UserRole) => {
    setCurrentUser(prev => ({ ...prev, role }));
    setIsLoggedIn(true);
    setActiveView('dashboard');
  };

  const handleRoleChange = (role: UserRole) => {
    setCurrentUser(prev => ({ ...prev, role }));
    setActiveView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const renderView = () => {
    if (currentUser.role === UserRole.ADMIN) {
      switch (activeView) {
        case 'dashboard':
          return <AdminDashboard language={language} />;
        case 'shareholders':
          return <ShareholderManagement language={language} />;
        case 'meetings':
          return <MeetingManagement language={language} />;
        case 'blueprint':
          return <TechnicalBlueprint language={language} />;
        case 'settings':
          return <SystemSettingsView language={language} />;
        default:
          return <AdminDashboard language={language} />;
      }
    }

    switch (activeView) {
      case 'dashboard':
        return <Dashboard role={currentUser.role} language={language} />;
      case 'shareholders':
        return <ShareholderManagement language={language} />;
      case 'meetings':
        return <MeetingManagement language={language} />;
      case 'blueprint':
        return <TechnicalBlueprint language={language} />;
      case 'reports':
        return <PlaceholderView title={t.nav.reports} icon="📂" />;
      case 'voting':
        return <VotingPortal language={language} />;
      case 'documents':
        return <PlaceholderView title={t.nav.docs} icon="📄" />;
      case 'settings':
        return <SettingsView language={language} />;
      default:
        return <Dashboard role={currentUser.role} language={language} />;
    }
  };

  if (!isLoggedIn) {
    return <LandingPage onLogin={handleLogin} language={language} setLanguage={setLanguage} />;
  }

  return (
    <Layout 
      activeView={activeView} 
      setActiveView={setActiveView} 
      userRole={currentUser.role}
      userName={currentUser.name}
      onRoleChange={handleRoleChange}
      onLogout={handleLogout}
      language={language}
      setLanguage={setLanguage}
    >
      {renderView()}
    </Layout>
  );
};

const PlaceholderView: React.FC<{title: string, icon: string}> = ({title, icon}) => (
  <div className="flex flex-col items-center justify-center h-96 text-slate-400">
    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-2xl">{icon}</div>
    <p className="font-medium">{title} Module Coming Soon</p>
  </div>
);

const SettingsView: React.FC<{language: Language}> = ({language}) => (
  <div className="bg-white p-8 rounded-2xl border border-slate-200">
    <h2 className="text-2xl font-bold mb-6 text-slate-800">{translations[language].nav.settings}</h2>
    <div className="space-y-6">
       <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
         <div>
           <p className="font-bold text-slate-700">MyGovID Link</p>
           <p className="text-sm text-slate-500">Verified Identity Connection</p>
         </div>
         <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">Active</span>
       </div>
    </div>
  </div>
);

const SystemSettingsView: React.FC<{language: Language}> = ({language}) => (
  <div className="bg-white p-8 rounded-2xl border border-slate-200">
    <h2 className="text-2xl font-bold mb-6 text-slate-800">{translations[language].nav.settings} (Owner)</h2>
    <div className="space-y-8">
       <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
          <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
            <CreditCard size={18} className="text-blue-600" />
            Pricing Configuration (Current Azerbaijan Law)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
             <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
               <p className="font-bold text-slate-800 border-b pb-2 mb-2">Company Yearly Fees</p>
               <ul className="space-y-1 text-slate-600">
                 <li>0-100 Shareholders: <span className="font-bold text-blue-600">199 AZN</span></li>
                 <li>100-300 Shareholders: <span className="font-bold text-blue-600">499 AZN</span></li>
                 <li>300-1000 Shareholders: <span className="font-bold text-blue-600">1999 AZN</span></li>
                 <li>1000+ Shareholders: <span className="font-bold text-blue-600">9999 AZN</span></li>
               </ul>
             </div>
             <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
               <p className="font-bold text-slate-800 border-b pb-2 mb-2">Shareholder Fees</p>
               <ul className="space-y-1 text-slate-600">
                 <li>Per Company Link: <span className="font-bold text-blue-600">12 AZN / year</span></li>
                 <li>Trial Period: <span className="font-bold text-green-600 uppercase">3 Months Free</span></li>
               </ul>
             </div>
          </div>
       </div>
    </div>
  </div>
);

export default App;
