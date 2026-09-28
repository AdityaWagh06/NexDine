# 🍽️ NextDine — Master Project Architecture & Operations Guide

Welcome to **NextDine** — a commercial-grade, QR-based restaurant ordering and Kitchen Display System (KDS) SaaS built for modern restaurant operations.

---

## 📂 1. Simplified Project Directory & Architecture Map

The project is structured clearly into distinct layers (Frontend, API Services/Backend, Database, and Central Admin Content Configuration):

```text
restaurant-ordering-saas-main/
├── 📄 .env                        <-- 🔑 YOUR API KEYS (Supabase URL & Anon Key)
├── 📄 .env.example                <-- Template for environment configuration
├── 📄 package.json                <-- Project dependencies & scripts
│
├── 📁 database/                   <-- 🗄️ DATABASE LAYER (PostgreSQL / Supabase)
│   ├── 📜 setup.sql               <-- Complete SQL database schema & initial data
│   └── 📜 README.md               <-- Database setup & Real-time replication instructions
│
├── 📁 src/                        <-- 💻 APPLICATION FRONTEND & BACKEND SERVICES
│   ├── 📁 config/                 <-- ⚙️ CONFIGURATION & CENTRAL CONTENT CONTROL
│   │   ├── 📜 adminContent.ts     <-- 🌟 MAIN CONTENT FILE (Edit ALL app text here!)
│   │   ├── 📜 config.ts           <-- App global settings, tax rate, currency symbol
│   │   └── 📜 supabase.ts         <-- Supabase database client initialization
│   │
│   ├── 📁 components/             <-- 🎨 REUSABLE UI DESIGN SYSTEM COMPONENTS
│   │   ├── 📁 ui/                 <-- Buttons, Cards, Modals, Badges, Inputs, Alerts
│   │   └── 📜 Navbar.tsx / Footer <-- Shared navigation elements
│   │
│   ├── 📁 pages/                  <-- 🖥️ USER SCREENS & INTERFACES
│   │   ├── 📁 public/             <-- Public Marketing & Auth (LandingPage, Login, Register)
│   │   ├── 📁 restaurant/         <-- Restaurant Manager (Dashboard, KDS Orders, Menu, QR Tables, Reports, Settings)
│   │   ├── 📁 customer/           <-- Customer QR Ordering (CustomerMenu - phone scanning flow)
│   │   └── 📁 admin/              <-- SaaS Platform Admin (Pending Approvals, Outlets Registry)
│   │
│   ├── 📁 services/               <-- ⚡ API & DATABASE SERVICE LAYER (Backend Logic)
│   │   ├── 📜 restaurantService.ts<-- Orders, Menu CRUD, 86'd stock toggle API calls
│   │   └── 📜 adminService.ts     <-- Restaurant approvals & admin management calls
│   │
│   └── 📁 utils/                  <-- 🛠️ UTILITIES & HELPERS
│       └── 📜 helpers.ts          <-- Currency formatting (₹), audio chimes, date helpers
```

---

## 🎯 2. What Has Been Done So Far (Project Achievements)

### 🌟 Centralized Admin Content Control
- Created **`src/config/adminContent.ts`**: Every text string, hero headline, slogan, button label, dashboard text, menu header, and customer ordering message across the app is now controlled in **one single file**.

### 📱 Customer QR Ordering Experience (`src/pages/customer/CustomerMenu.tsx`)
- Phone-first ordering flow with sticky category bar and live search.
- Automatic table recognition from QR link context (`?table=4`).
- Sticky bottom cart bar showing item counts & running totals.
- Reassuring order tracking drawer (`Received` → `Preparing` → `Ready`).

### 🍳 Kitchen Display System (KDS) (`src/pages/restaurant/Orders.tsx`)
- Column-based order queue optimized for high-volume kitchen screens.
- Scannable order tickets displaying table number, quantities, and elapsed time.
- Time-based color urgency (`Neutral` → `Warning` → `Overdue`).
- Audio chime notifications on incoming orders.
- Single-tap status advancement without confirmation prompts.

### 📋 Fast-Editing Menu Catalog (`src/pages/restaurant/Menu.tsx`)
- Category-grouped list/table view replacing bulky card grids.
- **Inline 86'd / In-Stock toggle**: Staff can instantly disable out-of-stock items with one tap without opening modals.

### 🪑 QR Table Inventory Registry (`src/pages/restaurant/QRTables.tsx`)
- Table-by-table registry with floor/section filters.
- Individual QR download/print and bulk download/print shortcuts.

### 🎨 Visual Polish & Intro Landing Page (`src/pages/public/LandingPage.tsx`)
- High-resolution restaurant operation photos added to hero and scenario cards.
- Clean slogan tagline: *"Faster Table Service. Zero Order Errors."*
- Removed trial references for clean `"Get Started Now"` and `"Register Outlet"` CTAs.

---

## 🔑 3. What You Need To Do Right Now (Immediate Setup)

### Step 1: Set Up Supabase Project & Copy API Keys
1. Create a free account at [Supabase.com](https://supabase.com).
2. Create a new project named **NextDine**.
3. Go to **Project Settings** → **API**.
4. Open the `.env` file in your project root (`c:\Users\Asus\OneDrive\Desktop\restaurant-ordering-saas-main\.env`).
5. Replace the placeholder credentials with your real keys:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 2: Run Database Setup SQL
1. In your Supabase Dashboard, open **SQL Editor**.
2. Click **New Query**.
3. Copy the entire contents of `database/setup.sql` and paste it into the editor.
4. Click **Run** (`Ctrl + Enter`).

### Step 3: Enable Real-time Replication (CRITICAL FOR LIVE KITCHEN)
1. In Supabase Dashboard, go to **Database** → **Replication**.
2. Toggle **ON** real-time replication for:
   - ✅ `orders` *(Powers instant kitchen screen updates & audio chimes)*
   - ✅ `menu_items` *(Powers instant 86'd out-of-stock customer menu updates)*
   - ✅ `restaurants`
   - ✅ `registration_requests`

---

## 🚀 4. Recommended Enhancements for Next Version (Version 2.0 Roadmap)

Here are the top high-value features recommended for your next version release:

1. **WhatsApp Order Notifications**:
   - Integrate WhatsApp API (Twilio / Meta WhatsApp Business API) to send automated order confirmation & bill summaries directly to customers' mobile phones.

2. **Thermal Receipt Printer Integration**:
   - Add ESC/POS Bluetooth / WebUSB printing support so kitchen staff can print physical order tickets directly onto 80mm POS thermal receipt printers.

3. **Table Bill Splitting & Multi-Payment**:
   - Allow customers at the same table to split their final bill equally or by item when paying.

4. **Multi-Language Support (Hindi & Regional Languages)**:
   - Extend `adminContent.ts` to support multi-language toggles (English, Hindi, Marathi, Gujarati, Tamil) for customer menu browsing and kitchen staff displays.

5. **Advanced Sales Analytics & CSV/Excel Export**:
   - Add peak-hour heatmaps, top-grossing items breakdown, and one-click Tally/Excel sales export options in the Reports page.

---

*Documentation maintained for NextDine v1.0 Production Release.*
