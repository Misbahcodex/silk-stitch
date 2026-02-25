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

// GET /api/products/[id] - Get product by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' }
        }
      }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Transform product to include image URLs and parsed arrays
    const transformedProduct = {
      ...product,
      images: product.images.map(img => img.imageUrl),
      sizes: product.sizes ? safeJsonParse(product.sizes, []) : [],
      colors: product.colors ? safeJsonParse(product.colors, []) : [],
      features: product.features ? safeJsonParse(product.features, []) : []
    };

    return NextResponse.json(transformedProduct);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id] - Update product
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

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

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Update product
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name: name || existingProduct.name,
        description: description !== undefined ? description : existingProduct.description,
        price: price ? parseFloat(price) : existingProduct.price,
        originalPrice: originalPrice !== undefined ? (originalPrice ? parseFloat(originalPrice) : null) : existingProduct.originalPrice,
        category: category || existingProduct.category,
        brand: brand !== undefined ? brand : existingProduct.brand,
        sizes: sizes ? JSON.stringify(sizes) : existingProduct.sizes,
        colors: colors ? JSON.stringify(colors) : existingProduct.colors,
        features: features ? JSON.stringify(features) : existingProduct.features,
        shippingInfo: shippingInfo !== undefined ? shippingInfo : existingProduct.shippingInfo,
        returnPolicy: returnPolicy !== undefined ? returnPolicy : existingProduct.returnPolicy,
        isNew: isNew !== undefined ? isNew : existingProduct.isNew,
        isSale: isSale !== undefined ? isSale : existingProduct.isSale
      }
    });

    // Update images if provided
    if (images && images.length > 0) {
      // Delete existing images
      await prisma.productImage.deleteMany({
        where: { productId }
      });

      // Create new images
      await Promise.all(
        images.map((imageUrl: string, index: number) =>
          prisma.productImage.create({
            data: {
              productId,
              imageUrl,
              isPrimary: index === 0,
              sortOrder: index
            }
          })
        )
      );
    }

    return NextResponse.json({
      message: 'Product updated successfully',
      product: {
        ...updatedProduct,
        sizes: sizes || (existingProduct.sizes ? JSON.parse(existingProduct.sizes) : []),
        colors: colors || (existingProduct.colors ? JSON.parse(existingProduct.colors) : []),
        features: features || (existingProduct.features ? JSON.parse(existingProduct.features) : []),
        images: images || []
      }
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] - Delete product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Delete product (images will be deleted automatically due to cascade)
    await prisma.product.delete({
      where: { id: productId }
    });

    return NextResponse.json({
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
