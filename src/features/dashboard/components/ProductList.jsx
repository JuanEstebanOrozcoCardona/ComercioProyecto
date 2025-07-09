import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ProductList = ({ products, onEdit, onDelete }) => {
  if (products.length === 0) {
    return <p>No se encontraron productos.</p>;
  }

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>${product.price}</td>
            <td>{product.stock}</td>
            <td>
              <button className="btn-icon btn-edit" onClick={() => onEdit(product)}><FontAwesomeIcon icon={faEdit} /></button>
              <button className="btn-icon btn-delete" onClick={() => onDelete(product.id)}><FontAwesomeIcon icon={faTrash} /></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;