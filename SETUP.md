# 🚀 Setup Instructions

Follow these steps to get your Korean fashion e-commerce website up and running:

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

## Step-by-Step Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Environment Variables
Copy the example environment file:
```bash
copy .env.example .env.local
```

Make sure your `.env.local` contains:
```env
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-jwt-secret-key-here"
```

### 3. Initialize Database
```bash
# Generate Prisma client
npx prisma generate

# Create database and run migrations
npx prisma db push

# Seed database with sample Korean fashion products
npm run seed

# Create admin user
npm run admin-seed
```

### 4. Start Development Server
```bash
npm run dev
```

Your website will be available at: **http://localhost:3000**

## 🎯 Default Accounts

### Admin Account (for store management)
- **Email**: `admin@silkstitch.com`
- **Password**: `admin123`
- **Access**: Admin Dashboard at `/admin`

### Customer Account
- You can create customer accounts through the website's signup form
- Click "Sign Up" in the navigation bar

## 🔑 Authentication Features

### For Customers:
- **Sign Up**: Create new customer account
- **Login**: Access existing account
- **Profile**: View account information
- **Orders**: View order history (placeholder)
- **Shopping Cart**: Persistent cart with local storage

### For Admins:
- **Admin Login**: Access admin dashboard
- **Product Management**: Full CRUD operations
- **User Management**: View user roles
- **Analytics**: Basic dashboard (expandable)

## 📱 How to Use

### Customer Flow:
1. Browse products on the homepage or shop page
2. Click "Sign Up" to create an account
3. Login with your credentials
4. Add products to cart
5. View cart and proceed to checkout
6. Access profile and order history from user menu

### Admin Flow:
1. Navigate to `/admin/login`
2. Login with admin credentials
3. Manage products, view analytics
4. Access regular customer features as well

## 🛠️ Available Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run seed         # Seed products database
npm run admin-seed   # Create admin user
```

## 🎨 Features Included

- ✅ **User Authentication**: Login, Signup, Logout
- ✅ **Shopping Cart**: Add/remove products, persistent storage
- ✅ **Product Catalog**: Korean fashion items with search/filter
- ✅ **Admin Dashboard**: Product management, user roles
- ✅ **Responsive Design**: Mobile-friendly interface
- ✅ **Profile Management**: User account pages
- ✅ **Real Database**: SQLite with Prisma ORM

## 🔧 Troubleshooting

### Database Issues:
```bash
# Reset database
rm prisma/dev.db
npx prisma db push
npm run seed
npm run admin-seed
```

### Authentication Issues:
- Clear browser cache and cookies
- Check `.env.local` file exists with correct values
- Restart development server

### Module Not Found:
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

## 🎉 You're Ready!

Your Korean fashion e-commerce website is now fully functional with user authentication, shopping cart, and admin management capabilities!

Visit **http://localhost:3000** to start exploring your website.