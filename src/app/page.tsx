"use client";

import { useEffect, useMemo, useState } from "react";

type AuthSession = { access_token: string; user: { id: string; email?: string } };
type OrderReceipt = { order_number: string; total_amount: number; currency: string };
import { Search, ShoppingBag, UserRound, ArrowRight, Truck, ShieldCheck, Headphones, RotateCcw, Smartphone, Laptop, Headphones as AudioIcon, Watch, Gamepad2, Camera, Plus, Check, Menu, Heart, Star } from "lucide-react";

type Product = { id: number | string; name: string; description: string; price: number; oldPrice: number; category: string; tag: string; rating: string; kind: "phone" | "laptop" | "buds" | "watch"; imageUrl?: string; stockQuantity?: number };
type CatalogRow = { id: string; name: string; short_description: string | null; description: string | null; price: number | string; compare_at_price: number | string | null; images: string[] | null; tags: string[] | null; is_featured: boolean; stock_quantity: number; categories: { name?: string } | null };

const sampleProducts: Product[] = [
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
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [catalogSource, setCatalogSource] = useState<"sample" | "live">("sample");
  useEffect(() => {
    let cancelled = false;
    const loadCatalog = async () => {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
      if (!url || !key) return;
      try {
        const response = await fetch(`${url}/rest/v1/products?select=id,name,short_description,description,price,compare_at_price,images,tags,is_featured,stock_quantity,categories(name)&is_active=eq.true&order=created_at.desc`, {
          headers: { apikey: key, Authorization: `Bearer ${key}` },
        });
        if (!response.ok) return;
        const rows = await response.json() as CatalogRow[];
        if (cancelled || !Array.isArray(rows) || rows.length === 0) return;
        setProducts(rows.map((row) => {
          const categoryName = row.categories?.name ?? "Accessories";
          const category = categoryName === "Smartphones" ? "Phones" : categoryName;
          const kind: Product["kind"] = category === "Phones" ? "phone" : category === "Laptops" ? "laptop" : category === "Audio" ? "buds" : "watch";
          return {
            id: row.id,
            name: row.name,
            description: row.short_description || row.description || categoryName,
            price: Number(row.price),
            oldPrice: Number(row.compare_at_price ?? row.price),
            category,
            tag: row.is_featured ? "FEATURED" : Number(row.stock_quantity) > 0 ? "IN STOCK" : "SOLD OUT",
            rating: "",
            kind,
            imageUrl: row.images?.[0] || undefined,
            stockQuantity: Number(row.stock_quantity),
          };
        }));
        setCatalogSource("live");
      } catch {
        // Keep the sample catalog visible if the API is not configured or temporarily unavailable.
      }
    };
    void loadCatalog();
    return () => { cancelled = true; };
  }, []);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<Array<Product["id"]>>([]);
  const [wishlist, setWishlist] = useState<Array<Product["id"]>>([]);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "", address: "", city: "", state: "Kerala", pincode: "" });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authSession, setAuthSession] = useState<AuthSession | null>(null);
  const [authBusy, setAuthBusy] = useState(false);
  const [authMessage, setAuthMessage] = useState("");
  const [orderBusy, setOrderBusy] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const [orderReceipt, setOrderReceipt] = useState<OrderReceipt | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("nexpro-auth-session");
      if (saved) {
        const parsed = JSON.parse(saved) as AuthSession;
        if (parsed.access_token && parsed.user?.id) setAuthSession(parsed);
      }
    } catch {
      window.localStorage.removeItem("nexpro-auth-session");
    }
  }, []);

  const authenticate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) { setAuthMessage("Authentication is not configured yet."); return; }
    setAuthBusy(true);
    setAuthMessage("");
    try {
      const endpoint = authMode === "signup" ? "signup" : "token?grant_type=password";
      const response = await fetch(`${url}/auth/v1/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: key },
        body: JSON.stringify({ email: authEmail.trim(), password: authPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || data.message || data.error_description || "Unable to sign in. Please check your details.");
      if (!data.access_token || !data.user?.id) {
        setAuthMessage("Account created. Check your email to confirm your address, then sign in.");
        setAuthMode("signin");
        return;
      }
      const session: AuthSession = { access_token: data.access_token, user: data.user };
      window.localStorage.setItem("nexpro-auth-session", JSON.stringify(session));
      setAuthSession(session);
      setCustomer((old) => ({ ...old, email: data.user.email || authEmail.trim() }));
      setAuthOpen(false);
      setAuthPassword("");
      setAuthMessage("");
    } catch (error) {
      setAuthMessage(error instanceof Error ? error.message : "Authentication failed. Please try again.");
    } finally {
      setAuthBusy(false);
    }
  };

  const signOut = () => {
    window.localStorage.removeItem("nexpro-auth-session");
    setAuthSession(null);
    setAuthMessage("You have signed out.");
  };

  const placeOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!authSession) {
      setAuthMessage("Please sign in or create an account before placing an order.");
      setAuthOpen(true);
      return;
    }
    if (catalogSource !== "live" || cartItems.some((item) => typeof item.id !== "string")) {
      setOrderMessage("Checkout is available only for real products loaded from the NexPro database. Sample products are for preview only.");
      return;
    }
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) { setOrderMessage("Checkout is not configured yet."); return; }
    setOrderBusy(true);
    setOrderMessage("");
    try {
      const response = await fetch(`${url}/rest/v1/rpc/place_cod_order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: key,
          Authorization: `Bearer ${authSession.access_token}`,
        },
        body: JSON.stringify({
          p_customer_name: customer.name,
          p_customer_email: customer.email,
          p_customer_phone: customer.phone,
          p_shipping_address: {
            recipient_name: customer.name,
            phone: customer.phone,
            address_line1: customer.address,
            city: customer.city,
            state: customer.state,
            postal_code: customer.pincode,
            country: "India",
          },
          p_items: cartItems.map((item) => ({ product_id: item.id, quantity: item.quantity })),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401) {
          signOut();
          setAuthOpen(true);
          throw new Error("Your session expired. Please sign in again.");
        }
        throw new Error(data.message || data.details || "Order could not be placed. Please review your address and stock.");
      }
      setOrderReceipt(data as OrderReceipt);
      setOrderPlaced(true);
      setCart([]);
    } catch (error) {
      setOrderMessage(error instanceof Error ? error.message : "Order could not be placed. Please try again.");
    } finally {
      setOrderBusy(false);
    }
  };

  const cartItems = useMemo(() => products
    .filter((product) => cart.includes(product.id))
    .map((product) => ({ ...product, quantity: cart.filter((id) => id === product.id).length })), [cart]);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
              <button className="icon-action" onClick={() => { setAuthMessage(""); setAuthOpen(true); }} aria-label="Account"><UserRound size={19} /><span>{authSession ? "Account" : "Sign in"}</span></button>
              <button className="icon-action" onClick={() => { setOrderPlaced(false); setCheckoutOpen(true); }} aria-label="Open cart and checkout"><ShoppingBag size={19} /><span>Cart ({cart.length})</span></button>
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

        {catalogSource === "sample" && <div role="status" style={{ border: "1px solid #f2d6a2", background: "#fffaeb", color: "#7a4b0e", borderRadius: 10, padding: "11px 14px", fontSize: 12, marginTop: 24 }}>Sample catalog preview: add and activate real products in the NexPro Supabase database to display your actual inventory here.</div>}

        <section className="section" id="products">
          <div className="section-head"><div><div className="eyebrow">Picked for you</div><h2>{activeCategory === "All" ? "Trending right now" : activeCategory + " collection"}</h2><p>Explore the gear everyone's talking about.</p></div><span className="text-link">{filteredProducts.length} products</span></div>
          <div className="product-grid">
            {filteredProducts.length ? filteredProducts.map((product) => <article className="product-card" key={product.id}>
              <div className="product-art"><span className="product-tag">{product.tag}</span>{product.imageUrl ? <img src={product.imageUrl} alt={product.name} loading="lazy" style={{ width: "100%", height: 135, objectFit: "contain" }} /> : <ProductArt kind={product.kind} />}</div>
              {product.rating ? <div className="product-rating"><Star size={11} fill="currentColor" style={{ verticalAlign: "middle" }} /> {product.rating} <span style={{ color: "#98a2b3" }}> · Sample rating</span></div> : <div className="product-rating" style={{ color: "#667085" }}>{product.stockQuantity === 0 ? "Currently out of stock" : "New product"}</div>}
              <h3 className="product-name">{product.name}</h3><p className="product-desc">{product.description}</p>
              <div className="product-bottom"><div><span className="price">{money(product.price)}</span>{product.oldPrice > product.price && <span className="old-price">{money(product.oldPrice)}</span>}</div><button className="add-btn" disabled={product.stockQuantity === 0} onClick={() => setCart((old) => [...old, product.id])} aria-label={"Add " + product.name + " to cart"} title={product.stockQuantity === 0 ? "Out of stock" : "Add to cart"}><Plus size={17} /></button></div>
              <button onClick={() => setWishlist((old) => old.includes(product.id) ? old.filter((id) => id !== product.id) : [...old, product.id])} style={{ marginTop: 12, border: 0, background: "transparent", color: wishlist.includes(product.id) ? "#e04467" : "#98a2b3", padding: 0, fontSize: 10, display: "flex", alignItems: "center", gap: 5 }}><Heart size={12} fill={wishlist.includes(product.id) ? "currentColor" : "none"} /> {wishlist.includes(product.id) ? "Saved to wishlist" : "Add to wishlist"}</button>
            </article>) : <div className="empty-state">No products match your search. Try another keyword or category.</div>}
          </div>
        </section>

        <section className="newsletter">
          <div><div className="eyebrow">Good things, occasionally</div><h2>Stay in the know.</h2><p>New drops, thoughtful offers and tech worth knowing about.</p></div>
          <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); if (email.includes("@") && email.includes(".")) setSubscribed(true); }}><input type="email" required placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email address" /><button type="submit">{subscribed ? "You're on the list ✓" : "Sign me up"}</button></form>
        </section>
      </main>


      {checkoutOpen && <div role="dialog" aria-modal="true" aria-labelledby="checkout-title" style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(16,24,40,.62)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
        <div style={{ background: "#fff", borderRadius: 18, width: "min(760px,100%)", maxHeight: "92vh", overflowY: "auto", padding: 24, boxShadow: "0 24px 80px #0003" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div><div className="eyebrow">NexPro checkout</div><h2 id="checkout-title" style={{ fontSize: 25, margin: "7px 0 0" }}>{orderPlaced ? "Order confirmed" : "Your cart & checkout"}</h2></div>
            <button type="button" onClick={() => setCheckoutOpen(false)} aria-label="Close checkout" style={{ border: "1px solid #e4e7ec", background: "#fff", borderRadius: 9, padding: "8px 12px" }}>Close ✕</button>
          </div>
          {orderPlaced ? <div style={{ padding: "22px 0" }}>
            <div style={{ background: "#ecfdf3", color: "#067647", borderRadius: 12, padding: 16, marginBottom: 16 }}><strong>Thank you, {customer.name}!</strong><p style={{ margin: "8px 0 0", fontSize: 13 }}>Your order has been saved to NexPro. Please keep your order number for reference.</p></div>
            {orderReceipt && <div style={{ border: "1px solid #d0d5dd", borderRadius: 12, padding: 16, marginBottom: 16 }}><div style={{ color: "#667085", fontSize: 12 }}>Order number</div><strong style={{ fontSize: 20 }}>{orderReceipt.order_number}</strong><div style={{ marginTop: 10 }}>Total: <strong>{money(Number(orderReceipt.total_amount))}</strong> · Cash on delivery</div></div>}
            <p style={{ fontSize: 13, color: "#667085" }}>Payment is due on delivery. Shipping and taxes are not yet calculated.</p>
            <button className="primary-btn" onClick={() => { setCheckoutOpen(false); setOrderPlaced(false); }}>Continue shopping <ArrowRight size={16} /></button>
          </div> : cartItems.length === 0 ? <div style={{ textAlign: "center", padding: "28px 8px" }}>
            <ShoppingBag size={38} color="#2457e6" style={{ margin: "0 auto 12px" }} /><h3>Your cart is empty</h3><p style={{ color: "#667085", fontSize: 13 }}>Add a product before continuing to checkout.</p>
            <button className="primary-btn" onClick={() => setCheckoutOpen(false)}>Explore products <ArrowRight size={16} /></button>
          </div> : <>
            <div style={{ border: "1px solid #e9edf3", borderRadius: 12, padding: 14, marginBottom: 20 }}>
              {cartItems.map((item) => <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #f0f2f5" }}>
                <div style={{ minWidth: 0 }}><strong style={{ fontSize: 13 }}>{item.name}</strong><div style={{ color: "#667085", fontSize: 12, marginTop: 4 }}>{money(item.price)} × {item.quantity}</div></div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <strong style={{ fontSize: 13 }}>{money(item.price * item.quantity)}</strong>
                  <button type="button" onClick={() => setCart((old) => { const index = old.indexOf(item.id); return index < 0 ? old : old.filter((_, i) => i !== index); })} aria-label={"Remove one " + item.name} style={{ border: "1px solid #e4e7ec", background: "#fff", borderRadius: 7, padding: "4px 8px", color: "#b42318" }}>−</button>
                  <button type="button" onClick={() => setCart((old) => [...old, item.id])} aria-label={"Add one " + item.name} style={{ border: "1px solid #e4e7ec", background: "#fff", borderRadius: 7, padding: "4px 8px" }}>+</button>
                </div>
              </div>)}
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 14, fontSize: 16 }}><strong>Order total</strong><strong>{money(cartTotal)}</strong></div>
              <p style={{ color: "#667085", fontSize: 11, marginBottom: 0 }}>Shipping and taxes are not calculated in this demo.</p>
            </div>
            <form onSubmit={placeOrder}>
              <h3 style={{ fontSize: 16, margin: "0 0 12px" }}>Delivery details</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 12 }}>
                <label style={{ fontSize: 12, color: "#475467" }}>Full name<input required autoComplete="name" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} placeholder="Your full name" style={{ display: "block", width: "100%", padding: 11, marginTop: 6, border: "1px solid #d0d5dd", borderRadius: 8 }} /></label>
                <label style={{ fontSize: 12, color: "#475467" }}>Email<input type="email" required autoComplete="email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} placeholder="you@example.com" style={{ display: "block", width: "100%", padding: 11, marginTop: 6, border: "1px solid #d0d5dd", borderRadius: 8 }} /></label>
                <label style={{ fontSize: 12, color: "#475467" }}>Phone number<input required type="tel" autoComplete="tel" pattern="[0-9+() -]{8,16}" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} placeholder="Mobile number" style={{ display: "block", width: "100%", padding: 11, marginTop: 6, border: "1px solid #d0d5dd", borderRadius: 8 }} /></label>
                <label style={{ fontSize: 12, color: "#475467" }}>PIN code<input required inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{6}" maxLength={6} value={customer.pincode} onChange={(e) => setCustomer({ ...customer, pincode: e.target.value })} placeholder="6-digit PIN code" style={{ display: "block", width: "100%", padding: 11, marginTop: 6, border: "1px solid #d0d5dd", borderRadius: 8 }} /></label>
                <label style={{ fontSize: 12, color: "#475467", gridColumn: "1 / -1" }}>Delivery address<input required autoComplete="street-address" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} placeholder="House / street / landmark" style={{ display: "block", width: "100%", padding: 11, marginTop: 6, border: "1px solid #d0d5dd", borderRadius: 8 }} /></label>
                <label style={{ fontSize: 12, color: "#475467" }}>City / town<input required autoComplete="address-level2" value={customer.city} onChange={(e) => setCustomer({ ...customer, city: e.target.value })} placeholder="City or town" style={{ display: "block", width: "100%", padding: 11, marginTop: 6, border: "1px solid #d0d5dd", borderRadius: 8 }} /></label>
                <label style={{ fontSize: 12, color: "#475467" }}>State<input required autoComplete="address-level1" value={customer.state} onChange={(e) => setCustomer({ ...customer, state: e.target.value })} style={{ display: "block", width: "100%", padding: 11, marginTop: 6, border: "1px solid #d0d5dd", borderRadius: 8 }} /></label>
              </div>
              <h3 style={{ fontSize: 16, margin: "22px 0 10px" }}>Payment method</h3>
              <div style={{ display: "grid", gap: 8 }}><label style={{ display: "flex", alignItems: "center", gap: 9, border: "1px solid #e4e7ec", borderRadius: 10, padding: 12, fontSize: 13 }}><input type="radio" name="payment" checked readOnly /> Cash on delivery</label></div>
              {!authSession && <p style={{ color: "#93370d", background: "#fffaeb", padding: 12, borderRadius: 9, fontSize: 12 }}>Sign in or create an account before placing your order.</p>}
              {catalogSource !== "live" && <p style={{ color: "#93370d", background: "#fffaeb", padding: 12, borderRadius: 9, fontSize: 12 }}>Sample products cannot be ordered. Add real active products to the Supabase database first.</p>}
              {orderMessage && <p role="alert" style={{ color: "#b42318", background: "#fef3f2", padding: 12, borderRadius: 9, fontSize: 12 }}>{orderMessage}</p>}
              <button type="submit" disabled={orderBusy || catalogSource !== "live"} className="primary-btn" style={{ width: "100%", justifyContent: "center", opacity: orderBusy || catalogSource !== "live" ? .65 : 1 }}>{orderBusy ? "Placing order…" : `Place cash-on-delivery order · ${money(cartTotal)}`} <ArrowRight size={16} /></button>
            </form>
          </>}
        </div>
      </div>}

      {authOpen && <div role="dialog" aria-modal="true" aria-labelledby="auth-title" style={{ position: "fixed", inset: 0, zIndex: 120, background: "rgba(16,24,40,.62)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
        <div style={{ background: "#fff", borderRadius: 18, width: "min(440px,100%)", padding: 24, boxShadow: "0 24px 80px #0003" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <div><div className="eyebrow">NexPro customer account</div><h2 id="auth-title" style={{ fontSize: 24, margin: "7px 0 0" }}>{authSession ? "Your account" : authMode === "signup" ? "Create your account" : "Sign in"}</h2></div>
            <button type="button" onClick={() => setAuthOpen(false)} aria-label="Close account dialog" style={{ border: "1px solid #e4e7ec", background: "#fff", borderRadius: 9, padding: "8px 12px" }}>Close ✕</button>
          </div>
          {authSession ? <div style={{ paddingTop: 20 }}>
            <p style={{ color: "#475467", fontSize: 14 }}>Signed in as <strong>{authSession.user.email}</strong></p>
            <button className="primary-btn" onClick={() => { signOut(); setAuthOpen(false); }} style={{ justifyContent: "center" }}>Sign out</button>
          </div> : <form onSubmit={authenticate} style={{ display: "grid", gap: 14, paddingTop: 20 }}>
            <label style={{ fontSize: 12, color: "#475467" }}>Email address<input type="email" autoComplete="email" required value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} placeholder="you@example.com" style={{ display: "block", width: "100%", padding: 11, marginTop: 6, border: "1px solid #d0d5dd", borderRadius: 8 }} /></label>
            <label style={{ fontSize: 12, color: "#475467" }}>Password<input type="password" autoComplete={authMode === "signup" ? "new-password" : "current-password"} minLength={8} required value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} placeholder="At least 8 characters" style={{ display: "block", width: "100%", padding: 11, marginTop: 6, border: "1px solid #d0d5dd", borderRadius: 8 }} /></label>
            {authMessage && <p role="status" style={{ color: authMessage.includes("created") || authMessage.includes("confirm") || authMessage.includes("signed out") ? "#067647" : "#b42318", fontSize: 12, margin: 0 }}>{authMessage}</p>}
            <button type="submit" disabled={authBusy} className="primary-btn" style={{ justifyContent: "center", opacity: authBusy ? .65 : 1 }}>{authBusy ? "Please wait…" : authMode === "signup" ? "Create account" : "Sign in"}</button>
            <button type="button" onClick={() => { setAuthMode(authMode === "signup" ? "signin" : "signup"); setAuthMessage(""); }} style={{ border: 0, background: "transparent", color: "#2457e6", padding: 8 }}>{authMode === "signup" ? "Already have an account? Sign in" : "New to NexPro? Create an account"}</button>
          </form>}
        </div>
      </div>}

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
