import React, { useState } from 'react';
import { UserProfile } from '../types';
import AvatarCustomizer from './AvatarCustomizer';
import { User, ShieldCheck, Flame, Wallet, Edit3, Check, RefreshCw } from 'lucide-react';

interface ProfileViewProps {
  user: UserProfile;
  onUpdateUser: (updatedUser: UserProfile) => void;
}

export default function ProfileView({ user, onUpdateUser }: ProfileViewProps) {
  const [isEditingMeta, setIsEditingMeta] = useState(false);
  const [displayName, setDisplayName] = useState(user.displayName);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  
  // Custom mock currency counters
  const [robuxInput, setRobuxInput] = useState(user.robux.toString());
  const [devPointsInput, setDevPointsInput] = useState(user.devPoints.toString());

  const handleSaveMeta = () => {
    onUpdateUser({
      ...user,
      displayName: displayName.trim() || user.displayName,
      username: username.trim() || user.username,
      bio: bio.trim() || user.bio,
      robux: parseInt(robuxInput) || 0,
      devPoints: parseInt(devPointsInput) || 0
    });
    setIsEditingMeta(false);
  };

  const handleAvatarChange = (newAvatarConfig: UserProfile['avatar']) => {
    onUpdateUser({
      ...user,
      avatar: newAvatarConfig
    });
  };

  const generateRandomBalances = () => {
    const randomRobux = Math.floor(Math.random() * 50000) + 10000;
    const randomPoints = Math.floor(Math.random() * 8000) + 2000;
    onUpdateUser({
      ...user,
      robux: randomRobux,
      devPoints: randomPoints
    });
    setRobuxInput(randomRobux.toString());
    setDevPointsInput(randomPoints.toString());
  };

  return (
    <div className="space-y-6 animate-in fade-in-40 duration-200">
      
      {/* Profile Overview Card (Roblox Banner style but minimal) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs relative overflow-hidden text-left space-y-6">
        
        {/* Banner header accent */}
        <div className="absolute top-0 inset-x-0 h-2.5 bg-gradient-to-r from-amber-400 via-sky-400 to-indigo-500" />
        
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pt-1">
          <div className="flex items-center gap-4">
            {/* Minimalist R6 head visual with active customize settings */}
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center border-2 border-slate-300 relative shrink-0 shadow-xs"
              style={{ backgroundColor: user.avatar.headColor }}
            >
              <div className="flex flex-col items-center justify-center space-y-1">
                <div className="flex gap-2">
                  <span className="w-1.5 h-1.5 bg-slate-800 rounded-full" />
                  <span className="w-1.5 h-1.5 bg-slate-800 rounded-full" />
                </div>
                <div className="w-4 h-1.5 bg-slate-800 rounded-b-md" />
              </div>
              <span className="absolute bottom-1 right-1 bg-emerald-500 w-3 h-3 rounded-full border-2 border-white" title="สถานะพร้อมใช้งาน" />
            </div>

            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg font-black text-slate-800 leading-none">{user.displayName}</h1>
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded text-[9.5px] font-bold uppercase font-mono">
                  <ShieldCheck className="w-3 h-3 text-blue-500" /> นักพัฒนาอย่างเป็นทางการ (VERIFIED CREATOR)
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">@{user.username}</p>
            </div>
          </div>

          <button
            onClick={() => setIsEditingMeta(!isEditingMeta)}
            id="btn-edit-profile-meta"
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-705 border border-slate-200 rounded-xl text-xs font-extrabold transition-all cursor-pointer self-start sm:self-auto flex items-center gap-1.5"
          >
            {isEditingMeta ? 'ยกเลิกการปรับแต่ง' : '⚙️ จัดแจงบัญชี/ยอดคงเหลือ'}
          </button>
        </div>

        {/* Conditional Editor Form */}
        {isEditingMeta ? (
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4 text-left animate-in slide-in-from-top-3 duration-100" id="profile-edit-meta-form">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider border-b pb-2">✏️ แก้ไขข้อมูลบัญชียอดจำลอง</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-wider mb-1">ชื่อสลักเวที (Display Name)</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  id="profile-displayName"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-wider mb-1">ชื่อผู้ใช้ (Username)</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  id="profile-username"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono font-semibold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-wider mb-1">คำอธิบายประวัติส่วนตัว (Bio)</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                id="profile-bio"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs leading-relaxed focus:outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                  🪙 ยอดเหรียญ Robux
                </label>
                <input
                  type="number"
                  value={robuxInput}
                  onChange={(e) => setRobuxInput(e.target.value)}
                  id="profile-robux"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                  ⚡ พลังผลงาน DevPoints
                </label>
                <input
                  type="number"
                  value={devPointsInput}
                  onChange={(e) => setDevPointsInput(e.target.value)}
                  id="profile-devPoints"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono font-semibold focus:outline-none"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={generateRandomBalances}
                  className="w-full py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> สุ่มตัวเลขยอดคงเหลือ
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t text-xs">
              <button
                type="button"
                onClick={() => setIsEditingMeta(false)}
                className="px-3 py-1.5 text-slate-500 hover:text-slate-800"
              >
                ละทิ้ง
              </button>
              <button
                type="button"
                onClick={handleSaveMeta}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg"
              >
                บันทึกบัญชี
              </button>
            </div>
          </div>
        ) : (
          /* Profile text section */
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">เกี่ยวกับฉัน (About Me)</h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-2xl mt-1 whitespace-pre-wrap font-medium font-sans">
                {user.bio || 'ยังไม่มีคำบรรยายชีวประวัติส่วนตัวในระบบ'}
              </p>
            </div>

            {/* Quick Balances Grid preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md pt-2">
              <div className="flex items-center gap-3 bg-amber-50 border border-amber-200/45 p-3 rounded-xl">
                <span className="text-2xl">🪙</span>
                <div className="text-left">
                  <p className="text-3xs font-extrabold text-amber-500 uppercase tracking-wider leading-none">Robux Balance</p>
                  <p className="text-base font-black text-amber-700 leading-tight mt-1 font-mono">
                    {user.robux.toLocaleString()}{' '}
                    <span className="font-sans font-semibold text-xs py-0.5 text-amber-500">R$</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-sky-50 border border-sky-200/45 p-3 rounded-xl">
                <Flame className="w-6 h-6 text-sky-500 fill-sky-200" />
                <div className="text-left">
                  <p className="text-3xs font-extrabold text-sky-500 uppercase tracking-wider leading-none">Creator DevPower</p>
                  <p className="text-base font-black text-sky-700 leading-tight mt-1 font-mono">
                    {user.devPoints.toLocaleString()}{' '}
                    <span className="font-sans font-semibold text-xs text-sky-400">DEV</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Embedded Roblox Avatar Visual Customizer block */}
      <div className="space-y-2 text-left">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          👤 จัดแต่งหน้าตาชุดใส่ (Avatar Wardrobe Customizer)
        </h2>
        <AvatarCustomizer config={user.avatar} onChange={handleAvatarChange} />
      </div>

    </div>
  );
}
