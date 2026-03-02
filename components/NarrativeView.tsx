
import React from 'react';
import { MOCK_NARRATIVES } from '../constants';
import { Share2, ArrowRight, Activity, TrendingUp } from 'lucide-react';

const NarrativeView: React.FC = () => {
  const handleAction = (id: string) => {
    alert(`Narrative ${id} flagged for tactical mitigation analysis.`);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/30 transition-colors cursor-pointer group"
             onClick={() => alert('Global propagation velocity is currently trending 14% above seasonal baseline.')}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400 group-hover:scale-110 transition-transform">
              <TrendingUp size={20} />
            </div>
            <h4 className="text-sm font-bold uppercase text-slate-500 tracking-wider">Propagation Velocity</h4>
          </div>
          <p className="text-2xl font-bold mono">4.2x / hr</p>
          <p className="text-xs text-slate-500 mt-1">Compared to baseline average</p>
        </div>
        <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 hover:border-purple-500/30 transition-colors cursor-pointer group"
             onClick={() => alert('Identified vectors: Social Media Clusters (42%), Traditional News Outlets (18%), Distributed Private Discourses (40%).')}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400 group-hover:scale-110 transition-transform">
              <Share2 size={20} />
            </div>
            <h4 className="text-sm font-bold uppercase text-slate-500 tracking-wider">Influence Vectors</h4>
          </div>
          <p className="text-2xl font-bold mono">128 Active</p>
          <p className="text-xs text-slate-500 mt-1">Multi-channel cross-correlation</p>
        </div>
        <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 hover:border-rose-500/30 transition-colors cursor-pointer group"
             onClick={() => alert('Amplification Audit: 64% of high-intensity nodes exhibit bot-like behavior consistent with regional threat actors.')}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-rose-500/20 rounded-lg text-rose-400 group-hover:scale-110 transition-transform">
              <Activity size={20} />
            </div>
            <h4 className="text-sm font-bold uppercase text-slate-500 tracking-wider">Amplification Detection</h4>
          </div>
          <p className="text-2xl font-bold mono text-rose-400">HIGH</p>
          <p className="text-xs text-slate-500 mt-1">Likely synthetic intervention</p>
        </div>
      </div>

      <div className="bg-slate-900/40 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-slate-800 bg-slate-950/30 flex justify-between items-center">
          <h3 className="font-bold">Narrative Tracking Matrix</h3>
          <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300">Refresh Streams</button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-950/50 border-b border-slate-800">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Narrative Topic</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Intensity</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Source Tier</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {MOCK_NARRATIVES.map(narrative => (
              <tr key={narrative.id} className="hover:bg-slate-800/30 transition-colors group">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-sm group-hover:text-indigo-400 transition-colors">{narrative.topic}</p>
                    <p className="text-xs text-slate-500 mt-1 truncate max-w-xs">{narrative.description}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${narrative.intensity > 80 ? 'bg-rose-500' : 'bg-indigo-500'}`} 
                        style={{ width: `${narrative.intensity}%` }}
                      ></div>
                    </div>
                    <span className="text-xs mono">{narrative.intensity}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[10px] px-2 py-1 rounded bg-slate-800 border border-slate-700 font-mono text-slate-300">
                    {narrative.sourceType}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] flex items-center gap-1 ${narrative.status === 'Rising' ? 'text-rose-400' : 'text-emerald-400'}`}>
                    <Activity size={10} /> {narrative.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => handleAction(narrative.id)}
                    className="p-2 hover:bg-indigo-500 hover:text-white rounded-lg transition-all text-indigo-400 active:scale-90"
                  >
                    <ArrowRight size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NarrativeView;
