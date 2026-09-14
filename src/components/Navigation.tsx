import React from 'react';
import { Home, CheckSquare, Users, Crown, User } from 'lucide-react';
import { TabType, Language } from '../types';
import { translations } from '../data/translations';

interface NavigationProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  language: Language;
}

export const Navigation: React.FC<NavigationProps> = ({ currentTab, onSelectTab, language }) => {
  const t = translations[language];

  const tabs: { id: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: t.home, icon: Home },
    { id: 'task', label: t.task, icon: CheckSquare },
    { id: 'team', label: t.team, icon: Users },
    { id: 'vip', label: t.vip, icon: Crown },
    { id: 'me', label: t.me, icon: User },
  ];

  return (
    <nav
      id="bottom-navigation-bar"
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%) translateZ(0)',
        WebkitTransform: 'translateX(-50%) translateZ(0)',
        width: '100%',
        maxWidth: '28rem',
        zIndex: 40,
        willChange: 'transform',
        paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom, 0px))',
      }}
      className="fixed bottom-0 bg-white border-t border-gray-200 flex justify-around items-center pt-2 select-none shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            id={`nav-${tab.id}`}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition active:scale-95 cursor-pointer ${
              isActive ? 'text-red-600 font-bold' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
            <span className="text-[11px] mt-0.5 tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
