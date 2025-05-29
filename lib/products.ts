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
    // price: 0.003,
    category: "tees",
    images: [
      "/placeholder.png5.jpg",
      "/placeholder.png4.jpg",
      "/placeholder.png6.jpg",
      "/placeholder.png4.jpg",
    ],
    description:
      "Become part of the ghost army with this premium ZULE tee featuring our iconic AI ghost design. Made from 100% organic cotton with a modern fit. Wear the code that breaks the CAPTCHA.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Blue", "Black", "Green"],
    featured: true,
    relatedProducts: ["captcha-breaker-hoodie", "mesh-cap"],
  },
  {
    id: "captcha-breaker-hoodie",
    name: "CAPTCHA Breaker Hoodie",
    price: 0.25,
    category: "hoodies",
    images: [
       "/Zulehoodie1.jpg",
       "/Zulehoodie2.jpg",
       "/Zulehoodie3.jpg",
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
      "/Zulecap1.jpg",
      "/Zulecap2.jpg",
      "/Zulecap3.jpg",
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
    name: "$ZULE Token Tee",
    price: 0.12,
    category: "tees",
    images: [
      "/ZuleTee1.jpg",
      "/ZuleTee2.jpg",
      "/ZuleTee3.jpg",
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
      "/ZulehoodieNoface1.jpg",
      "/ZulehoodieNoface2.jpg",
      "/ZulehoodieNoface3.jpg",
    ],
    description:
      "Premium heavyweight hoodie with large ZULE ghost graphic on the back and subtle logo on the front. Made from sustainable materials.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Neon Blue", "Cyber Gray"],
    relatedProducts: ["captcha-breaker-hoodie", "token-holder-tee"],
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
