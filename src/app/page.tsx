"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface FloralItem {
  id: string;
  name: string;
  category: "BOUQUETS" | "WEDDING DECOR" | "HAND BOUQUETS";
  image: string;
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<"ALL" | "BOUQUETS" | "WEDDING DECOR" | "HAND BOUQUETS">("ALL");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});
  const [animatingItems, setAnimatingItems] = useState<Record<string, boolean>>({});
  const [cartCount, setCartCount] = useState(0);
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

  const floralItems: FloralItem[] = [
    {
      id: "bouquet-roses-1",
      name: "Rose Blush",
      category: "BOUQUETS",
      image: "/assets/bouquet_roses.png",
    },
    {
      id: "bouquet-luxury-1",
      name: "Luxe Blooms",
      category: "BOUQUETS",
      image: "/assets/bouquet_luxury.png",
    },
    {
      id: "wedding-classic-1",
      name: "Classic Rolls",
      category: "WEDDING DECOR",
      image: "/assets/wedding_car_classic.png",
    },
    {
      id: "wedding-vintage-1",
      name: "Vintage Dreams",
      category: "WEDDING DECOR",
      image: "/assets/wedding_car_vintage.png",
    },
    {
      id: "bouquet-roses-2",
      name: "Pastel Whispers",
      category: "HAND BOUQUETS",
      image: "/assets/bouquet_roses.png",
    },
    {
      id: "bouquet-luxury-2",
      name: "White Elegance",
      category: "HAND BOUQUETS",
      image: "/assets/bouquet_luxury.png",
    },
    {
      id: "wedding-vintage-2",
      name: "Royal Cabrio",
      category: "WEDDING DECOR",
      image: "/assets/wedding_car_vintage.png",
    },
    {
      id: "wedding-classic-2",
      name: "Graceful Grace",
      category: "WEDDING DECOR",
      image: "/assets/wedding_car_classic.png",
    },
    {
      id: "bouquet-roses-3",
      name: "Sunset Glow",
      category: "BOUQUETS",
      image: "/assets/bouquet_roses.png",
    },
    {
      id: "bouquet-luxury-3",
      name: "Garden Dream",
      category: "BOUQUETS",
      image: "/assets/bouquet_luxury.png",
    },
    {
      id: "wedding-classic-3",
      name: "Ivory Carriage",
      category: "WEDDING DECOR",
      image: "/assets/wedding_car_classic.png",
    },
    {
      id: "wedding-vintage-3",
      name: "Blossom Ride",
      category: "WEDDING DECOR",
      image: "/assets/wedding_car_vintage.png",
    },
    {
      id: "bouquet-roses-4",
      name: "Crimson Romance",
      category: "HAND BOUQUETS",
      image: "/assets/bouquet_roses.png",
    },
    {
      id: "bouquet-luxury-4",
      name: "Serene Blue",
      category: "HAND BOUQUETS",
      image: "/assets/bouquet_luxury.png",
    },
    {
      id: "wedding-classic-4",
      name: "Majesty Rolls",
      category: "WEDDING DECOR",
      image: "/assets/wedding_car_classic.png",
    },
    {
      id: "wedding-vintage-4",
      name: "Retro Romance",
      category: "WEDDING DECOR",
      image: "/assets/wedding_car_vintage.png",
    },
  ];

  const filteredItems = activeCategory === "ALL"
    ? floralItems
    : floralItems.filter(item => item.category === activeCategory);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAddToCart = (id: string) => {
    setSelectedItems(prev => {
      const isSelected = !prev[id];
      if (isSelected) {
        setCartCount(c => c + 1);
      } else {
        setCartCount(c => Math.max(0, c - 1));
      }
      return { ...prev, [id]: isSelected };
    });

    setAnimatingItems(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAnimatingItems(prev => ({ ...prev, [id]: false }));
    }, 300);
  };

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

  const handleCatalogFilter = (category: "BOUQUETS" | "WEDDING DECOR" | "HAND BOUQUETS") => {
    setActiveCategory(category);
    closeMenu();
    setTimeout(() => {
      document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
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
          <a
            href="#"
            className="drawer-nav-item"
            onClick={(e) => { e.preventDefault(); closeMenu(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            Home
          </a>

          <div>
            <button
              className={`drawer-nav-item drawer-dropdown-trigger ${isCatalogDropdownOpen ? "expanded" : ""}`}
              onClick={() => setIsCatalogDropdownOpen(!isCatalogDropdownOpen)}
            >
              Catalog
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
              <button
                className="drawer-submenu-item"
                onClick={() => handleCatalogFilter("BOUQUETS")}
              >
                Flower Bouquet
              </button>
              <button
                className="drawer-submenu-item"
                onClick={() => handleCatalogFilter("HAND BOUQUETS")}
              >
                Hand Bouquet
              </button>
              <button
                className="drawer-submenu-item"
                onClick={() => handleCatalogFilter("WEDDING DECOR")}
              >
                Wedding Car
              </button>
            </div>
          </div>

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
        {/* Hamburger Menu Toggle Button (Always visible on all screens!) */}
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

        <button className="cart-icon-btn" aria-label="Cart" onClick={() => alert(`Cart has ${cartCount} items booked!`)}>
          <div style={{ position: "relative" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && (
              <span style={{
                position: "absolute",
                top: "-10px",
                right: "-10px",
                backgroundColor: "var(--color-pink-hot)",
                color: "white",
                fontSize: "0.7rem",
                borderRadius: "50%",
                width: "18px",
                height: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                border: "2px solid white"
              }}>
                {cartCount}
              </span>
            )}
          </div>
        </button>
      </header>

      {/* NEW HERO DESIGN (Stripes on Left, Scalloped Image on Right) */}
      <section className="new-hero-grid">
        {/* Left Column (Stripes background & Badge) */}
        <div className="hero-left-col">
          {/* Floating flower elements */}
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

        {/* Right Column (Borderless auto-sliding product showcase) */}
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

      {/* NEW BESTSELLERS SECTION WITH CAROUSEL */}
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

        {/* Carousel Grid Track */}
        <div className="carousel-track">
          {/* Card 1 */}
          <article className={`item-card ${selectedItems["bouquet-roses-1"] ? "selected" : ""} ${animatingItems["bouquet-roses-1"] ? "pulse-effect" : ""}`}>
            <div className="card-image-wrapper">
              <span className="hit-badge">Hit</span>
              <button
                className="favorite-btn"
                onClick={() => toggleFavorite("bouquet-roses-1")}
                aria-label="Add to favorites"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill={favorites["bouquet-roses-1"] ? "var(--color-coral)" : "none"}
                  stroke="var(--color-coral)"
                  strokeWidth="2.5"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
              <Image
                src="/assets/bouquet_roses.png"
                alt="Rose Blush"
                className="card-image"
                width={400}
                height={400}
              />
            </div>
            <div className="card-footer-bar">
              <h2 className="item-title">Rose Blush</h2>
              <button className="item-booking-btn" onClick={() => handleAddToCart("bouquet-roses-1")} aria-label="Book">
                {selectedItems["bouquet-roses-1"] ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                )}
              </button>
            </div>
          </article>

          {/* Card 2 */}
          <article className={`item-card ${selectedItems["bouquet-luxury-1"] ? "selected" : ""} ${animatingItems["bouquet-luxury-1"] ? "pulse-effect" : ""}`}>
            <div className="card-image-wrapper">
              <span className="hit-badge">Hit</span>
              <button
                className="favorite-btn"
                onClick={() => toggleFavorite("bouquet-luxury-1")}
                aria-label="Add to favorites"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill={favorites["bouquet-luxury-1"] ? "var(--color-coral)" : "none"}
                  stroke="var(--color-coral)"
                  strokeWidth="2.5"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
              <Image
                src="/assets/bouquet_luxury.png"
                alt="Luxe Blooms"
                className="card-image"
                width={400}
                height={400}
              />
            </div>
            <div className="card-footer-bar">
              <h2 className="item-title">Luxe Blooms</h2>
              <button className="item-booking-btn" onClick={() => handleAddToCart("bouquet-luxury-1")} aria-label="Book">
                {selectedItems["bouquet-luxury-1"] ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                )}
              </button>
            </div>
          </article>

          {/* Card 3 */}
          <article className={`item-card ${selectedItems["wedding-classic-1"] ? "selected" : ""} ${animatingItems["wedding-classic-1"] ? "pulse-effect" : ""}`}>
            <div className="card-image-wrapper">
              <button
                className="favorite-btn"
                onClick={() => toggleFavorite("wedding-classic-1")}
                aria-label="Add to favorites"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill={favorites["wedding-classic-1"] ? "var(--color-coral)" : "none"}
                  stroke="var(--color-coral)"
                  strokeWidth="2.5"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
              <Image
                src="/assets/wedding_car_classic.png"
                alt="Classic Rolls"
                className="card-image"
                width={400}
                height={400}
              />
            </div>
            <div className="card-footer-bar">
              <h2 className="item-title">Classic Rolls</h2>
              <button className="item-booking-btn" onClick={() => handleAddToCart("wedding-classic-1")} aria-label="Book">
                {selectedItems["wedding-classic-1"] ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                )}
              </button>
            </div>
          </article>
        </div>

        {/* Carousel arrows */}
        <div className="bestsellers-arrows-row">
          <button className="carousel-arrow-btn" aria-label="Previous" onClick={() => alert("Carousel scroll left!")}>&larr;</button>
          <button className="carousel-arrow-btn" aria-label="Next" onClick={() => alert("Carousel scroll right!")}>&rarr;</button>
        </div>
      </section>

      {/* Categories Showcase Navigation Bar */}
      <nav id="catalog-section" className="category-nav">
        <button
          onClick={() => setActiveCategory("ALL")}
          className={`category-link ${activeCategory === "ALL" ? "active" : ""}`}
        >
          All
        </button>
        <span className="nav-divider"></span>
        <button
          onClick={() => setActiveCategory("BOUQUETS")}
          className={`category-link ${activeCategory === "BOUQUETS" ? "active" : ""}`}
        >
          Bouquets
        </button>
        <span className="nav-divider"></span>
        <button
          onClick={() => setActiveCategory("HAND BOUQUETS")}
          className={`category-link ${activeCategory === "HAND BOUQUETS" ? "active" : ""}`}
        >
          Hand Bouquets
        </button>
        <span className="nav-divider"></span>
        <button
          onClick={() => setActiveCategory("WEDDING DECOR")}
          className={`category-link ${activeCategory === "WEDDING DECOR" ? "active" : ""}`}
        >
          Wedding Cars
        </button>
      </nav>

      {/* Filter and Search Action Row */}
      <div className="filter-row">
        <button className="filter-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
          </svg>
          Filters
        </button>

        <button className="search-btn" aria-label="Search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>

      {/* Grid Container */}
      <main className="grid-container">
        {filteredItems.map(item => (
          <article className={`item-card ${selectedItems[item.id] ? "selected" : ""} ${animatingItems[item.id] ? "pulse-effect" : ""}`} key={item.id}>
            <div className="card-image-wrapper">
              <button
                className="favorite-btn"
                onClick={() => toggleFavorite(item.id)}
                aria-label="Add to favorites"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill={favorites[item.id] ? "var(--color-coral)" : "none"}
                  stroke="var(--color-coral)"
                  strokeWidth="2.5"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>

              <Image
                src={item.image}
                alt={item.name}
                className="card-image"
                width={400}
                height={400}
              />
            </div>

            <div className="card-footer-bar">
              <h2 className="item-title">{item.name}</h2>
              <button
                className="item-booking-btn"
                onClick={() => handleAddToCart(item.id)}
                aria-label="Add to cart / Book"
              >
                {selectedItems[item.id] ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                )}
              </button>
            </div>
          </article>
        ))}
      </main>

      {/* Pagination matches Warmness */}
      <div className="pagination-container">
        <span className="pagination-arrow">&lt;</span>
        <span className="pagination-number active">1</span>
        <span className="pagination-number">2</span>
        <span className="pagination-number">3</span>
        <span className="pagination-number">4</span>
        <span className="pagination-arrow">&gt;</span>
      </div>

      {/* CTA Banners matching Warmness */}
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

      {/* Contact & Booking split section */}
      <section id="booking-contact" className="contact-section">
        <div className="contact-layout-wrapper">
          {/* Left Column: Info details */}
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

      {/* Footer Block with Scallop Connector */}
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
