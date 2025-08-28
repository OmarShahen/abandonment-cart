# Deployment Guide - PostgreSQL & Vercel

This guide explains how to deploy the Navona Store to Vercel with PostgreSQL database.

## 🚀 Quick Deployment to Vercel

### Option 1: Vercel Postgres (Recommended)

1. **Deploy to Vercel:**
   ```bash
   npx vercel
   ```

2. **Add Vercel Postgres:**
   - Go to your project dashboard on Vercel
   - Navigate to "Storage" tab
   - Click "Create Database" → "Postgres"
   - Vercel will automatically set the `DATABASE_URL` environment variable

3. **Seed the Database:**
   ```bash
   npx vercel env pull .env.local
   npm run db:seed
   ```

### Option 2: External PostgreSQL (Supabase/Railway)

1. **Create PostgreSQL Database:**
   - **Supabase**: Create project at [supabase.com](https://supabase.com)
   - **Railway**: Create project at [railway.app](https://railway.app)

2. **Set Environment Variable:**
   ```bash
   npx vercel env add DATABASE_URL
   # Paste your PostgreSQL connection string
   ```

3. **Deploy:**
   ```bash
   npx vercel --prod
   ```

## 🛠 Local Development with PostgreSQL

### Prerequisites
- PostgreSQL installed locally
- Database created (e.g., `navona_store`)

### Setup Steps
1. **Update `.env` file:**
   ```bash
   DATABASE_URL="postgresql://username:password@localhost:5432/navona_store"
   ```

2. **Run migrations:**
   ```bash
   npm run db:generate
   npx prisma migrate dev --name init
   ```

3. **Seed database:**
   ```bash
   npm run db:seed
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

## 📦 Available Scripts

```bash
npm run db:generate    # Generate Prisma client
npm run db:migrate     # Deploy migrations (production)
npm run db:seed        # Seed database with sample data
npm run vercel-build   # Build script for Vercel deployment
```

## 🔧 Environment Variables

### Required for Deployment:
- `DATABASE_URL` - PostgreSQL connection string (auto-set by Vercel Postgres)
- `NEXT_PUBLIC_APP_URL` - Your deployed app URL

### Example `.env.local`:
```bash
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/verceldb"
NEXT_PUBLIC_APP_URL="https://your-app.vercel.app"
```

## ✅ Deployment Checklist

- [ ] PostgreSQL database created
- [ ] Environment variables configured
- [ ] Database migrated
- [ ] Database seeded
- [ ] App deployed to Vercel
- [ ] Admin dashboard accessible at `/admin`

## 🐛 Troubleshooting

### Migration Issues:
```bash
# Reset and redeploy migrations
npx prisma migrate reset
npx prisma migrate deploy
npm run db:seed
```

### Connection Issues:
- Verify `DATABASE_URL` format
- Check database credentials
- Ensure database allows external connections

## 🎯 Post-Deployment

1. **Test the application:**
   - Browse products
   - Test cart functionality
   - Trigger abandonment popup
   - Access admin dashboard at `/admin`

2. **Admin Features:**
   - `/admin/products` - Manage product coupon settings
   - `/admin/analytics` - View abandonment metrics