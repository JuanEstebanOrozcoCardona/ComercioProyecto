import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-logo">VellumProyect</span>
          <span className="footer-slogan">Moda y Joyería Exclusiva</span>
        </div>
        <div className="footer-links">
          <a href="/productos" className="footer-link">Productos</a>
          <a href="/ofertas" className="footer-link">Ofertas</a>
          <a href="/contacto" className="footer-link">Contacto</a>
        </div>
        <div className="footer-social">
          <a href="https://instagram.com" className="footer-social-link" target="_blank" rel="noopener noreferrer" title="Instagram">📸</a>
          <a href="https://facebook.com" className="footer-social-link" target="_blank" rel="noopener noreferrer" title="Facebook">📘</a>
          <a href="https://wa.me/" className="footer-social-link" target="_blank" rel="noopener noreferrer" title="WhatsApp">💬</a>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} VellumProyect · Todos los derechos reservados
      </div>
    </footer>
  );
}

export default Footer;