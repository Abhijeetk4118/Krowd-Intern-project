import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { MonthlyData, ProductShare, TopCustomer } from '../types';
import { formatCurrency } from '../utils/calculations';

interface ChartsSectionProps {
  monthlyData: MonthlyData[];
  productShare: ProductShare[];
  topCustomers: TopCustomer[];
}

const ChartsSection: React.FC<ChartsSectionProps> = ({ 
  monthlyData, 
  productShare, 
  topCustomers 
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Monthly Sales vs Target Line Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Monthly Sales vs Target
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), '']}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#3b82f6" 
              strokeWidth={3}
              name="Sales"
            />
            <Line 
              type="monotone" 
              dataKey="target" 
              stroke="#ef4444" 
              strokeWidth={3}
              strokeDasharray="5 5"
              name="Target"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Product Share Pie Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Product Revenue Share
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={productShare}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ product, percentage }) => `${product}: ${percentage.toFixed(1)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="revenue"
            >
              {productShare.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => [formatCurrency(value), 'Revenue']} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Top Customers Bar Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 lg:col-span-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Top 5 Customers by Revenue
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topCustomers} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
            <YAxis dataKey="client" type="category" width={120} />
            <Tooltip formatter={(value: number) => [formatCurrency(value), 'Revenue']} />
            <Bar dataKey="totalRevenue" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartsSection;