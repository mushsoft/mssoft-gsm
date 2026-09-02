'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  ChevronDown,
  MessageCircle,
  Menu,
  X,
  PhoneCall,
  Flame,
  Smartphone,
  Wrench,
  Sparkles,
  Headphones,
  Cpu,
  Layers,
  CircuitBoard,
  GraduationCap,
  Stethoscope,
  UserCircle,
  type LucideIcon
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import SiteLogo from '@/components/SiteLogo';
import CartIcon from '@/components/cart/CartIcon';

interface SubCategory {
  title: string;
  href: string;
}

interface CategoryMenu {
  title: string;
  icon: LucideIcon;
  mainHref: string;
  subcategories: SubCategory[];
}

const CATEGORIES: CategoryMenu[] = [
  {
    title: 'PHONES',
    icon: Smartphone,
    mainHref: '/shop/phones',
    subcategories: [
      { title: 'Brand New Phones', href: '/shop/phones?condition=brand_new' },
      { title: 'UK Used Phones', href: '/shop/phones?condition=uk_used' },
      { title: 'iPhones / Apple', href: '/shop/phones?brand=apple' },
      { title: 'Samsung Galaxy', href: '/shop/phones?brand=samsung' },
      { title: 'Tecno & Infinix', href: '/shop/phones?brand=tecno' },
    ]
  },
  {
    title: 'TESTPOINTS',
    icon: CircuitBoard,
    mainHref: '/shop/testpoints',
    subcategories: [
      { title: 'Qualcomm EDL Testpoints', href: '/shop/testpoints?sub=qualcomm' },
      { title: 'MediaTek BROM Pinouts', href: '/shop/testpoints?sub=mediatek' },
      { title: 'Samsung Hardware ISP', href: '/shop/testpoints?sub=samsung-isp' },
      { title: 'iPhone Board Schematics', href: '/shop/testpoints?sub=iphone-tp' },
    ]
  },
  {
    title: 'REPAIR TOOLS',
    icon: Wrench,
    mainHref: '/shop/tools',
    subcategories: [
      { title: 'Blowers & Hot Air', href: '/shop/tools?sub=blowers' },
      { title: 'Separators', href: '/shop/tools?sub=separators' },
      { title: 'DC Power Supply', href: '/shop/tools?sub=power-supply' },
      { title: 'Microscopes', href: '/shop/tools?sub=microscopes' },
      { title: 'Multimeters', href: '/shop/tools?sub=multimeters' },
      { title: 'Soldering Guns', href: '/shop/tools?sub=soldering-guns' },
      { title: 'Laminators & Debubblers', href: '/shop/tools?sub=laminators' },
    ]
  },
  {
    title: 'SCREENS',
    icon: Sparkles,
    mainHref: '/shop/screens',
    subcategories: [
      { title: 'Touch Screens', href: '/shop/screens?sub=touch' },
      { title: 'Complete Screens', href: '/shop/screens?sub=complete' },
    ]
  },
  {
    title: 'ACCESSORIES',
    icon: Headphones,
    mainHref: '/shop/accessories',
    subcategories: [
      { title: 'Chargers & Powerbanks', href: '/shop/accessories?sub=chargers' },
    ]
  },
  {
    title: 'OTHER SPARES',
    icon: Layers,
    mainHref: '/shop/spares',
    subcategories: [
      { title: 'Back Covers & Housings', href: '/shop/spares?sub=housings' },
    ]
  },
  {
    title: 'KIDS TABS',
    icon: Cpu,
    mainHref: '/shop/kids-tabs',
    subcategories: [
      { title: 'Educational Tabs', href: '/shop/kids-tabs?sub=android' },
    ]
  }
];

