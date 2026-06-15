import React, { useState } from 'react';
import { Project, DevLog, UserProfile, ProjectCategory } from '../types';
import { 
  Flame, Globe, Lock, Play, Layers, BadgeAlert, 
  Terminal, ArrowUpRight, Copy, Check, ChevronRight,
  TrendingUp, Star, Users, Info, Plus, PlusCircle, Trash2, Code, Zap
} from 'lucide-react';

interface DashboardViewProps {
  currentTab: string;
  projects: Project[];
  logs: DevLog[];
  user: UserProfile;
  searchQuery: string;
  onSelectProject: (project: Project) => void;
  onAddProject: () => void;
  onAddLog: (newLog: DevLog) => void;
  onDeleteLog: (id: string) => void;
}

export default function DashboardView({
  currentTab,
  projects,
  logs,
  user,
  searchQuery,
  onSelectProject,
  onAddProject,
  onAddLog,
  onDeleteLog,
}: DashboardViewProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Dev log adder state
  const [showLogForm, setShowLogForm] = useState(false);
  const [logTitle, setLogTitle] = useState('');
  const [logDesc, setLogDesc] = useState('');
  const [logType, setLogType] = useState<DevLog['type']>('update');
  const [logProjectId, setLogProjectId] = useState('');

  // Filter projects based on query and category
  const filteredProjects = projects.filter((proj) => {
    const matchesSearch = 
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeCategory === 'all') return matchesSearch;
    return proj.category === activeCategory && matchesSearch;
  });

  // Calculate statistics
  const gameCount = projects.filter(p => p.category === 'game').length;
  const scriptCount = projects.filter(p => p.category === 'script').length;
  const assetCount = projects.filter(p => ['gui', 'model', 'gfx'].includes(p.category)).length;
  
  // Calculate a developer power score based on creations and updates
  const devPowerScore = projects.length * 1200 + logs.length * 450;

  const handleCopySnippet = (e: React.MouseEvent, id: string, code: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logTitle.trim()) return;

    const newLog: DevLog = {
      id: `log-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      title: logTitle,
      description: logDesc,
      type: logType,
      projectId: logProjectId || undefined
    };

    onAddLog(newLog);
    setLogTitle('');
    setLogDesc('');
    setLogType('update');
    setLogProjectId('');
    setShowLogForm(false);
  };

  const getLogTypeBadge = (type: DevLog['type']) => {
    switch (type) {
      case 'release':
        return <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded text-3xs font-bold uppercase font-mono">🚀 Release</span>;
      case 'bugfix':
        return <span className="px-2 py-0.5 bg-rose-50 text-rose-600 border border-rose-100 rounded text-3xs font-bold uppercase font-mono">🐞 Bug Fix</span>;
      case 'milestone':
        return <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded text-3xs font-bold uppercase font-mono">🏆 milestone</span>;
      default:
        return <span className="px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded text-3xs font-bold uppercase font-mono">⚙️ Update</span>;
    }
  };

  // Rendering HOME dashboard
  if (currentTab === 'home') {
    return (
      <div className="space-y-6 animate-in fade-in-40 duration-200">
        
        {/* Dynamic Welcome Billboard */}
        <div className="p-6 sm:p-8 bg-slate-900 text-white rounded-2xl relative overflow-hidden shadow-md">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-12 w-48 h-48 bg-slate-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mb-12" />
          
          <div className="relative z-10 space-y-4">
            <span className="bg-slate-800/80 text-sky-400 font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border border-slate-700/60 inline-block">
              ROBLOX DEVELOPER DASHBOARD
            </span>
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                ยินดีต้อนรับสู่หอเก็บชิ้นงาน, {user.displayName}!
              </h1>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                คลังจัดเก็บไฟล์มินิมอลเพื่อบริหารโปรเจกต์ ถอดรหัส Luau สคริปต์ และสำรองพรีเซ็ต Roblox Studio ของคุณให้อยู่ในที่เดียวกันอย่างสวยงาม
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <div className="text-3xs text-slate-400 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700/40 font-mono">
                📅 UTC LOCAL TIME: 2026-06-15
              </div>
              <div className="text-3xs text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-900/40 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                สถานะสตูดิโอ: พร้อมสำหรับจัดทำผลงาน
              </div>
            </div>
          </div>
        </div>

        {/* Quick Bento Stats Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-2xs">
            <p className="text-3xs font-extrabold text-slate-400 uppercase tracking-wider">แมปเกมทั้งหมด</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-800">{gameCount}</span>
              <span className="text-2xs text-slate-400 font-mono">Experiences</span>
            </div>
            <div className="w-full bg-slate-100 h-1 rounded-full mt-3 overflow-hidden">
              <div className="bg-slate-800 h-1 rounded-full" style={{ width: `${Math.min(100, gameCount * 20)}%` }} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-2xs">
            <p className="text-3xs font-extrabold text-slate-400 uppercase tracking-wider">คลังสคริปต์ระบบ</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-800">{scriptCount}</span>
              <span className="text-2xs text-slate-400 font-mono">Scripts</span>
            </div>
            <div className="w-full bg-slate-100 h-1 rounded-full mt-3 overflow-hidden">
              <div className="bg-slate-800 h-1 rounded-full" style={{ width: `${Math.min(100, scriptCount * 15)}%` }} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-2xs">
            <p className="text-3xs font-extrabold text-slate-400 uppercase tracking-wider">โมเดล/โมดูล UI</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-800">{assetCount}</span>
              <span className="text-2xs text-slate-400 font-mono">Asset Units</span>
            </div>
            <div className="w-full bg-slate-100 h-1 rounded-full mt-3 overflow-hidden">
              <div className="bg-slate-800 h-1 rounded-full" style={{ width: `${Math.min(100, assetCount * 12)}%` }} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-2xs relative overflow-hidden">
            <div className="absolute top-2 right-2">
              <Zap className="w-5 h-5 text-amber-400 fill-amber-100 animate-bounce" />
            </div>
            <p className="text-3xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              ค่าพลังนักพัฒนา (Dev Power)
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-800">{devPowerScore.toLocaleString()}</span>
              <span className="text-2xs text-slate-400 font-mono">Points</span>
            </div>
            <div className="w-full bg-slate-100 h-1 rounded-full mt-3 overflow-hidden">
              <div className="bg-amber-500 h-1 rounded-full animate-pulse" style={{ width: '74%' }} />
            </div>
          </div>
        </div>

        {/* Home main grid splits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left panel: Continue Creating */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                🎮 ล่าสุดที่อัปเดตงานค้างไว้ (Continue Creating)
              </h2>
              <button
                onClick={onAddProject}
                className="text-xs font-semibold text-slate-600 hover:text-black flex items-center gap-1"
              >
                ดูทั้งหมด <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.slice(0, 2).map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => onSelectProject(proj)}
                  className="bg-white rounded-xl border border-slate-200/60 p-4.5 space-y-3 cursor-pointer hover:border-slate-300 hover:shadow-xs group transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[9px] font-mono tracking-wider font-semibold capitalize">
                      {proj.category}
                    </span>
                    <span className="text-3xs text-slate-400 font-mono font-bold uppercase">
                      BUILD {proj.version}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="font-extrabold text-slate-800 group-hover:text-black line-clamp-1">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 min-h-[32px] leading-relaxed">
                      {proj.description || 'ไม่มีรายละเอียดเพิ่มเติม'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-3xs text-slate-400 font-mono">
                    <span>แก้ไข: {proj.lastUpdated}</span>
                    <span className="text-sky-500 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                      เปิดรายละเอียด <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
              {projects.length === 0 && (
                <div className="col-span-2 bg-slate-50/50 border border-dashed border-slate-200 rounded-xl p-8 text-center text-slate-400 space-y-3">
                  <p className="text-xs">ยังไม่มีงานถูกจัดเก็บในระบอบของคุณ</p>
                  <button
                    onClick={onAddProject}
                    className="inline-flex items-center gap-1 text-xs text-slate-800 font-bold bg-white px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" /> เพิ่มงานแรกของคุณ
                  </button>
                </div>
              )}
            </div>

            {/* Quick Luau Sandbox Tooltips */}
            <div className="bg-emerald-950 text-emerald-400 p-4 rounded-xl border border-emerald-900/50 space-y-3">
              <div className="flex items-center justify-between border-b border-emerald-900/60 pb-2">
                <span className="text-xs font-bold font-mono tracking-wider flex items-center gap-1.5 uppercase text-white">
                  <Terminal className="w-4 h-4 text-emerald-400" /> นักพัฒนาพาสังเกต (Luau Tips)
                </span>
                <span className="text-[10px] font-bold text-emerald-500 font-mono bg-emerald-900/50 px-2 rounded">SDK v2.4.0</span>
              </div>
              <p className="text-xs leading-relaxed text-emerald-300">
                คุณรู้หรือไม่? การเขียนโปรแกรมจำพวกเชื่อมต่อวัตถุใน Roblox สมควรใช้ <code className="font-mono bg-emerald-900/40 px-1 py-0.5 text-white">task.wait()</code> แทน <code className="font-mono bg-emerald-950 px-1 py-0.5 text-slate-400 line-through">wait()</code> แบบดั้งเดิม เพื่อเสถียรภาพและอัตรารีเฟรชที่ยืดหยุ่นของ CPU เซิร์ฟเวอร์สูงสุด!
              </p>
            </div>
          </div>

          {/* Right panel: Recent Dev logs timeline */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                📝 ล็อกบันทึกล่าสุด (Update Logs)
              </h2>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/60 p-5 space-y-4 shadow-2xs">
              <div className="space-y-4 relative before:absolute before:inset-y-1 before:left-3.5 before:w-0.5 before:bg-slate-100">
                {logs.slice(0, 3).map((log) => (
                  <div key={log.id} className="relative pl-7 space-y-1 text-left">
                    <div className="absolute left-[11px] top-1.5 w-2 h-2 rounded-full bg-slate-800 ring-4 ring-white" />
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <span className="text-[10px] font-mono text-slate-400">{log.date}</span>
                      {getLogTypeBadge(log.type)}
                    </div>
                    <h4 className="text-xs font-black text-slate-800">{log.title}</h4>
                    <p className="text-3xs text-slate-500 line-clamp-2 leading-relaxed">{log.description}</p>
                  </div>
                ))}
                {logs.length === 0 && (
                  <div className="text-center py-4 text-xs text-slate-450 italic">
                    ยังไม่มีความเคลื่อนไหวล็อกบันทึก
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Rendering CREATIONS tab for managing works
  if (currentTab === 'creations') {
    return (
      <div className="space-y-6 animate-in fade-in-40 duration-200">
        
        {/* Banner with controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h1 className="text-lg font-black text-slate-800">🎮 คลังชิ้นงานเเละประวัติทั้งหมด</h1>
            <p className="text-xs text-slate-500">รวมรวมผลงานใน Roblox ทั้งหมดของคุณ ปรับแต่งหรือเปิดคัดลอกส่วนโค้ดได้สะดวก</p>
          </div>
          
          <button
            onClick={onAddProject}
            className="inline-flex items-center gap-1.5 px-4 h-10 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" /> เพิ่มงานเข้าระบบ
          </button>
        </div>

        {/* Category filtering tags */}
        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-xl self-start max-w-max">
          {([
            { id: 'all', label: 'ทั้งหมด (All)' },
            { id: 'game', label: '🎮 Games' },
            { id: 'script', label: '📜 Scripts' },
            { id: 'gui', label: '🖥️ GUIs' },
            { id: 'model', label: '📦 Models' },
            { id: 'gfx', label: '🎨 Art/GFX' }
          ] as const).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-white text-slate-800 shadow-2xs ring-1 ring-slate-200/50'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Creations grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => onSelectProject(proj)}
              className="bg-white rounded-xl border border-slate-200/80 overflow-hidden cursor-pointer hover:border-slate-300 hover:shadow-sm group transition-all flex flex-col justify-between"
            >
              {/* Visual section */}
              <div className="h-32 bg-slate-100 relative overflow-hidden shrink-0 border-b border-slate-100">
                <img
                  src={proj.coverImage}
                  alt={proj.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className={`px-2 py-0.5 rounded text-[8px] font-bold text-white uppercase shadow-2xs tracking-wider ${
                    proj.status === 'public' ? 'bg-emerald-600' : proj.status === 'private' ? 'bg-rose-600' : 'bg-amber-600'
                  }`}>
                    {proj.status === 'public' && '🌐 Public'}
                    {proj.status === 'private' && '🔒 Private'}
                    {proj.status === 'draft' && '📝 Draft'}
                  </span>
                </div>
              </div>

              {/* Text content details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3 text-left">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-400 capitalize">
                    <span>{proj.category}</span>
                    <span>BUILD {proj.version}</span>
                  </div>
                  <h3 className="font-extrabold text-slate-800 group-hover:text-black leading-snug line-clamp-1">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed min-h-[36px]">
                    {proj.description || 'ไม่มีรายละเอียดเพิ่มเติม...'}
                  </p>
                </div>

                {/* Tags lists */}
                {proj.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-[22px]">
                    {proj.tags.slice(0, 3).map((t) => (
                      <span key={t} className="text-[9px] px-1.5 py-0.5 bg-slate-50 border border-slate-200 text-slate-400 font-semibold font-mono rounded">
                        #{t}
                      </span>
                    ))}
                    {proj.tags.length > 3 && (
                      <span className="text-[9px] px-1 text-slate-400 font-mono font-bold">+{proj.tags.length - 3}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Card Footer action panel */}
              <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 rounded-b-xl flex items-center justify-between text-slate-400 text-3xs font-mono">
                <span>อัปเดต: {proj.lastUpdated}</span>
                
                {/* Visual script-code button if exists */}
                <div className="flex items-center gap-1.5">
                  {proj.codeSnippet && (
                    <button
                      onClick={(e) => handleCopySnippet(e, proj.id, proj.codeSnippet || '')}
                      title="คัดลอกโค้ดสคริปต์ด่วน"
                      id={`btn-copy-shortcut-${proj.id}`}
                      className="p-1 bg-white hover:bg-slate-100 border border-slate-200 rounded text-slate-600 cursor-pointer shadow-3xs"
                    >
                      {copiedId === proj.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Code className="w-3 h-3" />}
                    </button>
                  )}
                  <span className="text-slate-800 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-sans text-[10px]">
                    เปิดดู <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}

          {filteredProjects.length === 0 && (
            <div className="col-span-full bg-slate-50/50 border border-dashed border-slate-200 rounded-xl p-12 text-center text-slate-400 space-y-4">
              <p className="text-sm">ไม่พบชิ้นงานในประเภทนี้หรือคำค้นนี้ในระบบ</p>
              <button
                onClick={onAddProject}
                className="inline-flex items-center gap-1.5 text-xs text-white font-bold bg-slate-800 px-4 py-2 rounded-xl hover:bg-slate-950 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" /> สร้างชิ้นงานใหม่ด่วน
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Rendering ASSETS LIBRARY tab
  if (currentTab === 'library') {
    const scripts = projects.filter(p => p.category === 'script');
    const modelAssets = projects.filter(p => p.category === 'model' || p.category === 'gui');

    return (
      <div className="space-y-6 animate-in fade-in-40 duration-200">
        
        <div>
          <h1 className="text-lg font-black text-slate-800">📦 คลังชิ้นส่วนโมดูลสำเร็จรูป (Developer Assets Library)</h1>
          <p className="text-xs text-slate-500 font-medium">เก็บรวบรวมไฟล์สคริปต์สั้นๆ ชิ้นส่วน 3D หรือ UI ที่พร้อมคัดลอกรหัสซอร์สโค้ดใส่ Roblox Studio ได้ทุกเมื่อ</p>
        </div>

        {/* Two split sections: reusable scripts vs models/GUI props */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Active Script Presets */}
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 space-y-4 text-left">
            <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Terminal className="w-4 h-4 text-emerald-500" /> ลิสต์สคริปต์สําเร็จรูป ({scripts.length} รายการ)
            </h2>
            
            <div className="space-y-3">
              {scripts.map((script) => (
                <div key={script.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2 group transition-all hover:bg-white hover:border-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">{script.title}</span>
                    <button
                      onClick={(e) => handleCopySnippet(e, script.id, script.codeSnippet || '')}
                      id={`btn-lib-copy-${script.id}`}
                      className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md text-3xs font-bold font-mono transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === script.id ? (
                        <>
                          <Check className="w-2.5 h-2.5 text-emerald-600" /> COPIED!
                        </>
                      ) : (
                        <>
                          <Copy className="w-2.5 h-2.5" /> COPY
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-3xs text-slate-500 truncate">{script.description || 'ไม่มีคำอธิบาย'}</p>
                  
                  {script.codeSnippet ? (
                    <div className="bg-slate-900 text-slate-300 text-[10px] font-mono p-2.5 rounded-md overflow-x-auto border border-slate-800 max-h-[80px] select-all">
                      {script.codeSnippet}
                    </div>
                  ) : (
                    <div className="text-3xs text-slate-450 italic">ไม่มีโค้ดแสดงจำกัด</div>
                  )}
                </div>
              ))}
              {scripts.length === 0 && (
                <div className="text-center py-8 bg-slate-50/50 border border-dashed rounded-lg text-xs text-slate-400">
                  ท่านยังไม่มีชิ้นงานประเภทสคริปต์เพื่อแสดงในคลัง
                </div>
              )}
            </div>
          </div>

          {/* Active Model/Mesh & UI items */}
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 space-y-4 text-left">
            <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Layers className="w-4 h-4 text-sky-500" /> โมเดล 3D & ชุด UI สำเร็จรูป ({modelAssets.length} รายการ)
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {modelAssets.map((asset) => (
                <div
                  key={asset.id}
                  onClick={() => onSelectProject(asset)}
                  className="p-3 bg-slate-50 hover:bg-white border border-slate-200 hover:border-slate-300 rounded-lg cursor-pointer transition-all flex items-center gap-3"
                >
                  <img
                    src={asset.coverImage}
                    alt={asset.title}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded object-cover border"
                  />
                  <div className="flex-1 min-w-0 text-left">
                    <h4 className="text-xs font-extrabold text-slate-850 truncate">{asset.title}</h4>
                    <span className="text-[9px] font-mono font-bold text-slate-400 capitalize">{asset.category} / {asset.version}</span>
                  </div>
                </div>
              ))}
              {modelAssets.length === 0 && (
                <div className="col-span-2 text-center py-12 bg-slate-50/50 border border-dashed rounded-lg text-xs text-slate-400">
                  ยังไม่ได้คัดลอกโมเดลหรือชุด UI วางลงในระบบ
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    );
  }

  // Rendering DEV LOGS tab for tracking timeline updates
  if (currentTab === 'logs') {
    return (
      <div className="space-y-6 animate-in fade-in-40 duration-200">
        
        {/* Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 text-left">
          <div>
            <h1 className="text-lg font-black text-slate-800">📝 ประวัติล็อกบันทึกการพัฒนา (Dev Update Logs)</h1>
            <p className="text-xs text-slate-500">จดบันทึกเวอร์ชันย้อนหลังของเกม บั๊กที่ค้างการซ่อมแซม หรือความสำเร็จย่อยของคุณ</p>
          </div>
          
          <button
            onClick={() => setShowLogForm(!showLogForm)}
            id="btn-toggle-log-form"
            className="inline-flex items-center gap-1.5 px-4 h-10 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-705 rounded-xl text-xs font-bold transition-all cursor-pointer self-start sm:self-auto"
          >
            {showLogForm ? 'ปิดหน้าต่างบันทึก' : '✏️ เขียนบันทึกใหม่'}
          </button>
        </div>

        {/* Conditionally show Log Adder Form */}
        {showLogForm && (
          <form onSubmit={handleLogSubmit} className="bg-white p-5 rounded-xl border border-slate-250 shadow-xs space-y-4 text-left animate-in slide-in-from-top-4 duration-150" id="log-form">
            <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-widest border-b pb-2">✏️ บันทึกการอัปเดตใหม่</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-wider mb-1">หัวข้อบันทึก (Event Title)</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น ปลดวิกฤติระบบฟิสิกส์เรือช้า, ซ่อมหลุมสลัวเซิร์ฟเวอร์หลัก"
                  value={logTitle}
                  onChange={(e) => setLogTitle(e.target.value)}
                  id="log-title"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-wider mb-1">ประเภทล็อกงาน (Event Type)</label>
                <select
                  value={logType}
                  onChange={(e) => setLogType(e.target.value as DevLog['type'])}
                  id="log-type"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                >
                  <option value="update">⚙️ อัปเดตทั่วไป (Update)</option>
                  <option value="bugfix">🐞 แก้ไขจุดบกพร่อง (Bug Fix)</option>
                  <option value="release">🚀 ออกจำหน่าย/เปิดเสรี (Release)</option>
                  <option value="milestone">🏆 ความสำเร็จยิ่งใหญ่ (Milestone)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-wider mb-1">ลิ้งก์กับชิ้นงาน (Linked Project - ทางเลือก)</label>
              <select
                value={logProjectId}
                onChange={(e) => setLogProjectId(e.target.value)}
                id="log-project"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              >
                <option value="">-- ไม่ระบุชิ้นงานโดยตรง --</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-wider mb-1 font-mono">สรุปความเคลื่อนไหว (Log text)</label>
              <textarea
                rows={2}
                placeholder="อธิบายสิ่งที่คุณได้ทําลงไปแบบกระชับ..."
                value={logDesc}
                onChange={(e) => setLogDesc(e.target.value)}
                id="log-desc"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:bg-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t text-xs">
              <button
                type="button"
                onClick={() => setShowLogForm(false)}
                className="px-3 py-1.5 text-slate-500 hover:text-slate-800"
              >
                ละทิ้ง
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg h-9 flex items-center justify-center cursor-pointer"
              >
                จดบันทึกไว้
              </button>
            </div>
          </form>
        )}

        {/* Timelines block */}
        <div className="bg-white p-6 rounded-xl border border-slate-200/85">
          <div className="relative space-y-6 before:absolute before:inset-y-1 before:left-3.5 before:w-0.5 before:bg-slate-100">
            {logs.map((log) => {
              const linkedProject = projects.find(p => p.id === log.projectId);

              return (
                <div key={log.id} className="relative pl-8 space-y-2 text-left group animate-in fade-in duration-200">
                  {/* Circle locator */}
                  <div className="absolute left-[11px] top-2 w-2 h-2 rounded-full bg-slate-800 ring-4 ring-white group-hover:scale-130 transition-transform" />
                  
                  {/* Header info */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400 font-semibold">{log.date}</span>
                      {getLogTypeBadge(log.type)}
                    </div>

                    <button
                      onClick={() => onDeleteLog(log.id)}
                      title="ลบกระดานล็อกนี้"
                      id={`btn-delete-log-${log.id}`}
                      className="text-xs text-red-150 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer duration-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Title & desc */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-slate-850">
                      {log.title}
                    </h3>
                    <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
                      {log.description}
                    </p>
                  </div>

                  {/* Link reference */}
                  {linkedProject && (
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-slate-100 text-slate-700 rounded text-3xs font-bold border border-slate-200">
                      <span>🔗 ลิงก์ชิ้นงานเด่น:</span>
                      <button
                        onClick={() => onSelectProject(linkedProject)}
                        className="hover:underline font-extrabold text-sky-600"
                      >
                        {linkedProject.title}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {logs.length === 0 && (
              <div className="text-center py-12 text-slate-400 italic">
                ยังไม่มีการบันทึกข้อมูลใดๆ
              </div>
            )}
          </div>
        </div>

      </div>
    );
  }

  return null;
}
