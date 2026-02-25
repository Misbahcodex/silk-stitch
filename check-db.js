const { PrismaClient } = require('@prisma/client');

async function checkDatabase() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Checking products and images...\n');
    
    const products = await prisma.product.findMany({
      include: {
        images: true
      },
      take: 5
    });
    
    products.forEach(product => {
      console.log(`Product: ${product.name}`);
      console.log(`Images: ${product.images.length}`);
      product.images.forEach((img, i) => {
        console.log(`  ${i + 1}. ${img.imageUrl}`);
      });
      console.log('---');
    });
    
    // Check for problematic JSON fields
    const productsWithJsonIssues = await prisma.product.findMany({
      where: {
        OR: [
          { sizes: { not: null } },
          { colors: { not: null } },
          { features: { not: null } }
        ]
      },
      take: 3
    });
    
    console.log('\nChecking JSON fields...');
    productsWithJsonIssues.forEach(product => {
      console.log(`Product: ${product.name}`);
      console.log(`Sizes: ${product.sizes}`);
      console.log(`Colors: ${product.colors}`);
      console.log(`Features: ${product.features}`);
      console.log('---');
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();