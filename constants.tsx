
import React from 'react';
import { 
  LayoutDashboard, 
  BrainCircuit, 
  Share2, 
  ShieldAlert, 
  PlayCircle, 
  Database, 
  FileText,
  Settings
} from 'lucide-react';
import { IngestionStatus, NarrativeAlert, RiskIndices } from './types';

export const NAVIGATION_ITEMS = [
  { id: 'strategic', label: 'Executive Dashboard', icon: <LayoutDashboard size={20} />, tier: 'Strategic' },
  { id: 'psychographic', label: 'Psychographic Engine', icon: <BrainCircuit size={20} />, tier: 'Tactical' },
  { id: 'narrative', label: 'Narrative Influence', icon: <Share2 size={20} />, tier: 'Tactical' },
  { id: 'risk', label: 'Risk & Early Warning', icon: <ShieldAlert size={20} />, tier: 'Operational' },
  { id: 'simulation', label: 'Decision Support', icon: <PlayCircle size={20} />, tier: 'Operational' },
  { id: 'ingestion', label: 'Data Ingestion', icon: <Database size={20} />, tier: 'Tactical' },
  { id: 'reporting', label: 'Briefs & Reports', icon: <FileText size={20} />, tier: 'Strategic' },
] as const;

export const INITIAL_RISK_INDICES: RiskIndices = {
  nsi: 64,
  cri: 31,
  ips: 42,
  rsi: 18
};

export const MOCK_NARRATIVES: NarrativeAlert[] = [
  {
    id: '1',
    topic: 'Economic Resilience Narrative',
    intensity: 72,
    reach: 'National',
    sourceType: 'Media',
    status: 'Rising',
    description: 'High engagement across traditional broadcast concerning inflation mitigation measures.'
  },
  {
    id: '2',
    topic: 'Synthetic Disinfo Spike: Regional Health',
    intensity: 88,
    reach: 'Regional (North)',
    sourceType: 'Digital',
    status: 'Rising',
    description: 'Coordinated bot network identified amplifying distrust in regional health infrastructure.'
  },
  {
    id: '3',
    topic: 'Identity Polarization',
    intensity: 45,
    reach: 'Inter-Agency',
    sourceType: 'OSINT',
    status: 'Stable',
    description: 'Sub-surface forum discussions regarding ethnic and religious fault lines.'
  }
];

export const INGESTION_PIPELINES: IngestionStatus[] = [
  { source: 'OSINT Discourse', rate: '24k/min', status: 'Online', type: 'Public' },
  { source: 'Broadcast Streams', rate: '120mbps', status: 'Online', type: 'Public' },
  { source: 'Cyber Telemetry', rate: '8k events/s', status: 'Warning', type: 'Restricted' },
  { source: 'Financial Signals', rate: 'Real-time', status: 'Online', type: 'Restricted' },
  { source: 'Mobility Patterns', rate: 'Batch/5m', status: 'Online', type: 'Classified' }
];

export const PSYCHOGRAPHIC_DIMENSIONS = [
  'Values', 'Motivations', 'Emotional State', 'Cognitive Style', 'Risk Tolerance', 'Intent State'
];
