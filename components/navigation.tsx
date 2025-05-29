// "use client"

// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { ShoppingCart } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { useCart } from "@/components/cart-provider"

// export function Navigation() {
//   const pathname = usePathname()
//   const { items } = useCart()

//   const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

//   const navItems = [
//     { href: "/", label: "Home" },
//     { href: "/shop", label: "Shop" },
//     { href: "/tracking", label: "Track" },
//     { href: "/about", label: "About" },
//   ]

//   return (
//     <nav className="border-b border-gray-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           <Link href="/" className="text-xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors">
//             ZULE MESH
//           </Link>

//           <div className="hidden md:flex items-center space-x-8">
//             {navItems.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={`text-sm transition-colors ${
//                   pathname === item.href ? "text-cyan-400" : "text-gray-400"
//                 }`}
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </div>

//           <div className="flex items-center space-x-4">
//             <Link href="/cart">
//               <Button variant="ghost" size="icon" className="relative text-gray-400">
//                 <ShoppingCart className="h-5 w-5" />
//                 {itemCount > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-cyan-400 text-black text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px] font-medium">
//                     {itemCount}
//                   </span>
//                 )}
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }



"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { useState } from "react"

export function Navigation() {
  const pathname = usePathname()
  const { items } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/tracking", label: "Track" },
    { href: "/about", label: "About" },
  ]

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="border-b border-gray-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors">
            ZULE MESH
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${
                  pathname === item.href ? "text-cyan-400" : "text-gray-400 hover:text-cyan-400"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-cyan-400">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-cyan-400 text-black text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px] font-medium">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Hamburger Button for Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-400 hover:text-cyan-400"
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-64" : "max-h-0"
          }`}
        >
          <div className="flex flex-col space-y-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${
                  pathname === item.href ? "text-cyan-400" : "text-gray-400 hover:text-cyan-400"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}