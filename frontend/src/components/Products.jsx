import React, { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';
import ProductForm from './ProductForm';
import { Plus, Edit, Trash2, Package, DollarSign, Box } from 'lucide-react';
import toast from 'react-hot-toast';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    console.log("Products component mount oldu ✅");
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getAll();
      console.log("API'den gelen ürünler:", response.data);
      setProducts(response?.data || []);
    } catch (error) {
      toast.error('Ürünler yüklenirken hata oluştu');
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (productData) => {
    try {
      setFormLoading(true);
      await productsAPI.create(productData);
      toast.success('Ürün başarıyla eklendi');
      setShowForm(false);
      fetchProducts();
    } catch (error) {
      toast.error('Ürün eklenirken hata oluştu');
      console.error('Error creating product:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateProduct = async (productData) => {
    try {
      setFormLoading(true);
      await productsAPI.update(editingProduct.id, productData);
      toast.success('Ürün başarıyla güncellendi');
      setShowForm(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      toast.error('Ürün güncellenirken hata oluştu');
      console.error('Error updating product:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      try {
        await productsAPI.delete(productId);
        toast.success('Ürün başarıyla silindi');
        fetchProducts();
      } catch (error) {
        toast.error('Ürün silinirken hata oluştu');
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleSubmit = (productData) => {
    if (editingProduct) {
      handleUpdateProduct(productData);
    } else {
      handleCreateProduct(productData);
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
          <h1 className="text-3xl font-bold text-gray-900">Ürün Yönetimi</h1>
          <button
              onClick={() => setShowForm(true)}
              className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Yeni Ürün</span>
          </button>
        </div>

        {!Array.isArray(products) || products.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Henüz ürün yok</h3>
              <p className="mt-1 text-sm text-gray-500">İlk ürününüzü ekleyerek başlayın.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                  <div key={product.id} className="card hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {product.name}
                        </h3>
                        {/* description yoksa hata vermesin */}
                        {product.description && (
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {product.description}
                            </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-green-600">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-medium">{product.price} ₺</span>
                        </div>
                        <div className="flex items-center space-x-1 text-blue-600">
                          <Box className="h-4 w-4" />
                          <span className="font-medium">{product.stock}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                          onClick={() => handleEdit(product)}
                          className="flex-1 btn-secondary flex items-center justify-center space-x-2"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Düzenle</span>
                      </button>
                      <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="flex-1 btn-danger flex items-center justify-center space-x-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Sil</span>
                      </button>
                    </div>
                  </div>
              ))}
            </div>
        )}

        {showForm && (
            <ProductForm
                product={editingProduct}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                loading={formLoading}
            />
        )}
      </div>
  );
};

export default Products;
