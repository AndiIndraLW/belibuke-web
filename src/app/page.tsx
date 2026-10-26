"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { floralItems, categories, formatPrice } from "@/data/products";

export default function Home() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCatalogDropdownOpen, setIsCatalogDropdownOpen] = useState(false);

  const heroImages = [
    "/assets/collection_hero.png",
    "/assets/bouquet_roses.png",
    "/assets/bouquet_luxury.png",
    "/assets/wedding_car_classic.png",
    "/assets/wedding_car_vintage.png",
  ];

  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide(prev => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [currentHeroSlide, heroImages.length]);

  const handlePrevHeroSlide = () => {
    setCurrentHeroSlide(prev => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const handleNextHeroSlide = () => {
    setCurrentHeroSlide(prev => (prev + 1) % heroImages.length);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "bouquet",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", service: "bouquet", message: "" });
    }, 5000);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsCatalogDropdownOpen(false);
  };

  return (
    <>
      {/* Hamburger Sidebar Drawer Menu */}
      <div
        className={`drawer-overlay ${isMenuOpen ? "active" : ""}`}
        onClick={closeMenu}
      />
      <aside className={`drawer-panel ${isMenuOpen ? "active" : ""}`}>
        <div className="drawer-header">
          <div className="logo-container">belibuké</div>
          <button className="drawer-close-btn" onClick={closeMenu} aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="drawer-nav">
          <Link
            href="/"
            className="drawer-nav-item"
            onClick={closeMenu}
          >
            Home
          </Link>

          <div>
            <button
              className={`drawer-nav-item drawer-dropdown-trigger ${isCatalogDropdownOpen ? "expanded" : ""}`}
              onClick={() => setIsCatalogDropdownOpen(!isCatalogDropdownOpen)}
            >
              Categories
              <svg
                className="dropdown-arrow"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                style={{ transform: isCatalogDropdownOpen ? "rotate(180deg)" : "rotate(0)" }}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <div className={`drawer-submenu ${isCatalogDropdownOpen ? "open" : ""}`}>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="drawer-submenu-item"
                  onClick={closeMenu}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <a
            href="#who-are-we"
            className="drawer-nav-item"
            onClick={(e) => { e.preventDefault(); closeMenu(); document.getElementById("who-are-we")?.scrollIntoView({ behavior: "smooth" }); }}
          >
            Who Are We
          </a>

          <a
            href="#booking-contact"
            className="drawer-nav-item"
            onClick={(e) => { e.preventDefault(); closeMenu(); document.getElementById("booking-contact")?.scrollIntoView({ behavior: "smooth" }); }}
          >
            Atelier
          </a>
        </nav>
      </aside>

      {/* Top Header Bar */}
      <header className="header-bar">
        {/* Hamburger Menu Toggle Button */}
        <button
          className="header-menu-btn"
          aria-label="Toggle menu"
          onClick={() => setIsMenuOpen(true)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>

        <div className="logo-container">
          belibuké
        </div>

        {/* Empty placeholder for symmetrical header alignment */}
        <div style={{ width: "24px" }} />
      </header>

      {/* HERO DESIGN */}
      <section className="new-hero-grid">
        {/* Left Column */}
        <div className="hero-left-col">
          <div className="hero-decor-flower-orange">
            <svg width="40" height="40" viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="50" r="12" />
              <circle cx="50" cy="24" r="18" />
              <circle cx="50" cy="76" r="18" />
              <circle cx="24" cy="50" r="18" />
              <circle cx="76" cy="50" r="18" />
            </svg>
          </div>
          <div className="hero-decor-flower-pink">
            <svg width="35" height="35" viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="50" r="12" />
              <circle cx="50" cy="24" r="18" />
              <circle cx="50" cy="76" r="18" />
              <circle cx="24" cy="50" r="18" />
              <circle cx="76" cy="50" r="18" />
            </svg>
          </div>

          <div className="hero-stripes-panel">
            <span className="hero-new-badge">New</span>
            <h1 className="hero-collection-title">Collection</h1>
          </div>
        </div>

        {/* Right Column */}
        <div className="hero-right-col">
          <div className="hero-slider-container">
            {heroImages.map((imageSrc, idx) => (
              <div
                key={idx}
                className={`hero-slide ${idx === currentHeroSlide ? "active" : ""}`}
              >
                <Image
                  src={imageSrc}
                  alt={`Hero Slide ${idx + 1}`}
                  width={380}
                  height={380}
                  priority={idx === 0}
                  className="hero-slide-image"
                />
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              className="hero-slider-btn prev"
              onClick={handlePrevHeroSlide}
              aria-label="Previous Slide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              className="hero-slider-btn next"
              onClick={handleNextHeroSlide}
              aria-label="Next Slide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Pagination Dots */}
            <div className="hero-slider-dots">
              {heroImages.map((_, idx) => (
                <button
                  key={idx}
                  className={`hero-slider-dot ${idx === currentHeroSlide ? "active" : ""}`}
                  onClick={() => setCurrentHeroSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE RUNNING TEXT BAND */}
      <section className="marquee-band">
        <div className="marquee-content">
          <span className="marquee-text">belibuké</span>
          <span className="marquee-text">belibuké</span>
          <span className="marquee-text">belibuké</span>
          <span className="marquee-text">belibuké</span>
          <span className="marquee-text">belibuké</span>
          <span className="marquee-text">belibuké</span>
          <span className="marquee-text">belibuké</span>
          <span className="marquee-text">belibuké</span>
        </div>
        <div className="marquee-content" aria-hidden="true">
          <span className="marquee-text">belibuké</span>
          <span className="marquee-text">belibuké</span>
          <span className="marquee-text">belibuké</span>
          <span className="marquee-text">belibuké</span>
          <span className="marquee-text">belibuké</span>
          <span className="marquee-text">belibuké</span>
          <span className="marquee-text">belibuké</span>
          <span className="marquee-text">belibuké</span>
        </div>
      </section>

      {/* BESTSELLERS SECTION */}
      <section className="bestsellers-section">
        <div className="bestsellers-header">
          <div className="bestsellers-title-badge">
            Bestsellers
            <svg className="bestsellers-flower-decor" width="20" height="20" viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="50" r="12" />
              <circle cx="50" cy="24" r="18" />
              <circle cx="50" cy="76" r="18" />
              <circle cx="24" cy="50" r="18" />
              <circle cx="76" cy="50" r="18" />
            </svg>
          </div>

          <div className="bestsellers-cloud-decor">
            <svg width="45" height="45" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" />
            </svg>
          </div>
        </div>

        {/* Bestseller Items Track */}
        <div className="carousel-track">
          {floralItems.filter(item => item.tag === "BEST SELLER").slice(0, 3).map(item => (
            <article className="item-card" key={item.id}>
              <Link href={`/product/${item.id}`} className="card-image-link">
                <div className="card-image-wrapper">
                  <span className="tag-badge tag-bestseller">Best Seller</span>
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="card-image"
                    width={400}
                    height={400}
                  />
                </div>
              </Link>
              <div className="card-footer-bar">
                <div className="card-title-group">
                  <Link href={`/product/${item.id}`} style={{ textDecoration: "none" }}>
                    <h2 className="item-title">{item.name}</h2>
                  </Link>
                  <span className="item-card-price">{formatPrice(item.price)}</span>
                </div>
                <Link
                  href={`/product/${item.id}`}
                  className="item-booking-btn"
                  aria-label={`Buy ${item.name}`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CATEGORIES SECTION (REPLACED PRODUCTS CARD GRID UNDER BESTSELLERS) */}
      <section id="categories-section" className="categories-showcase-section">
        <div className="categories-section-header">
          <span className="categories-section-badge">Explore Our Collection</span>
          <h2 className="categories-section-title">Shop by Category</h2>
          <p className="categories-section-subtitle">
            Select a category below to discover our handcrafted floral arrangements.
          </p>
        </div>

        {/* 4 Category Cards Grid */}
        <div className="category-cards-grid">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="category-card-item"
            >
              <div className="category-card-image-wrap">
                {category.badge && (
                  <span className="category-card-badge">{category.badge}</span>
                )}
                <Image
                  src={category.image}
                  alt={category.name}
                  width={400}
                  height={400}
                  className="category-card-img"
                />
                <div className="category-card-overlay" />
              </div>

              <div className="category-card-body">
                <div className="category-card-title-row">
                  <h3 className="category-card-name">{category.name}</h3>
                  <span className="category-card-arrow-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
                <p className="category-card-desc">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Banners */}
      <section className="cta-banners-container">
        <button className="cta-banner cta-pink" onClick={() => document.getElementById("booking-contact")?.scrollIntoView({ behavior: "smooth" })}>
          Bouquets Handcrafted
          <svg className="cta-flower-right" width="20" height="20" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="12" />
            <circle cx="50" cy="24" r="18" />
            <circle cx="50" cy="76" r="18" />
            <circle cx="24" cy="50" r="18" />
            <circle cx="76" cy="50" r="18" />
          </svg>
        </button>

        <button className="cta-banner cta-yellow" onClick={() => document.getElementById("booking-contact")?.scrollIntoView({ behavior: "smooth" })}>
          With Love and Care
        </button>

        <button className="cta-banner cta-blue" onClick={() => document.getElementById("booking-contact")?.scrollIntoView({ behavior: "smooth" })}>
          <svg className="cta-flower-left" width="20" height="20" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="12" />
            <circle cx="50" cy="24" r="18" />
            <circle cx="50" cy="76" r="18" />
            <circle cx="24" cy="50" r="18" />
            <circle cx="76" cy="50" r="18" />
          </svg>
          Book Wedding Car Decor
        </button>
      </section>

      {/* WHO ARE WE SECTION */}
      <section id="who-are-we" className="who-are-we-section">
        <div className="who-are-we-container">
          <div className="who-are-we-header">
            <div className="who-are-we-badge">
              About belibuké
              <svg width="16" height="16" viewBox="0 0 100 100" fill="currentColor">
                <circle cx="50" cy="50" r="12" />
                <circle cx="50" cy="24" r="18" />
                <circle cx="50" cy="76" r="18" />
                <circle cx="24" cy="50" r="18" />
                <circle cx="76" cy="50" r="18" />
              </svg>
            </div>
            <h2 className="who-are-we-title">Who Are We</h2>
            <p className="who-are-we-subtitle">
              Crafting stories of love, elegance, and celebration through bespoke floral artistry in Jakarta.
            </p>
          </div>

          <div className="who-are-we-grid">
            <div className="who-are-we-card">
              <div className="who-are-we-icon">🌸</div>
              <h3>Master Florists</h3>
              <p>
                Our master artisans hand-select fresh seasonal blooms daily, curating individual arrangements with passion, precision, and extraordinary care.
              </p>
            </div>

            <div className="who-are-we-card">
              <div className="who-are-we-icon">🚘</div>
              <h3>Bespoke Wedding Artistry</h3>
              <p>
                Specializing in luxury wedding car decorations and bespoke venue styling that transform your special day into a breathtaking visual masterpiece.
              </p>
            </div>

            <div className="who-are-we-card">
              <div className="who-are-we-icon">🌿</div>
              <h3>Sustainably Sourced</h3>
              <p>
                We partner directly with ethical local growers to ensure top-tier freshness, vibrant color palettes, and long-lasting floral beauty.
              </p>
            </div>
          </div>

          <div className="who-are-we-stats">
            <div className="stat-item">
              <span className="stat-number">10,000+</span>
              <span className="stat-label">Handcrafted Bouquets</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Wedding Cars Decorated</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Fresh Bloom Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Booking split section */}
      <section id="booking-contact" className="contact-section">
        <div className="contact-layout-wrapper">
          {/* Left Column */}
          <div className="contact-info-side">
            <h2>Book a Floral Design</h2>
            <p>Ready to bring your floral vision to life? Fill in the details to request a custom premium bouquet order or schedule a wedding car floral consultation with our master decorators.</p>

            <div className="florist-details-list">
              <div className="detail-item">
                <div className="detail-icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="detail-text">
                  <h3>Our Atelier</h3>
                  <p>128 Rosewood Avenue, Bloom District, Jakarta</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="detail-text">
                  <h3>Direct Inquiry</h3>
                  <p>hello@belibuke.com | +62 812-3456-7890</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div>
            {formSubmitted ? (
              <div style={{
                color: "var(--color-coral)",
                fontWeight: "bold",
                padding: "4rem 1rem",
                textAlign: "center",
                backgroundColor: "var(--color-cream-bg)",
                borderRadius: "20px",
                border: "2px dashed var(--color-coral)"
              }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginBottom: "1rem" }}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <p style={{ margin: 0, fontSize: "1.1rem" }}>Thank you! Your floral request has been submitted.</p>
                <p style={{ margin: "0.5rem 0 0", fontSize: "0.9rem", color: "var(--color-text-dark)", fontWeight: "normal" }}>We will contact you within 24 hours.</p>
              </div>
            ) : (
              <form className="booking-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    className="form-input"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    className="form-input"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="service">Select Service</label>
                  <select
                    id="service"
                    className="form-input form-select"
                    value={formData.service}
                    onChange={e => setFormData(prev => ({ ...prev, service: e.target.value }))}
                  >
                    <option value="bouquet">Premium Flower Bouquet</option>
                    <option value="hand_bouquet">Hand Bouquet</option>
                    <option value="wedding">Wedding Car Decoration</option>
                    <option value="both">Both Bouquets & Wedding Car</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Your Request Details</label>
                  <textarea
                    id="message"
                    className="form-input"
                    rows={3}
                    placeholder="Describe your design requests (e.g. flowers, colors, theme)"
                    value={formData.message}
                    onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">Send Booking Request</button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Social Media Link Icons */}
      <div className="social-icons-row">
        <a href="https://instagram.com" className="social-icon-link" aria-label="Instagram">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
        <a href="https://twitter.com" className="social-icon-link" aria-label="Twitter">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
          </svg>
        </a>
        <a href="https://pinterest.com" className="social-icon-link" aria-label="Pinterest">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M12 2a10 10 0 0 0-10 10c0 4.13 2.5 7.69 6.07 9.22-.05-.75-.1-1.9.02-2.73.11-.75.73-4.5.73-4.5s-.19-.38-.19-.94c0-.88.51-1.54 1.15-1.54.54 0 .8.41.8.9 0 .54-.35 1.36-.53 2.11-.15.63.31 1.15.93 1.15 1.12 0 1.98-1.18 1.98-2.88 0-1.5-.78-2.55-2.61-2.55-1.78 0-2.83 1.34-2.83 2.72 0 .54.21 1.12.47 1.44.05.06.06.11.04.18-.04.18-.14.6-.16.68-.03.11-.09.13-.21.08-1.5-.7-2.44-2.89-2.44-4.66 0-3.79 2.75-7.27 7.94-7.27 4.17 0 7.41 2.97 7.41 6.94 0 4.14-2.61 7.48-6.23 7.48-1.22 0-2.36-.63-2.75-1.38 0 0-.6 2.29-.75 2.87-.27 1.05-1.02 2.37-1.52 3.19A10 10 0 1 0 12 2z" />
          </svg>
        </a>
      </div>

      {/* Footer */}
      <footer className="footer-scallop-wrap">
        <div className="footer-bottom-bar">
          <div className="footer-bottom-content">
            <div>&copy; 2026 belibuké</div>
            <div className="footer-policy-links">
              <a href="#" style={{ marginRight: "1rem" }}>Terms of Service</a>
              <a href="#">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
