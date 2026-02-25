# Silk Stitch - E-commerce Website

A modern, responsive e-commerce website built with Next.js 14, Tailwind CSS, and TypeScript.

## 🚀 Features

### Customer Features
- **Homepage** with hero sections, product showcases, and testimonials
- **Shop Page** with product grid, filters, and search
- **Collections Page** showcasing curated fashion collections
- **Product Detail Pages** with image galleries and purchase options
- **Responsive Design** optimized for all devices
- **Authentication System** with login, signup, and password recovery

### Admin Features
- **Admin Dashboard** for product management
- **Product Management** - Add, edit, and delete products
- **Image Upload** support for product photos
- **Category Management** for organizing products
- **Inventory Control** with real-time updates

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Google Fonts (Inria Serif)
- **Images**: Next.js Image Optimization
- **Database**: SQLite (development) / PostgreSQL (production)
- **ORM**: Prisma (recommended)
- **Authentication**: NextAuth.js (recommended)
- **File Upload**: Cloudinary or AWS S3 (recommended)

## 📁 Project Structure

```
ecommerce-website/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Homepage
│   │   ├── shop/              # Shop pages
│   │   ├── collections/       # Collections page
│   │   ├── admin/             # Admin dashboard
│   │   └── layout.tsx         # Root layout
│   ├── components/             # React components
│   │   ├── Navbar.tsx         # Navigation bar
│   │   ├── HeroSection.tsx    # Hero sections
│   │   ├── ShopPage.tsx       # Shop page component
│   │   ├── CollectionsPage.tsx # Collections page
│   │   ├── AdminDashboard.tsx # Admin dashboard
│   │   ├── ProductForm.tsx    # Product form
│   │   ├── ProductList.tsx    # Product list
│   │   └── AuthModal.tsx      # Authentication modal
│   └── styles/                 # Global styles
├── public/                     # Static assets
│   └── images/                 # SVG images and logos
├── tailwind.config.ts          # Tailwind configuration
├── next.config.js              # Next.js configuration
└── package.json                # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

### Option 1: SQLite (Development)

1. **Install Prisma**
   ```bash
   npm install prisma @prisma/client
   npx prisma init
   ```

2. **Configure database schema** in `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = "file:./dev.db"
   }

   generator client {
     provider = "prisma-client-js"
   }

   model Product {
     id            Int      @id @default(autoincrement())
     name          String
     description   String?
     price         Decimal
     originalPrice Decimal?
     category      String
     brand         String?
     rating        Decimal? @default(0)
     reviewsCount  Int      @default(0)
     isNew         Boolean  @default(false)
     isSale        Boolean  @default(false)
     sizes         String?  // JSON array
     colors        String?  // JSON array
     features      String?  // JSON array
     shippingInfo  String?
     returnPolicy  String?
     createdAt     DateTime @default(now())
     updatedAt     DateTime @updatedAt
     images        ProductImage[]
   }

   model ProductImage {
     id         Int      @id @default(autoincrement())
     productId  Int
     imageUrl   String
     isPrimary  Boolean  @default(false)
     sortOrder  Int      @default(0)
     product    Product  @relation(fields: [productId], references: [id])
   }

   model Category {
     id          Int        @id @default(autoincrement())
     name        String
     slug        String     @unique
     description String?
     parentId    Int?
     parent      Category?  @relation("CategoryHierarchy", fields: [parentId], references: [id])
     children    Category[] @relation("CategoryHierarchy")
   }
   ```

3. **Generate and run migrations**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

### Option 2: PostgreSQL / Neon (Production)

The project is configured for **Neon PostgreSQL**. Set these environment variables:

1. **DATABASE_URL** - Pooled connection (from Neon dashboard, use the connection string with `-pooler` in host)
2. **DIRECT_URL** - Direct connection (same as above but remove `-pooler` from host for migrations)

3. **Push schema to database** (run once before first deploy):
   ```bash
   npx prisma db push
   npm run seed        # Optional: add sample products
   npm run admin-seed  # Optional: create admin user (admin@silkstitch.com / admin123)
   ```

## 🚀 Vercel Deployment

1. **Push your code** to GitHub and import the project in Vercel
2. **Add environment variables** in Vercel Project Settings → Environment Variables:
   - `DATABASE_URL` - Your Neon pooled connection string
   - `DIRECT_URL` - Your Neon direct connection string  
   - `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL` - Your production URL (e.g. `https://your-app.vercel.app`)
3. **Deploy** - Vercel will run `prisma generate && next build` automatically

## 🔐 Authentication Setup

### Install NextAuth.js

```bash
npm install next-auth
```

### Configure authentication in `src/app/api/auth/[...nextauth]/route.ts`:

```typescript
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Add your authentication logic here
        // Check against database, validate credentials, etc.
        return null;
      }
    }),
  ],
  pages: {
    signIn: '/admin',
  },
  callbacks: {
    async jwt({ token, user }) {
      return token;
    },
    async session({ session, token }) {
      return session;
    },
  },
});

export { handler as GET, handler as POST };
```

## 📸 Image Upload Setup

### Option 1: Cloudinary

1. **Install Cloudinary**
   ```bash
   npm install cloudinary
   ```

2. **Configure environment variables**:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

### Option 2: AWS S3

1. **Install AWS SDK**
   ```bash
   npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
   ```

2. **Configure environment variables**:
   ```env
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   AWS_REGION=your_region
   AWS_S3_BUCKET=your_bucket_name
   ```

## 🎨 Customization

### Colors
The website uses a custom color palette defined in Tailwind config:
- Primary: `#6A2C70` (Dark Purple)
- Secondary: `#E91E63` (Pink)
- Accent: `#C8A2C8` (Light Purple)

### Fonts
- **Primary Font**: Inria Serif (Google Fonts)
- Applied globally through CSS variables

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Set environment variables**
4. **Deploy**

### Other Platforms

- **Netlify**: Compatible with Next.js
- **Railway**: Good for full-stack apps
- **DigitalOcean**: Self-hosted option

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
```

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration
- **Prettier**: Code formatting
- **Tailwind**: Utility-first CSS

## 📝 API Routes

### Product Management

- `POST /api/products` - Create product
- `GET /api/products` - Get all products
- `GET /api/products/[id]` - Get product by ID
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Image Upload

- `POST /api/upload` - Upload product images
- `DELETE /api/upload/[id]` - Delete image

## 🧪 Testing

```bash
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

## 📊 Performance

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Images and components
- **SEO**: Meta tags and structured data

## 🔒 Security

- **Input Validation**: Form validation and sanitization
- **Authentication**: Protected admin routes
- **CSRF Protection**: Built-in Next.js protection
- **Environment Variables**: Secure configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Basic e-commerce functionality
- ✅ Admin dashboard
- ✅ Product management
- ✅ Responsive design

### Phase 2 (Next)
- 🔄 Shopping cart functionality
- 🔄 User authentication
- 🔄 Order management
- 🔄 Payment integration

### Phase 3 (Future)
- 📋 Advanced analytics
- 📋 Multi-language support
- 📋 Mobile app
- 📋 AI-powered recommendations

---

**Built with ❤️ using Next.js, Tailwind CSS, and TypeScript**
