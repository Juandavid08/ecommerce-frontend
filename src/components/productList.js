import React from 'react';

export default function ProductList({ products }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: 20 }}>
      {products.map(product => (
        <div key={product.productId} style={{
          border: '1px solid #ccc',
          padding: 10,
          width: 220,
          borderRadius: 8
        }}>
          <h4>{product.productName}</h4>
          <p><strong>Marca:</strong> {product.brand}</p>
          {product.items[0]?.images[0] && (
            <img
              src={product.items[0].images[0].imageUrl}
              alt={product.items[0].images[0].imageText}
              style={{ width: '100%', height: 'auto' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
