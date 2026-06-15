import React, { useState, useEffect } from 'react';
import { Project, DevLog, UserProfile, ProjectCategory } from './types';
import { initialProjects, initialLogs, defaultUser } from './initialData';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import ProfileView from './components/ProfileView';
import ProjectForm from './components/ProjectForm';
import ProjectDetails from './components/ProjectDetails';
import { Menu, X, Plus, Flame, Sparkles } from 'lucide-react';

export default function App() {
  // LocalStorage state initializers
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const stored = localStorage.getItem('roblox_archive_projects');
      return stored ? JSON.parse(stored) : initialProjects;
    } catch {
      return initialProjects;
    }
  });

  const [logs, setLogs] = useState<DevLog[]>(() => {
    try {
      const stored = localStorage.getItem('roblox_archive_logs');
      return stored ? JSON.parse(stored) : initialLogs;
    } catch {
      return initialLogs;
    }
  });

  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem('roblox_archive_user');
      return stored ? JSON.parse(stored) : defaultUser;
    } catch {
      return defaultUser;
    }
  });

  const [currentTab, setCurrentTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  // Mobile sidebar visibility toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Persist states to localStorage
  useEffect(() => {
    localStorage.setItem('roblox_archive_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('roblox_archive_logs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem('roblox_archive_user', JSON.stringify(user));
  }, [user]);

  // Handle saving project (both add and edit)
  const handleSaveProject = (savedProj: Project) => {
    const exists = projects.some((p) => p.id === savedProj.id);
    if (exists) {
      setProjects((prev) => prev.map((p) => (p.id === savedProj.id ? savedProj : p)));
      
      // Auto register a log update
      const updateLog: DevLog = {
        id: `log-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        title: `ปรับปรุงรายละเอียดชิ้นงาน "${savedProj.title}"`,
        description: `ปรับสเปกเวอร์ชันล่าสุดเป็น ${savedProj.version} พร้อมบันทึกรายละเอียดข้อมูลในพอร์ทเก็บงาน เรียบร้อย`,
        type: 'update',
        projectId: savedProj.id
      };
      setLogs((prev) => [updateLog, ...prev]);
    } else {
      setProjects((prev) => [savedProj, ...prev]);

      // Auto register a milestone log
      const milestoneLog: DevLog = {
        id: `log-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        title: `เพิ่มชิ้นงานใหม่ด่วน: "${savedProj.title}"`,
        description: `เพิ่มชิ้นส่วนโมดูล ${savedProj.category} เข้าสู่คาร์บิเนตจัดเก็บส่วนตัวเเล้ว`,
        type: 'release',
        projectId: savedProj.id
      };
      setLogs((prev) => [milestoneLog, ...prev]);
    }
    
    // Close form
    setIsFormOpen(false);
    setProjectToEdit(null);
    
    // If we edited a project that is currently selected, refresh its details
    if (selectedProject?.id === savedProj.id) {
      setSelectedProject(savedProj);
    }
  };

  // Trigger project deletion
  const handleDeleteProject = (id: string) => {
    const targetProj = projects.find((p) => p.id === id);
    if (!targetProj) return;

    if (confirm(`คุณต้องการลบชิ้นงาน "${targetProj.title}" ออกจากคลังถาวรใช่หรือไม่? ข้อมูลนี้และประวัติการพัฒนาจะไม่สามารถกู้คืนได้`)) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      
      // Filter out any dev logs that belongs to this project
      setLogs((prev) => prev.filter((l) => l.projectId !== id));
      
      // Close detail modal
      setSelectedProject(null);
    }
  };

  // Trigger edit from detail view
  const handleTriggerEdit = (project: Project) => {
    setProjectToEdit(project);
    setIsFormOpen(true);
  };

  // Add developer updates log
  const handleAddLog = (newLog: DevLog) => {
    setLogs((prev) => [newLog, ...prev]);
  };

  // Delete developer logs
  const handleDeleteLog = (id: string) => {
    if (confirm('คุณต้องการลบกระดานบันทึกอัปเดตนี้ใช่หรือไม่?')) {
      setLogs((prev) => prev.filter((l) => l.id !== id));
    }
  };

  // Status updates directly from Header
  const handleStatusUpdate = (newStatus: string) => {
    setUser((prev) => ({
      ...prev,
      statusText: newStatus
    }));
  };

  const navigateToProfile = () => {
    setCurrentTab('profile');
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans select-none" id="app-root-container">
      
      {/* Top Header */}
      <Header
        user={user}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onStatusUpdate={handleStatusUpdate}
        onNavigateToProfile={navigateToProfile}
      />

      {/* Main Body Grid */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Mobile menu toggle bar */}
        <div className="md:hidden bg-slate-50 border-b border-slate-200 p-3 flex items-center justify-between z-30">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="btn-mobile-menu-toggle"
            className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white border px-3 py-1.5 rounded-lg active:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            เมนูสเปซ
          </button>

          <button
            onClick={() => {
              setProjectToEdit(null);
              setIsFormOpen(true);
            }}
            id="btn-mobile-create-shortcut"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-bold"
          >
            <Plus className="w-3.5 h-3.5" />
            เพิ่มงาน
          </button>
        </div>

        {/* Left Nav Pane - Collapsible on Mobile, Fixed on Desktop */}
        <div className={`
          absolute md:relative inset-y-0 left-0 w-64 bg-slate-50 z-40 transform md:transform-none md:flex transition-transform duration-200 border-r md:border-r-0
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <Sidebar
            currentTab={currentTab}
            onTabChange={(tab) => {
              setCurrentTab(tab);
              setMobileMenuOpen(false);
            }}
            onAddProject={() => {
              setProjectToEdit(null);
              setIsFormOpen(true);
              setMobileMenuOpen(false);
            }}
            projectCount={projects.length}
          />
        </div>

        {/* Overlay background for mobile sidebar */}
        {mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden fixed inset-0 bg-black/30 z-30 backdrop-blur-3xs"
          />
        )}

        {/* Center Main Stage Content of Workspace */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-8 bg-slate-50" id="main-scrollable-content">
          <div className="max-w-5xl mx-auto">
            {currentTab === 'profile' ? (
              <ProfileView
                user={user}
                onUpdateUser={setUser}
              />
            ) : (
              <DashboardView
                currentTab={currentTab}
                projects={projects}
                logs={logs}
                user={user}
                searchQuery={searchQuery}
                onSelectProject={setSelectedProject}
                onAddProject={() => {
                  setProjectToEdit(null);
                  setIsFormOpen(true);
                }}
                onAddLog={handleAddLog}
                onDeleteLog={handleDeleteLog}
              />
            )}
          </div>
        </main>

      </div>

      {/* Creation / Editor Form Slide Modal */}
      {isFormOpen && (
        <ProjectForm
          project={projectToEdit}
          onSave={handleSaveProject}
          onCancel={() => {
            setIsFormOpen(false);
            setProjectToEdit(null);
          }}
        />
      )}

      {/* Detailed View Modal */}
      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onEdit={() => handleTriggerEdit(selectedProject)}
          onDelete={() => handleDeleteProject(selectedProject.id)}
        />
      )}

    </div>
  );
}
