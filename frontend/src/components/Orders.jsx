import React, { useState, useEffect } from 'react';
import { ordersAPI, productsAPI } from '../services/api';
import OrderForm from './OrderForm';
import { Plus, Edit, Trash2, ShoppingCart, User, Calendar, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      console.log("✅ Orders component mount oldu");
      await fetchData();
    };
    loadData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [ordersResponse, productsResponse] = await Promise.all([
        ordersAPI.getAll(),
        productsAPI.getAll(),
      ]);

      console.log("🔎 Orders API raw:", ordersResponse);
      console.log("📦 Products API raw:", productsResponse);

      // interceptor varsa direkt response kullan
      setOrders(Array.isArray(ordersResponse) ? ordersResponse : ordersResponse.data || []);
      setProducts(Array.isArray(productsResponse) ? productsResponse : productsResponse.data || []);

    } catch (error) {
      console.error("❌ Error fetching data:", error);
      toast.error('Veriler yüklenirken hata oluştu');
      setOrders([]);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrder = async (orderData) => {
    try {
      setFormLoading(true);
      await ordersAPI.create(orderData);
      toast.success('Sipariş başarıyla oluşturuldu');
      setShowForm(false);
      await fetchData();
    } catch (error) {
      console.error("❌ Error creating order:", error);
      toast.error('Sipariş oluşturulurken hata oluştu');
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateOrder = async (orderData) => {
    try {
      setFormLoading(true);
      await ordersAPI.update(editingOrder.id, orderData);
      toast.success('Sipariş başarıyla güncellendi');
      setShowForm(false);
      setEditingOrder(null);
      await fetchData();
    } catch (error) {
      console.error("❌ Error updating order:", error);
      toast.error('Sipariş güncellenirken hata oluştu');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Bu siparişi silmek istediğinizden emin misiniz?')) {
      try {
        await ordersAPI.delete(orderId);
        toast.success('Sipariş başarıyla silindi');
        await fetchData();
      } catch (error) {
        console.error("❌ Error deleting order:", error);
        toast.error('Sipariş silinirken hata oluştu');
      }
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await ordersAPI.update(orderId, { status: newStatus });
      toast.success('Sipariş durumu güncellendi');
      await fetchData();
    } catch (error) {
      console.error("❌ Error updating status:", error);
      toast.error('Durum güncellenirken hata oluştu');
    }
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingOrder(null);
  };

  const handleSubmit = (orderData) => {
    if (editingOrder) {
      handleUpdateOrder(orderData);
    } else {
      handleCreateOrder(orderData);
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sipariş Yönetimi</h1>
          <button
              onClick={() => setShowForm(true)}
              className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Yeni Sipariş</span>
          </button>
        </div>

        {orders.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Henüz sipariş yok</h3>
              <p className="mt-1 text-sm text-gray-500">İlk siparişinizi oluşturarak başlayın.</p>
            </div>
        ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                  <div key={order.id} className="card hover:shadow-lg transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">Sipariş #{order.id}</h3>
                            <p className="text-sm text-gray-600">{order.user?.name || 'Bilinmiyor'}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center space-x-2 text-gray-600">
                            <User className="h-4 w-4" />
                            <span>{order.user?.name || 'Bilinmeyen Kullanıcı'}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(order.created_at).toLocaleDateString('tr-TR')}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <DollarSign className="h-4 w-4" />
                            <span>{order.products?.length || 0} ürün</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2">
                        <select
                            value={order.status}
                            onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        >
                          <option value="pending">Beklemede</option>
                          <option value="preparing">Hazırlanıyor</option>
                          <option value="completed">Tamamlandı</option>
                          <option value="cancelled">İptal Edildi</option>
                        </select>
                        <button
                            onClick={() => handleEdit(order)}
                            className="btn-secondary flex items-center justify-center space-x-2"
                        >
                          <Edit className="h-4 w-4" />
                          <span>Düzenle</span>
                        </button>
                        <button
                            onClick={() => handleDeleteOrder(order.id)}
                            className="btn-danger flex items-center justify-center space-x-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Sil</span>
                        </button>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
        )}

        {showForm && (
            <OrderForm
                order={editingOrder}
                products={products}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                loading={formLoading}
            />
        )}
      </div>
  );
};

export default Orders;
