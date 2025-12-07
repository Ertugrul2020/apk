export interface AppConfig {
  appName: string;
  packageName: string;
  description: string;
  primaryColor: string;
  features: string[];
  category: string;
}

export interface BuildLog {
  id: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
  timestamp: number;
}

export interface GeneratedAsset {
  fileName: string;
  code: string;
  language: string;
}

export enum AppStatus {
  IDLE = 'IDLE',
  GENERATING_CODE = 'GENERATING_CODE',
  BUILDING = 'BUILDING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}