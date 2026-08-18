import Link from 'next/link';
import { 
  Wrench, 
  ShieldCheck, 
  Truck, 
  Headphones, 
  Phone, 
  MapPin, 
  Flame, 
  Sparkles,
  MessageCircle
} from 'lucide-react';

export default function Footer() {
  const whatsappNumber = '256773944288';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello Phone Hub, I need support with an inquiry/order.')}`;

  return (
    <footer className="bg-white text-neutral-600 dark:bg-neutral-950 dark:text-neutral-300 border-t border-neutral-200 dark:border-neutral-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 1. TRUST BADGES */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pb-12 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-4 bg-neutral-50 dark:bg-neutral-900/60 p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80">
            <div className="p-3 bg-amber-500/10 text-amber-500 rounded-lg">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Genuine Parts</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Tested & Tech Certified</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-neutral-50 dark:bg-neutral-900/60 p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80">
            <div className="p-3 bg-amber-500/10 text-amber-500 rounded-lg">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Fast Delivery</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Across East Africa</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-neutral-50 dark:bg-neutral-900/60 p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80">
            <div className="p-3 bg-amber-500/10 text-amber-500 rounded-lg">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Pro Repairs</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Expert Technician Support</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-neutral-50 dark:bg-neutral-900/60 p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80">
            <div className="p-3 bg-amber-500/10 text-amber-500 rounded-lg">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white">24/7 Assistance</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Quick WhatsApp Response</p>
            </div>
          </div>
        </div>

        {/* 2. MAIN FOOTER CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          
          {/* Brand Info & Direct WhatsApp CTA */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-wider text-neutral-900 dark:text-white">
                PHONE<span className="text-amber-500">HUB</span>
              </span>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-sm">
              Your trusted partner for genuine smartphone screens, UK used phones, brand new devices, accessories, and professional repair tools across East Africa.
            </p>

            {/* Direct WhatsApp Support Button */}
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Support via WhatsApp (+256 773 944 288)</span>
              </a>
            </div>

            {/* Quick Location & Phone */}
            <div className="space-y-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>Kampala, Uganda</span>
              </div>
              <a href="tel:+256755754880" className="flex items-center gap-2 hover:text-amber-500 dark:hover:text-amber-400 transition-colors w-fit">
                <Phone className="w-4 h-4 text-amber-500" />
                <span>Call: +256 755 754 880</span>
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
              Shop Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/shop/phones" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Smartphones</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-semibold">New & Used</span>
                </Link>
              </li>
              <li>
                <Link href="/shop/screens" className="hover:text-amber-400 transition-colors">
                  Phone Screens & Spares
                </Link>
              </li>
              <li>
                <Link href="/shop/accessories" className="hover:text-amber-400 transition-colors">
                  Accessories & Chargers
                </Link>
              </li>
              <li>
                <Link href="/shop/tools" className="hover:text-amber-400 transition-colors">
                  Pro Repair Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
              Highlights
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/deals" className="text-red-400 font-semibold hover:text-red-300 transition-colors flex items-center gap-1.5">
                  <Flame className="w-4 h-4 fill-current" />
                  <span>Hot Deals</span>
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="text-amber-400 font-semibold hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Recently Introduced</span>
                </Link>
              </li>
              <li>
                <Link href="/wholesale" className="hover:text-amber-400 transition-colors">
                  Technician Wholesale
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links & Legal */}
          <div>
            <h3 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
              Follow Us
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.65 6.34 6.34 0 0 0 9.35 22a6.3 6.3 0 0 0 6.31-6.19V9.37a8.16 8.16 0 0 0 4.93 1.63v-3.5a4.86 4.86 0 0 1-1-.81z"/></svg>
                  <span>TikTok</span>
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a href="https://threads.net" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <span className="font-bold text-xs">@</span>
                  <span>Threads</span>
                </a>
              </li>
              <li>
                <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  <span>X (Twitter)</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* 3. COPYRIGHT */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} PhoneHub East Africa. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-neutral-700 dark:hover:text-neutral-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-neutral-700 dark:hover:text-neutral-400">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}