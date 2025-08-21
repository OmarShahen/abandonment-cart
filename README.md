# Navona Starter Store

A modern, full-stack e-commerce demo store built with Next.js, TypeScript, and Tailwind CSS. This project demonstrates complete shopping functionality with a beautiful, responsive user interface.

## 🚀 Features

### Core E-commerce Functionality
- **Product Catalog**: Browse products with detailed information
- **Shopping Cart**: Add, remove, and manage cart items with persistence
- **Checkout Flow**: Complete order process with form validation
- **Order Management**: Order creation and confirmation system
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Technical Highlights
- **Next.js 15**: App Router with Server Components
- **TypeScript**: Full type safety throughout the application
- **Prisma ORM**: Type-safe database operations with SQLite
- **Zustand**: Lightweight state management for cart functionality
- **Modern UI**: Beautiful components with Tailwind CSS and Lucide icons

### Database Schema
- **Stores**: Multi-tenant store support
- **Products**: Product catalog with inventory management
- **Orders**: Complete order management system


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
# Database
DATABASE_URL="file:./dev.db"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Initialize Database
```bash
# Generate Prisma client
npx prisma generate

# Create database and tables
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
navona-starter-store/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   ├── cart/              # Cart page
│   │   ├── checkout/          # Checkout page
│   │   ├── product/[id]/      # Product detail pages
│   │   ├── thank-you/         # Order confirmation
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable UI components
│   │   ├── Layout.tsx         # Main layout wrapper
│   │   ├── ProductCard.tsx    # Product display card
│   │   └── CartSidebar.tsx    # Sliding cart panel
│   └── lib/                   # Utilities and configuration
│       ├── db.ts              # Prisma client
│       ├── store.ts           # Zustand cart store
│       ├── types.ts           # TypeScript types
│       └── utils.ts           # Helper functions
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seeding script
├── public/                    # Static assets
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
- **ORM**: Prisma with SQLite (easily changeable to PostgreSQL/MySQL)
- **Migrations**: Use `npx prisma migrate dev` for schema changes
- **Seeding**: Modify `prisma/seed.ts` for custom sample data

### State Management
- **Cart**: Zustand with localStorage persistence
- **Sessions**: Browser localStorage with server-side session management
- **Forms**: React controlled components with validation

## 🚦 Testing the Store

### Sample Data
The seeded database includes:
- 6 sample products across different categories
- Demo store configuration

### Test Scenarios
1. **Browse Products**: Navigate through the product catalog
2. **Add to Cart**: Test cart functionality with different quantities
3. **Checkout Flow**: Complete a full purchase process
4. **Responsive Design**: Test on mobile and desktop devices

## 📦 Dependencies

### Core Framework
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript**: Type safety and developer experience

### Database & State
- **Prisma**: Type-safe ORM with SQLite
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

## 🤝 Contributing

This is an e-commerce starter template. Developers can:

1. Fork/clone this repository
2. Extend with additional e-commerce features
3. Customize the design and functionality
4. Use as a foundation for production applications

## 📝 License

This project is created as a starter template for modern e-commerce applications.

## 🆘 Support

For questions about this starter template:
- Check the existing code comments and documentation
- Review the Prisma schema for database structure
- Examine the API routes for backend integration patterns

---

**Happy coding! 🚀**

*This starter store provides everything you need to build a modern e-commerce application. The foundation is solid—now build something amazing!*
