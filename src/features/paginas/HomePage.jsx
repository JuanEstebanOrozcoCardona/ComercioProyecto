import React from 'react';
import './HomePage.css';

function HomePage() {
  return (
    <div className="homepage-bg">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Moda y <span>Joyería</span>
          </h1>
          <p className="hero-desc">
            Descubre nuestra colección exclusiva<br />
            para esta temporada
          </p>
          <a href="/productos" className="hero-btn">
            Ver productos
          </a>
        </div>
      </section>

      {/* Categorías */}
      <section className="categories-section">
        <h2 className="categories-title">Nuestras categorías</h2>
        <div className="categories-grid">
          {/* Ropa */}
          <div className="category-card">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Moda"
            />
            <div className="category-card-body">
              <div className="category-card-title">Ropa</div>
              <a href="/ropa" className="category-card-btn">
                Explorar
              </a>
            </div>
          </div>
          {/* Joyería */}
          <div className="category-card">
            <img
              src="https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80"
              alt="Joyería"
            />
            <div className="category-card-body">
              <div className="category-card-title">Joyería</div>
              <a href="/joyeria" className="category-card-btn">
                Explorar
              </a>
            </div>
          </div>
          {/* Anillos */}
          <div className="category-card">
            <img
              src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Anillos"
            />
            <div className="category-card-body">
              <div className="category-card-title">Anillos</div>
              <a href="/anillos" className="category-card-btn">
                Explorar
              </a>
            </div>
          </div>
          {/* Joyas */}
          <div className="category-card">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80"
              alt="Joyas"
            />
            <div className="category-card-body">
              <div className="category-card-title">Joyas</div>
              <a href="/joyas" className="category-card-btn">
                Explorar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Oferta */}
      <section className="offer-section">
        <h2 className="offer-title">20% OFF en tu primera compra</h2>
        <p className="offer-desc">Usa el código: ESTUDIANTE20</p>
        <a href="/ofertas" className="offer-btn">
          Ver ofertas
        </a>
      </section>
    </div>
  );
}

export default HomePage;