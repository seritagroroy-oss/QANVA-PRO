import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  X, 
  Heart, 
  Camera, 
  Presentation, 
  MonitorPlay, 
  FileText, 
  MonitorUp, 
  Grid, 
  Globe, 
  Mail, 
  SlidersHorizontal,
  LayoutDashboard,
  Type,
  Square,
  Image as ImageIcon,
  Scissors,
  LogOut,
  MousePointer2,
  Download,
  Plus,
  Undo2,
  Redo2,
  Share2,
  Maximize2,
  Home, 
  FolderOpen, 
  LayoutTemplate, 
  Star, 
  Settings, 
  Bell, 
  ChevronDown, 
  MoreHorizontal, 
  UploadCloud, 
  ArrowUpDown, 
  LayoutGrid, 
  List,
  ArrowRight,
  Cloud,
  Play,
  Clock,
  StickyNote,
  Layers,
  Wand2,
  Undo,
  Redo,
  ChevronUp
} from 'lucide-react';
import { Stage, Layer, Rect, Circle, Text as KonvaText, Image as KonvaImage, Transformer } from 'react-konva';
import { cn } from './utils/cn';

// Types for our design elements
interface Shape {
  id: string;
  type: 'rect' | 'circle' | 'text';
  x: number;
  y: number;
  fill: string;
  width?: number;
  height?: number;
  radius?: number;
  text?: string;
  fontSize?: number;
}

// Simple dashboard / Editor switch
type ViewMode = 'dashboard' | 'editor';

