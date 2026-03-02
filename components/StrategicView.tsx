
import React from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { RiskIndices } from '../types';
import RiskIndexCard from './RiskIndexCard';
import CognitiveHeatmap from './CognitiveHeatmap';

interface Props {
  indices: RiskIndices;
}

const mockTrendData = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  sentiment: 50 + Math.sin(i / 2) * 20 + Math.random() * 10,
  risk: 30 + Math.cos(i / 3) * 15 + Math.random() * 5,
  influence: 20 + (i * 1.5) + Math.random() * 10
}));

const StrategicView: React.FC<Props> = ({ indices }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="cursor-pointer">
        <RiskIndexCard 
          label="National Sentiment Index (NSI)" 
          value={indices.nsi} 
          description="Macro emotional stability baseline."
          trend="+2.4%"
          variant="primary"
        />
      </div>
      <div className="cursor-pointer">
        <RiskIndexCard 
          label="Cognitive Risk Index (CRI)" 
          value={indices.cri} 
          description="Escalation likelihood score."
          trend="-1.2%"
          variant="danger"
        />
      </div>
      <div className="cursor-pointer">
        <RiskIndexCard 
          label="Influence Penetration" 
          value={indices.ips} 
          description="Effectiveness of hostile narratives."
          trend="+0.8%"
          variant="warning"
        />
      </div>
      <div className="cursor-pointer">
        <RiskIndexCard 
          label="Radicalization Susceptibility" 
          value={indices.rsi} 
          description="Pre-extremism signal frequency."
          trend="+0.2%"
          variant="caution"
        />
      </div>

      <div className="col-span-1 md:col-span-3 bg-slate-900/40 rounded-2xl border border-slate-800 p-6 h-[400px] flex flex-col hover:border-slate-700 transition-colors">
        <h3 className="text-lg font-bold mb-4 flex items-center justify-between">
          <span>Population Cognitive Trends</span>
          <div className="flex gap-4 text-xs">
            <span className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div> Sentiment
            </span>
            <span className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-2 h-2 rounded-full bg-rose-500"></div> Cognitive Risk
            </span>
          </div>
        </h3>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockTrendData}>
              <defs>
                <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis domain={[0, 100]} stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                itemStyle={{ fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="sentiment" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorSent)" />
              <Area type="monotone" dataKey="risk" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorRisk)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="col-span-1 bg-slate-900/40 rounded-2xl border border-slate-800 p-6 flex flex-col hover:border-slate-700 transition-colors">
        <h3 className="text-lg font-bold mb-4">Regional Cognitive Heatmap</h3>
        <div className="flex-1 bg-slate-950/50 rounded-xl flex items-center justify-center p-4 cursor-crosshair">
          <CognitiveHeatmap />
        </div>
        <p className="text-[10px] text-slate-500 mt-4 uppercase tracking-widest text-center">Live Geographical Distribution of Psychological Stress</p>
      </div>
    </div>
  );
};

export default StrategicView;
