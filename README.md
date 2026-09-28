# NextDine - Smart QR Ordering Platform for Modern Restaurants

NextDine is a production-ready restaurant ordering SaaS application featuring instant contact-free QR code ordering, real-time kitchen order streams, multi-tenant restaurant management, and platform super admin tools.

## 🎯 Key Features

- **NextDine Multi-Tenant SaaS**: Independent restaurant dashboards and unique QR links.
- **Smart QR Ordering**: Customers scan table QR code to view live digital menus and order directly from mobile browsers.
- **Live Kitchen Order Engine**: Audio chimes, real-time status updates (Pending, Accepted, Completed), customer notes, and itemization.
- **Menu Management Catalog**: Categorized dishes, availability toggles, size options, extra add-ons, and photos.
- **Reports & Analytics**: Daily revenue trends, order volume charts (Recharts), top selling items, and CSV exports.
- **Super Admin Control Panel**: Outlet application verification, restaurant directory, block/unblock controls, and credential distribution.

## 🛠 Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v3 (custom NextDine SaaS design system)
- **Backend & Realtime**: Supabase (PostgreSQL + Realtime Subscriptions + RPC Functions)
- **Routing**: React Router v7
- **Icons**: Lucide React
- **QR Generation**: qrcode.react
- **Charts & Export**: Recharts + jsPDF + html2canvas

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run Development Server

```bash
npm run dev
```

Visit: `http://localhost:5173`

## 🔑 Demo Access Credentials

### Super Admin Panel
- **URL**: `http://localhost:5173/admin/login`
- **Email**: `admin@foodorder.com` or `admin@nextdine.com`
- **Password**: `admin123`

### Demo Restaurant Outlet
- **URL**: `http://localhost:5173/login`
- **Email**: `demorestaurant@gmail.com`
- **Password**: `ATVSW679`
- **Customer Ordering Menu**: `http://localhost:5173/menu/demo-restaurant`

## 🎨 Color Palette & Brand Specs

- **Brand Name**: NextDine
- **Tagline**: "Smart QR Ordering for Modern Restaurants"
- **Primary**: Deep Indigo (`#4F46E5`)
- **Secondary**: Slate Gray (`#475569`)
- **Accent**: Emerald (`#10B981`)
- **Background**: Light Slate (`#F8FAFC`)
- **Text**: Dark Slate (`#0F172A`)

---
© NextDine SaaS. All rights reserved.
