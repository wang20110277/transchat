import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Users, 
  Compass, 
  Sparkles, 
  Settings,
  Bell,
  LogOut,
  MessageCircle,
  User,
  Orbit
} from 'lucide-react';

// Pages
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';
import DiscoveryPage from './pages/DiscoveryPage';
import IntelligenceHub from './pages/IntelligenceHub';
import ContactsPage from './pages/ContactsPage';
import SettingsPage from './pages/SettingsPage';
import DigitalHumanPage from './pages/DigitalHumanPage';

type ViewMode = 'chat' | 'contacts' | 'discovery' | 'ai' | 'agent' | 'profile' | 'settings';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewMode>('chat');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isAuthenticated) {
    return <AuthPage onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'chat': return <ChatPage />;
      case 'discovery': return <DiscoveryPage />;
      case 'ai': return <IntelligenceHub />;
      case 'contacts': return <ContactsPage />;
      case 'settings':
      case 'profile': return <SettingsPage onLogout={() => setIsAuthenticated(false)} />;
      default:
        return <ChatPage />;
    }
  };

  // Add global styles for no-scrollbar
  if (typeof document !== 'undefined' && !document.getElementById('global-no-scrollbar')) {
    const style = document.createElement('style');
    style.id = 'global-no-scrollbar';
    style.textContent = `
      .no-scrollbar::-webkit-scrollbar { display: none; }
      .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `;
    document.head.appendChild(style);
  }

  return (
    <div className="flex h-screen bg-surface overflow-hidden text-text-main font-sans">
      {/* Desktop Sidebar Navigation */}
      {!isMobile && (
        <div className="w-16 flex flex-col items-center py-6 bg-white border-r border-border-base flex-shrink-0 z-50">
          {/* Top: Profile & Logo Area */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div 
              onClick={() => setCurrentView('profile')}
              className={`w-11 h-11 rounded-full overflow-hidden border-2 cursor-pointer transition-all shadow-sm ${currentView === 'profile' ? 'border-primary scale-105 shadow-primary/20' : 'border-border-base hover:border-primary'}`}
            >
              <img src="https://picsum.photos/seed/me/100" alt="Me" className="w-full h-full object-cover" />
            </div>
          </div>
          
          <div className="flex flex-col gap-6 flex-1">
            <SidebarNavItem icon={MessageCircle} active={currentView === 'chat'} onClick={() => setCurrentView('chat')} />
            <SidebarNavItem icon={Users} active={currentView === 'contacts'} onClick={() => setCurrentView('contacts')} />
            <SidebarNavItem icon={Sparkles} active={currentView === 'ai'} onClick={() => setCurrentView('ai')} />
            <SidebarNavItem icon={Orbit} active={currentView === 'discovery'} onClick={() => setCurrentView('discovery')} />
          </div>

          <div className="mt-auto flex flex-col gap-6">
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="w-11 h-11 flex items-center justify-center rounded-xl text-text-muted hover:bg-red-50 hover:text-red-500 transition-all"
              title="退出登录"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>

        {/* Mobile Bottom Tab Bar */}
        {isMobile && (
          <div className="h-16 bg-white border-t border-border-base flex items-center justify-around flex-shrink-0 z-50 px-2 overflow-x-auto no-scrollbar">
            <MobileTab icon={MessageCircle} label="消息" active={currentView === 'chat'} onClick={() => setCurrentView('chat')} />
            <MobileTab icon={Users} label="联系人" active={currentView === 'contacts'} onClick={() => setCurrentView('contacts')} />
            <MobileTab icon={Sparkles} label="智能" active={currentView === 'ai'} onClick={() => setCurrentView('ai')} />
            <MobileTab icon={Orbit} label="社交圈" active={currentView === 'discovery'} onClick={() => setCurrentView('discovery')} />
            <MobileTab icon={User} label="我的" active={currentView === 'settings' || currentView === 'profile'} onClick={() => setCurrentView('settings')} />
          </div>
        )}
      </main>
    </div>
  );
}

function SidebarNavItem({ icon: Icon, active, onClick, color }: { icon: any, active?: boolean, onClick?: () => void, color?: string }) {
  return (
    <div className="relative group">
      <button 
        onClick={onClick}
        className={`
          w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-300
          ${active ? 'bg-primary/10 text-primary' : `${color || 'text-text-muted'} hover:bg-surface`}
        `}
      >
        <Icon size={20} className={active ? 'stroke-[2.5]' : ''} />
      </button>
      {active && (
        <motion.div 
          layoutId="sidebar-active" 
          className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-primary rounded-r-full"
        />
      )}
    </div>
  );
}

function MobileTab({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 flex-1 py-1 transition-all ${active ? 'text-primary' : 'text-text-muted'}`}
    >
      <div className={`p-1.5 rounded-xl transition-all ${active ? 'bg-primary/10' : ''}`}>
        <Icon size={20} strokeWidth={active ? 2.5 : 2} />
      </div>
      <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'opacity-100' : 'opacity-60'}`}>{label}</span>
    </button>
  );
}
