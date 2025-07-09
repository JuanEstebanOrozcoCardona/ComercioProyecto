import React, { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import Pagination from './Pagination';
import Filter from './Filter';
import './DashboardPage.css';

const initialProducts = Array.from({ length: 77 }, (_, i) => ({
  id: i + 1,
  name: `Producto ${i + 1}`,
  description: `Descripción detallada del producto número ${i + 1}.`,
  price: (10 + Math.random() * 100).toFixed(2),
  stock: Math.floor(Math.random() * 101),
}));

const api = {
  getProducts: async ({ page, limit, filter }) => {
    console.log('Fetching products with:', { page, limit, filter });
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let data = [...initialProducts];

    if (filter) {
      data = data.filter(p =>
        p.name.toLowerCase().includes(filter.toLowerCase()) ||
        p.description.toLowerCase().includes(filter.toLowerCase())
      );
    }

    const startIndex = (page - 1) * limit;
    const paginatedProducts = data.slice(startIndex, startIndex + limit);
    
    return {
      products: paginatedProducts,
      total: data.length,
    };
  },
  createProduct: async (productData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newProduct = { ...productData, id: Math.max(...initialProducts.map(p => p.id), 0) + 1 };
    initialProducts.unshift(newProduct);
    return newProduct;
  },
  updateProduct: async (productId, productData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = initialProducts.findIndex(p => p.id === productId);
    if (index !== -1) {
      initialProducts[index] = { ...initialProducts[index], ...productData };
      return initialProducts[index];
    }
    throw new Error('Producto no encontrado');
  },
  deleteProduct: async (productId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = initialProducts.findIndex(p => p.id === productId);
    if (index !== -1) {
      initialProducts.splice(index, 1);
      return { success: true };
    }
    throw new Error('Producto no encontrado');
  },
};

const DashboardPage = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);

  const [filterText, setFilterText] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getProducts({ 
        page: currentPage, 
        limit: productsPerPage, 
        filter: filterText 
      });
      setProducts(response.products);
      setTotalProducts(response.total);
    } catch (err) {
      setError('Error al cargar los productos.');
      Swal.fire('Error', 'No se pudieron cargar los productos.', 'error');
    } finally {
      setLoading(false);
    }
  }, [currentPage, productsPerPage, filterText]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleFilterChange = (text) => {
    setFilterText(text);
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleOpenModal = (product = null) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProductToEdit(null);
  };

  const handleSaveProduct = async (productData) => {
    try {
      if (productData.id) {
        await api.updateProduct(productData.id, productData);
        Swal.fire('¡Actualizado!', 'El producto ha sido actualizado.', 'success');
      } else {
        await api.createProduct(productData);
        Swal.fire('¡Creado!', 'El nuevo producto ha sido creado.', 'success');
      }
      handleCloseModal();
      fetchProducts();
    } catch (err) {
      Swal.fire('Error', `Ocurrió un error al guardar el producto: ${err.message}`, 'error');
    }
  };

  const handleDeleteProduct = (productId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡eliminar!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.deleteProduct(productId);
          Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.', 'success');
          fetchProducts();
        } catch (err) {
          Swal.fire('Error', `Ocurrió un error al eliminar el producto: ${err.message}`, 'error');
        }
      }
    });
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard Administrativo</h1>
      <div className="dashboard-header">
        <Filter onFilterChange={handleFilterChange} />
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          + Añadir Producto
        </button>
      </div>

      {loading && <p>Cargando productos...</p>}
      {error && <p className="error-message">{error}</p>}
      
      {!loading && !error && (
        <>
          <ProductList 
            products={products} 
            onEdit={handleOpenModal} 
            onDelete={handleDeleteProduct} 
          />
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={totalProducts}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}

      <ProductForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
        product={productToEdit}
      />
    </div>
  );
};

export default DashboardPage;
