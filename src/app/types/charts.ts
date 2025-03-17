export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number; // For additional properties
}

export interface RadarChartData {
  subject: string;
  value: number;
  fullMark: number;
}

export interface ScatterChartData {
  name: string;
  x: number;
  y: number;
}

export interface DistributionData {
  name: string;
  value: number;
  category: string;
} 