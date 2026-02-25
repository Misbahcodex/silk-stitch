const { PrismaClient } = require('@prisma/client');

const workingImageUrls = [
  'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=700&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=700&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=700&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=700&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&h=700&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&h=700&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=700&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600&h=700&fit=crop&auto=format'
];

const problematicUrls = [
  'https://images.unsplash.com/photo-1564257631407-3c5275e3a6e4?w=600&h=700&fit=crop',
  'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600&h=700&fit=crop',
  'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=700&fit=crop'
];

async function fixImages() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Fixing problematic image URLs...\n');
    
    for (const badUrl of problematicUrls) {
      const images = await prisma.productImage.findMany({
        where: { imageUrl: badUrl }
      });
      
      console.log(`Found ${images.length} instances of: ${badUrl}`);
      
      for (const image of images) {
        const randomWorkingUrl = workingImageUrls[Math.floor(Math.random() * workingImageUrls.length)];
        
        await prisma.productImage.update({
          where: { id: image.id },
          data: { imageUrl: randomWorkingUrl }
        });
        
        console.log(`  Updated image ID ${image.id} to: ${randomWorkingUrl}`);
      }
    }
    
    console.log('\nAll problematic images have been fixed!');
    
  } catch (error) {
    console.error('Error fixing images:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixImages();