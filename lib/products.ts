export interface Product {
  id: string
  name: string
  price: number
  category: string
  images: string[]
  description: string
  sizes: string[]
  colors: string[]
  featured?: boolean
  relatedProducts?: string[]
}

export const products: Product[] = [
  {
    id: "zule-ghost-tee",
    name: "ZULE Ghost Tee",
    price: 0.15,
    category: "tees",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop&crop=center",
    ],
    description:
      "Become part of the ghost army with this premium ZULE tee featuring our iconic AI ghost design. Made from 100% organic cotton with a modern fit. Wear the code that breaks the CAPTCHA.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Neon Blue", "Matrix Green"],
    featured: true,
    relatedProducts: ["captcha-breaker-hoodie", "mesh-cap"],
  },
  {
    id: "captcha-breaker-hoodie",
    name: "CAPTCHA Breaker Hoodie",
    price: 0.25,
    category: "hoodies",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=600&fit=crop&crop=center",
    ],
    description:
      "Premium heavyweight hoodie with ZULE branding and $ZULE token callouts. Features a kangaroo pocket and adjustable drawstring hood. Perfect for late-night coding sessions and representing the AI revolution.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Cyber Gray", "Neon Blue"],
    featured: true,
    relatedProducts: ["zule-ghost-tee", "token-holder-tee"],
  },
  {
    id: "mesh-cap",
    name: "ZULE Mesh Cap",
    price: 0.08,
    category: "caps",
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&h=600&fit=crop&crop=center",
    ],
    description:
      "Futuristic mesh cap with embroidered ZULE logo and adjustable snapback closure. Premium materials with moisture-wicking technology. Show your allegiance to the AI revolution in style.",
    sizes: ["One Size"],
    colors: ["Black", "Neon Blue", "Holographic"],
    featured: true,
    relatedProducts: ["zule-ghost-tee", "decentralized-cap"],
  },
  {
    id: "token-holder-tee",
    name: "$ZULE Token Holder Tee",
    price: 0.12,
    category: "tees",
    images: [
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop&crop=center",
    ],
    description:
      "Exclusive design for $ZULE token holders. Features glitch effects and Web3 messaging with premium screen printing that won't fade or crack.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Matrix Green", "Cyber Purple"],
    relatedProducts: ["zule-ghost-tee", "ai-ghost-hoodie"],
  },
  {
    id: "ai-ghost-hoodie",
    name: "AI Ghost Hoodie",
    price: 0.22,
    category: "hoodies",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=600&fit=crop&crop=center",
    ],
    description:
      "Premium heavyweight hoodie with large ZULE ghost graphic on the back and subtle logo on the front. Made from sustainable materials.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Neon Blue", "Cyber Gray"],
    relatedProducts: ["captcha-breaker-hoodie", "token-holder-tee"],
  },
  {
    id: "decentralized-cap",
    name: "Decentralized Cap",
    price: 0.09,
    category: "caps",
    images: [
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&h=600&fit=crop&crop=center",
    ],
    description:
      'Snapback cap with "DECENTRALIZED" embroidery and ZULE logo. Features a flat brim and structured crown for a modern look.',
    sizes: ["One Size"],
    colors: ["Black", "Neon Blue", "Matrix Green"],
    relatedProducts: ["mesh-cap", "zule-ghost-tee"],
  },
]

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}

export function getRelatedProducts(productId: string): Product[] {
  const product = getProduct(productId)
  if (!product?.relatedProducts) return []

  return product.relatedProducts.map((id) => getProduct(id)).filter(Boolean) as Product[]
}
