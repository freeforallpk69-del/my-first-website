import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Search, Flame, Bell, Settings, Edit2, Check } from 'lucide-react';

interface HeaderProps {
  user: UserProfile;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onStatusUpdate: (text: string) => void;
  onNavigateToProfile: () => void;
}

export default function Header({ user, searchQuery, onSearchChange, onStatusUpdate, onNavigateToProfile }: HeaderProps) {
  const [editingStatus, setEditingStatus] = useState(false);
  const [statusVal, setStatusVal] = useState(user.statusText);

  const saveStatus = () => {
    onStatusUpdate(statusVal);
    setEditingStatus(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveStatus();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/94 backdrop-blur-md border-b border-slate-100 px-4 sm:px-6 py-3 shrink-0 flex items-center justify-between" id="app-header">
      
      {/* Brand Logo & Interactive Search */}
      <div className="flex items-center gap-6 flex-1 max-w-lg">
        {/* Minimalist modern Roblox tilted square block icon */}
        <div className="flex items-center gap-2 cursor-pointer select-none" onClick={onNavigateToProfile}>
          <div className="w-8 h-8 bg-slate-800 rounded-md flex items-center justify-center transform rotate-12 shadow-xs group hover:rotate-[72deg] transition-all duration-300">
            {/* The signature inner square punch in the modern Roblox logo */}
            <div className="w-2.5 h-2.5 bg-white rounded-2xs transform -rotate-12 group-hover:rotate-0" />
          </div>
          <span className="font-sans font-black text-slate-800 text-sm tracking-tight hidden lg:block">
            ARCHIVE STUDIO
          </span>
        </div>

        {/* Global Catalog Search */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </span>
          <input
            type="text"
            placeholder="ค้นหาชื่อผลงาน, รหัสโค้ด, ชิ้นงาน..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            id="header-search-input"
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 focus:border-slate-300 hover:bg-slate-100/70 focus:bg-white text-xs font-semibold text-slate-700 placeholder-slate-400 rounded-lg transition-all focus:outline-none"
          />
        </div>
      </div>

      {/* Developer Stats Indicators & User Menu */}
      <div className="flex items-center gap-3 sm:gap-5 ml-4">
        
        {/* Robux & DevPoints indicator */}
        <div className="hidden md:flex items-center gap-3 text-xs select-none">
          {/* Mock Classic Robux balance with Roblox symbol styling */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200/50 rounded-lg">
            <span className="text-amber-600 font-extrabold text-xs">🪙</span>
            <span className="font-mono font-bold text-amber-700">
              {user.robux.toLocaleString()} <span className="font-sans font-medium text-[9px] text-amber-500">R$</span>
            </span>
          </div>

          {/* DevPoints balance */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 border border-sky-200/50 rounded-lg">
            <Flame className="w-3.5 h-3.5 text-sky-500 fill-sky-200" />
            <span className="font-mono font-bold text-sky-700">
              {user.devPoints.toLocaleString()} <span className="font-sans font-medium text-[9px] text-sky-400">DEV</span>
            </span>
          </div>
        </div>

        {/* Interactive Custom status text bar */}
        <div className="hidden sm:flex items-center gap-2 max-w-[200px] border-l border-slate-200 pl-4 py-1">
          {editingStatus ? (
            <div className="flex items-center bg-slate-100 rounded-md p-0.5">
              <input
                type="text"
                autoFocus
                value={statusVal}
                onChange={(e) => setStatusVal(e.target.value)}
                onBlur={saveStatus}
                onKeyPress={handleKeyPress}
                maxLength={40}
                className="bg-transparent text-3xs text-slate-700 font-semibold focus:outline-none px-1.5 py-0.5 w-[110px]"
              />
              <button
                onMouseDown={saveStatus}
                className="p-1 text-emerald-600 hover:bg-slate-200 rounded cursor-pointer"
              >
                <Check className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => setEditingStatus(true)}
              className="flex items-center gap-1.5 cursor-pointer max-w-full text-slate-500 hover:bg-slate-100 px-2 py-1 rounded transition-colors group"
              title="Click to edit current status"
            >
              <span className="text-xs text-slate-400 transition-colors group-hover:text-slate-600">💬</span>
              <span className="text-3xs font-semibold text-slate-600 truncate max-w-[124px]">
                {user.statusText || 'เซ็ตสถานะหัวหมอก'}
              </span>
              <Edit2 className="w-2.5 h-2.5 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}
        </div>

        {/* Mini Creator Profile */}
        <div
          onClick={onNavigateToProfile}
          id="btn-header-profile"
          className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 px-2 rounded-lg transition-colors border border-transparent hover:border-slate-100"
        >
          {/* Mini Roblox blocky style head outline */}
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center relative overflow-hidden shadow-2xs border border-slate-300"
            style={{ backgroundColor: user.avatar.headColor }}
          >
            {/* Minimalist face drawn */}
            <div className="flex flex-col items-center justify-center space-y-1 mt-0.5">
              <div className="flex gap-1.5">
                <span className="w-1 h-1 bg-slate-800 rounded-full" />
                <span className="w-1 h-1 bg-slate-800 rounded-full" />
              </div>
              <div className="w-2.5 h-1 bg-slate-800 rounded-b-sm" />
            </div>
          </div>

          <div className="text-left hidden xs:block">
            <p className="text-3xs font-bold text-slate-400 font-mono tracking-tight lowercase">
              @{user.username}
            </p>
            <p className="text-2xs font-extrabold text-slate-700 truncate max-w-[80px]">
              {user.displayName}
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}
