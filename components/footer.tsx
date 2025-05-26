import Link from "next/link"
import { Twitter, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold text-cyan-400">ZULE MESH</h3>
            <p className="text-gray-400 text-sm">AI revolution merchandise</p>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex space-x-6 text-sm">
              <Link href="/shop" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Shop
              </Link>
              <Link href="/tracking" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Track Order
              </Link>
              <Link href="/about" className="text-gray-400 hover:text-cyan-400 transition-colors">
                About
              </Link>
            </div>

            <div className="flex space-x-3">
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Github className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-6 text-center">
          <p className="text-gray-500 text-xs">© 2025 ZULE MESH</p>
        </div>
      </div>
    </footer>
  )
}