export default function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileCategory, setActiveMobileCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const whatsappUrl = 'https://wa.me/256773944288';

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    // Utilize Next.js Router instead of triggering a hard reload
    router.push(`/shop?search=${encodeURIComponent(query)}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 text-[11px] py-1.5 px-4 text-neutral-600 dark:text-neutral-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Fast delivery across Kampala & East Africa</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-neutral-500 dark:text-neutral-400">
            <a href="tel:+256755754880" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <PhoneCall className="w-3 h-3 text-amber-500" />
              <span>Call: +256 755 754 880</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-3 h-3 text-emerald-500" />
              <span>WhatsApp: +256 773 944 288</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN BRANDING & SEARCH BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">

        {/* LOGO */}
        <Link href="/" className="group shrink-0">
          <SiteLogo size="sm" />
        </Link>

        {/* SEARCH BAR (Desktop) */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-lg relative items-center"
        >
          <input
            type="text"
            placeholder="Search EDL testpoints, blowers, screens, UK used phones..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 rounded-xl py-2.5 pl-10 pr-20 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
          />
          <Search className="w-4 h-4 text-neutral-400 dark:text-neutral-500 absolute left-3.5 pointer-events-none" />
          <button
            type="submit"
            className="absolute right-1.5 px-3 py-1 bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs rounded-lg transition-colors"
          >
            Search
          </button>
        </form>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Always visible (unlike the Account icon) — the cart is core to
              commerce here, not something only a logged-in visitor needs. */}
          <CartIcon />

          <Link
            href="/account"
            aria-label="My Account"
            className="hidden sm:flex items-center justify-center p-2 text-neutral-600 dark:text-neutral-300 hover:text-amber-500 dark:hover:text-amber-400 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg transition-colors"
          >
            <UserCircle className="w-4 h-4" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Support</span>
          </a>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            className="md:hidden p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:outline-none focus:border-amber-500"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE SEARCH BAR */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch} className="relative flex items-center">
          <input
            type="text"
            placeholder="Search testpoints, blowers, screens..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 rounded-lg py-2 pl-9 pr-16 focus:outline-none focus:border-amber-500"
          />
          <Search className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 absolute left-3 pointer-events-none" />
          <button
            type="submit"
            className="absolute right-1 px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-black font-bold text-[10px] rounded"
          >
            Search
          </button>
        </form>
      </div>

      {/* 3. DESKTOP NAVIGATION */}
      <nav className="hidden md:block bg-neutral-50/60 dark:bg-neutral-900/60 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-6 text-xs font-bold tracking-wide text-neutral-600 dark:text-neutral-300">
            <li className="py-2.5">
              <Link href="/" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                HOME
              </Link>
            </li>

            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <li key={cat.title} className="relative group py-2.5">
                  <Link
                    href={cat.mainHref}
                    className="flex items-center gap-1.5 hover:text-amber-500 dark:hover:text-amber-400 transition-colors py-1"
                  >
                    <Icon className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-400 group-hover:text-amber-500 dark:group-hover:text-amber-400" />
                    <span>{cat.title}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-transform group-hover:rotate-180" />
                  </Link>

                  {/* DROPDOWN SUBMENU */}
                  <div className="absolute left-0 top-full hidden group-hover:block group-focus-within:block w-56 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl py-2 z-50">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.title}
                        href={sub.href}
                        className="block px-4 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                </li>
              );
            })}

            <li className="py-2.5 ml-auto">
              <Link
                href="/account/repair-requests"
                className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>ASK A TECH</span>
              </Link>
            </li>

            <li className="py-2.5">
              <Link
                href="/learn-to-repair"
                className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>LEARN TO REPAIR</span>
              </Link>
            </li>

            <li className="py-2.5">
              <Link
                href="/deals"
                className="flex items-center gap-1 text-red-500 dark:text-red-400 font-bold hover:text-red-400 dark:hover:text-red-300 transition-colors"
              >
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>HOT DEALS</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* MOBILE DROPDOWN ACCORDION MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 px-4 py-4 space-y-2 max-h-[75vh] overflow-y-auto">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-neutral-800 dark:text-neutral-200"
          >
            HOME
          </Link>

          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isOpen = activeMobileCategory === cat.title;

            return (
              <div key={cat.title} className="border-b border-neutral-200/60 dark:border-neutral-800/60 pb-1">
                <button
                  onClick={() =>
                    setActiveMobileCategory(isOpen ? null : cat.title)
                  }
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between py-2 text-xs font-bold text-neutral-800 dark:text-neutral-200 text-left"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-amber-500" />
                    <span>{cat.title}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isOpen ? 'rotate-180 text-amber-500' : 'text-neutral-400 dark:text-neutral-500'
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="pl-4 py-1 space-y-1.5 border-l border-neutral-200 dark:border-neutral-800 ml-2">
                    <Link
                      href={cat.mainHref}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-xs font-bold text-amber-500 hover:underline py-1"
                    >
                      All {cat.title} →
                    </Link>
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.title}
                        href={sub.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-xs text-neutral-500 dark:text-neutral-400 hover:text-amber-500 dark:hover:text-amber-400 py-1"
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <Link
            href="/account/repair-requests"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-xs font-bold text-blue-600 dark:text-blue-400"
          >
            <Stethoscope className="w-4 h-4" />
            <span>ASK A TECH</span>
          </Link>

          <Link
            href="/learn-to-repair"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400"
          >
            <GraduationCap className="w-4 h-4" />
            <span>LEARN TO REPAIR</span>
          </Link>

          <Link
            href="/deals"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-xs font-bold text-red-500 dark:text-red-400"
          >
            <Flame className="w-4 h-4 fill-current" />
            <span>HOT DEALS</span>
          </Link>
        </div>
      )}
    </header>
  );
}