export default function App() {
  const [view, setView] = useState<ViewMode>('dashboard');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createCategory, setCreateCategory] = useState('foryou');
  const [selectedTool, setSelectedTool] = useState('templates');
  
  // Canvas State
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const loadPresentationTemplate = () => {
    setShapes([
      { id: 't1', type: 'rect', x: 0, y: 0, fill: '#ffedd5', width: 800, height: 800 },
      { id: 't2', type: 'rect', x: 50, y: 50, fill: '#f97316', width: 100, height: 20 },
      { id: 't3', type: 'text', x: 50, y: 250, fill: '#1e293b', text: 'VOTRE PRÉSENTATION', fontSize: 64 },
      { id: 't4', type: 'text', x: 50, y: 340, fill: '#475569', text: 'Conçu avec Qanva-Pro', fontSize: 24 }
    ]);
    setSelectedId(null);
    setView('editor');
    setSelectedTool('templates');
  };

  const addShape = (type: 'rect' | 'circle' | 'text') => {
    const newShape: Shape = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      x: 300,
      y: 300,
      fill: type === 'text' ? '#1e293b' : '#6366f1',
      ...(type === 'rect' ? { width: 150, height: 150 } : {}),
      ...(type === 'circle' ? { radius: 75 } : {}),
      ...(type === 'text' ? { text: 'Nouveau texte', fontSize: 32 } : {})
    };
    setShapes([...shapes, newShape]);
    setSelectedId(newShape.id);
  };

  if (view === 'dashboard') {
    return (
      <div className="flex h-screen w-full bg-white text-slate-800 font-sans overflow-hidden">
        
        {/* L E F T   S I D E B A R (Thin Icon Mode) */}
        <aside className="w-[72px] bg-slate-50 border-r border-slate-200 flex flex-col items-center py-4 shrink-0 shadow-sm z-20">
          
          <button className="flex flex-col items-center justify-center gap-1.5 mb-6 group" onClick={() => setShowCreateModal(true)}>
            <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all hover:scale-105">
              <Plus size={24} />
            </div>
            <span className="text-[10px] font-medium text-slate-700">Créer</span>
          </button>

          <div className="flex flex-col w-full gap-2">
            {[
              { id: 'home', icon: Home, label: 'Accueil', active: true },
              { id: 'projects', icon: FolderOpen, label: 'Projets' },
              { id: 'templates', icon: LayoutTemplate, label: 'Modèles' },
              { id: 'brand', icon: Star, label: 'Marque' },
              { id: 'ai', icon: Sparkles, label: 'IA Canva' },
              { id: 'more', icon: MoreHorizontal, label: 'Plus' },
            ].map(item => (
              <button 
                key={item.id} 
                className={cn(
                  "w-full flex w-16 mx-auto flex-col items-center justify-center gap-1 p-2 rounded-xl transition-colors",
                  item.active ? "text-violet-700 bg-slate-200/60" : "text-slate-500 hover:bg-slate-200/40 hover:text-slate-800"
                )}
              >
                <item.icon size={22} strokeWidth={item.active ? 2.5 : 2} className={item.active ? "fill-violet-700/10" : ""} />
                <span className="text-[9px] font-medium truncate w-full text-center tracking-tight">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-auto flex flex-col w-full gap-2 mb-2">
             <button className="w-16 mx-auto flex flex-col items-center justify-center p-2 rounded-xl text-slate-500 hover:bg-slate-200/40 transition-colors relative">
                <Bell size={22} strokeWidth={2} />
                <span className="absolute top-2 right-4 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
             </button>
             <button className="w-16 mx-auto flex flex-col items-center justify-center p-2 rounded-xl hover:bg-slate-200/40 transition-colors">
                <div className="w-8 h-8 rounded-full bg-violet-600 text-white font-bold flex items-center justify-center text-xs">
                  QA
                </div>
             </button>
          </div>
        </aside>

        {/* M A I N   C O N T E N T */}
        <main className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden relative bg-white">
            
            {/* Top Gradient Banner Area */}
            <div className="relative w-full pt-16 pb-8 px-8 flex flex-col items-center justify-center shrink-0">
               {/* Background Gradient matching the photo */}
               <div className="absolute inset-0 bg-gradient-to-r from-[#e0f7f9] via-[#f0eefd] to-[#e4e0fb] -z-10" />
               
               {/* Badge Top Right */}
               <div className="absolute top-4 right-8 bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-600 hover:brightness-110 cursor-pointer transition-all text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-md">
                 <Sparkles size={14} className="fill-white" />
                 QanvaCreate est de retour
               </div>

               {/* Title */}
               <h1 className="text-4xl font-semibold text-[#2d1b54] tracking-tight mb-8">
                 Qu'allez-vous créer aujourd'hui ?
               </h1>

               {/* Search Bar */}
               <div className="w-full max-w-3xl relative flex items-center mb-6">
                 <div className="absolute left-5 text-slate-500">
                    <Search size={20} strokeWidth={2.5} />
                 </div>
                 <input 
                   type="text" 
                   placeholder="Recherchez des designs, des dossiers et des importations" 
                   className="w-full h-14 pl-14 pr-6 rounded-full border border-slate-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white text-base text-slate-800 placeholder:text-slate-500/80 transition-shadow hover:shadow-md"
                 />
               </div>

               {/* Filters */}
               <div className="flex items-center gap-2 text-[13px] font-medium text-slate-600">
                 {['Type', 'Catégorie', 'Propriétaire', 'Date de modification'].map(filter => (
                   <button key={filter} className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-slate-900/5 transition-colors">
                     {filter}
                     <ChevronDown size={14} className="text-slate-400" />
                   </button>
                 ))}
               </div>
            </div>

            {/* Circular Category Row */}
            <div className="w-full max-w-[1200px] mx-auto px-8 mt-6">
               <div className="flex items-start justify-between gap-2 overflow-x-auto scrollbar-none pb-4">
                 {[
                   { name: 'Présentation', icon: Presentation, color: 'bg-orange-500', iconColor: 'text-white' },
                   { name: 'Réseaux', icon: MonitorPlay, color: 'bg-gradient-to-br from-rose-400 to-pink-500', iconColor: 'text-white' },
                   { name: 'Vidéos', icon: MonitorPlay, color: 'bg-violet-500', iconColor: 'text-white' },
                   { name: 'Doc', icon: FileText, color: 'bg-teal-500', iconColor: 'text-white' },
                   { name: 'Tableau blanc', icon: MonitorUp, color: 'bg-emerald-500', iconColor: 'text-white' },
                   { name: 'Tableur', icon: Grid, color: 'bg-blue-500', iconColor: 'text-white' },
                   { name: 'Site Web', icon: Globe, color: 'bg-indigo-600', iconColor: 'text-white' },
                   { name: 'E-mail', icon: Mail, color: 'bg-purple-600', iconColor: 'text-white' },
                   { name: 'Éditeur photo', icon: ImageIcon, color: 'bg-slate-200', iconColor: 'text-slate-600' },
                   { name: 'Dimension...', icon: SlidersHorizontal, color: 'bg-slate-100', iconColor: 'text-slate-600' },
                   { name: 'Importer', icon: UploadCloud, color: 'bg-slate-100', iconColor: 'text-slate-600' },
                 ].map((cat, i) => (
                    <button key={i} onClick={loadPresentationTemplate} className="flex flex-col items-center gap-3 min-w-[80px] group">
                     <div className={cn("w-14 h-14 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all text-white", cat.color)}>
                       <cat.icon size={26} strokeWidth={1.5} />
                     </div>
                     <span className="text-xs font-bold text-slate-700 text-center leading-tight whitespace-nowrap">{cat.name}</span>
                   </button>
                 ))}
               </div>
            </div>

            {/* RECENTS SECTION */}
            <div className="w-full max-w-[1200px] mx-auto px-8 mt-10 mb-20">
               <div className="flex items-center justify-between mb-6">
                 <h2 className="text-[22px] font-bold text-slate-800">Récents</h2>
                 <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
                    <button className="flex items-center gap-2 hover:bg-slate-100 px-2 py-1.5 rounded-md">Propriétaire <ChevronDown size={16} /></button>
                    <button className="flex items-center gap-2 hover:bg-slate-100 px-2 py-1.5 rounded-md">Tout type <ChevronDown size={16} /></button>
                    <div className="w-px h-4 bg-slate-200 mx-1"></div>
                    <button className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500"><ArrowUpDown size={18} /></button>
                    <button className="p-1.5 hover:bg-slate-100 rounded-md text-slate-800"><LayoutGrid size={18} /></button>
                    <button className="p-1.5 hover:bg-slate-100 rounded-md text-slate-400"><List size={18} /></button>
                 </div>
               </div>

               {/* Grid of Recents */}
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                       {/* Card 1 */}
                 <div className="group cursor-pointer flex flex-col gap-3" onClick={loadPresentationTemplate}>
                   <div className="aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 relative group-hover:shadow-md transition-shadow">
                     {/* Fake Document Preview */}
                     <div className="absolute inset-x-8 inset-y-4 bg-white shadow-sm border border-slate-200 flex flex-col p-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-900 mb-2 shrink-0"></div>
                        <div className="h-1.5 w-full bg-indigo-900/20 rounded-full mb-1"></div>
                        <div className="h-1 w-3/4 bg-slate-200 rounded-full mb-2"></div>
                        <div className="h-1 w-full bg-slate-200 rounded-full mb-1"></div>
                        <div className="h-1 w-full bg-slate-200 rounded-full mb-1"></div>
                     </div>
                   </div>
                   <div className="px-1">
                     <h3 className="text-sm font-semibold text-slate-800 truncate">CV KOUAKOU ANTOINETTE</h3>
                     <p className="text-[11px] text-slate-500 uppercase tracking-wide mt-0.5">Document • Modifié hier</p>
                   </div>
                 </div>

                 {/* Card 2 */}
                 <div className="group cursor-pointer flex flex-col gap-3" onClick={loadPresentationTemplate}>
                   <div className="aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 relative group-hover:shadow-md transition-shadow">
                     <div className="absolute inset-x-4 top-4 bottom-8 bg-white shadow-sm border border-slate-200 flex p-2 gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-600 shrink-0"></div>
                        <div className="flex-1 mt-1">
                           <div className="h-2 w-full bg-blue-900/20 rounded-full mb-1.5"></div>
                           <div className="h-1.5 w-3/4 bg-slate-200 rounded-full"></div>
                        </div>
                     </div>
                   </div>
                   <div className="px-1">
                     <h3 className="text-sm font-semibold text-slate-800 truncate">Présentation Stratégie 2026</h3>
                     <p className="text-[11px] text-slate-500 uppercase tracking-wide mt-0.5">Présentation • 12 mars</p>
                   </div>
                 </div>
               </div>
            </div>

            {/* Help Button Floating bottom right */}
            <button className="fixed bottom-6 right-8 w-12 h-12 bg-violet-600 hover:bg-violet-700 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 z-50">
              <span className="font-bold text-xl">?</span>
            </button>
        </main>

        {/* CREATE DESIGN MODAL OVERLAY */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
             <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[1000px] h-[80vh] min-h-[600px] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
               
               {/* Modal Header */}
               <div className="flex items-center gap-4 p-6 border-b border-slate-100 shrink-0">
                  <h2 className="text-2xl font-bold tracking-tight text-slate-800">Créer un design</h2>
                  <div className="flex-1 relative max-w-2xl ml-4">
                     <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                     <input 
                       type="text" 
                       placeholder="Qu'aimeriez-vous créer ?" 
                       className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all"
                     />
                  </div>
                  <button onClick={() => setShowCreateModal(false)} className="ml-auto p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
                     <X size={24} />
                  </button>
               </div>

               {/* Modal Body */}
               <div className="flex flex-1 overflow-hidden">
                 
                 {/* Left Sidebar (Categories) */}
                 <div className="w-56 bg-slate-50 border-r border-slate-100 p-3 flex flex-col gap-1 overflow-y-auto shrink-0">
                    <button 
                      onClick={() => setCreateCategory('foryou')}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${createCategory === 'foryou' ? 'bg-violet-100/50 text-violet-700 font-semibold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium'}`}>
                       <Sparkles size={18} className={createCategory === 'foryou' ? 'text-violet-700' : 'text-slate-500'} />
                       Pour vous
                    </button>
                    <button 
                      onClick={() => setCreateCategory('slides')}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${createCategory === 'slides' ? 'bg-violet-100/50 text-violet-700 font-semibold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium'}`}>
                       <Presentation size={18} className={createCategory === 'slides' ? 'text-violet-700' : 'text-orange-500'} />
                       Diaporamas
                    </button>
                    <button 
                      onClick={() => setCreateCategory('social')}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${createCategory === 'social' ? 'bg-violet-100/50 text-violet-700 font-semibold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium'}`}>
                       <Heart size={18} className={createCategory === 'social' ? 'text-violet-700' : 'text-rose-500'} />
                       Réseaux sociaux
                    </button>
                    <button 
                      onClick={() => setCreateCategory('photo')}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${createCategory === 'photo' ? 'bg-violet-100/50 text-violet-700 font-semibold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium'}`}>
                       <Camera size={18} className={createCategory === 'photo' ? 'text-violet-700' : 'text-pink-500'} />
                       Éditeur photo
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium text-sm transition-colors">
                       <MonitorPlay size={18} className="text-violet-500" />
                       Vidéos
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium text-sm transition-colors">
                       <FileText size={18} className="text-teal-500" />
                       Doc
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium text-sm transition-colors">
                       <MonitorUp size={18} className="text-emerald-500" />
                       Tableau blanc
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium text-sm transition-colors">
                       <Grid size={18} className="text-blue-500" />
                       Tableur
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium text-sm transition-colors">
                       <Globe size={18} className="text-indigo-500" />
                       Sites Web
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium text-sm transition-colors">
                       <Mail size={18} className="text-purple-500" />
                       E-mails
                    </button>
                    
                    <div className="mt-auto pt-4 border-t border-slate-200">
                      <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium text-sm transition-colors">
                         <SlidersHorizontal size={18} />
                         Dimension personnalisée
                      </button>
                    </div>
                 </div>

                 {/* Right Content Area */}
                 <div className="flex-1 p-8 overflow-y-auto bg-white">
                    {createCategory === 'foryou' && (
                      <div className="animate-in fade-in duration-300">
                        <p className="text-sm font-medium text-slate-500 mb-8 hover:text-violet-600 cursor-pointer transition-colors inline-block">Flyer (Portrait A4)</p>

                        {/* Section 1 */}
                        <div className="mb-10">
                           <h3 className="text-lg font-bold text-slate-800 mb-6">Populaires sur Canva</h3>
                           <div className="flex gap-6 overflow-x-auto scrollbar-none pb-4">
                              
                              {/* Item 1 */}
                              <div className="group cursor-pointer flex flex-col gap-4 min-w-[200px]" onClick={loadPresentationTemplate}>
                                <div className="h-32 bg-slate-100 rounded-2xl flex items-center justify-center p-4 group-hover:bg-slate-200 transition-colors">
                                   <div className="w-full h-full bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col relative overflow-hidden">
                                      {/* Dummy UI */}
                                      <div className="h-8 bg-slate-50 border-b border-slate-100 flex items-center px-2">
                                         <div className="w-16 h-2 bg-slate-200 rounded-full"></div>
                                      </div>
                                      <div className="flex-1 p-2 flex items-end">
                                         <div className="w-full h-1/2 bg-orange-100 rounded-t-md relative">
                                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-400"></div>
                                         </div>
                                      </div>
                                   </div>
                                </div>
                                <div>
                                   <p className="text-sm font-bold text-slate-800">Présentation</p>
                                   <p className="text-xs text-slate-500 mt-1">1920 × 1080 px</p>
                                </div>
                              </div>

                              {/* Item 2 */}
                              <div className="group cursor-pointer flex flex-col gap-4 min-w-[200px]" onClick={loadPresentationTemplate}>
                                <div className="h-32 bg-slate-100 rounded-2xl flex items-center justify-center p-4 group-hover:bg-slate-200 transition-colors relative">
                                   <div className="w-2/3 h-full bg-white rounded-lg shadow-md border border-slate-200 -rotate-6 absolute left-4 flex flex-col truncate">
                                      <div className="h-4 bg-teal-600 w-full flex items-center px-1"><Sparkles size={8} className="text-white"/></div>
                                      <div className="p-1 space-y-1 mt-1">
                                        <div className="w-full h-1 bg-slate-200 rounded-full"></div>
                                        <div className="w-3/4 h-1 bg-slate-200 rounded-full"></div>
                                        <div className="w-full h-1 bg-teal-100 rounded-full mt-2"></div>
                                      </div>
                                   </div>
                                   <div className="w-1/3 h-2/3 bg-white rounded-md shadow-lg border border-slate-200 absolute right-6 bottom-4 z-10 flex flex-col pt-1 truncate">
                                      <div className="h-2 bg-teal-600 w-full mb-1"></div>
                                      <div className="w-3/4 h-0.5 bg-slate-200 mx-auto mt-1"></div>
                                      <div className="w-full h-4 bg-teal-100 mt-auto"></div>
                                   </div>
                                </div>
                                <div>
                                   <p className="text-sm font-bold text-slate-800">Doc (Numérique)</p>
                                </div>
                              </div>

                              {/* Item 3 */}
                              <div className="group cursor-pointer flex flex-col gap-4 min-w-[200px]" onClick={loadPresentationTemplate}>
                                <div className="h-32 bg-slate-100 rounded-2xl flex items-center justify-center p-4 group-hover:bg-slate-200 transition-colors">
                                   <div className="w-16 h-24 bg-violet-600 rounded-sm shadow-md flex items-center justify-center relative shadow-violet-500/20">
                                       <div className="absolute top-0 right-0 w-0 h-0 border-t-[8px] border-r-[8px] border-t-white border-r-transparent"></div>
                                       {/* Flower logo imitation */}
                                       <div className="w-8 h-8 opacity-50 relative -mt-4">
                                          <div className="w-3 h-3 bg-white rounded-full absolute top-0 left-2"></div>
                                          <div className="w-4 h-2 bg-white rounded-full absolute top-3 left-4 -rotate-45"></div>
                                          <div className="w-4 h-2 bg-white rounded-full absolute top-3 left-0 rotate-45"></div>
                                          <div className="w-2 h-4 bg-white rounded-full absolute top-4 left-3"></div>
                                       </div>
                                       <div className="absolute bottom-4 left-3 right-3 h-[2px] bg-white/40"></div>
                                       <div className="absolute bottom-2 left-3 right-5 h-[2px] bg-white/40"></div>
                                   </div>
                                </div>
                                <div>
                                   <p className="text-sm font-bold text-slate-800">Document (Portrait A4)</p>
                                </div>
                              </div>

                           </div>
                        </div>

                        {/* Section 2 */}
                        <div>
                           <h3 className="text-lg font-bold text-slate-800 mb-6">Essayez quelque chose de différent</h3>
                           <div className="flex gap-6 overflow-x-auto scrollbar-none pb-4">
                               {/* Item 4 */}
                               <div className="group cursor-pointer flex flex-col gap-4 min-w-[200px]" onClick={loadPresentationTemplate}>
                                <div className="h-32 bg-gradient-to-br from-violet-100 to-indigo-50 rounded-2xl flex items-center justify-center p-4 group-hover:brightness-95 transition-all">
                                   <div className="w-16 h-20 bg-white rounded-sm shadow-sm flex flex-col relative overflow-hidden">
                                       <div className="h-1/2 bg-violet-500 flex items-center justify-center">
                                          {/* Partial flower */}
                                          <div className="w-6 h-6 rotate-12 relative -mb-4">
                                             <div className="w-2 h-3 bg-white rounded-full absolute top-0 left-2"></div>
                                             <div className="w-3 h-1.5 bg-white rounded-full absolute top-2 left-3 -rotate-45"></div>
                                             <div className="w-3 h-1.5 bg-white rounded-full absolute top-2 left-0 rotate-45"></div>
                                          </div>
                                       </div>
                                   </div>
                                </div>
                                <div>
                                   <p className="text-sm font-bold text-slate-800">Affiche</p>
                                   <p className="text-xs text-slate-500 mt-1">42 × 59.4 cm</p>
                                </div>
                              </div>
                           </div>
                        </div>
                      </div>
                    )}

                    {createCategory === 'slides' && (
                      <div className="animate-in fade-in duration-300">
                        {/* Section 1 */}
                        <div className="mb-10">
                           <h3 className="text-[17px] font-bold text-slate-800 mb-3">Diaporamas</h3>
                           <div className="w-full h-px bg-slate-200 mb-6"></div>
                           
                           <div className="flex gap-6 overflow-x-auto scrollbar-none pb-4">
                              {/* Item 1: Presentation */}
                              <div className="group cursor-pointer flex flex-col gap-4 min-w-[200px]" onClick={loadPresentationTemplate}>
                                <div className="h-32 bg-slate-100 rounded-2xl flex items-center justify-center p-4 group-hover:bg-slate-200 transition-colors">
                                   <div className="w-[120px] h-20 bg-white shadow-sm border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden rounded-md">
                                      <div className="w-full h-full rounded bg-slate-100 flex items-end px-2 pt-3 relative border border-slate-200">
                                         {/* bars */}
                                         <div className="flex gap-[2px] items-end w-full h-[60%]">
                                            <div className="flex-1 bg-rose-500 h-[40%] rounded-t-[1px]"></div>
                                            <div className="flex-1 bg-rose-500 h-[60%] rounded-t-[1px]"></div>
                                            <div className="flex-1 bg-rose-500 h-[100%] rounded-t-[1px]"></div>
                                            <div className="flex-1 bg-rose-500 h-[80%] rounded-t-[1px]"></div>
                                         </div>
                                         <div className="w-[80%] h-1 bg-rose-300 absolute -rotate-[20deg] left-2 top-4"></div>
                                      </div>
                                   </div>
                                </div>
                                <div className="px-1">
                                   <p className="text-sm font-bold text-slate-800 hover:text-violet-600 transition-colors">Présentation</p>
                                </div>
                              </div>
                           </div>
                        </div>

                        {/* Section 2 */}
                        <div>
                           <h3 className="text-[17px] font-bold text-slate-800 mb-3">Plus de façons de se lancer</h3>
                           <div className="w-full h-px bg-slate-200 mb-6"></div>
                           <div className="flex gap-6 overflow-x-auto scrollbar-none pb-4">
                               {/* Item 2 */}
                               <div className="group cursor-pointer flex flex-col gap-3 min-w-[200px]" onClick={loadPresentationTemplate}>
                                <div className="h-32 bg-slate-100 rounded-2xl flex items-center justify-center p-4 group-hover:bg-slate-200 transition-colors relative overflow-hidden">
                                   <div className="w-[100px] h-[60px] bg-rose-400 rounded-md shadow-sm border border-rose-300 absolute -rotate-6 left-1/2 -ml-[60px] top-6 flex flex-col px-3 py-2">
                                      <div className="w-4 h-4 rounded-sm bg-white/40 mb-auto"></div>
                                   </div>
                                   <div className="w-[100px] h-[60px] bg-gradient-to-br from-rose-500 to-orange-500 rounded-md shadow-md border border-rose-400 absolute rotate-6 right-1/2 -mr-[60px] top-8 flex justify-center items-center">
                                       <div className="w-12 h-2 rounded-full bg-white/40"></div>
                                   </div>
                                </div>
                                <div>
                                   <p className="text-sm font-bold text-slate-800 hover:text-violet-600 transition-colors">Parcourir les modèles</p>
                                   <p className="text-[13px] text-slate-500 mt-0.5">Explorez les modèles élaborés</p>
                                </div>
                              </div>
                           </div>
                        </div>
                      </div>
                    )}
                    {createCategory === 'social' && (
                      <div className="animate-in fade-in duration-300">
                        <div className="mb-10">
                           <h3 className="text-[17px] font-bold text-slate-800 mb-3">Réseaux sociaux</h3>
                           <div className="w-full h-px bg-slate-200 mb-6"></div>
                           <div className="flex gap-6 overflow-x-auto scrollbar-none pb-4">
                              <div className="group cursor-pointer flex flex-col gap-4 min-w-[200px]" onClick={loadPresentationTemplate}>
                                <div className="h-40 bg-slate-100 rounded-2xl flex items-center justify-center p-4 group-hover:bg-slate-200 transition-colors">
                                   <div className="w-24 h-24 bg-white shadow-sm border border-slate-200 flex items-center justify-center relative overflow-hidden rounded-md">
                                      <div className="w-full h-full bg-gradient-to-tr from-orange-400 via-rose-500 to-purple-600 p-3 flex flex-col items-center justify-center">
                                         <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                                            <Heart size={14} className="text-white" />
                                         </div>
                                      </div>
                                   </div>
                                </div>
                                <div>
                                   <p className="text-sm font-bold text-slate-800 hover:text-violet-600 transition-colors">Publication Instagram (Carré)</p>
                                   <p className="text-[12px] text-slate-500">1080 × 1080 px</p>
                                </div>
                              </div>
                              <div className="group cursor-pointer flex flex-col gap-4 min-w-[200px]" onClick={loadPresentationTemplate}>
                                <div className="h-40 bg-slate-100 rounded-2xl flex items-center justify-center p-4 group-hover:bg-slate-200 transition-colors">
                                   <div className="w-16 h-28 bg-slate-900 shadow-sm border border-slate-800 flex flex-col relative overflow-hidden rounded-md">
                                      <div className="mt-auto h-[40%] w-full bg-gradient-to-t from-black to-transparent opacity-50"></div>
                                      <div className="absolute right-2 bottom-6 flex flex-col gap-2">
                                         <div className="w-3 h-3 rounded-full bg-slate-400/50"></div>
                                         <div className="w-3 h-3 rounded-full bg-slate-400/50"></div>
                                      </div>
                                   </div>
                                </div>
                                <div>
                                   <p className="text-sm font-bold text-slate-800 hover:text-violet-600 transition-colors">Vidéo TikTok</p>
                                   <p className="text-[12px] text-slate-500">1080 × 1920 px</p>
                                </div>
                              </div>
                           </div>
                        </div>
                      </div>
                    )}

                    {createCategory === 'photo' && (
                      <div className="animate-in fade-in duration-300">
                        <div className="mb-10 text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                           <div className="w-16 h-16 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Camera size={32} />
                           </div>
                           <h3 className="text-lg font-bold text-slate-800 mb-2">Modifier une photo</h3>
                           <p className="text-slate-500 text-sm max-w-xs mx-auto mb-6">Importez une photo et modifiez-la avec des filtres, des outils de recadrage et plus.</p>
                           <button className="bg-violet-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-violet-700 transition-colors">
                              Importer un média
                           </button>
                        </div>
                      </div>
                    )}
                 </div>
               </div>

             </div>
          </div>
        )}
      </div>
    );
  }


  return (
    <div className="flex h-screen w-full bg-slate-100 overflow-hidden text-slate-800">
      
      {/* SIDEBAR MAIN NAV */}
      <aside className="w-[72px] bg-[#1e1e2d] flex flex-col items-center py-4 gap-4 z-20 shrink-0">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg mb-2 cursor-pointer hover:rotate-6 transition-transform" onClick={() => setView('dashboard')}>
          <span className="text-white font-black text-lg">Q</span>
        </div>
        
        <div className="flex flex-col gap-1 w-full px-1">
          {[
            { id: 'templates', icon: LayoutTemplate, label: 'Modèles' },
            { id: 'elements', icon: Grid, label: 'Éléments' },
            { id: 'text', icon: Type, label: 'Texte' },
            { id: 'brand', icon: Star, label: 'Marque' },
            { id: 'uploads', icon: UploadCloud, label: 'Importer' },
            { id: 'tools', icon: SlidersHorizontal, label: 'Outils' },
            { id: 'projects', icon: FolderOpen, label: 'Projets' }
          ].map(tool => (
            <button 
              key={tool.id} 
              onClick={() => setSelectedTool(tool.id)}
              className={cn(
                "w-full flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200",
                selectedTool === tool.id ? "text-white bg-white/10" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              )}
            >
              <tool.icon size={22} strokeWidth={selectedTool === tool.id ? 2.5 : 2} />
              <span className="text-[9px] font-medium opacity-80">{tool.label}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* SECONDARY PANEL (Dynamic based on selectedTool) */}
      <div className="w-80 bg-white border-r border-slate-200 shadow-2xl z-10 flex flex-col pointer-events-auto shrink-0 animate-in slide-in-from-left-8 duration-300">
         <div className="p-6 h-full flex flex-col overflow-y-auto">
            
            {selectedTool === 'elements' && (
              <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                <h3 className="text-lg font-black text-slate-900 mb-6">Éléments</h3>
                <div className="grid grid-cols-2 gap-3">
                   <div 
                     onClick={() => addShape('rect')}
                     className="aspect-square bg-slate-100 rounded-2xl border-2 border-transparent hover:border-indigo-500 cursor-pointer flex flex-col items-center justify-center transition-all group p-4">
                      <div className="w-full h-full bg-slate-800 rounded-lg group-hover:scale-95 transition-transform"></div>
                      <span className="text-[10px] font-bold mt-2 text-slate-500 uppercase tracking-wider">Carré</span>
                   </div>
                   <div 
                     onClick={() => addShape('circle')}
                     className="aspect-square bg-slate-100 rounded-2xl border-2 border-transparent hover:border-indigo-500 cursor-pointer flex flex-col items-center justify-center transition-all group p-4">
                      <div className="w-full h-full bg-slate-800 rounded-full group-hover:scale-95 transition-transform"></div>
                      <span className="text-[10px] font-bold mt-2 text-slate-500 uppercase tracking-wider">Cercle</span>
                   </div>
                </div>
              </div>
            )}

            {selectedTool === 'text' && (
              <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                <h3 className="text-lg font-black text-slate-900 mb-6">Texte</h3>
                <div className="space-y-3">
                   <button 
                     onClick={() => addShape('text')}
                     className="w-full bg-slate-100 hover:bg-slate-200 p-4 rounded-xl text-left transition-colors group">
                     <p className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">Ajouter un titre</p>
                   </button>
                   <button 
                     onClick={() => addShape('text')}
                     className="w-full bg-slate-100 hover:bg-slate-200 p-4 rounded-xl text-left transition-colors group">
                     <p className="text-lg font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">Ajouter un sous-titre</p>
                   </button>
                </div>
              </div>
            )}

            {selectedTool === 'templates' && (
               <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                 <h3 className="text-lg font-black text-slate-900 mb-6">Modèles</h3>
                 <div className="space-y-4">
                    <div 
                      onClick={() => {
                        setShapes([
                          { id: 't1', type: 'rect', x: 0, y: 0, fill: '#ffedd5', width: 800, height: 800 },
                          { id: 't2', type: 'rect', x: 50, y: 50, fill: '#f97316', width: 100, height: 20 },
                          { id: 't3', type: 'text', x: 50, y: 600, fill: '#1e293b', text: 'DESIGN MODERNE', fontSize: 64 },
                          { id: 't4', type: 'text', x: 50, y: 680, fill: '#475569', text: 'Présentation professionnelle 2024', fontSize: 24 }
                        ]);
                        setSelectedId(null);
                      }}
                      className="relative group cursor-pointer">
                      <div className="aspect-[4/3] bg-orange-100 rounded-2xl border border-slate-200 overflow-hidden shadow-sm group-hover:shadow-md transition-all">
                         {/* Mock presentation template */}
                         <div className="w-full h-full p-4 flex flex-col justify-between">
                            <div className="w-12 h-2 bg-orange-500 rounded-full opacity-50"></div>
                            <div className="space-y-2">
                               <div className="w-full h-3 bg-slate-800 rounded-full"></div>
                               <div className="w-2/3 h-3 bg-slate-800 rounded-full"></div>
                            </div>
                         </div>
                      </div>
                      <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-colors rounded-2xl"></div>
                      <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Minimaliste Orange</p>
                    </div>
                 </div>
               </div>
            )}
            
         </div>
      </div>

      {/* CANVAS WORKSPACE */}
      <div className="flex-1 flex flex-col relative h-full">
        
        {/* Top Header matching the dark blue from the image */}
        <header className="h-12 bg-[#2d4cc9] flex items-center justify-between px-4 shrink-0 z-30 text-white shadow-md">
           <div className="flex items-center gap-4">
              <button className="text-white/80 hover:text-white flex items-center">
                <Home size={18} onClick={() => setView('dashboard')} className="cursor-pointer" />
              </button>
              <div className="flex items-center gap-4 text-[13px] font-semibold">
                <button className="hover:bg-white/10 px-2 py-1 rounded transition-colors">Fichier</button>
                <button className="hover:bg-white/10 px-2 py-1 rounded transition-colors">Redimensionner</button>
                <button className="hover:bg-white/10 px-2 py-1 rounded transition-colors flex items-center gap-1">
                  Retouche <ChevronDown size={14} />
                </button>
              </div>
              <div className="flex bg-white/10 rounded-md p-0.5 ml-2">
                <button className="p-1.5 hover:bg-white/10 rounded text-white/50">
                  <Undo size={16} />
                </button>
                <button className="p-1.5 hover:bg-white/10 rounded text-white/50">
                  <Redo size={16} />
                </button>
              </div>
           </div>
           
           {/* Center Piece: Title + Save Status */}
           <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
              <Cloud size={16} className="text-white/60" />
              <span className="text-sm font-medium text-white/90">Sans titre - Présentat...</span>
              <div className="w-6 h-6 rounded-full bg-orange-400 flex items-center justify-center text-[10px] font-bold">PR</div>
           </div>

           <div className="flex items-center gap-2">
             <button className="flex items-center gap-2 hover:bg-white/10 text-white px-3 py-1.5 rounded-md text-sm font-semibold transition-all">
               <Maximize2 size={16} />
             </button>
             <button className="flex items-center gap-2 hover:bg-white/10 text-white px-4 py-1.5 rounded-md text-sm font-bold transition-all border border-white/20">
               <Play size={16} className="fill-white" />
               Présenter
             </button>
             <button className="flex items-center gap-2 bg-[#7d2ae8] hover:bg-[#6c24c9] text-white px-4 py-1.5 rounded-md text-sm font-bold transition-all shadow-lg ml-2">
               <Share2 size={16} />
               Partager
             </button>
           </div>
        </header>

        {/* WORKSPACE AREA - Light grey background matching image */}
        <main className="flex-1 bg-[#f0f2f5] flex flex-col items-center justify-between p-4 overflow-hidden relative">
           
           {/* Contextual MAGIC Floating toolbar - ALWAYS VISIBLE now */}
           <div className="mt-2 animate-in fade-in slide-in-from-top-4 bg-white px-3 py-1.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-slate-100 flex items-center gap-3 z-20 transition-all">
              <button className="flex items-center gap-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1.5 rounded-full text-[11px] font-bold shadow-sm hover:brightness-105 transition-all">
                 <Sparkles size={14} className="fill-white" />
                 Demander à Canva
              </button>
              <div className="w-px h-4 bg-slate-200"></div>
              <button className="text-[11px] font-bold text-slate-700 hover:bg-slate-50 px-2 py-1 rounded transition-colors">Modifier</button>
              
              {selectedId && (
                <>
                  <div 
                    onClick={() => {
                      const colors = ['#6366f1', '#f43f5e', '#10b981', '#f59e0b', '#1e293b', '#ffffff'];
                      const currentElement = shapes.find(s => s.id === selectedId);
                      const current = currentElement?.fill;
                      const next = colors[(colors.indexOf(current || '') + 1) % colors.length];
                      setShapes(shapes.map(s => s.id === selectedId ? { ...s, fill: next } : s));
                    }}
                    className="w-6 h-6 rounded-full border border-slate-300 cursor-pointer overflow-hidden shadow-inner relative group/color"
                    style={{ background: 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)' }}
                  >
                    <div className="absolute inset-0.5 rounded-full" style={{ backgroundColor: shapes.find(s => s.id === selectedId)?.fill }} />
                    <div className="absolute inset-0 bg-black/0 group-hover/color:bg-black/5 transition-colors" />
                  </div>
                  <button className="text-[11px] font-bold text-slate-700 hover:bg-slate-50 px-2 py-1 rounded flex items-center gap-1 transition-colors">
                    Position <ChevronDown size={12} />
                  </button>
                  <div className="w-px h-4 bg-slate-200"></div>
                  <button 
                    onClick={() => {
                      setShapes(shapes.filter(s => s.id !== selectedId));
                      setSelectedId(null);
                    }}
                    className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded transition-colors"
                  >
                    <Scissors size={14} />
                  </button>
                </>
              )}

              {!selectedId && (
                <div className="flex items-center gap-3">
                   <button className="text-[11px] font-bold text-slate-400 cursor-not-allowed px-2 py-1 flex items-center gap-1 opacity-50">
                     Sélect. élément
                   </button>
                   <div className="w-px h-4 bg-slate-200"></div>
                   <div className="flex items-center gap-1">
                      <button className="p-1 hover:bg-slate-100 rounded text-slate-600"><Layers size={14} /></button>
                      <button className="p-1 hover:bg-slate-100 rounded text-slate-600"><Wand2 size={14} /></button>
                   </div>
                </div>
              )}
           </div>

           {/* The Canvas - Centered with a thin blue outline when "page" is active */}
           <div className="flex-1 flex items-center justify-center w-full py-4 relative group">
              <div 
                className="bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] relative border-2 border-transparent hover:border-blue-400 transition-colors" 
                style={{ width: '80%', aspectRatio: '16/9', maxHeight: '70vh' }}
              >
                <Stage 
                  width={800} 
                  height={450} // 16:9 ratio
                  ref={(node: any) => { (window as any).stageRef = node; }}
                  onMouseDown={(e: any) => {
                    const clickedOnEmpty = e.target === e.target.getStage();
                    if (clickedOnEmpty) {
                      setSelectedId(null);
                    }
                  }}
                >
                  <Layer>
                    {shapes.map((shape: Shape) => {
                      const isSelected = selectedId === shape.id;
                      const commonProps = {
                        key: shape.id,
                        ...shape,
                        name: shape.id,
                        draggable: true,
                        onClick: () => setSelectedId(shape.id),
                        onTap: () => setSelectedId(shape.id),
                        onDragEnd: (e: any) => {
                          const newShapes = shapes.slice();
                          const sh = newShapes.find((s: Shape) => s.id === shape.id);
                          if (sh) {
                            sh.x = e.target.x();
                            sh.y = e.target.y();
                          }
                          setShapes(newShapes);
                        },
                        stroke: isSelected ? '#2d4cc9' : undefined,
                        strokeWidth: isSelected ? 2 : 0,
                      };

                      if (shape.type === 'rect') return <Rect {...commonProps} />;
                      if (shape.type === 'circle') return <Circle {...commonProps} />;
                      if (shape.type === 'text') return <KonvaText {...commonProps} />;
                      return null;
                    })}
                    {selectedId && (
                      <Transformer
                        anchorSize={8}
                        anchorCornerRadius={4}
                        borderStroke="#2d4cc9"
                        nodes={[shapes.find(s => s.id === selectedId) ? (window as any).stageRef?.findOne('#' + selectedId) : null].filter(n => n)}
                      />
                    )}
                  </Layer>
                </Stage>
              </div>
           </div>

           {/* Page Preview rail matching image */}
           <div className="w-full flex items-center justify-center gap-3 py-4 z-10 shrink-0">
              <div className="flex flex-col items-center gap-1 group cursor-pointer">
                 <div className="w-24 h-14 bg-white border-2 border-slate-400 rounded-md shadow-sm flex items-center justify-center text-xs font-bold text-slate-300">
                    <LayoutGrid size={14} />
                 </div>
                 <span className="text-[10px] font-bold text-slate-500">1</span>
              </div>
              <div className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer">
                 <Plus size={20} />
              </div>
              <div className="w-8 h-8 flex items-center justify-center text-slate-300">
                 <ChevronDown size={18} />
              </div>
           </div>

        </main>

        {/* Bottom Status Bar matching image */}
        <footer className="h-10 bg-white border-t border-slate-200 flex items-center justify-between px-6 shrink-0 z-20">
           <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-[11px] font-bold uppercase tracking-wider transition-colors">
                <StickyNote size={14} />
                Notes
              </button>
              <button className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-[11px] font-bold uppercase tracking-wider transition-colors">
                <Clock size={14} />
                Minuteur
              </button>
           </div>

           <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <input type="range" className="w-32 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-400" />
                <span className="text-[11px] font-bold text-slate-500">34 %</span>
              </div>
              <div className="w-px h-4 bg-slate-200"></div>
              <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900 text-[11px] font-bold uppercase tracking-wider transition-colors">
                <LayoutGrid size={14} />
                Pages
              </button>
              <span className="text-[11px] font-bold text-slate-400">1/1</span>
              <button className="p-1 text-slate-400 hover:text-slate-800 transition-colors">
                <Maximize2 size={14} />
              </button>
           </div>
        </footer>

      </div>
    </div>
  );
}
