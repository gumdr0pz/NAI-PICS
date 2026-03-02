
import React from 'react';
import { IngestionStatus } from '../types';
import { Activity, Database, CheckCircle, AlertCircle, Clock, ShieldCheck, Plus } from 'lucide-react';

interface Props {
  pipelines: IngestionStatus[];
  setNotification: (notif: { type: 'info' | 'success' | 'warning', message: string }) => void;
}

const IngestionView: React.FC<Props> = ({ pipelines, setNotification }) => {
  const handleToggleStatus = (source: string) => {
    setNotification({ type: 'info', message: `Requested status cycle for pipeline: ${source}. Protocol check initiated.` });
  };

  const handleProvisionNew = () => {
    setNotification({ type: 'warning', message: 'Clearance verification failed. Provisioning requires Level 5 biometric handshake.' });
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800">
        <h3 className="text-lg font-bold mb-6 flex items-center justify-between">
          <span>Active Ingestion Pipelines</span>
          <span className="text-xs text-slate-500 font-mono">Uptime: 99.998%</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pipelines.map((p, i) => (
            <div key={i} 
                 onClick={() => handleToggleStatus(p.source)}
                 className="bg-slate-950/50 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between group hover:border-indigo-500/30 transition-all cursor-pointer">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{p.type}</span>
                  <h4 className="font-bold text-lg mt-1 group-hover:text-indigo-400 transition-colors">{p.source}</h4>
                </div>
                <div className={`
                  p-2 rounded-lg transition-transform group-hover:scale-110
                  ${p.status === 'Online' ? 'bg-emerald-500/10 text-emerald-500' : p.status === 'Warning' ? 'bg-amber-500/10 text-amber-500' : 'bg-rose-500/10 text-rose-500'}
                `}>
                  {p.status === 'Online' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Flow Rate</span>
                  <span className="mono font-bold">{p.rate}</span>
                </div>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full bg-current ${p.status === 'Online' ? 'text-emerald-500' : 'text-amber-500'} animate-pulse`} style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="bg-slate-900/20 p-5 rounded-2xl border border-slate-800 border-dashed flex flex-col items-center justify-center text-slate-500 hover:text-indigo-400 hover:border-indigo-500/30 transition-all cursor-pointer group"
               onClick={handleProvisionNew}>
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-2 group-hover:bg-indigo-600/20 transition-colors">
              <Plus size={32} className="opacity-50 group-hover:opacity-100" />
            </div>
            <p className="font-bold text-sm">Provision New Source</p>
            <p className="text-[10px] mt-1 italic tracking-tight">Requires Level 4 Clearance</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800">
          <h4 className="text-sm font-bold uppercase text-slate-500 mb-4 tracking-wider">Ingestion Mechanics</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-2 hover:bg-slate-800/30 rounded-lg cursor-pointer transition-colors"
                 onClick={() => setNotification({ type: 'info', message: 'Streaming engine optimized for low-latency drift detection.' })}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-slate-400">
                  <Activity size={16} />
                </div>
                <span className="text-sm">Streaming Ingestion</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">LOW LATENCY</span>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-slate-800/30 rounded-lg cursor-pointer transition-colors"
                 onClick={() => setNotification({ type: 'info', message: 'All temporal indices synchronized via sovereign atomic clock.' })}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-slate-400">
                  <Clock size={16} />
                </div>
                <span className="text-sm">Temporal Indexing</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">UNIFIED SYNC</span>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-slate-800/30 rounded-lg cursor-pointer transition-colors"
                 onClick={() => setNotification({ type: 'info', message: 'Narrative noise reduced by 84% using sovereign filtering logic.' })}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-slate-400">
                  <CheckCircle size={16} />
                </div>
                <span className="text-sm">Pre-Filtering Engine</span>
              </div>
              <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">DE-NOISING</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 flex flex-col justify-center cursor-help group transition-colors hover:border-emerald-500/20"
             onClick={() => setNotification({ type: 'success', message: 'Sovereign-Internal mode confirmed. All external Egress blocked.' })}>
          <div className="text-center space-y-2">
            <h4 className="text-sm font-bold uppercase text-slate-500 tracking-wider">Security Control Status</h4>
            <div className="py-4">
              <div className="text-3xl font-bold mono tracking-tighter text-emerald-500 flex items-center justify-center gap-2 group-hover:scale-105 transition-transform">
                <ShieldCheck size={28} /> SOVEREIGN_MODE: [1]
              </div>
            </div>
            <p className="text-xs text-slate-500 max-w-xs mx-auto italic">
              All ingestion paths verified against Sovereign-by-Design protocols. Local storage only. No external egress.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngestionView;
