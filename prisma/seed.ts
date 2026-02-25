import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // Use new instance for CLI scripts

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  await prisma.productImage.deleteMany({});
  await prisma.product.deleteMany({});
  
  // Create comprehensive Korean fashion products
  const products = [
    {
      name: "Korean Street Style Oversized Blazer",
      description: "This oversized blazer embodies the latest Korean street style trends. Made from premium wool blend fabric, it features a relaxed fit with structured shoulders and a modern silhouette. Perfect for layering over casual outfits or dressing up for special occasions.",
      price: 89.99,
      originalPrice: 129.99,
      category: "outerwear",
      brand: "Seoul Fashion",
      rating: 4.8,
      reviewsCount: 127,
      isNew: true,
      isSale: true,
      sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL']),
      colors: JSON.stringify(['Black', 'Navy', 'Beige']),
      features: JSON.stringify([
        "Premium wool blend fabric",
        "Relaxed oversized fit",
        "Structured shoulders",
        "Single button closure",
        "Side pockets",
        "Dry clean only"
      ]),
      shippingInfo: "Free shipping on orders over $100",
      returnPolicy: "30-day return policy",
      images: [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=700&fit=crop",
        "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600&h=700&fit=crop",
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=700&fit=crop"
      ]
    },
    {
      name: "K-Fashion High Waist Wide Leg Pants",
      description: "Elegant wide-leg pants with a high waist design, perfect for creating that effortless Korean chic look. Made from flowing fabric that drapes beautifully.",
      price: 65.99,
      originalPrice: null,
      category: "bottoms",
      brand: "Seoul Fashion",
      rating: 4.6,
      reviewsCount: 89,
      isNew: false,
      isSale: false,
      sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL']),
      colors: JSON.stringify(['Black', 'Navy', 'Cream', 'Khaki']),
      features: JSON.stringify([
        "High waisted design",
        "Wide leg silhouette",
        "Side zip closure",
        "Flowing fabric",
        "Machine washable"
      ]),
      shippingInfo: "Free shipping on orders over $100",
      returnPolicy: "30-day return policy",
      images: [
        "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600&h=700&fit=crop",
        "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&h=700&fit=crop"
      ]
    },
    {
      name: "Korean Minimalist Crop Top",
      description: "A versatile crop top with clean lines and minimalist design. Perfect for layering or wearing alone. Embodies the Korean aesthetic of simple elegance.",
      price: 45.99,
      originalPrice: null,
      category: "tops",
      brand: "Minimalist Seoul",
      rating: 4.7,
      reviewsCount: 156,
      isNew: true,
      isSale: false,
      sizes: JSON.stringify(['XS', 'S', 'M', 'L']),
      colors: JSON.stringify(['White', 'Black', 'Sage Green', 'Dusty Pink']),
      features: JSON.stringify([
        "Premium cotton blend",
        "Cropped length",
        "Round neckline",
        "Short sleeves",
        "Minimalist design"
      ]),
      shippingInfo: "Free shipping on orders over $100",
      returnPolicy: "30-day return policy",
      images: [
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=700&fit=crop",
        "https://images.unsplash.com/photo-1564257631407-3c5275e3a6e4?w=600&h=700&fit=crop"
      ]
    },
    {
      name: "K-Style Layered Midi Dress",
      description: "Sophisticated midi dress with layered details inspired by Korean fashion. Features a flattering A-line silhouette and elegant draping.",
      price: 78.99,
      originalPrice: 98.99,
      category: "dresses",
      brand: "Korea Couture",
      rating: 4.9,
      reviewsCount: 203,
      isNew: false,
      isSale: true,
      sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL']),
      colors: JSON.stringify(['Navy', 'Burgundy', 'Olive', 'Charcoal']),
      features: JSON.stringify([
        "Layered design details",
        "Midi length",
        "A-line silhouette",
        "Back zip closure",
        "Lined interior"
      ]),
      shippingInfo: "Free shipping on orders over $100",
      returnPolicy: "30-day return policy",
      images: [
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=700&fit=crop",
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=700&fit=crop"
      ]
    },
    {
      name: "Korean Streetwear Graphic Tee",
      description: "Trendy graphic t-shirt featuring Korean streetwear aesthetic. Soft cotton fabric with unique print design.",
      price: 38.99,
      originalPrice: null,
      category: "tops",
      brand: "Seoul Street",
      rating: 4.5,
      reviewsCount: 78,
      isNew: false,
      isSale: false,
      sizes: JSON.stringify(['S', 'M', 'L', 'XL', 'XXL']),
      colors: JSON.stringify(['White', 'Black', 'Gray']),
      features: JSON.stringify([
        "100% cotton",
        "Unique graphic design",
        "Relaxed fit",
        "Crew neck",
        "Machine washable"
      ]),
      shippingInfo: "Free shipping on orders over $100",
      returnPolicy: "30-day return policy",
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=700&fit=crop"
      ]
    },
    {
      name: "K-Fashion Denim Jacket",
      description: "Classic denim jacket with Korean fashion twist. Features modern cut and premium denim fabric. Perfect for layering.",
      price: 95.99,
      originalPrice: null,
      category: "outerwear",
      brand: "Seoul Denim Co.",
      rating: 4.7,
      reviewsCount: 142,
      isNew: false,
      isSale: false,
      sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL']),
      colors: JSON.stringify(['Light Blue', 'Dark Blue', 'Black']),
      features: JSON.stringify([
        "Premium denim fabric",
        "Classic button closure",
        "Chest pockets",
        "Modern fit",
        "Durable construction"
      ]),
      shippingInfo: "Free shipping on orders over $100",
      returnPolicy: "30-day return policy",
      images: [
        "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=700&fit=crop"
      ]
    },
    {
      name: "Korean Style Pleated Skirt",
      description: "Elegant pleated skirt with Korean feminine aesthetic. Features flattering A-line silhouette and quality pleating.",
      price: 52.99,
      originalPrice: null,
      category: "bottoms",
      brand: "Seoul Elegance",
      rating: 4.6,
      reviewsCount: 95,
      isNew: false,
      isSale: false,
      sizes: JSON.stringify(['XS', 'S', 'M', 'L']),
      colors: JSON.stringify(['Black', 'Navy', 'Plaid', 'Beige']),
      features: JSON.stringify([
        "Pleated design",
        "A-line silhouette",
        "High waisted",
        "Side zip closure",
        "Quality lining"
      ]),
      shippingInfo: "Free shipping on orders over $100",
      returnPolicy: "30-day return policy",
      images: [
        "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&h=700&fit=crop"
      ]
    },
    {
      name: "K-Beauty Inspired Silk Blouse",
      description: "Luxurious silk blouse inspired by Korean beauty and fashion. Features delicate details and premium silk fabric.",
      price: 68.99,
      originalPrice: null,
      category: "tops",
      brand: "Silk Stitch",
      rating: 4.8,
      reviewsCount: 167,
      isNew: true,
      isSale: false,
      sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL']),
      colors: JSON.stringify(['Ivory', 'Blush Pink', 'Sage', 'Navy']),
      features: JSON.stringify([
        "100% silk fabric",
        "Delicate button details",
        "Relaxed fit",
        "3/4 sleeves",
        "Dry clean only"
      ]),
      shippingInfo: "Free shipping on orders over $100",
      returnPolicy: "30-day return policy",
      images: [
        "https://images.unsplash.com/photo-1564257631407-3c5275e3a6e4?w=600&h=700&fit=crop"
      ]
    },
    {
      name: "Korean Street Style Cargo Pants",
      description: "Trendy cargo pants with Korean streetwear influence. Features multiple pockets and comfortable fit.",
      price: 72.99,
      originalPrice: 89.99,
      category: "bottoms",
      brand: "Seoul Street",
      rating: 4.4,
      reviewsCount: 113,
      isNew: false,
      isSale: true,
      sizes: JSON.stringify(['S', 'M', 'L', 'XL', 'XXL']),
      colors: JSON.stringify(['Olive', 'Black', 'Khaki']),
      features: JSON.stringify([
        "Multiple cargo pockets",
        "Adjustable waistband",
        "Durable fabric",
        "Relaxed fit",
        "Street style design"
      ]),
      shippingInfo: "Free shipping on orders over $100",
      returnPolicy: "30-day return policy",
      images: [
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=700&fit=crop"
      ]
    },
    {
      name: "K-Fashion Oversized Sweater",
      description: "Cozy oversized sweater perfect for Korean-inspired casual looks. Soft knit fabric with relaxed fit.",
      price: 82.99,
      originalPrice: null,
      category: "tops",
      brand: "Cozy Seoul",
      rating: 4.7,
      reviewsCount: 134,
      isNew: false,
      isSale: false,
      sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
      colors: JSON.stringify(['Cream', 'Gray', 'Dusty Pink', 'Lavender']),
      features: JSON.stringify([
        "Oversized fit",
        "Soft knit fabric",
        "Ribbed cuffs",
        "Round neckline",
        "Machine washable"
      ]),
      shippingInfo: "Free shipping on orders over $100",
      returnPolicy: "30-day return policy",
      images: [
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=700&fit=crop"
      ]
    },
    {
      name: "Korean Minimalist Maxi Dress",
      description: "Elegant maxi dress with minimalist Korean design. Features clean lines and flowing silhouette.",
      price: 88.99,
      originalPrice: null,
      category: "dresses",
      brand: "Minimalist Seoul",
      rating: 4.9,
      reviewsCount: 189,
      isNew: false,
      isSale: false,
      sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL']),
      colors: JSON.stringify(['Black', 'Navy', 'Olive', 'Camel']),
      features: JSON.stringify([
        "Maxi length",
        "Minimalist design",
        "Flowing fabric",
        "Side pockets",
        "Comfortable fit"
      ]),
      shippingInfo: "Free shipping on orders over $100",
      returnPolicy: "30-day return policy",
      images: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=700&fit=crop"
      ]
    },
    {
      name: "K-Style Bomber Jacket",
      description: "Trendy bomber jacket with Korean street style influence. Features premium materials and modern design.",
      price: 105.99,
      originalPrice: 135.99,
      category: "outerwear",
      brand: "Seoul Bombers",
      rating: 4.6,
      reviewsCount: 97,
      isNew: false,
      isSale: true,
      sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL']),
      colors: JSON.stringify(['Black', 'Olive', 'Navy']),
      features: JSON.stringify([
        "Premium bomber design",
        "Ribbed cuffs and hem",
        "Front zip closure",
        "Side pockets",
        "Lightweight fabric"
      ]),
      shippingInfo: "Free shipping on orders over $100",
      returnPolicy: "30-day return policy",
      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=700&fit=crop"
      ]
    }
  ];

  for (const productData of products) {
    const { images, ...productFields } = productData;
    
    // Create product
    const product = await prisma.product.create({
      data: productFields
    });

    // Create product images
    for (let i = 0; i < images.length; i++) {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          imageUrl: images[i],
          isPrimary: i === 0,
          sortOrder: i
        }
      });
    }

    console.log(`✅ Created product: ${product.name}`);
  }

  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
