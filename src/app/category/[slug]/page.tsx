"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getCategoryBySlug,
  getProductsByCategorySlug,
  formatPrice,
  FloralType,
} from "@/data/products";

export default function CategoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const category = getCategoryBySlug(slug);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  if (!category) {
    return (
      <div className="product-not-found-container">
        <header className="header-bar">
          <Link href="/" className="logo-container" style={{ textDecoration: "none" }}>
            belibuké
          </Link>
        </header>
        <div className="not-found-content">
          <h2>Category Not Found</h2>
          <p>Sorry, the category you are looking for does not exist.</p>
          <Link href="/" className="back-home-btn">
            &larr; Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  const filteredProducts = getProductsByCategorySlug(slug, activeFilter);

  // Capitalize helper
  const formatFilterName = (filter: string) => {
    if (filter === "all") return "All";
    return filter.charAt(0).toUpperCase() + filter.slice(1);
  };

  return (
    <>
      {/* Top Header Bar */}
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

        <div style={{ width: "24px" }} />
      </header>

      {/* Main Category Content */}
      <main className="category-detail-wrapper">
        {/* Category Header Banner */}
        <section className="category-header-banner">
          <Link href="/" className="detail-back-link">
            &larr; Back to Home
          </Link>
          
          <div className="category-banner-content">
            <span className="category-banner-badge">{filteredProducts.length} Products</span>
            <h1 className="category-banner-title">{category.name}</h1>
            <p className="category-banner-desc">{category.description}</p>
          </div>

          {/* Subcategory Filter Tabs (If Available) */}
          {category.availableFilters && category.availableFilters.length > 0 && (
            <div className="subcategory-filter-row">
              <span className="filter-label">Filter:</span>
              <div className="subcategory-filter-pills">
                <button
                  type="button"
                  className={`filter-pill ${activeFilter === "all" ? "active" : ""}`}
                  onClick={() => setActiveFilter("all")}
                >
                  All
                </button>
                {category.availableFilters.map((filterKey) => (
                  <button
                    key={filterKey}
                    type="button"
                    className={`filter-pill ${activeFilter === filterKey ? "active" : ""}`}
                    onClick={() => setActiveFilter(filterKey)}
                  >
                    {formatFilterName(filterKey)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Category Products Grid */}
        <section className="category-products-section">
          {filteredProducts.length === 0 ? (
            <div className="empty-category-box">
              <p>No products available under this filter option.</p>
            </div>
          ) : (
            <div className="grid-container">
              {filteredProducts.map((item) => (
                <article className="item-card" key={item.id}>
                  <Link href={`/product/${item.id}`} className="card-image-link">
                    <div className="card-image-wrapper">
                      {item.tag === "BEST SELLER" && (
                        <span className="tag-badge tag-bestseller">Best Seller</span>
                      )}
                      {item.tag === "NEW" && (
                        <span className="tag-badge tag-new">New</span>
                      )}
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
          )}
        </section>
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
