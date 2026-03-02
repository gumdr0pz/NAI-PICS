
import React from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer 
} from 'recharts';
import { PSYCHOGRAPHIC_DIMENSIONS } from '../constants';

const data = PSYCHOGRAPHIC_DIMENSIONS.map(dim => ({
  subject: dim,
  A: 40 + Math.random() * 40,
  B: 20 + Math.random() * 60,
  fullMark: 100,
}));

const PsychographicView: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-slate-900/40 rounded-2xl border border-slate-800 p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          Latent Dimension Mapping <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">POPULATION SCALE</span>
        </h3>
        
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} />
              <Radar
                name="Current State"
                dataKey="A"
                stroke="#6366f1"
                strokeWidth={2}
                fill="#6366f1"
                fillOpacity={0.4}
              />
              <Radar
                name="Predictive Baseline"
                dataKey="B"
                stroke="#2dd4bf"
                strokeWidth={2}
                fill="#2dd4bf"
                fillOpacity={0.1}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-6">
          <h4 className="text-sm font-bold uppercase text-slate-500 mb-4 tracking-wider">Operational Insights</h4>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <div className="w-1 bg-indigo-500 rounded-full h-auto"></div>
              <div>
                <p className="text-sm font-semibold">Values Shift</p>
                <p className="text-xs text-slate-500 mt-1">Increasing security-oriented bias detected in urban clusters (T+12h drift).</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-1 bg-rose-500 rounded-full h-auto"></div>
              <div>
                <p className="text-sm font-semibold">Escalatory Intent</p>
                <p className="text-xs text-slate-500 mt-1">Latent intent state shifting from exploratory to escalatory in "Digital Sovereignty" circles.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-1 bg-emerald-500 rounded-full h-auto"></div>
              <div>
                <p className="text-sm font-semibold">Resilience Baseline</p>
                <p className="text-xs text-slate-500 mt-1">Counter-narrative effectiveness high among 18-35 age cohort across OSINT streams.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-indigo-600/10 rounded-2xl border border-indigo-500/20 p-6">
          <h4 className="text-sm font-bold text-indigo-300 mb-2">Model Characteristics</h4>
          <div className="space-y-2 text-[11px] mono">
            <div className="flex justify-between">
              <span className="text-slate-500 uppercase">Type</span>
              <span>Embedding-based Latent</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 uppercase">Determinism</span>
              <span>Non-Deterministic</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 uppercase">Tracking</span>
              <span>Drift Detection [ON]</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 uppercase">Accuracy</span>
              <span className="text-emerald-400">92.4% Variance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PsychographicView;
