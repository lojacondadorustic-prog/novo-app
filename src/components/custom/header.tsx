"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/8b86afc1-b201-4b03-b4b5-6ab2d5e6e602.png" 
                  alt="NutriDog Pro Logo" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <span className="text-xl font-bold text-[#0F5A8A] hidden sm:block">
                NutriDog Pro
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/pantry"
              className="text-sm font-medium text-gray-700 hover:text-[#0F5A8A] transition-colors"
            >
              Pantry
            </Link>
            <Link
              href="/generate"
              className="text-sm font-medium text-gray-700 hover:text-[#0F5A8A] transition-colors"
            >
              Gerar Dieta
            </Link>
            <Link
              href="/weekly"
              className="text-sm font-medium text-gray-700 hover:text-[#0F5A8A] transition-colors"
            >
              Plano Semanal
            </Link>
            <Link
              href="/market"
              className="text-sm font-medium text-gray-700 hover:text-[#0F5A8A] transition-colors"
            >
              Marketplace
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <Link
              href="/subscription"
              className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#0F5A8A] px-4 py-2 text-sm font-medium text-white hover:bg-[#0F5A8A]/90 transition-colors"
            >
              Planos e Assinaturas
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-[#0F5A8A]"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              <Link
                href="/pantry"
                className="text-sm font-medium text-gray-700 hover:text-[#0F5A8A]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pantry
              </Link>
              <Link
                href="/generate"
                className="text-sm font-medium text-gray-700 hover:text-[#0F5A8A]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Gerar Dieta
              </Link>
              <Link
                href="/weekly"
                className="text-sm font-medium text-gray-700 hover:text-[#0F5A8A]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Plano Semanal
              </Link>
              <Link
                href="/market"
                className="text-sm font-medium text-gray-700 hover:text-[#0F5A8A]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Marketplace
              </Link>
              <Link
                href="/subscription"
                className="text-sm font-medium text-[#0F5A8A] hover:text-[#0F5A8A]/80"
                onClick={() => setMobileMenuOpen(false)}
              >
                Planos e Assinaturas
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
