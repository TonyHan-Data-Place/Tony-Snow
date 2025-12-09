import React, { useState } from 'react';
import PlanTab from './components/PlanTab';
import WalletTab from './components/WalletTab';
import ListsTab from './components/ListsTab';
import InfoTab from './components/InfoTab';
import { CalendarDays, Wallet, ListChecks, Info } from 'lucide-react';

type Tab = 'plan' | 'wallet' | 'lists' | 'info';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('plan');

  const renderContent = () => {
    switch (activeTab) {
      case 'plan': return <PlanTab />;
      case 'wallet': return <WalletTab />;
      case 'lists': return <ListsTab />;
      case 'info': return <InfoTab />;
      default: return <PlanTab />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-snow-light min-h-screen relative font-sans">
      {/* Main Content Area */}
      <main className="min-h-screen">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] z-50 pb-safe">
        <div className="flex justify-around items-center h-16">
          <NavButton 
            active={activeTab === 'plan'} 
            onClick={() => setActiveTab('plan')} 
            icon={<CalendarDays size={24} />} 
            label="PLAN" 
          />
          <NavButton 
            active={activeTab === 'wallet'} 
            onClick={() => setActiveTab('wallet')} 
            icon={<Wallet size={24} />} 
            label="WALLET" 
          />
          <NavButton 
            active={activeTab === 'lists'} 
            onClick={() => setActiveTab('lists')} 
            icon={<ListChecks size={24} />} 
            label="LISTS" 
          />
          <NavButton 
            active={activeTab === 'info'} 
            onClick={() => setActiveTab('info')} 
            icon={<Info size={24} />} 
            label="INFO" 
          />
        </div>
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${active ? 'text-winter-blue' : 'text-gray-400 hover:text-gray-500'}`}
  >
    <div className={`transition-transform duration-200 ${active ? 'scale-110' : ''}`}>
        {icon}
    </div>
    <span className={`text-[10px] font-bold tracking-wide ${active ? 'text-winter-blue' : 'text-gray-400'}`}>{label}</span>
  </button>
);

export default App;