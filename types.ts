
export type AccessTier = 'Strategic' | 'Operational' | 'Tactical';

export interface RiskIndices {
  nsi: number; // National Sentiment Index
  cri: number; // Cognitive Risk Index
  ips: number; // Influence Penetration Score
  rsi: number; // Radicalization Susceptibility Index
}

export interface PsychographicState {
  values: number;
  motivations: number;
  emotionalState: number;
  cognitiveStyle: number;
  riskTolerance: number;
  intentState: number;
}

export interface NarrativeAlert {
  id: string;
  topic: string;
  intensity: number;
  reach: string;
  sourceType: 'OSINT' | 'Media' | 'Digital';
  status: 'Rising' | 'Stable' | 'Fading';
  description: string;
}

export interface IngestionStatus {
  source: string;
  rate: string;
  status: 'Online' | 'Offline' | 'Warning';
  type: 'Public' | 'Restricted' | 'Classified';
}
