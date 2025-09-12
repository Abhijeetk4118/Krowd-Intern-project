import { 
  SalesRecord, 
  KPIData, 
  TopProduct, 
  TopCustomer, 
  ChartDataPoint, 
  ProductShareData, 
  CustomerBarData, 
  MonthFilter,
  MonthlyData,
  ProductShare
} from '../types';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const getAvailableMonths = (salesData: SalesRecord[]): string[] => {
  const months = new Set<string>();
  salesData.forEach(record => {
    const date = new Date(record.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    months.add(monthKey);
  });
  return Array.from(months).sort();
};

export const filterDataByMonth = (salesData: SalesRecord[], monthFilter: MonthFilter = 'All'): SalesRecord[] => {
  if (monthFilter === 'All') {
    return salesData;
  }
  
  return salesData.filter(record => {
    const recordDate = new Date(record.date);
    const recordMonth = `${recordDate.getFullYear()}-${String(recordDate.getMonth() + 1).padStart(2, '0')}`;
    return recordMonth === monthFilter;
  });
};

export const calculateKPIs = (salesData: SalesRecord[], monthFilter: MonthFilter = 'All'): KPIData => {
  const filteredData = filterDataByMonth(salesData, monthFilter);
  
  const totalRevenue = filteredData.reduce((sum, record) => sum + record.revenue, 0);
  const totalTarget = filteredData.reduce((sum, record) => sum + record.target, 0);
  const targetAchievement = totalTarget > 0 ? (totalRevenue / totalTarget) * 100 : 0;

  // Calculate month-over-month growth
  let revenueGrowth = 0;
  if (monthFilter !== 'All') {
    const currentMonthData = filteredData;
    const currentMonthRevenue = currentMonthData.reduce((sum, record) => sum + record.revenue, 0);
    
    // Get previous month data
    const [year, month] = monthFilter.split('-');
    const prevMonth = new Date(parseInt(year), parseInt(month) - 2, 1);
    const prevMonthKey = `${prevMonth.getFullYear()}-${String(prevMonth.getMonth() + 1).padStart(2, '0')}`;
    
    const prevMonthData = filterDataByMonth(salesData, prevMonthKey);
    const prevMonthRevenue = prevMonthData.reduce((sum, record) => sum + record.revenue, 0);
    
    revenueGrowth = prevMonthRevenue > 0 
      ? ((currentMonthRevenue - prevMonthRevenue) / prevMonthRevenue) * 100 
      : 0;
  } else {
    // For "All" filter, calculate growth from first month to last month
    const months = getAvailableMonths(salesData);
    if (months.length >= 2) {
      const firstMonthData = filterDataByMonth(salesData, months[0]);
      const lastMonthData = filterDataByMonth(salesData, months[months.length - 1]);
      
      const firstMonthRevenue = firstMonthData.reduce((sum, record) => sum + record.revenue, 0);
      const lastMonthRevenue = lastMonthData.reduce((sum, record) => sum + record.revenue, 0);
      
      revenueGrowth = firstMonthRevenue > 0 
        ? ((lastMonthRevenue - firstMonthRevenue) / firstMonthRevenue) * 100 
        : 0;
    }
  }

  return {
    totalRevenue,
    targetAchievement,
    revenueGrowth
  };
};

export const getTopProducts = (salesData: SalesRecord[], monthFilter: MonthFilter = 'All'): TopProduct[] => {
  const filteredData = filterDataByMonth(salesData, monthFilter);
  const productMap = new Map<string, { revenue: number; units: number }>();
  
  filteredData.forEach(record => {
    const existing = productMap.get(record.product) || { revenue: 0, units: 0 };
    productMap.set(record.product, {
      revenue: existing.revenue + record.revenue,
      units: existing.units + record.units
    });
  });

  const totalRevenue = Array.from(productMap.values()).reduce((sum, p) => sum + p.revenue, 0);
  
  return Array.from(productMap.entries())
    .map(([product, data]) => ({
      product,
      totalRevenue: data.revenue,
      unitsSold: data.units,
      percentage: totalRevenue > 0 ? (data.revenue / totalRevenue) * 100 : 0
    }))
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, 5);
};

