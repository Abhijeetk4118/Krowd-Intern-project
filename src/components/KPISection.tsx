import React from 'react';
import KPICard from './KPICard';
import { KPIData } from '../types';
import { formatCurrency, formatPercentage } from '../utils/calculations';

interface KPISectionProps {
  kpiData: KPIData;
}

const KPISection: React.FC<KPISectionProps> = ({ kpiData }) => {
  const getTrend = (value: number): 'up' | 'down' | 'neutral' => {
    if (value > 0) return 'up';
    if (value < 0) return 'down';
    return 'neutral';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <KPICard
        title="Total Revenue"
        value={formatCurrency(kpiData.totalRevenue)}
        subtitle="All sales revenue"
        icon="💰"
      />
      <KPICard
        title="Target Achievement"
        value={formatPercentage(kpiData.targetAchievement)}
        subtitle="Performance vs target"
        trend={kpiData.targetAchievement >= 100 ? 'up' : 'down'}
        trendValue={formatPercentage(kpiData.targetAchievement - 100)}
        icon="🎯"
      />
      <KPICard
        title="Revenue Growth"
        value={formatPercentage(kpiData.revenueGrowth)}
        subtitle="Month-over-month"
        trend={getTrend(kpiData.revenueGrowth)}
        trendValue={formatPercentage(Math.abs(kpiData.revenueGrowth))}
        icon="📈"
      />
    </div>
  );
};

export default KPISection;