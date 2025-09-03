import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI, ordersAPI } from '../services/api';
import { Package, ShoppingCart, DollarSign, TrendingUp, Plus, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [productsResponse, ordersResponse] = await Promise.all([
        productsAPI.getAll(),
        ordersAPI.getAll()
      ]);

      const products = productsResponse.data;
      const orders = ordersResponse.data;

      // Toplam geliri ürünlerin fiyatları üzerinden hesapla
      const totalRevenue = orders.reduce((sum, order) => {
        return sum + order.products.reduce((pSum, product) => pSum + (product.price || 0), 0);
      }, 0);

      const pendingOrders = orders.filter(order => order.status === 'pending').length;

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue: totalRevenue.toFixed(2),
        pendingOrders,
      });

      setRecentProducts(products.slice(-5).reverse());
      setRecentOrders(orders.slice(-5).reverse());

    } catch (error) {
      toast.error('Dashboard verileri yüklenirken hata oluştu');
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Beklemede';
      case 'preparing': return 'Hazırlanıyor';
      case 'completed': return 'Tamamlandı';
      case 'cancelled': return 'İptal Edildi';
      default: return status;
    }
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
        </div>
    );
  }

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">E-ticaret yönetim panelinize hoş geldiniz</p>
        </div>

        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Toplam Ürün</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Toplam Sipariş</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Toplam Gelir</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalRevenue} ₺</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Bekleyen Sipariş</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Son Eklenenler */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ürünler */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Son Eklenen Ürünler</h3>
            {recentProducts.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Henüz ürün yok</p>
            ) : (
                <div className="space-y-3">
                  {recentProducts.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.price} ₺</p>
                        </div>
                        <span className="text-sm text-gray-500">Stok: {product.stock}</span>
                      </div>
                  ))}
                </div>
            )}
          </div>

          {/* Siparişler */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Son Siparişler</h3>
            {recentOrders.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Henüz sipariş yok</p>
            ) : (
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Sipariş #{order.id}</p>
                          <p className="text-sm text-gray-600">{order.user?.name || 'Bilinmiyor'}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                      </div>
                  ))}
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
