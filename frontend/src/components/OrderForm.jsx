import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, User, FileText } from 'lucide-react';

const OrderForm = ({ order, products, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    productId: '',
    quantity: '',
    notes: '',
  });

  useEffect(() => {
    if (order) {
      setFormData({
        customerName: order.customerName || '',
        customerEmail: order.customerEmail || '',
        productId: order.productId || '',
        quantity: order.quantity || '',
        notes: order.notes || '',
      });
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {order ? 'Sipariş Düzenle' : 'Yeni Sipariş'}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
              Müşteri Adı
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                required
                className="input-field pl-10"
                placeholder="Müşteri adını giriniz"
              />
            </div>
          </div>

          <div>
            <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-2">
              Müşteri E-posta
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="customerEmail"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                required
                className="input-field pl-10"
                placeholder="musteri@email.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="productId" className="block text-sm font-medium text-gray-700 mb-2">
              Ürün
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ShoppingCart className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="productId"
                name="productId"
                value={formData.productId}
                onChange={handleChange}
                required
                className="input-field pl-10"
              >
                <option value="">Ürün seçiniz</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} - {product.price} ₺
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
              Miktar
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="1"
              className="input-field"
              placeholder="1"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Notlar
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="input-field pl-10 resize-none"
                placeholder="Sipariş notları..."
              />
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 btn-secondary"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Kaydediliyor...' : (order ? 'Güncelle' : 'Oluştur')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
