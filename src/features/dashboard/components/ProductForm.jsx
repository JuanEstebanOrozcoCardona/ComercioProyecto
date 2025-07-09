import React, { useState, useEffect } from 'react';

const ProductForm = ({ isOpen, onClose, onSave, product }) => {
  const initialFormState = {
    id: null,
    name: '',
    description: '',
    price: '',
    stock: '',
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData(initialFormState);
    }
  }, [product, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stock) {
        alert('Por favor, complete todos los campos requeridos.');
        return;
    }
    onSave(formData);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{product ? 'Editar Producto' : 'Crear Nuevo Producto'}</h2>
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="name">Nombre del Producto</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="price">Precio</label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required step="0.01" />
          </div>
          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} required />
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;