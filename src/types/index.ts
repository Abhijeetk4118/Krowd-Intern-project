export interface SalesRecord {
  date: string;
  salesRep: string;
  client: string;
  product: string;
  units: number;
  revenue: number;
  target: number;
}

export interface KPIData {
  totalRevenue: number;
  targetAchievement: number;
  revenueGrowth: number;
}

export interface TopProduct {
  product: string;
  totalRevenue: number;
  unitsSold: number;
  percentage: number;
}

export interface TopCustomer {
  client: string;
  totalRevenue: number;
  orders: number;
  percentage: number;
}

export interface ChartDataPoint {
  name: string;
  sales: number;
  target: number;
}

export interface ProductShareData {
  name: string;
  value: number;
  color: string;
}

export interface CustomerBarData {
  name: string;
  revenue: number;
}

export type MonthFilter = 'All' | string;

// Added to support ChartsSection and monthly aggregates
export interface MonthlyData {
  month: string;
  sales: number;
  target: number;
}

// Added to support ChartsSection product share pie chart
export interface ProductShare {
  product: string;
  revenue: number;
  percentage: number;
  color: string;
}