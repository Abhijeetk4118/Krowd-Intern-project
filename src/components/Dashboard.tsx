import React, { useMemo, useState } from 'react';
import MonthFilter from './MonthFilter';
import KPISection from './KPISection';
import SalesVsTargetChart from './charts/SalesVsTargetChart';
import ProductShareChart from './charts/ProductShareChart';
import TopCustomersChart from './charts/TopCustomersChart';
import SalesDataTable from './SalesDataTable';
import TopProductsTable from './TopProductsTable';
import TopCustomersTable from './TopCustomersTable';
import { SalesRecord, MonthFilter as MonthFilterType } from '../types';
import {
  calculateKPIs,
  getTopProducts,
  getTopCustomers,
  getChartData,
  getProductShareData,
  getCustomerBarData,
  getAvailableMonths,
  filterDataByMonth
} from '../utils/calculations';

interface DashboardProps {
  salesData: SalesRecord[];
}

const Dashboard: React.FC<DashboardProps> = ({ salesData }) => {
  const [selectedMonth, setSelectedMonth] = useState<MonthFilterType>('All');

  const availableMonths = useMemo(() => getAvailableMonths(salesData), [salesData]);

  const filteredData = useMemo(() =>
    filterDataByMonth(salesData, selectedMonth),
    [salesData, selectedMonth]
  );

  const kpiData = useMemo(() =>
    calculateKPIs(salesData, selectedMonth),
    [salesData, selectedMonth]
  );

  const topProducts = useMemo(() =>
    getTopProducts(salesData, selectedMonth),
    [salesData, selectedMonth]
  );

  const topCustomers = useMemo(() =>
    getTopCustomers(salesData, selectedMonth),
    [salesData, selectedMonth]
  );

  const chartData = useMemo(() =>
    getChartData(salesData, selectedMonth),
    [salesData, selectedMonth]
  );

  const productShareData = useMemo(() =>
    getProductShareData(salesData, selectedMonth),
    [salesData, selectedMonth]
  );

  const customerBarData = useMemo(() =>
    getCustomerBarData(salesData, selectedMonth),
    [salesData, selectedMonth]
  );

  return (
    <>
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Sales & Revenue Dashboard</h1>
          <p className="text-gray-600">Track sales performance, compare monthly sales with targets, and identify top-performing products and customers.</p>
        </div>

        {/* Month Filter */}
        <MonthFilter
          selectedMonth={selectedMonth}
          availableMonths={availableMonths}
          onMonthChange={setSelectedMonth}
        />

        {/* KPIs Section */}
        <KPISection kpiData={kpiData} />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SalesVsTargetChart data={chartData} monthFilter={selectedMonth} />
          <ProductShareChart data={productShareData} />
        </div>

        {/* Top Customers Chart */}
        <div className="mb-8">
          <TopCustomersChart data={customerBarData} />
        </div>

        {/* Tables Section */}
        <div className="space-y-6">
          <SalesDataTable data={filteredData} monthFilter={selectedMonth} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopProductsTable data={topProducts} monthFilter={selectedMonth} />
            <TopCustomersTable data={topCustomers} monthFilter={selectedMonth} />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;