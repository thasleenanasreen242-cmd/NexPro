"use client";

import { useMemo, useState } from "react";
import { Search, ShoppingBag, UserRound, ArrowRight, Truck, ShieldCheck, Headphones, RotateCcw, Smartphone, Laptop, Headphones as AudioIcon, Watch, Gamepad2, Camera, Plus, Check, Menu, Heart, Star } from "lucide-react";

type Product = { id: number; name: string; description: string; price: number; oldPrice: number; category: string; tag: string; rating: string; kind: "phone" | "laptop" | "buds" | "watch" };

const products: Product[] = [
  { id: 1, name: "Nova X Pro 5G", description: "256GB · Midnight blue", price: 64999, oldPrice: 72999, category: "Phones", tag: "BESTSELLER", rating: "4.8", kind: "phone" },
  { id: 2, name: "AeroBook Air 14", description: "16GB RAM · 512GB SSD", price: 74990, oldPrice: 82990, category: "Laptops", tag: "NEW ARRIVAL", rating: "4.7", kind: "laptop" },
  { id: 3, name: "Pulse Buds Pro", description: "Active noise cancellation", price: 8999, oldPrice: 11999, category: "Audio", tag: "TOP PICK", rating: "4.6", kind: "buds" },
  { id: 4, name: "Vibe Watch Series 9", description: "GPS · Health tracking", price: 24999, oldPrice: 28999, category: "Wearables", tag: "SAVE 14%", rating: "4.8", kind: "watch" },
  { id: 5, name: "Nova Lite 5G", description: "128GB · Glacier silver", price: 24999, oldPrice: 27999, category: "Phones", tag: "GREAT VALUE", rating: "4.5", kind: "phone" },
  { id: 6, name: "Pulse Studio Max", description: "Over-ear · Spatial audio", price: 15999, oldPrice: 19999, category: "Audio", tag: "POPULAR", rating: "4.7", kind: "buds" },
  { id: 7, name: "AeroBook Pro 16", description: "Creator edition · 1TB SSD", price: 119990, oldPrice: 129990, category: "Laptops", tag: "PRO CHOICE", rating: "4.9", kind: "laptop" },
  { id: 8, name: "Vibe Fit Active", description: "7-day battery · AMOLED", price: 6999, oldPrice: 8999, category: "Wearables", tag: "UNDER ₹7K", rating: "4.4", kind: "watch" },
];

const categories = [
  { name: "Smartphones", sub: "Latest launches", icon: Smartphone, filter: "Phones" },
  { name: "Laptops", sub: "Work & create", icon: Laptop, filter: "Laptops" },
  { name: "Audio", sub: "Hear every detail", icon: AudioIcon, filter: "Audio" },
  { name: "Wearables", sub: "Move smarter", icon: Watch, filter: "Wearables" },
  { name: "Gaming", sub: "Level up", icon: Gamepad2, filter: "Gaming" },
  { name: "Cameras", sub: "Capture more", icon: Camera, filter: "Cameras" },
];

const money = (n: number) => "₹" + n.toLocaleString("en-IN");

