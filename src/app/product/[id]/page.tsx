"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getFloralItemById, formatPrice } from "@/data/products";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const product = getFloralItemById(id);

  // Default to today's date YYYY-MM-DD
  const todayStr = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [selectedTime, setSelectedTime] = useState<string>("10:00");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!product) {
    return (
      <div className="product-not-found-container">
        <header className="header-bar">
          <Link href="/" className="logo-container" style={{ textDecoration: "none" }}>
            belibuké
          </Link>
        </header>
        <div className="not-found-content">
          <h2>Product Not Found</h2>
          <p>Sorry, the product you are looking for does not exist or has been removed.</p>
          <Link href="/" className="back-home-btn">
            &larr; Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const handleBuyNow = (e: React.FormEvent) => {
    e.preventDefault();
    const dateFormatted = selectedDate || "____";
    const timeFormatted = selectedTime || "____";

    // Exact requested format:
    // "Halo mimin, aku mau order [product name] untuk tanggal *isi tanggal* jam *isi jam*"
    const message = `Halo mimin, aku mau order ${product.name} untuk tanggal ${dateFormatted} jam ${timeFormatted}`;
    const whatsappUrl = `https://wa.me/6285158522680?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* Top Header Bar (No Cart Icon) */}
      <header className="header-bar">
        <button
          className="header-menu-btn"
          aria-label="Back to home"
          onClick={() => router.push("/")}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>

        <Link href="/" className="logo-container" style={{ textDecoration: "none" }}>
          belibuké
        </Link>

        {/* Placeholder to balance header alignment */}
        <div style={{ width: "24px" }} />
      </header>

      {/* Product Detail Container */}
      <main className="product-detail-wrapper">
        <div className="product-detail-card">
          <Link href="/" className="detail-back-link">
            &larr; Back to Products
          </Link>

          <div className="product-detail-grid">
            {/* Left: Product Image */}
            <div className="product-detail-image-box">
              {product.tag === "BEST SELLER" && (
                <span className="tag-badge tag-bestseller">Best Seller</span>
              )}
              {product.tag === "NEW" && (
                <span className="tag-badge tag-new">New</span>
              )}
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                priority
                className="product-detail-img"
              />
            </div>

            {/* Right: Product Details & Order Form */}
            <div className="product-detail-info">
              <span className="product-category-badge">{product.categoryName}</span>
              <h1 className="product-detail-title">{product.name}</h1>
              <div className="product-detail-price">{formatPrice(product.price)}</div>

              <p className="product-detail-desc">
                Handcrafted premium floral arrangement designed with fresh, hand-selected seasonal blooms. Perfect for celebrations, weddings, and special moments.
              </p>

              <form onSubmit={handleBuyNow} className="product-order-form">
                <div className="order-form-group">
                  <label htmlFor="order-date" className="order-form-label">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 6 }}>
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Pilih Tanggal Pengiriman / Acara:
                  </label>
                  <input
                    id="order-date"
                    type="date"
                    className="order-form-input"
                    value={selectedDate}
                    required
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>

                <div className="order-form-group">
                  <label htmlFor="order-time" className="order-form-label">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 6 }}>
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    Pilih Jam Pengiriman / Acara:
                  </label>
                  <input
                    id="order-time"
                    type="time"
                    className="order-form-input"
                    value={selectedTime}
                    required
                    onChange={(e) => setSelectedTime(e.target.value)}
                  />
                </div>

                <button type="submit" className="buy-now-wa-btn">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 10 }}>
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  Buy Now via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer-scallop-wrap">
        <div className="footer-bottom-bar">
          <div className="footer-bottom-content">
            <div>&copy; 2026 belibuké</div>
            <div className="footer-policy-links">
              <Link href="/" style={{ marginRight: "1rem" }}>Home</Link>
              <Link href="/#who-are-we">About Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
