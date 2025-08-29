# NavonaAI - Cart Abandonment Prevention System

A modern, full-stack e-commerce application with intelligent cart abandonment detection and prevention built for NavonaAI's take-home assignment. Features real-time abandonment detection, dynamic coupon generation, and comprehensive analytics dashboard.

## 🎯 Assignment Overview

This project implements NavonaAI's Task A (Abandonment Detection & Prevention) with additional bonus features including an admin dashboard and smart product-level coupon controls. The system detects when users are about to abandon their cart and intervenes with targeted discount offers to recover potential sales.

## 🌐 Live Demo

**🔗 Application**: https://abandonment-cart-ictl98321-omarshahens-projects.vercel.app/  
**📊 Admin Dashboard**: https://abandonment-cart-ictl98321-omarshahens-projects.vercel.app/admin  

### Test Accounts
- **Store Demo**: No login required - browse products and test abandonment  
- **Admin Access**: Navigate to `/admin` for analytics and product management

## 🚀 Features

### 🛒 Cart Abandonment Prevention (Task A)
- **Smart Detection**: Multi-signal abandonment detection
  - **Desktop**: Exit intent detection when cursor moves to browser edge
  - **Mobile**: Idle timeout (15s) and fast scroll-up detection
  - **Cooldown**: 10-second cooldown between triggers to prevent spam
- **Dynamic Coupons**: Server-generated unique discount codes (10% off)
- **Prevention UI**: Beautiful modal popup with coupon display and checkout CTA
- **Session Management**: Shows popup once per session to avoid spam

### 📊 Admin Dashboard & Analytics
- **Performance Metrics**: Track abandonment events, coupon acceptance, and conversion rates
- **Trigger Analytics**: Breakdown by detection method (cursor leave, idle, scroll)
- **Product Management**: Configure which products accept discount coupons
- **Real-time Data**: Live analytics with comprehensive event tracking

### 🏪 Core E-commerce Functionality  
- **Product Catalog**: Browse products with detailed information
- **Shopping Cart**: Add, remove, and manage cart items with persistence
- **Checkout Flow**: Complete order process with coupon validation
- **Order Management**: Order creation and confirmation system
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Technical Highlights
- **Next.js 15**: App Router with Server Components
- **TypeScript**: Full type safety throughout the application
- **Prisma ORM**: Type-safe database operations with PostgreSQL
- **Zustand**: Lightweight state management for cart functionality
- **Modern UI**: Beautiful components with Tailwind CSS and Lucide icons

### Database Schema
- **Stores**: Multi-tenant store support
- **Products**: Product catalog with coupon eligibility flags
- **Orders**: Complete order management with coupon tracking
- **Abandonment Events**: Track detection events, triggers, and outcomes
- **Coupons**: Dynamic coupon generation with expiry and redemption tracking


## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- Git

## 🛠 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd navona-starter-store
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory:
```bash
# Database (PostgreSQL)
DATABASE_URL="postgresql://username:password@localhost:5432/navona_store"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Note**: Replace the DATABASE_URL with your actual PostgreSQL connection string. For development, you can use:
- Local PostgreSQL instance
- Docker PostgreSQL container  
- Cloud providers (Neon, Supabase, Railway, etc.)

### 4. Initialize Database
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Seed with sample data
npm run db:seed
```

**Alternative for development**:
```bash
# Reset database and apply schema changes
npx prisma db push

# Seed with sample data
npm run db:seed
```

### 5. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
navonaai-starter-store/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── admin/             # Admin dashboard
│   │   │   ├── analytics/     # Abandonment analytics page
│   │   │   ├── products/      # Product coupon settings
│   │   │   └── page.tsx       # Admin home
│   │   ├── api/               # API routes
│   │   │   ├── abandonment-events/ # Abandonment tracking API
│   │   │   ├── coupons/validate/   # Coupon validation API
│   │   │   ├── orders/        # Order management API
│   │   │   └── products/      # Product management API
│   │   ├── cart/              # Cart page
│   │   ├── checkout/          # Checkout page with coupon support
│   │   ├── product/[id]/      # Product detail pages
│   │   ├── thank-you/         # Order confirmation
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable UI components
│   │   ├── admin/             # Admin dashboard components
│   │   │   ├── AdminTable.tsx # Data table component
│   │   │   ├── AdminTabs.tsx  # Navigation tabs
│   │   │   ├── MetricCard.tsx # Analytics metric cards
│   │   │   └── StatsCard.tsx  # Statistics display
│   │   ├── AdminLayout.tsx    # Admin layout wrapper
│   │   ├── CartSidebar.tsx    # Sliding cart panel
│   │   ├── ExitIntentPopup.tsx # Abandonment detection popup
│   │   ├── Layout.tsx         # Main layout wrapper
│   │   ├── Loader.tsx         # Loading spinner
│   │   └── ProductCard.tsx    # Product display card
│   └── lib/                   # Utilities and configuration
│       ├── validation/        # Zod validation schemas
│       ├── db.ts              # Prisma client
│       ├── error-handler.ts   # API error handling
│       ├── store.ts           # Zustand cart store
│       ├── types.ts           # TypeScript types
│       └── utils.ts           # Helper functions
├── prisma/
│   ├── migrations/            # Database migration files
│   ├── schema.prisma          # Database schema with abandonment tracking
│   └── seed.ts                # Database seeding script
├── public/                    # Static assets
├── ABANDONMENT_DETECTION_V2.md # Technical documentation
├── DEPLOYMENT.md              # Deployment instructions
├── package.json               # Dependencies and scripts
└── tailwind.config.ts         # Tailwind CSS configuration
```

## 🎯 Features Overview

This starter store provides a complete foundation for modern e-commerce applications. The codebase is designed to be easily extensible and includes all the necessary infrastructure for a complete shopping experience.

### What's Already Built
✅ **Complete E-commerce Flow**: Product browsing → Cart → Checkout → Confirmation  
✅ **Database Schema**: Complete e-commerce data models  
✅ **Modern UI**: Beautiful, responsive design with smooth animations  
✅ **State Management**: Persistent cart with Zustand  
✅ **API Routes**: Product and order management endpoints  

### Key Integration Points

1. **Database Schema**: Complete data models in `prisma/schema.prisma`
2. **Session Management**: Available in `src/lib/utils.ts`
3. **Cart State**: Zustand store in `src/lib/store.ts`
4. **API Routes**: Extend `/api` endpoints for new functionality

### Extensibility

This starter template is designed to be easily extended with additional e-commerce features. The clean architecture and modern tech stack provide a solid foundation for building upon.

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run db:seed         # Seed database with sample data
npm run db:reset        # Reset database and reseed
npx prisma studio       # Open Prisma Studio (database GUI)

# Code Quality
npm run lint            # Run ESLint
```

