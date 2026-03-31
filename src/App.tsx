import React, { useState } from 'react';
import { LayoutDashboard, Scissors, Image as ImageIcon, Type, Square, Download, LogOut, ArrowRight, MousePointer2 } from 'lucide-react';
import { cn } from './utils/cn';

// Simple dashboard / Editor switch
type ViewMode = 'dashboard' | 'editor';

export default function App() {
  const [view, setView] = useState<ViewMode>('dashboard');

  if (view === 'dashboard') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="z-10 text-center max-w-2xl space-y-8">
          <div className="flex items-center justify-center gap-3 mb-8">
             <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
               <span className="text-white font-black text-xl tracking-tighter">Q</span>
             </div>
             <h1 className="text-4xl font-extrabold tracking-tight">QANVA-PRO</h1>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black leading-tight">
            Designez tout. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Instantanément.</span>
          </h2>
          <p className="text-lg text-slate-400">
            L'outil visuel de création graphique directement dans votre navigateur.
          </p>
          
          <button 
            onClick={() => setView('editor')}
            className="group relative inline-flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-indigo-500/20 hover:scale-105"
          >
            Créer un nouveau design
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
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
