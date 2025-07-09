import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${product.price}</span>
          <button className="btn btn-primary" onClick={() => onAddToCart(product)}>
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;