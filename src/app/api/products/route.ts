import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function for safe JSON parsing
function safeJsonParse(jsonString: string, fallback: any = null) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.warn('JSON parse error:', error, 'Input:', jsonString);
    return fallback;
  }
}

// GET /api/products - Get all products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    
    if (category && category !== 'all') {
      where.category = category;
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Get products with pagination
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          images: {
            orderBy: { sortOrder: 'asc' }
          }
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.product.count({ where })
    ]);

    // Transform products to include image URLs
    const transformedProducts = products.map(product => ({
      ...product,
      images: product.images.map(img => img.imageUrl),
      sizes: product.sizes ? safeJsonParse(product.sizes, []) : [],
      colors: product.colors ? safeJsonParse(product.colors, []) : [],
      features: product.features ? safeJsonParse(product.features, []) : []
    }));

    return NextResponse.json({
      products: transformedProducts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST /api/products - Create new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      price,
      originalPrice,
      category,
      brand,
      sizes,
      colors,
      features,
      shippingInfo,
      returnPolicy,
      isNew,
      isSale,
      images
    } = body;

    // Validate required fields
    if (!name || !price || !category) {
      return NextResponse.json(
        { error: 'Name, price, and category are required' },
        { status: 400 }
      );
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        category,
        brand,
        sizes: sizes ? JSON.stringify(sizes) : null,
        colors: colors ? JSON.stringify(colors) : null,
        features: features ? JSON.stringify(features) : null,
        shippingInfo,
        returnPolicy,
        isNew: isNew || false,
        isSale: isSale || false
      }
    });

    // Create product images if provided
    if (images && images.length > 0) {
      await Promise.all(
        images.map((imageUrl: string, index: number) =>
          prisma.productImage.create({
            data: {
              productId: product.id,
              imageUrl,
              isPrimary: index === 0,
              sortOrder: index
            }
          })
        )
      );
    }

    return NextResponse.json({
      message: 'Product created successfully',
      product: {
        ...product,
        sizes: sizes || [],
        colors: colors || [],
        features: features || [],
        images
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
