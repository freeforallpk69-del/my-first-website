import React from 'react';
import { Home, User, FolderOpen, Puzzle, FileClock, Plus, Flame, Sparkles } from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onAddProject: () => void;
  projectCount: number;
}

export default function Sidebar({ currentTab, onTabChange, onAddProject, projectCount }: SidebarProps) {
  const menuItems = [
    { id: 'home', label: 'หน้าแรก', sub: 'Home Dashboard', icon: Home },
    { id: 'profile', label: 'โปรไฟล์ & อวตาร', sub: 'Profile & Avatar', icon: User },
    { id: 'creations', label: 'คลังงานทั้งหมด', sub: 'All Creations', icon: FolderOpen, badge: projectCount },
    { id: 'library', label: 'โมดูลสคริปต์/โมเดล', sub: 'Code & Models', icon: Puzzle },
    { id: 'logs', label: 'ประวัติบันทึกการพัฒนา', sub: 'Dev Logs Timeline', icon: FileClock },
  ];

  return (
    <aside className="w-full md:w-64 bg-slate-50 border-r border-slate-200/60 p-4 sm:p-5 flex flex-col justify-between select-none" id="sidebar-container">
      
      {/* Navigation Links */}
      <div className="space-y-6">
        <div>
          <span className="text-3xs font-extrabold text-slate-400 uppercase tracking-widest block mb-3 px-2">
            หมวดหมู่เมนูหลัก
          </span>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  id={`btn-tab-${item.id}`}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-800 text-white font-semibold shadow-xs shadow-slate-900/10'
                      : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`p-1.5 rounded-lg transition-colors ${
                      isActive ? 'bg-slate-700 text-sky-400' : 'bg-slate-200 text-slate-500'
                    }`}>
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    <div className="text-left">
                      <p className="text-xs font-semibold leading-none">{item.label}</p>
                      <p className={`text-[9px] mt-0.5 leading-none ${
                        isActive ? 'text-slate-300' : 'text-slate-400 font-mono'
                      }`}>
                        {item.sub}
                      </p>
                    </div>
                  </div>
                  
                  {item.badge !== undefined && (
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Studio Shortcut button */}
        <div className="pt-2">
          <button
            onClick={onAddProject}
            id="btn-sidebar-create"
            className="w-full flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-black shadow-md transition-all cursor-pointer active:scale-97 group border border-slate-700"
          >
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            เพิ่มชิ้นงานเข้าระบบ
          </button>
        </div>
      </div>

      {/* Footer Branding Area of Sidebar */}
      <div className="mt-8 pt-4 border-t border-slate-200/70 text-slate-400 space-y-3">
        <div className="flex items-center gap-2 bg-slate-200/45 p-2.5 rounded-lg">
          <Sparkles className="w-3.5 h-3.5 text-slate-500 animate-pulse" />
          <div className="text-left">
            <p className="text-[10px] font-bold text-slate-600 leading-none">Roblox Dev Cabinet</p>
            <p className="text-[8px] text-slate-500">Minimal workspace v1.1</p>
          </div>
        </div>
        <p className="text-[9px] text-center font-semibold font-mono text-slate-400 leading-normal">
          &copy; 2026 ArchiveStudio <br /> Simple Portfolio Manager
        </p>
      </div>

    </aside>
  );
}