export const getTopCustomers = (salesData: SalesRecord[], monthFilter: MonthFilter = 'All'): TopCustomer[] => {
  const filteredData = filterDataByMonth(salesData, monthFilter);
  const customerMap = new Map<string, { revenue: number; orders: number }>();
  
  filteredData.forEach(record => {
    const existing = customerMap.get(record.client) || { revenue: 0, orders: 0 };
    customerMap.set(record.client, {
      revenue: existing.revenue + record.revenue,
      orders: existing.orders + 1
    });
  });

  const totalRevenue = Array.from(customerMap.values()).reduce((sum, c) => sum + c.revenue, 0);
  
  return Array.from(customerMap.entries())
    .map(([client, data]) => ({
      client,
      totalRevenue: data.revenue,
      orders: data.orders,
      percentage: totalRevenue > 0 ? (data.revenue / totalRevenue) * 100 : 0
    }))
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, 5);
};

export const getChartData = (salesData: SalesRecord[], monthFilter: MonthFilter): ChartDataPoint[] => {
  const filteredData = filterDataByMonth(salesData, monthFilter);
  
  if (monthFilter === 'All') {
    // Group by month
    const monthlyMap = new Map<string, { sales: number; target: number }>();
    
    filteredData.forEach(record => {
      const date = new Date(record.date);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      const existing = monthlyMap.get(monthKey) || { sales: 0, target: 0 };
      monthlyMap.set(monthKey, {
        sales: existing.sales + record.revenue,
        target: existing.target + record.target
      });
    });

    return Array.from(monthlyMap.entries())
      .map(([name, data]) => ({
        name,
        sales: data.sales,
        target: data.target
      }))
      .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());
  } else {
    // Group by day for specific month
    const dailyMap = new Map<string, { sales: number; target: number }>();
    
    filteredData.forEach(record => {
      const date = new Date(record.date);
      const dayKey = `${date.getDate()}`;
      const existing = dailyMap.get(dayKey) || { sales: 0, target: 0 };
      dailyMap.set(dayKey, {
        sales: existing.sales + record.revenue,
        target: existing.target + record.target
      });
    });

    return Array.from(dailyMap.entries())
      .map(([day, data]) => ({
        name: `Day ${day}`,
        sales: data.sales,
        target: data.target
      }))
      .sort((a, b) => parseInt(a.name.split(' ')[1]) - parseInt(b.name.split(' ')[1]));
  }
};

export const getProductShareData = (salesData: SalesRecord[], monthFilter: MonthFilter): ProductShareData[] => {
  const filteredData = filterDataByMonth(salesData, monthFilter);
  const productMap = new Map<string, number>();
  
  filteredData.forEach(record => {
    const existing = productMap.get(record.product) || 0;
    productMap.set(record.product, existing + record.revenue);
  });

  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];
  
  return Array.from(productMap.entries())
    .map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length]
    }))
    .sort((a, b) => b.value - a.value);
};

export const getCustomerBarData = (salesData: SalesRecord[], monthFilter: MonthFilter): CustomerBarData[] => {
  const topCustomers = getTopCustomers(salesData, monthFilter);
  
  return topCustomers.map(customer => ({
    name: customer.client,
    revenue: customer.totalRevenue
  }));
};

// Helpers to match ChartsSection usage (monthly aggregates and product share list)
export const getMonthlyData = (salesData: SalesRecord[], monthFilter: MonthFilter = 'All'): MonthlyData[] => {
  // Only monthly grouping is needed for ChartsSection
  const filtered = filterDataByMonth(salesData, 'All');
  const monthlyMap = new Map<string, { sales: number; target: number }>();

  filtered.forEach(record => {
    const date = new Date(record.date);
    const key = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const existing = monthlyMap.get(key) || { sales: 0, target: 0 };
    monthlyMap.set(key, {
      sales: existing.sales + record.revenue,
      target: existing.target + record.target
    });
  });

  return Array.from(monthlyMap.entries())
    .map(([month, data]) => ({ month, sales: data.sales, target: data.target }))
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
};

export const getProductShare = (salesData: SalesRecord[], monthFilter: MonthFilter = 'All'): ProductShare[] => {
  const filtered = filterDataByMonth(salesData, monthFilter);
  const productMap = new Map<string, number>();

  filtered.forEach(record => {
    productMap.set(record.product, (productMap.get(record.product) || 0) + record.revenue);
  });

  const total = Array.from(productMap.values()).reduce((s, v) => s + v, 0);
  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];

  return Array.from(productMap.entries())
    .map(([product, revenue], index) => ({
      product,
      revenue,
      percentage: total > 0 ? (revenue / total) * 100 : 0,
      color: colors[index % colors.length]
    }))
    .sort((a, b) => b.revenue - a.revenue);
};