import React from 'react';

interface MonthFilterProps {
  selectedMonth: string;
  availableMonths: string[];
  onMonthChange: (month: string) => void;
}

const MonthFilter: React.FC<MonthFilterProps> = ({ 
  selectedMonth, 
  availableMonths, 
  onMonthChange 
}) => {
  const formatMonthDisplay = (monthKey: string): string => {
    if (monthKey === 'All') return 'All';
    const [year, month] = monthKey.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="mb-6">
      <label htmlFor="month-filter" className="block text-sm font-medium text-gray-700 mb-2">
        Filter by Month
      </label>
      <select
        id="month-filter"
        value={selectedMonth}
        onChange={(e) => onMonthChange(e.target.value)}
        className="block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
      >
        <option value="All">All Months</option>
        {availableMonths.map(month => (
          <option key={month} value={month}>
            {formatMonthDisplay(month)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthFilter;