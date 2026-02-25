import ProductDetail from '@/components/ProductDetail';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

function safeJsonParse(jsonString: string | null, fallback: unknown = null) {
  if (!jsonString) return fallback;
  try {
    return JSON.parse(jsonString);
  } catch {
    return fallback;
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productId = parseInt(id);
  if (isNaN(productId)) notFound();

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { images: { orderBy: { sortOrder: 'asc' } } },
  });

  if (!product) notFound();

  const transformedProduct = {
    id: product.id,
    name: product.name,
    description: product.description || '',
    price: product.price,
    originalPrice: product.originalPrice ?? undefined,
    category: product.category,
    brand: product.brand ?? undefined,
    rating: product.rating,
    reviewsCount: product.reviewsCount,
    isNew: product.isNew,
    isSale: product.isSale,
    images: product.images.map((img) => img.imageUrl),
    sizes: (safeJsonParse(product.sizes, []) as string[]) || [],
    colors: (safeJsonParse(product.colors, []) as string[]) || [],
    features: (safeJsonParse(product.features, []) as string[]) || [],
    shippingInfo: product.shippingInfo || '',
    returnPolicy: product.returnPolicy || '',
  };

  return <ProductDetail product={transformedProduct} />;
}
