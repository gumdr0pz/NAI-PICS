
import React from 'react';

interface Props {
  label: string;
  value: number;
  description: string;
  trend: string;
  variant: 'primary' | 'danger' | 'warning' | 'caution';
}

const RiskIndexCard: React.FC<Props> = ({ label, value, description, trend, variant }) => {
  const getColors = () => {
    switch(variant) {
      case 'danger': return 'from-rose-500 to-red-600 shadow-rose-900/20 text-rose-400';
      case 'warning': return 'from-amber-500 to-orange-600 shadow-amber-900/20 text-amber-400';
      case 'caution': return 'from-emerald-500 to-teal-600 shadow-emerald-900/20 text-emerald-400';
      default: return 'from-indigo-500 to-blue-600 shadow-indigo-900/20 text-indigo-400';
    }
  };

  return (
    <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-5 group hover:border-slate-700 transition-all flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{label}</span>
        <span className={`text-[10px] px-1.5 py-0.5 rounded border ${trend.startsWith('+') ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' : 'text-rose-400 border-rose-500/20 bg-rose-500/10'}`}>
          {trend}
        </span>
      </div>
      
      <div className="flex items-end gap-2 mb-4">
        <span className="text-4xl font-bold tracking-tighter mono">
          {Math.round(value)}
        </span>
        <span className="text-sm text-slate-500 mb-1 font-mono">/100</span>
      </div>

      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-4">
        <div 
          className={`h-full bg-gradient-to-r ${getColors()} transition-all duration-1000`} 
          style={{ width: `${value}%` }}
        />
      </div>

      <p className="text-xs text-slate-500 leading-relaxed italic">
        {description}
      </p>
    </div>
  );
};

export default RiskIndexCard;
