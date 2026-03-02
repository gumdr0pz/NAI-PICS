
import React, { useState } from 'react';
import { RiskIndices, NarrativeAlert } from '../types';
import { AlertTriangle, Zap, ArrowRight, ShieldAlert, Activity, ShieldX, Info } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Props {
  indices: RiskIndices;
  alerts: NarrativeAlert[];
  setNotification: (notif: { type: 'info' | 'success' | 'warning', message: string }) => void;
  setModalContent: (content: { title: string, body: React.ReactNode } | null) => void;
}

const RiskView: React.FC<Props> = ({ indices, alerts, setNotification, setModalContent }) => {
  const [isExecutingCounter, setIsExecutingCounter] = useState(false);

  const handleInitiateCounterMeasure = async () => {
    setIsExecutingCounter(true);
    setNotification({ type: 'warning', message: 'Counter-Measure sequence engaged. Calculating optimal narrative injection...' });
    
    // Dramatic pause for simulation
    setTimeout(() => {
      setNotification({ type: 'success', message: 'Narrative Counter-Measure deployed. Targeted Sector 07 neutralization active.' });
      setIsExecutingCounter(false);
    }, 3000);
  };

  const handleAlertDetails = async (alert: NarrativeAlert) => {
    setNotification({ type: 'info', message: `Retrieving detailed intelligence for: ${alert.topic}` });
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Provide a "Mitigation Strategy" for the following cognitive risk alert:
      Topic: ${alert.topic}
      Intensity: ${alert.intensity}%
      Description: ${alert.description}
      Format: Return 3 specific tactical steps in a list.`;

      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });

      setModalContent({
        title: `Intelligence Dossier: ${alert.topic}`,
        body: (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Propagation Vector</p>
                <p className="text-sm font-semibold">{alert.sourceType}</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Risk Intensity</p>
                <p className={`text-sm font-bold ${alert.intensity > 80 ? 'text-rose-500' : 'text-amber-500'}`}>{alert.intensity}%</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-2">
                <ShieldX size={14} className="text-indigo-400" /> Recommended Mitigation Strategy
              </p>
              <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-sm font-mono text-indigo-300 whitespace-pre-line leading-relaxed">
                {result.text}
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 italic text-[11px] text-slate-500 leading-relaxed">
              "This strategy is derived from real-time latent dimension mapping and historical escalation patterns. Human operational oversight mandated."
            </div>
          </div>
        )
      });
    } catch (e) {
      setNotification({ type: 'warning', message: 'Failed to generate mitigation strategy. Sovereign node offline?' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <ShieldAlert className="text-rose-500" size={20} /> Escalation Detection Logic
          </h3>
          <div className="space-y-4">
            {[
              { type: 'Economic', trigger: 'Fuel prices, Inflation', status: 'Active' },
              { type: 'Identity', trigger: 'Ethnic narratives', status: 'Monitoring' },
              { type: 'Political', trigger: 'Policy shifts', status: 'Active' },
              { type: 'Digital', trigger: 'Coordinated disinfo', status: 'Alert' },
            ].map((trigger, i) => (
              <div key={i} 
                   onClick={() => setNotification({ type: 'info', message: `Trigger logic for ${trigger.type} is functioning within normal parameters.` })}
                   className="flex items-center justify-between p-3 bg-slate-950/50 rounded-xl border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors group">
                <div>
                  <p className="text-sm font-bold group-hover:text-indigo-400 transition-colors">{trigger.type}</p>
                  <p className="text-xs text-slate-500">{trigger.trigger}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                  trigger.status === 'Alert' ? 'bg-rose-500/20 text-rose-500 border border-rose-500/30' :
                  trigger.status === 'Active' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                  'bg-slate-800 text-slate-400'
                }`}>
                  {trigger.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-2xl border p-8 flex flex-col justify-center items-center text-center transition-all ${isExecutingCounter ? 'bg-rose-600/20 border-rose-500 shadow-2xl shadow-rose-900/50' : 'bg-rose-900/10 border-rose-500/20'}`}>
          <AlertTriangle size={48} className={`text-rose-500 mb-4 ${isExecutingCounter ? 'animate-bounce' : 'animate-pulse'}`} />
          <h3 className="text-xl font-bold text-rose-400 mb-2">Early Warning Active</h3>
          <p className="text-sm text-slate-400 max-w-sm mb-6">
            Cognitive Risk Index (CRI) has exceeded threshold in Sector 07. Automated narrative drift alerts dispatched to Operational Command.
          </p>
          <button 
            disabled={isExecutingCounter}
            onClick={handleInitiateCounterMeasure}
            className="bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-rose-900/40 active:scale-95"
          >
            {isExecutingCounter ? <RotateCcw className="animate-spin" size={18} /> : <Zap size={18} />}
            {isExecutingCounter ? 'Executing Sequence...' : 'Initiate Counter-Measure Protocols'}
          </button>
        </div>
      </div>

      <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800">
        <h3 className="text-lg font-bold mb-6">Active Risk Alerts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {alerts.map(alert => (
            <div key={alert.id} 
                 onClick={() => handleAlertDetails(alert)}
                 className="bg-slate-950/50 p-5 rounded-2xl border border-slate-800 hover:border-rose-500/30 transition-all cursor-pointer group flex flex-col justify-between">
              <div>
                <div className="flex justify-between mb-4">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${alert.intensity > 80 ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    RISK: {alert.intensity}%
                  </span>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Activity size={10} /> {alert.status.toUpperCase()}
                  </span>
                </div>
                <h4 className="font-bold text-base group-hover:text-rose-400 transition-colors">{alert.topic}</h4>
                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed italic">"{alert.description}"</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-600">ID: {alert.id}</span>
                <button className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 text-[10px] font-bold">
                  DETAILS <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Internal icon import for execution button spinner
import { RotateCcw } from 'lucide-react';

export default RiskView;
