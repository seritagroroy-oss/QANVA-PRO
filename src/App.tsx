import React, { useState } from 'react';
import { 
  Home, FolderOpen, LayoutTemplate, Star, Sparkles, 
  Settings, Bell, Search, ChevronDown, Plus, Presentation,
  MonitorPlay, FileText, MonitorUp, Grid, Globe, Mail, Image as ImageIcon,
  MoreHorizontal, UploadCloud, SlidersHorizontal, ArrowUpDown, LayoutGrid, List,
  LayoutDashboard, Scissors, Type, Square, Download, LogOut, ArrowRight, MousePointer2,
  X, Heart, Camera
} from 'lucide-react';
import { cn } from './utils/cn';

// Simple dashboard / Editor switch
type ViewMode = 'dashboard' | 'editor';

export default function App() {
  const [view, setView] = useState<ViewMode>('dashboard');
  const [showCreateModal, setShowCreateModal] = useState(false);

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
                   <button key={i} onClick={() => setView('editor')} className="flex flex-col items-center gap-3 min-w-[80px] group">
                     <div className={cn("w-14 h-14 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all", cat.color)}>
                       <cat.icon size={26} className={cat.iconColor} strokeWidth={1.5} />
                     </div>
                     <span className="text-xs font-medium text-slate-700 text-center leading-tight whitespace-nowrap">{cat.name}</span>
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
                 <div className="group cursor-pointer flex flex-col gap-3">
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
                 <div className="group cursor-pointer flex flex-col gap-3">
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
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-violet-100/50 text-violet-700 font-semibold text-sm transition-colors">
                       <Sparkles size={18} />
                       Pour vous
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium text-sm transition-colors">
                       <Presentation size={18} className="text-orange-500" />
                       Diaporamas
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium text-sm transition-colors">
                       <Heart size={18} className="text-rose-500" />
                       Réseaux sociaux
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium text-sm transition-colors">
                       <Camera size={18} className="text-pink-500" />
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
                    <p className="text-sm font-medium text-slate-500 mb-8 hover:text-violet-600 cursor-pointer transition-colors inline-block">Flyer (Portrait A4)</p>

                    {/* Section 1 */}
                    <div className="mb-10">
                       <h3 className="text-lg font-bold text-slate-800 mb-6">Populaires sur Canva</h3>
                       <div className="flex gap-6 overflow-x-auto scrollbar-none pb-4">
                          
                          {/* Item 1 */}
                          <div className="group cursor-pointer flex flex-col gap-4 min-w-[200px]" onClick={() => setView('editor')}>
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
                          <div className="group cursor-pointer flex flex-col gap-4 min-w-[200px]" onClick={() => setView('editor')}>
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
                          <div className="group cursor-pointer flex flex-col gap-4 min-w-[200px]" onClick={() => setView('editor')}>
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
                           <div className="group cursor-pointer flex flex-col gap-4 min-w-[200px]" onClick={() => setView('editor')}>
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
               </div>

             </div>
          </div>
        )}
      </div>
    );
  }


  return (
    <div className="flex h-screen w-full bg-slate-100 overflow-hidden">
      
      {/* SIDEBAR MAIN NAV */}
      <aside className="w-20 bg-slate-900 border-r border-slate-800 flex flex-col items-center py-6 gap-6 z-20 shrink-0">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg mb-4 cursor-pointer" onClick={() => setView('dashboard')}>
          <span className="text-white font-black text-lg">Q</span>
        </div>
        
        <div className="flex flex-col gap-4 w-full px-2">
          {[{ id: 'templates', icon: LayoutDashboard, label: 'Modèles' },
            { id: 'text', icon: Type, label: 'Texte' },
            { id: 'elements', icon: Square, label: 'Éléments' },
            { id: 'uploads', icon: ImageIcon, label: 'Médias' },
            { id: 'draw', icon: Scissors, label: 'Dessiner' }
          ].map(tool => (
            <button key={tool.id} className="w-full flex flex-col items-center gap-1.5 p-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
              <tool.icon size={22} />
              <span className="text-[9px] font-bold">{tool.label}</span>
            </button>
          ))}
        </div>
        
        <div className="mt-auto flex flex-col gap-4 w-full px-2">
          <button className="w-full flex flex-col items-center gap-1.5 p-3 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-400/10 transition-colors" onClick={() => setView('dashboard')}>
            <LogOut size={22} />
            <span className="text-[9px] font-bold tracking-wider">Sortir</span>
          </button>
        </div>
      </aside>

      {/* SECONDARY PANEL (Templates, Objects, etc) */}
      <div className="w-80 bg-white border-r border-slate-200 shadow-xl z-10 flex flex-col pointer-events-auto shrink-0 animate-in slide-in-from-left-8">
         <div className="p-6">
            <h3 className="text-xl font-black text-slate-900">Éléments</h3>
            <div className="mt-6 grid grid-cols-2 gap-3">
               <div className="aspect-square bg-slate-100 rounded-2xl border-2 border-transparent hover:border-indigo-500 cursor-pointer flex items-center justify-center transition-all">
                  <div className="w-12 h-12 bg-slate-800 rounded-xl"></div>
               </div>
               <div className="aspect-square bg-slate-100 rounded-2xl border-2 border-transparent hover:border-indigo-500 cursor-pointer flex items-center justify-center transition-all">
                  <div className="w-12 h-12 bg-slate-800 rounded-full"></div>
               </div>
               <div className="aspect-square bg-slate-100 rounded-2xl border-2 border-transparent hover:border-indigo-500 cursor-pointer p-4 transition-all">
                  <div className="w-full h-full bg-slate-800 rounded-lg"></div>
               </div>
               <div className="aspect-square bg-slate-100 rounded-2xl border-2 border-transparent hover:border-indigo-500 cursor-pointer p-4 transition-all">
                  <div className="w-full h-full border-4 border-slate-800 rounded-full"></div>
               </div>
            </div>
         </div>
      </div>

      {/* CANVAS WORKSPACE */}
      <div className="flex-1 flex flex-col relative h-full">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10">
           <div className="flex items-center gap-4">
              <button className="p-2 text-slate-400 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 rounded-lg transition-colors">
                <MousePointer2 size={18} />
              </button>
           </div>
           
           {/* Top Properties Bar */}
           <div className="bg-slate-50 px-4 py-2 rounded-xl flex items-center gap-6 border border-slate-200">
               <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-500 border border-slate-300 shadow-sm cursor-pointer hover:scale-110 transition-transform"></div>
                  <div className="w-px h-5 bg-slate-200"></div>
                  <span className="text-xs font-bold text-slate-500">OPACITÉ</span>
                  <input type="range" className="w-24 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
               </div>
           </div>

           <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-colors">
             <Download size={16} />
             Exporter
           </button>
        </header>

        {/* The Konva Canvas (Placeholder for now) */}
        <main className="flex-1 bg-slate-100 flex items-center justify-center p-8 overflow-auto relative">
           
           {/* Zoomed out canvas view */}
           <div className="w-[800px] h-[800px] bg-white shadow-2xl overflow-hidden relative border border-slate-200">
               <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-100 rounded-3xl border-2 border-indigo-400 rotate-12 flex items-center justify-center">
                   <p className="text-indigo-600 font-bold text-xl">Shape</p>
               </div>
               <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-rose-100 rounded-full border-2 border-rose-400 -translate-x-1/2 flex items-center justify-center shadow-lg">
                   <p className="text-rose-600 font-bold text-xl text-center leading-tight">QANVA<br/>PRO</p>
               </div>
           </div>

        </main>

      </div>
    </div>
  );
}
