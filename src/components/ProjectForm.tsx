import React, { useState, useEffect } from 'react';
import { Project, ProjectCategory } from '../types';
import { X, Code, Globe, HelpCircle, Tag, Layers, CheckSquare } from 'lucide-react';

interface ProjectFormProps {
  project: Project | null; // If null, we are creating a new project
  onSave: (project: Project) => void;
  onCancel: () => void;
}

const CATEGORIES: { id: ProjectCategory; name: string; desc: string }[] = [
  { id: 'game', name: '🎮 Game / Experience', desc: 'แมปเกมหรือประสบการณ์เต็มรูปแบบ' },
  { id: 'script', name: '📜 Script / Luau Module', desc: 'โค้ด สคริปต์ หรือตัวจัดการเชิงระบบ' },
  { id: 'gui', name: '🖥️ GUI / UI Element', desc: 'หน้าต่างปุ่มกด หรือหน้าอินเตอร์เฟส' },
  { id: 'model', name: '📦 Model / mesh', desc: 'พร็อพ ของตบแต่ง หรือโมเดล Low-poly' },
  { id: 'gfx', name: '🎨 GFX / Art Render', desc: 'รูปภาพโปรโมต เรนเดอร์ 3D หรือแบนเนอร์' },
  { id: 'other', name: '📁 Other Assets', desc: 'เสียง หรือไอเทมเบ็ดเตล็ดอื่นๆ' },
];

export default function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('game');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'public' | 'private' | 'draft'>('public');
  const [url, setUrl] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [version, setVersion] = useState('v1.0.0');
  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setCategory(project.category);
      setDescription(project.description);
      setStatus(project.status);
      setUrl(project.url || '');
      setCodeSnippet(project.codeSnippet || '');
      setVersion(project.version || 'v1.0.0');
      setTagsInput(project.tags.join(', '));
    } else {
      setTitle('');
      setCategory('game');
      setDescription('');
      setStatus('public');
      setUrl('');
      setCodeSnippet('');
      setVersion('v1.0.0');
      setTagsInput('');
    }
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Process tag inputs
    const tags = tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    // Auto-generate high-quality covers based on category if links aren't stored
    const defaultCovers: Record<ProjectCategory, string> = {
      game: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60',
      script: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=500&auto=format&fit=crop&q=60',
      gui: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=500&auto=format&fit=crop&q=60',
      model: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&auto=format&fit=crop&q=60',
      gfx: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500&auto=format&fit=crop&q=60',
      other: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&auto=format&fit=crop&q=60'
    };

    const savedProject: Project = {
      id: project ? project.id : `proj-${Date.now()}`,
      title,
      category,
      description,
      coverImage: project?.coverImage || defaultCovers[category],
      url: url.trim() || undefined,
      codeSnippet: codeSnippet.trim() || undefined,
      status,
      visits: project ? project.visits : (status === 'public' ? Math.floor(Math.random() * 50) : 0),
      likesRate: project ? project.likesRate : 100,
      createdAt: project ? project.createdAt : new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      version,
      tags
    };

    onSave(savedProject);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto" id="modal-container">
      <div className="bg-white rounded-xl shadow-xl border border-slate-100 w-full max-w-2xl max-h-[90vh] flex flex-col animate-in fade-in-50 zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2" id="modal-title">
            {project ? '🛠️ แก้ไขและเพิ่มรายละเอียดชิ้นงาน' : '🎮 สร้าง/จัดเก็บชิ้นงานใหม่'}
          </h2>
          <button
            onClick={onCancel}
            id="btn-close-modal"
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5" id="project-creation-form">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              ชื่อชิ้นงาน (Project Title) *
            </label>
            <input
              type="text"
              required
              placeholder="เช่น Advanced Obby System, ประตูลับผ่านกลไกสคริปต์"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="input-title"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-slate-400 focus:bg-white transition-all font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category selection */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                หมวดหมู่ (Category)
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                id="select-category"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-slate-400 focus:bg-white transition-all"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status selection */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                สถานะผลงาน (Project Status)
              </label>
              <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
                {(['public', 'private', 'draft'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    id={`btn-status-toggle-${s}`}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-md capitalize transition-all cursor-pointer ${
                      status === s
                        ? 'bg-white text-slate-800 shadow-xs ring-1 ring-slate-200'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {s === 'public' && '🌐 สาธารณะ'}
                    {s === 'private' && '🔒 ส่วนตัว'}
                    {s === 'draft' && '📝 ร่าง'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              รายละเอียดผลงาน / ชี้แจงไอเดีย (Description)
            </label>
            <textarea
              rows={3}
              placeholder="ระบุวัตถุประสงค์สั้นๆ, วิธีเล่น, หรือสิ่งที่คุณจดไว้กันลืมเกี่ยวกับงานชิ้นนี้..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="input-desc"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-slate-400 focus:bg-white transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Version */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                เวอร์ชันชิ้นงาน (Build / Version)
              </label>
              <input
                type="text"
                placeholder="เช่น v1.0.0 หรือ Pre-Alpha 0.1"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                id="input-version"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-slate-400 focus:bg-white transition-all font-medium"
              />
            </div>

            {/* Asset/Game URL */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-slate-400" /> ลิงก์ผลงานใน Roblox (ถ้ามี)
              </label>
              <input
                type="url"
                placeholder="https://www.roblox.com/games/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                id="input-url"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-slate-400 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-slate-400" /> แท็กคีย์เวิร์ด (Tags แยกด้วยลูกน้ำ)
            </label>
            <input
              type="text"
              placeholder="เช่น Obby, Luau, LocalScript, Low-Poly, UI"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              id="input-tags"
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-slate-400 focus:bg-white transition-all"
            />
            <p className="text-3xs text-slate-400 mt-1">คัดแยกคำด้วยเครื่องหมายจุลภาค ( , )</p>
          </div>

          {/* Code snippet (Luau Roblox script database) */}
          {(category === 'script' || category === 'game' || category === 'gui') && (
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Code className="w-3.5 h-3.5 text-slate-400" /> สคริปต์รหัสโค้ดชิ้นงาน (Luau Script) - เก็บไว้คัดลอกในอนาคต
              </label>
              <textarea
                rows={6}
                placeholder="-- เขียนหรือวางโค้ด Luau ของคุณที่นี่..."
                value={codeSnippet}
                onChange={(e) => setCodeSnippet(e.target.value)}
                id="input-code"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-emerald-400 font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all resize-y"
              />
            </div>
          )}

        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50 rounded-b-xl">
          <button
            type="button"
            onClick={onCancel}
            id="btn-form-cancel"
            className="px-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            id="btn-form-save"
            disabled={!title.trim()}
            className="px-5 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 active:bg-slate-950 rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            {project ? 'บันทึกการแก้ไข' : 'สร้างและบันทึก'}
          </button>
        </div>

      </div>
    </div>
  );
}
