import React, { useState } from 'react';
import { Project } from '../types';
import { X, Code, Copy, Check, Calendar, Globe, Trash2, Edit, Eye, ThumbsUp, Tag } from 'lucide-react';

interface ProjectDetailsProps {
  project: Project;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProjectDetails({ project, onClose, onEdit, onDelete }: ProjectDetailsProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (!project.codeSnippet) return;
    navigator.clipboard.writeText(project.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedCategory = (cat: string) => {
    switch (cat) {
      case 'game': return '🎮 ประสบการณ์ (Game)';
      case 'script': return '📜 ตัวจัดการ (Script/Luau)';
      case 'gui': return '🖥️ หน้าจอแสดงผล (GUI)';
      case 'model': return '📦 โมเดล 3 มิติ (Model)';
      case 'gfx': return '🎨 รูปเรนเดอร์ (GFX)';
      default: return '📁 สิ่งประดิษฐ์เบ็ดเตล็ด (Other)';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'public':
        return <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-600 rounded-full font-semibold border border-emerald-100 text-2xs">🌐 สาธารณะ (Public)</span>;
      case 'private':
        return <span className="px-2.5 py-0.5 bg-rose-50 text-rose-600 rounded-full font-semibold border border-rose-100 text-2xs">🔒 ส่วนตัว (Private)</span>;
      default:
        return <span className="px-2.5 py-0.5 bg-amber-50 text-amber-600 rounded-full font-semibold border border-amber-100 text-2xs">📝 แบบร่าง (Draft)</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto" id="details-overlay">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-2xl max-h-[92vh] flex flex-col animate-in fade-in-50 zoom-in-95 duration-150">
        
        {/* Visual Banner Header */}
        <div className="h-44 sm:h-52 w-full relative overflow-hidden rounded-t-2xl bg-gradient-to-r from-slate-800 to-slate-950">
          <img
            src={project.coverImage}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-60 mix-blend-overlay scale-102 hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            {getStatusBadge(project.status)}
          </div>
          <button
            onClick={onClose}
            id="btn-close-details"
            className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white/90 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5 animate-spin-hover" />
          </button>
          
          <div className="absolute bottom-5 left-6 right-6">
            <p className="text-2xs font-bold text-slate-300 tracking-wider uppercase mb-1 drop-shadow-sm font-mono">
              {formattedCategory(project.category)}
            </p>
            <h1 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-md" id="details-title">
              {project.title}
            </h1>
          </div>
        </div>

        {/* Contents */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Metadata Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="text-center sm:text-left">
              <span className="text-[10px] font-bold text-slate-400 block uppercase font-mono">เวอร์ชันผลิต</span>
              <span className="text-sm font-bold text-slate-700">{project.version || 'v1.0.0'}</span>
            </div>
            <div className="text-center sm:text-left border-l border-slate-200/60 pl-3">
              <span className="text-[10px] font-bold text-slate-400 block uppercase font-mono">การเข้าชม</span>
              <span className="text-sm font-semibold text-slate-700 flex items-center justify-center sm:justify-start gap-1">
                <Eye className="w-3.5 h-3.5 text-slate-400" /> {project.visits.toLocaleString()} ครั้ง
              </span>
            </div>
            <div className="text-center sm:text-left border-l border-slate-200/60 pl-3">
              <span className="text-[10px] font-bold text-slate-400 block uppercase font-mono">เรตติ้งแนะนำ</span>
              <span className="text-sm font-semibold text-slate-700 flex items-center justify-center sm:justify-start gap-1">
                <ThumbsUp className="w-3.5 h-3.5 text-emerald-500" /> {project.likesRate}% ถูกใจ
              </span>
            </div>
            <div className="text-center sm:text-left border-l border-slate-200/60 pl-3">
              <span className="text-[10px] font-bold text-slate-400 block uppercase font-mono">ปรับปรุงชิ้นงาน</span>
              <span className="text-xs font-semibold text-slate-600 flex items-center justify-center sm:justify-start gap-1">
                <Calendar className="w-3 h-3 text-slate-400" /> {project.lastUpdated}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
              รายละเอียดและจุดประสงค์ใช้งาน
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap bg-slate-50/50 p-4 rounded-lg border border-slate-100 italic">
              {project.description || 'ไม่มีรายละเอียดเพิ่มเติมระบุไว้สำหรับผลงานชิ้นนี้'}
            </p>
          </div>

          {/* Tags */}
          {project.tags.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">แท็กชิ้นงาน</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-md text-xs font-medium transition-all"
                  >
                    <Tag className="w-2.5 h-2.5 text-slate-400" /> {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Code Snippet Container */}
          {project.codeSnippet && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                  <Code className="w-4 h-4 text-slate-400" /> สคริปต์รหัสโค้ดที่รวบรวม
                </h3>
                <button
                  onClick={copyToClipboard}
                  id="btn-copy-code"
                  className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-md text-xs font-bold font-mono transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" /> COPIED!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> COPY CODE
                    </>
                  )}
                </button>
              </div>
              <div className="relative group rounded-xl overflow-hidden border border-slate-800">
                <div className="bg-slate-950 px-4 py-2 flex items-center justify-between text-slate-500 text-[10px] uppercase font-mono tracking-wider border-b border-slate-800">
                  <span>Luau Module script</span>
                  <span className="text-emerald-500 animate-pulse">● ready to inject</span>
                </div>
                <div className="max-h-[280px] overflow-auto bg-slate-900 p-4 font-mono text-xs text-emerald-400 leading-relaxed whitespace-pre" id="details-code-contents">
                  {project.codeSnippet}
                </div>
              </div>
            </div>
          )}

          {/* External URL Button */}
          {project.url && (
            <div className="pt-2">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                id="btn-external-link"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold tracking-wide transition-all shadow-md active:scale-98"
              >
                <Globe className="w-4 h-4" /> ตรวจสอบชิ้นงานจริงบนเว็บไซต์ Roblox Studio (Play Game / Library)
              </a>
            </div>
          )}

        </div>

        {/* Action Panel Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
          <button
            onClick={onDelete}
            id="btn-delete-project"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg text-xs font-bold transition-all cursor-pointer"
          >
            <Trash2 className="w-4 h-4" /> ลบล้างชิ้นงานนี้
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              id="btn-edit-project"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-800 rounded-lg text-xs font-bold shadow-2xs transition-all cursor-pointer"
            >
              <Edit className="w-4 h-4" /> แก้ไขรายระเอียด
            </button>
            <button
              onClick={onClose}
              id="btn-footer-close"
              className="px-4 py-1.5 bg-slate-800 hover:bg-slate-950 text-white rounded-lg text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              ปิดหหน้าจอ
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
