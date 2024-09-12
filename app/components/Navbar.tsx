// app/components/Navbar.tsx

'use client'

import Link from 'next/link'
import { useState } from 'react'

const categories = ['Travel', 'Cash', 'Electronics', 'Vehicles', 'Home & Garden', 'Fashion', 'Food & Drink']

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div>
              <Link href="/" className="flex items-center py-5 px-2 text-white hover:text-gray-200">
                <span className="font-bold">UberSweepstakes</span>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            {categories.map((category) => (
              <Link key={category} href={`/category/${category.toLowerCase().replace(' & ', '-')}`} className="py-5 px-3 text-white hover:text-gray-200">
                {category}
              </Link>
            ))}
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="mobile-menu-button">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        {categories.map((category) => (
          <Link key={category} href={`/category/${category.toLowerCase().replace(' & ', '-')}`} className="block py-2 px-4 text-sm hover:bg-blue-700">
            {category}
          </Link>
        ))}
      </div>
    </nav>
  )
}