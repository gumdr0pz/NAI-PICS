
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BrainCircuit, 
  Share2, 
  ShieldAlert, 
  PlayCircle, 
  Database, 
  FileText,
  ChevronRight,
  ShieldCheck,
  Zap,
  Lock,
  Menu,
  X,
  User,
  Activity,
  AlertTriangle,
  Info,
  CheckCircle2,
  Download,
  // Added missing RotateCcw icon import
  RotateCcw
} from 'lucide-react';
import { NAVIGATION_ITEMS, INITIAL_RISK_INDICES, MOCK_NARRATIVES, INGESTION_PIPELINES } from './constants';
import { AccessTier, RiskIndices } from './types';
import StrategicView from './components/StrategicView';
import PsychographicView from './components/PsychographicView';
import NarrativeView from './components/NarrativeView';
import SimulationView from './components/SimulationView';
import IngestionView from './components/IngestionView';
import RiskView from './components/RiskView';
import { GoogleGenAI } from '@google/genai';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('strategic');
  const [tier, setTier] = useState<AccessTier>('Strategic');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [indices, setIndices] = useState<RiskIndices>(INITIAL_RISK_INDICES);
  const [modalContent, setModalContent] = useState<{ title: string; body: React.ReactNode } | null>(null);
  const [notification, setNotification] = useState<{ type: 'info' | 'success' | 'warning'; message: string } | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);

  // Clear notification after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Simulation of real-time index drift
  useEffect(() => {
    const interval = setInterval(() => {
      setIndices(prev => ({
        nsi: Math.min(100, Math.max(0, prev.nsi + (Math.random() - 0.5) * 2)),
        cri: Math.min(100, Math.max(0, prev.cri + (Math.random() - 0.5) * 3)),
        ips: Math.min(100, Math.max(0, prev.ips + (Math.random() - 0.5) * 1.5)),
        rsi: Math.min(100, Math.max(0, prev.rsi + (Math.random() - 0.5) * 1.2))
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleExport = () => {
    const data = {
      timestamp: new Date().toISOString(),
      indices,
      activeNarratives: MOCK_NARRATIVES,
      pipelines: INGESTION_PIPELINES
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NAI-PICS-Export-${Date.now()}.json`;
    a.click();
    setNotification({ type: 'success', message: 'System state exported successfully.' });
  };

  const handleGlobalPrediction = async () => {
    setIsPredicting(true);
    try {
      // Create a new GoogleGenAI instance right before making an API call to ensure it always uses the most up-to-date API key from the dialog or environment.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Based on these National Psychographic Indices: 
      National Sentiment Index: ${indices.nsi.toFixed(1)}/100
      Cognitive Risk Index: ${indices.cri.toFixed(1)}/100
      Influence Penetration: ${indices.ips.toFixed(1)}/100
      Radicalization Susceptibility: ${indices.rsi.toFixed(1)}/100
      Provide a 3-sentence Executive Strategic Outlook on national stability for the next 48 hours. Focus on actionable insights.`;

      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });

      setModalContent({
        title: 'National Strategic Outlook [AI-GENERATED]',
        body: (
          <div className="space-y-4 font-mono text-sm leading-relaxed">
            <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-300">
              {result.text}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-3 bg-slate-900 rounded border border-slate-800">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Confidence Score</p>
                <p className="text-emerald-400 font-bold">94.2%</p>
              </div>
              <div className="p-3 bg-slate-900 rounded border border-slate-800">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Egress Path</p>
                <p className="text-indigo-400 font-bold">Sovereign-Internal</p>
              </div>
            </div>
          </div>
        )
      });
    } catch (error) {
      setNotification({ type: 'warning', message: 'Prediction Engine handshake failed. Verify Sovereign Node connectivity.' });
    } finally {
      setIsPredicting(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'strategic': return <StrategicView indices={indices} />;
      case 'psychographic': return <PsychographicView />;
      case 'narrative': return <NarrativeView />;
      case 'simulation': return <SimulationView />;
      case 'ingestion': return <IngestionView pipelines={INGESTION_PIPELINES} setNotification={setNotification} />;
      case 'risk': return <RiskView indices={indices} alerts={MOCK_NARRATIVES} setNotification={setNotification} setModalContent={setModalContent} />;
      default: return <StrategicView indices={indices} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#020617] text-slate-200 overflow-hidden relative">
      {/* Toast Notification */}
      {notification && (
        <div className="absolute top-20 right-8 z-50 animate-in fade-in slide-in-from-right-4">
          <div className={`px-4 py-3 rounded-xl border flex items-center gap-3 shadow-2xl backdrop-blur-md ${
            notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
            notification.type === 'warning' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
            'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
          }`}>
            {notification.type === 'success' ? <CheckCircle2 size={18} /> : 
             notification.type === 'warning' ? <AlertTriangle size={18} /> : <Info size={18} />}
            <span className="text-sm font-medium">{notification.message}</span>
            <button onClick={() => setNotification(null)} className="hover:text-white"><X size={14} /></button>
          </div>
        </div>
      )}

      {/* Modal Overlay */}
      {modalContent && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-[#0a0f1e] border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <h3 className="font-bold text-lg tracking-tight">{modalContent.title}</h3>
              <button onClick={() => setModalContent(null)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400">
                <X size={20} />
              </button>
            </div>
            <div className="p-8">
              {modalContent.body}
              <button 
                onClick={() => setModalContent(null)}
                className="w-full mt-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all"
              >
                Acknowledge and Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className={`
        ${isSidebarOpen ? 'w-64' : 'w-20'} 
        bg-[#0a0f1e] border-r border-slate-800 transition-all duration-300 flex flex-col z-20
      `}>
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg cursor-pointer hover:bg-indigo-500 transition-colors" onClick={() => setActiveTab('strategic')}>
            <ShieldCheck className="text-white" size={24} />
          </div>
          {isSidebarOpen && <span className="font-bold text-lg tracking-tight whitespace-nowrap">NAI-PICS v4.1</span>}
        </div>

        <nav className="flex-1 py-4 px-3 space-y-2 overflow-y-auto">
          {NAVIGATION_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                ${activeTab === item.id ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'hover:bg-slate-800 text-slate-400'}
              `}
            >
              {item.icon}
              {isSidebarOpen && (
                <div className="flex flex-col items-start overflow-hidden text-left">
                  <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                  <span className="text-[10px] opacity-50 uppercase">{item.tier}</span>
                </div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="w-full flex justify-center p-2 text-slate-500 hover:text-white"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-[#0a0f1e]/50 backdrop-blur-md">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-emerald-500 flex items-center gap-1">
                <Activity size={14} /> SOVEREIGN NODE: 04-ACTIVE
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-indigo-400 flex items-center gap-1 cursor-help group relative">
                <Lock size={14} /> AIR-GAPPED SYNC: OK
                <div className="absolute top-6 left-0 w-48 p-2 bg-slate-900 border border-slate-800 rounded hidden group-hover:block z-50 text-[10px] text-slate-400">
                  Data integrity verified. System is running in isolated sovereign compute mode.
                </div>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700 cursor-pointer hover:bg-slate-700 transition-colors"
                 onClick={() => setNotification({ type: 'info', message: 'Clearance level: Strategic (Global Write Access)' })}>
              <User size={16} className="text-indigo-400" />
              <span className="text-xs font-semibold">{tier} Command</span>
            </div>
            <div className="relative cursor-pointer group" onClick={() => setNotification({ type: 'info', message: 'Profile: Admin User | Session: 0x84f2...a' })}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold">
                AD
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#020617] rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Viewport */}
        <div className="flex-1 overflow-y-auto bg-grid p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  {NAVIGATION_ITEMS.find(n => n.id === activeTab)?.label}
                </h2>
                <p className="text-slate-400 mt-1">
                  National Psychographic Intelligence Monitoring - {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={handleExport}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition-colors border border-slate-700 flex items-center gap-2"
                >
                  <Download size={16} /> Export Data
                </button>
                <button 
                  onClick={handleGlobalPrediction}
                  disabled={isPredicting}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-lg text-sm transition-colors flex items-center gap-2 shadow-lg shadow-indigo-900/20"
                >
                  {/* Fixed: RotateCcw is now correctly imported from lucide-react */}
                  {isPredicting ? <RotateCcw size={16} className="animate-spin" /> : <Zap size={16} />}
                  {isPredicting ? 'Executing...' : 'Execute Prediction'}
                </button>
              </div>
            </div>
            
            {renderContent()}
          </div>
        </div>

        {/* Global Alert Bar (Sticky Bottom) */}
        <div className="h-10 bg-red-900/30 border-t border-red-500/20 px-8 flex items-center justify-between text-xs font-mono text-red-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <AlertTriangle size={14} className="animate-pulse" /> SYSTEM ALERT:
            </span>
            <div className="w-96 overflow-hidden whitespace-nowrap opacity-80 cursor-pointer hover:text-white" 
                 onClick={() => setActiveTab('risk')}>
              Coordinated narrative drift detected in Northern Sectors [Cluster #429] ... High cognitive risk spike in Regional Health discourse ... Financial signal volatility threshold exceeded ...
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>THREAT LEVEL: MODERATE (COGNITIVE)</span>
            <span className="bg-red-500/20 px-2 py-0.5 rounded border border-red-500/40 cursor-pointer hover:bg-red-500/30 transition-colors"
                  onClick={() => setActiveTab('risk')}>
              ACTION REQUIRED
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

// Internal components need to handle setNotification and setModalContent where needed
export default App;