function ProductArt({ kind }: { kind: Product["kind"] }) {
  if (kind === "phone") return <svg width="100" height="135" viewBox="0 0 100 135" aria-hidden="true"><defs><linearGradient id="phone" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#b7c7fa"/><stop offset="1" stopColor="#344b9e"/></linearGradient></defs><rect x="23" y="4" width="54" height="126" rx="12" fill="#172033"/><rect x="26" y="7" width="48" height="120" rx="10" fill="url(#phone)"/><rect x="30" y="13" width="18" height="37" rx="6" fill="#172033"/><circle cx="36" cy="22" r="4" fill="#91a8ff"/><circle cx="42" cy="34" r="4" fill="#91a8ff"/><circle cx="36" cy="44" r="4" fill="#91a8ff"/><path d="M30 90 Q55 60 72 86 L72 118 L30 118Z" fill="#fff" opacity=".22"/></svg>;
  if (kind === "laptop") return <svg width="150" height="125" viewBox="0 0 150 125" aria-hidden="true"><defs><linearGradient id="screen" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#cad7ff"/><stop offset="1" stopColor="#516ce0"/></linearGradient></defs><rect x="26" y="12" width="98" height="76" rx="6" fill="#202a3b"/><rect x="30" y="16" width="90" height="68" rx="3" fill="url(#screen)"/><circle cx="75" cy="50" r="22" fill="#fff" opacity=".28"/><path d="M13 91 L137 91 L148 103 Q149 108 141 108 L9 108 Q1 108 3 103Z" fill="#aab3c2"/><path d="M57 93 L93 93 L89 100 L61 100Z" fill="#747f91"/></svg>;
  if (kind === "buds") return <svg width="135" height="125" viewBox="0 0 135 125" aria-hidden="true"><rect x="30" y="54" width="75" height="48" rx="20" fill="#fff" stroke="#d8deea" strokeWidth="2"/><rect x="39" y="62" width="57" height="32" rx="13" fill="#edf1fa"/><path d="M45 22 Q45 12 55 12 Q67 12 67 25 L67 44 Q67 55 56 55 Q45 55 45 44Z" fill="#fff" stroke="#cbd5e1" strokeWidth="2"/><circle cx="56" cy="25" r="5" fill="#9aa8c5"/><path d="M77 27 Q77 17 87 17 Q99 17 99 30 L99 46 Q99 57 88 57 Q77 57 77 46Z" fill="#fff" stroke="#cbd5e1" strokeWidth="2"/><circle cx="88" cy="30" r="5" fill="#9aa8c5"/></svg>;
  return <svg width="120" height="125" viewBox="0 0 120 125" aria-hidden="true"><rect x="37" y="7" width="46" height="111" rx="22" fill="#242e40"/><rect x="42" y="12" width="36" height="101" rx="17" fill="#dbe5ff"/><rect x="28" y="32" width="64" height="59" rx="19" fill="#4e67c6" stroke="#d8e0f8" strokeWidth="5"/><rect x="34" y="38" width="52" height="47" rx="14" fill="#0f1b36"/><circle cx="60" cy="61" r="12" fill="#d7e3ff"/><path d="M60 51 L63 59 L71 61 L63 64 L60 72 L57 64 L49 61 L57 59Z" fill="#607ce4"/></svg>;
}

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  const filteredProducts = useMemo(() => products.filter((p) => {
    const matchCategory = activeCategory === "All" || p.category === activeCategory;
    const matchQuery = (p.name + " " + p.description + " " + p.category).toLowerCase().includes(query.toLowerCase());
    return matchCategory && matchQuery;
  }), [activeCategory, query]);

  const selectCategory = (category: string) => {
    setActiveCategory(category);
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="announcement">✨ Welcome to NexPro — smarter tech starts here <span style={{ opacity: .7 }}> · </span> Free delivery on orders over ₹2,999</div>
      <header className="header">
        <div className="container">
          <div className="header-inner">
            <a href="#" className="logo" aria-label="NexPro home">nex<span>pro</span>.</a>
            <label className="search"><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search smartphones, laptops, audio..." aria-label="Search products" /></label>
            <div className="header-actions">
              <button className="icon-action" onClick={() => setMobileSearch(!mobileSearch)} aria-label="Toggle search"><Search size={19} /><span>Search</span></button>
              <button className="icon-action" onClick={() => alert("Your wishlist has " + wishlist.length + " item(s).")} aria-label="Wishlist"><Heart size={19} /><span>Wishlist</span></button>
              <button className="icon-action" onClick={() => alert(cart.length ? "Your cart contains " + cart.length + " item(s). Checkout will be available soon." : "Your cart is empty. Explore our products!")} aria-label="Shopping cart"><ShoppingBag size={19} /><span>Cart ({cart.length})</span></button>
            </div>
          </div>
          {mobileSearch && <div style={{ paddingBottom: 12 }}><label className="search" style={{ display: "flex" }}><Search size={17} /><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products..." aria-label="Search products" /></label></div>}
          <nav className="nav" aria-label="Main navigation">
            <a href="#categories">Shop by category</a><a href="#products" onClick={() => setActiveCategory("All")}>All products</a><a href="#deals">Today's deals</a><a href="#products" onClick={() => selectCategory("Phones")}>Smartphones</a><a href="#products" onClick={() => selectCategory("Laptops")}>Laptops</a><a href="#footer">Contact</a>
          </nav>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">The next generation of tech</div>
            <h1>Your world.<br />Upgraded.</h1>
            <p>Meet the devices that move you forward. Explore brilliant tech, thoughtful prices, and a better way to shop.</p>
            <button className="primary-btn" onClick={() => selectCategory("All")}>Explore the collection <ArrowRight size={16} /></button>
          </div>
          <div className="hero-visual" aria-label="Illustration of a premium smartphone">
            <div className="floating-card float-one"><span style={{ color: "#667085" }}>New season</span><strong>Tech, reimagined.</strong></div>
            <div className="hero-phone"><div className="phone-screen"><div className="phone-island" /></div></div>
            <div className="floating-card float-two"><span style={{ color: "#667085" }}>Your next upgrade</span><strong>Starts right here ↗</strong></div>
          </div>
        </section>

        <div className="trust-row">
          <div className="trust-item"><div className="trust-icon"><Truck size={19} /></div><div><strong>Fast delivery</strong><span>Across Kerala & India</span></div></div>
          <div className="trust-item"><div className="trust-icon"><ShieldCheck size={19} /></div><div><strong>Secure shopping</strong><span>Safe checkout experience</span></div></div>
          <div className="trust-item"><div className="trust-icon"><RotateCcw size={19} /></div><div><strong>Easy returns</strong><span>Clear, simple policies</span></div></div>
          <div className="trust-item"><div className="trust-icon"><Headphones size={19} /></div><div><strong>Here to help</strong><span>Friendly tech support</span></div></div>
        </div>

        <section className="section" id="categories">
          <div className="section-head"><div><div className="eyebrow">Find your fit</div><h2>Shop by category</h2><p>Good tech for every part of your day.</p></div><a href="#products" className="text-link" onClick={() => setActiveCategory("All")}>Browse all <ArrowRight size={13} style={{ verticalAlign: "middle" }} /></a></div>
          <div className="category-grid">
            {categories.map(({ name, sub, icon: Icon, filter }) => <button className="category" key={name} onClick={() => selectCategory(filter)}><div className="category-art"><Icon size={34} strokeWidth={1.5} /></div><strong>{name}</strong><small>{sub}</small></button>)}
          </div>
        </section>

        <section className="promo" id="deals">
          <div className="promo-copy"><div className="eyebrow">The upgrade event</div><h2>A little more wow.<br />A lot more value.</h2><p>Find your next favourite device with handpicked offers across phones, audio and everyday essentials.</p><button className="primary-btn" onClick={() => selectCategory("All")}>Explore featured deals <ArrowRight size={15} /></button></div>
          <div className="promo-art" aria-hidden="true"><div className="promo-device" /><div className="promo-device" /><div className="promo-device" /></div>
        </section>

        <section className="section" id="products">
          <div className="section-head"><div><div className="eyebrow">Picked for you</div><h2>{activeCategory === "All" ? "Trending right now" : activeCategory + " collection"}</h2><p>Explore the gear everyone's talking about.</p></div><span className="text-link">{filteredProducts.length} products</span></div>
          <div className="product-grid">
            {filteredProducts.length ? filteredProducts.map((product) => <article className="product-card" key={product.id}>
              <div className="product-art"><span className="product-tag">{product.tag}</span><ProductArt kind={product.kind} /></div>
              <div className="product-rating"><Star size={11} fill="currentColor" style={{ verticalAlign: "middle" }} /> {product.rating} <span style={{ color: "#98a2b3" }}> · Customer favourite</span></div>
              <h3 className="product-name">{product.name}</h3><p className="product-desc">{product.description}</p>
              <div className="product-bottom"><div><span className="price">{money(product.price)}</span><span className="old-price">{money(product.oldPrice)}</span></div><button className="add-btn" onClick={() => setCart((old) => [...old, product.id])} aria-label={"Add " + product.name + " to cart"}><Plus size={17} /></button></div>
              <button onClick={() => setWishlist((old) => old.includes(product.id) ? old.filter((id) => id !== product.id) : [...old, product.id])} style={{ marginTop: 12, border: 0, background: "transparent", color: wishlist.includes(product.id) ? "#e04467" : "#98a2b3", padding: 0, fontSize: 10, display: "flex", alignItems: "center", gap: 5 }}><Heart size={12} fill={wishlist.includes(product.id) ? "currentColor" : "none"} /> {wishlist.includes(product.id) ? "Saved to wishlist" : "Add to wishlist"}</button>
            </article>) : <div className="empty-state">No products match your search. Try another keyword or category.</div>}
          </div>
        </section>

        <section className="newsletter">
          <div><div className="eyebrow">Good things, occasionally</div><h2>Stay in the know.</h2><p>New drops, thoughtful offers and tech worth knowing about.</p></div>
          <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); if (email.includes("@") && email.includes(".")) setSubscribed(true); }}><input type="email" required placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email address" /><button type="submit">{subscribed ? "You're on the list ✓" : "Sign me up"}</button></form>
        </section>
      </main>

      <footer className="footer" id="footer"><div className="container">
        <div className="footer-top">
          <div className="footer-brand"><a href="#" className="logo">nex<span>pro</span>.</a><p>Smart tech. Better living. A fresh, friendly destination for the devices that make everyday life better.</p></div>
          <div><h4>Explore</h4><a href="#categories">Shop categories</a><a href="#products">Trending products</a><a href="#deals">Special offers</a></div>
          <div><h4>Customer care</h4><a href="#footer">Contact us</a><a href="#footer">Delivery information</a><a href="#footer">Returns & warranty</a></div>
          <div><h4>Stay connected</h4><a href="#footer">Instagram</a><a href="#footer">Facebook</a><a href="#footer">Kerala, India</a></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} NexPro. All rights reserved.</span><span>Made for your next upgrade · Kerala, India</span></div>
      </div></footer>
    </>
  );
}
