import { useQuery } from '@tanstack/react-query';
import {
  getTopSellingProducts,
  getOrdersByDate,
  getProductCount,
  getCustomerCount,
  getAddressesByDate,
  getOrdersCountAndRevenue,
  getOrdersCount,
} from './dashboard.js';

export const useGetTopSellingProducts = (startDate, endDate) => {
  return useQuery({
    queryKey: ['topSellingProducts', { startDate, endDate }],
    queryFn: () => getTopSellingProducts(startDate, endDate),
    staleTime: 5000,
  });
};

export const useGetOrdersByDate = (startDate, endDate) => {
  return useQuery({
    queryKey: ['ordersByDate', { startDate, endDate }],
    queryFn: () => getOrdersByDate(startDate, endDate),
    staleTime: 5000,
  });
};

export const useGetProductCount = () => {
  return useQuery({
    queryKey: ['productCount'],
    queryFn: () => getProductCount(),
    staleTime: 5000,
  });
};

export const useGetCustomerCount = () => {
  return useQuery({
    queryKey: ['customerCount'],
    queryFn: () => getCustomerCount(),
    staleTime: 5000,
  });
};

export const useGetAddressesByDate = (startDate, endDate) => {
  return useQuery({
    queryKey: ['addressesByDate', { startDate, endDate }],
    queryFn: () => getAddressesByDate(startDate, endDate),
    staleTime: 5000,
  });
};

export const useGetOrdersCountAndRevenue = (startDate, endDate) => {
  return useQuery({
    queryKey: ['ordersCountAndRevenue', { startDate, endDate }],
    queryFn: () => getOrdersCountAndRevenue(startDate, endDate),
    staleTime: 5000,
  });
};

export const useGetOrdersCount = (startDate, endDate) => {
  return useQuery({
    queryKey: ['ordersCount', { startDate, endDate }],
    queryFn: () => getOrdersCount(startDate, endDate),
    staleTime: 5000,
  });
};
