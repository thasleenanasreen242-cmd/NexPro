# NexPro

A responsive electronics storefront built with Next.js 14, React, and Tailwind CSS, with a dedicated Supabase backend project.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase setup

NexPro's Supabase project is hosted in the Mumbai region. Configure these variables in Vercel or in a local `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://wuokewtofjrzlaxcurvz.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Use the project's publishable key only in the browser. **Never put a Supabase service-role/secret key in a `NEXT_PUBLIC_*` variable or commit it to GitHub.**

The initial database migration creates categories, products, customer profiles and addresses, orders and order items, wishlists, coupons, reviews, newsletter subscribers, contact messages, and store settings. Row Level Security is enabled on every public table. Six starter categories are seeded.

### Adding real products

1. Open the [NexPro Supabase dashboard](https://supabase.com/dashboard/project/wuokewtofjrzlaxcurvz).
2. Open **Table Editor → products**.
3. Add your verified products with a category, accurate price, stock quantity, and image URL(s).
4. Keep `is_active` false until the product is checked and ready to publish; set it true to display it in the storefront.

The storefront reads active products from Supabase. If the product table has no active products or the API is not configured, it falls back to the sample catalog. Sample names, prices, ratings, and offers are not real inventory.

## Current implementation status

- Storefront reads active catalog products from Supabase, including prices, category, stock status, and product images.
- Search, category filters, cart, and wishlist currently run in the browser; cart and wishlist are not yet persisted to customer accounts.
- Checkout is still a **demo only**. It does not create database orders, reserve stock, send confirmation messages, or accept payments.
- Customer authentication, admin product management, secure order-creation routes, Razorpay verification/webhooks, shipping/tax rules, newsletter provider, and contact-form delivery still need implementation before accepting real orders.
- Customer policies, product claims, prices, stock, taxes, shipping promises, and return/warranty terms must be verified before launch.

## Security notes

- Row Level Security is enabled on all public-schema tables.
- The public storefront can read only active categories/products and published reviews.
- Customer policies scope profile, address, wishlist, and order reads to the authenticated customer.
- Privileged writes (including order creation and payment status updates) must be performed through trusted server-side code with secret keys kept outside browser code.
