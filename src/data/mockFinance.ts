import { FinanceRecord } from '../types';

export const FINANCE_RECORDS: FinanceRecord[] = [
  {
    id: 'f1',
    date: '2024-03-01',
    type: 'revenue',
    category: 'Booking',
    amount: 1500000,
    description: 'Booking VB-0990',
  },
  {
    id: 'f2',
    date: '2024-03-02',
    type: 'expense',
    category: 'Maintenance',
    amount: 500000,
    description: 'Oil change for Honda Wave Alpha (v1)',
  },
  {
    id: 'f3',
    date: '2024-03-05',
    type: 'revenue',
    category: 'Booking',
    amount: 2500000,
    description: 'Booking VB-0995',
  },
  {
    id: 'f4',
    date: '2024-03-10',
    type: 'expense',
    category: 'Marketing',
    amount: 2000000,
    description: 'Facebook Ads campaign',
  },
  {
    id: 'f5',
    date: '2024-03-15',
    type: 'revenue',
    category: 'Booking',
    amount: 3200000,
    description: 'Booking VB-1001',
  },
];

export const REVENUE_DATA = [
  { name: 'Tháng 1', revenue: 45000000, expenses: 20000000 },
  { name: 'Tháng 2', revenue: 52000000, expenses: 22000000 },
  { name: 'Tháng 3', revenue: 61000000, expenses: 25000000 },
  { name: 'Tháng 4', revenue: 58000000, expenses: 24000000 },
  { name: 'Tháng 5', revenue: 72000000, expenses: 28000000 },
  { name: 'Tháng 6', revenue: 85000000, expenses: 32000000 },
];
