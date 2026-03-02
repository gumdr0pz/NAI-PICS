
import React from 'react';

const CognitiveHeatmap: React.FC = () => {
  // Simple abstract representation of a map
  const regions = [
    { x: 20, y: 20, r: 30, color: '#f43f5e', label: 'North' },
    { x: 70, y: 30, r: 20, color: '#fbbf24', label: 'East' },
    { x: 40, y: 60, r: 40, color: '#6366f1', label: 'Central' },
    { x: 15, y: 80, r: 25, color: '#2dd4bf', label: 'West' },
    { x: 80, y: 75, r: 15, color: '#6366f1', label: 'South' },
  ];

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full opacity-80">
      <defs>
        {regions.map((r, i) => (
          <radialGradient key={`grad-${i}`} id={`grad-${i}`}>
            <stop offset="0%" stopColor={r.color} stopOpacity="0.6" />
            <stop offset="100%" stopColor={r.color} stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>
      
      {/* Abstract Map Contours */}
      <path 
        d="M10,20 Q30,5 50,15 T90,20 Q95,40 85,60 T70,90 Q40,95 20,85 T5,50 Z" 
        fill="none" 
        stroke="#1e293b" 
        strokeWidth="0.5" 
      />

      {/* Heat Points */}
      {regions.map((r, i) => (
        <circle 
          key={i} 
          cx={r.x} 
          cy={r.y} 
          r={r.r} 
          fill={`url(#grad-${i})`} 
          className="animate-pulse"
          style={{ animationDuration: `${2 + i}s` }}
        />
      ))}

      {/* Region Markers */}
      {regions.map((r, i) => (
        <g key={`marker-${i}`}>
          <circle cx={r.x} cy={r.y} r="1" fill="#fff" />
          <text x={r.x + 2} y={r.y - 2} fill="#94a3b8" fontSize="2.5" fontWeight="bold">
            {r.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default CognitiveHeatmap;