## 🎨 Customization

### Styling
- **Primary Colors**: Blue gradient (`from-blue-600 to-purple-600`)
- **Font**: Inter with custom font features
- **Components**: Tailwind CSS with custom utilities
- **Animations**: Subtle hover effects and transitions

### Database
- **ORM**: Prisma with PostgreSQL (production-ready setup)
- **Migrations**: Use `npx prisma migrate dev` for schema changes
- **Seeding**: Modify `prisma/seed.ts` for custom sample data

### State Management
- **Cart**: Zustand with localStorage persistence
- **Sessions**: Browser localStorage with server-side session management
- **Forms**: React controlled components with validation

## 🧪 Testing Abandonment Detection

### Quick Test Guide
1. **Add Products to Cart**: Browse the store and add items to your cart
2. **Trigger Abandonment Detection**:
   - **Desktop**: Move your cursor to the browser's close button or tab edge
   - **Mobile**: Either wait 15 seconds without interaction or scroll up quickly
3. **See Prevention Popup**: A modal should appear offering a 10% discount coupon
4. **Apply Coupon**: Click "Apply Coupon" to go to checkout with the discount pre-filled
5. **Complete Order**: Fill out checkout form to complete the conversion flow

### Admin Testing
1. **Navigate to `/admin`**: View abandonment analytics and metrics
2. **Product Settings**: Go to `/admin/products` to enable/disable coupon eligibility
3. **Analytics Dashboard**: View real-time abandonment events and conversion rates

### Test Scenarios  
1. **Browse Products**: Navigate through the product catalog
2. **Cart Abandonment**: Test different abandonment triggers (cursor, idle, scroll)
3. **Coupon Flow**: Test coupon generation, validation, and checkout integration
4. **Admin Dashboard**: Review analytics and configure product settings
5. **Mobile Testing**: Test abandonment detection on mobile devices

## 📦 Dependencies

### Core Framework
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript**: Type safety and developer experience

### Database & State
- **Prisma**: Type-safe ORM with PostgreSQL
- **Zustand**: Lightweight state management
- **@prisma/client**: Database client generation

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Inter Font**: Modern typography
- **clsx**: Conditional class names

### Development Tools
- **ESLint**: Code linting and formatting
- **TypeScript**: Static type checking
- **PostCSS**: CSS processing

## 📋 Assignment Deliverables

### ✅ Completed Requirements
- **Task A**: Full abandonment detection and prevention system
- **Database**: Complete event tracking with Prisma schema
- **Prevention UI**: Modal popup with dynamic coupon generation
- **Admin Dashboard**: Analytics and product management interfaces
- **Deployment**: Live application with working demo
- **Documentation**: Setup instructions and testing guide

### 🏗️ Technical Architecture
```
abandonment-prevention/
├── Detection Logic: ExitIntentPopup.tsx
├── API Endpoints: /api/abandonment-events, /api/coupons
├── Database: Prisma schema with event tracking
├── Admin Dashboard: /admin (analytics + product settings)
├── Prevention UI: Modal with coupon generation
└── Analytics: Real-time conversion tracking
```

### 🎯 Assignment Status: 6/7 Hard Requirements Met
- ✅ A2. Prevention UI appears once per session with CTA
- ✅ A3. Dynamic coupons work end-to-end with validation
- ✅ A4. All abandonment events are persisted in database
- ✅ A5. Clear README with setup and testing instructions
- ✅ A6. Professional UX with mobile responsiveness
- ✅ A7. Deployed application with live demo URL
- ⚠️ A1. Standalone app (not Shopify theme extension)

### 🚀 Bonus Features Implemented
- **B1**: Dynamic coupons with expiry per session ✅
- **B3**: Enhanced detection combining multiple signals ✅  
- **B4**: Admin dashboard for product coupon eligibility ✅

## 📝 Implementation Notes

This implementation focuses on demonstrating core abandonment prevention logic with a standalone Next.js application. The system successfully detects cart abandonment across desktop and mobile devices, generates dynamic coupons, and tracks conversion analytics.

**Key Technical Decisions:**
- Multi-signal detection approach (cursor leave + idle + scroll)
- Dynamic server-side coupon generation with expiry
- Comprehensive admin analytics dashboard
- Product-level coupon eligibility controls
- Session-based popup prevention to avoid spam

---

**Assignment Status: Production Ready** 🎉  
*Complete abandonment prevention system with analytics and admin controls ready for evaluation.*
