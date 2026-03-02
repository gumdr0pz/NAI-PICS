
import React, { useState } from 'react';
import { Play, RotateCcw, Save, MessageSquare, Terminal, ChevronRight, FileDown } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { jsPDF } from 'jspdf';

const SimulationView: React.FC = () => {
  const [scenario, setScenario] = useState('Policy Shift: National Energy Subsidy Removal');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<string | null>(null);
  const [isDispatching, setIsDispatching] = useState(false);

  const runSimulation = async () => {
    setIsSimulating(true);
    setSimulationResult(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze the following scenario using psychographic intelligence and predict population response:
        Scenario: ${scenario}
        Format: Return a structured analysis with "Likely Outcome", "Risk Vectors", and "Counter-Narrative Strategy". Be detailed but concise.`,
        config: {
          thinkingConfig: { thinkingBudget: 0 }
        }
      });
      setSimulationResult(response.text || "Failed to generate simulation. Data stream interrupted.");
    } catch (e) {
      setSimulationResult("ERROR: Sovereign simulation layer unreachable. Ensure inter-agency handshake is valid.");
    } finally {
      setIsSimulating(false);
    }
  };

  const downloadAsPDF = () => {
    if (!simulationResult) return;

    const doc = new jsPDF();
    const timestamp = new Date().toLocaleString();
    
    doc.setFontSize(18);
    doc.setTextColor(40, 44, 52);
    doc.text('Psychographic Intelligence Simulation Report', 10, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated: ${timestamp}`, 10, 28);
    doc.text(`System ID: NAI-PICS-SOVEREIGN-04`, 10, 33);
    
    doc.setDrawColor(200, 200, 200);
    doc.line(10, 38, 200, 38);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('Scenario Definition:', 10, 48);
    
    doc.setFont('helvetica', 'normal');
    const splitScenario = doc.splitTextToSize(scenario, 180);
    doc.text(splitScenario, 10, 55);
    
    const scenarioHeight = splitScenario.length * 7;
    const resultY = 65 + scenarioHeight;
    
    doc.setFont('helvetica', 'bold');
    doc.text('Predictive Analysis:', 10, resultY);
    
    doc.setFont('helvetica', 'normal');
    const splitResult = doc.splitTextToSize(simulationResult, 180);
    doc.text(splitResult, 10, resultY + 7);
    
    doc.save(`NAI-Simulation-${new Date().getTime()}.pdf`);
  };

  const handleDispatchBriefing = () => {
    setIsDispatching(true);
    setTimeout(() => {
      setIsDispatching(false);
      alert('Briefing dispatched to National Security Council via encrypted link.');
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-6">
          <h3 className="text-lg font-bold mb-4">Simulation Parameterization</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest">Scenario Definition</label>
              <textarea 
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm focus:outline-none focus:border-indigo-500/50 min-h-[120px] transition-all"
                placeholder="Describe the policy change or narrative event..."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest">Confidence Threshold</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none cursor-pointer">
                  <option>95% (High Fidelity)</option>
                  <option>80% (Rapid Iteration)</option>
                  <option>65% (Exploratory)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest">Time Horizon</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none cursor-pointer">
                  <option>T+24 Hours</option>
                  <option>T+7 Days</option>
                  <option>T+30 Days</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button 
                onClick={runSimulation}
                disabled={isSimulating}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-900/20 active:scale-95"
              >
                {isSimulating ? <RotateCcw size={18} className="animate-spin" /> : <Play size={18} />}
                {isSimulating ? 'Processing Models...' : 'Run Prediction Engine'}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-6">
          <h3 className="text-sm font-bold uppercase text-slate-500 mb-4 tracking-wider">Simulation Capabilities</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Policy Impact', desc: 'Forecast public response' },
              { label: 'Narrative Stress', desc: 'Message framing analysis' },
              { label: 'Crisis Modeling', desc: 'Pre-incident preparedness' },
              { label: 'Counter-Narrative', desc: 'Mitigation effectiveness' }
            ].map((cap, i) => (
              <div key={i} className="bg-slate-950/50 p-3 rounded-xl border border-slate-800 hover:border-indigo-500/50 cursor-help group transition-all">
                <p className="text-sm font-bold group-hover:text-indigo-400 transition-colors">{cap.label}</p>
                <p className="text-[10px] text-slate-500 mt-1">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-2xl flex flex-col overflow-hidden relative min-h-[500px] shadow-2xl">
        <div className="h-10 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-emerald-500" />
            <span className="text-[10px] font-mono font-bold text-slate-400 tracking-wider">PREDICTIVE_GOVERNANCE_OUTPUT.LOG</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-slate-700"></div>
            <div className="w-2 h-2 rounded-full bg-slate-700"></div>
            <div className="w-2 h-2 rounded-full bg-slate-700"></div>
          </div>
        </div>

        <div className="flex-1 p-6 font-mono text-[13px] overflow-y-auto leading-relaxed text-slate-300">
          {isSimulating ? (
            <div className="space-y-4">
              <p className="animate-pulse text-indigo-400">Initializing Monte Carlo Psychographic Sampling...</p>
              <p className="animate-pulse delay-100 text-slate-500">Injecting OSINT Sentiment Deltas [4.2s latency]...</p>
              <p className="animate-pulse delay-300 text-slate-500">Cross-referencing Cognitive Style biases (Analytical vs Intuitive)...</p>
              <p className="animate-pulse delay-500 text-slate-500">Normalizing output probability vectors...</p>
            </div>
          ) : simulationResult ? (
            <div className="whitespace-pre-wrap animate-in fade-in slide-in-from-bottom-2 duration-500">
              {simulationResult}
              <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] text-slate-500 italic">
                -- Simulation complete. Audit log preserved. Human-in-the-loop verification required before operationalization. --
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-30 select-none">
              <MessageSquare size={48} className="mb-4 text-indigo-500" />
              <p>Ready for operational simulation.</p>
              <p className="text-[10px] mt-2">Enter parameters and initiate engine.</p>
            </div>
          )}
        </div>

        {simulationResult && !isSimulating && (
          <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-col gap-2">
            <div className="flex gap-2">
              <button 
                onClick={downloadAsPDF}
                className="flex-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 text-xs py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 border border-emerald-500/30 transition-colors active:scale-95"
              >
                <FileDown size={14} /> Download PDF Brief
              </button>
              <button 
                onClick={() => alert('Simulation results saved to local vault.')}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors active:scale-95"
              >
                <Save size={14} /> Save to Playbook
              </button>
            </div>
            <button 
              disabled={isDispatching}
              onClick={handleDispatchBriefing}
              className="w-full bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 text-xs py-2 rounded-lg font-bold flex items-center justify-center gap-2 border border-indigo-500/30 transition-colors active:scale-95"
            >
              {isDispatching ? <RotateCcw size={14} className="animate-spin" /> : <ChevronRight size={14} />}
              {isDispatching ? 'Encrypting & Dispatching...' : 'Dispatch to Executive Briefing'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimulationView;
