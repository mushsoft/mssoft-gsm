import React from 'react';
import Link from 'next/link';
import { HeroSearchPortal } from '@/components/ui/HeroSearchPortal';
import { SparesPageContainer } from '@/components/spares/SparesPageContainer';

// The screen spares data module is not available in this project yet.
const SCREEN_SPARES_DATA: never[] = [];
// The battery spares data module is not available in this project yet.
const BATTERY_SPARES_DATA: never[] = [];
// The charging flex spares data module is not available in this project yet.
const CHARGING_FLEX_DATA: never[] = [];

export const metadata = {
  title: 'MS Soft GSM | Phones, Spare Parts & Technician support Uganda',
  description: 'Official directory and spare parts hub for phone repair technicians in Uganda. Search original phones, screens, batteries, accessories and charging flex assemblies.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* 1. URSB-Style Header Top Bar */}
      <header className="bg-blue-700 text-white text-xs md:text-sm font-semibold py-2 px-4 border-b border-blue-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-blue-800 px-2 py-0.5 rounded text-[11px] uppercase tracking-wider font-bold">Official</span>
            <span>MS Soft GSM – Mobile Hub, Hardware & Software Repair Platform</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-blue-100">
            <span>Kampala, Uganda</span>
            <span>•</span>
            <a href="https://wa.me/256755754880" target="_blank" rel="noreferrer" className="hover:text-white underline">
              Direct Support
            </a>
            <a href="https://wa.me/256773944288" target="_blank" rel="noreferrer" className="hover:text-white underline">
              Direct Support
            </a>
          </div>
        </div>
      </header>

      {/* 2. Top Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-blue-500/20">
              MS
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 block leading-none">
                MS SOFT <span className="text-blue-600">GSM</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">mssoft-gsm.com</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 font-semibold text-sm text-slate-600">
            <Link href="/" className="text-blue-600 border-b-2 border-blue-600 py-5">Register Home</Link>
            <a href="/spares" className="hover:text-blue-600 transition-colors">Phone Spares</a>
            <Link href="/shop/accessories" className="hover:text-blue-600 transition-colors">Accessories</Link>
            <a href="#services" className="hover:text-blue-600 transition-colors">Services</a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/256755754880"
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.143 4.174 4.148-1.087z"/>
              </svg>
              WhatsApp Support
            </a>
          </div>
        </div>
      </nav>

      {/* 3. Hero Search Portal (URSB Style) */}
      <HeroSearchPortal />

      {/* 4. Live Spares Register Table Container */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Active Spares Directory</h2>
            <p className="text-slate-500 text-sm font-medium">Verified stock levels and technician pricing in UGX</p>
          </div>
        </div>

        <SparesPageContainer
          screens={SCREEN_SPARES_DATA}
          batteries={BATTERY_SPARES_DATA}
          chargingFlexes={CHARGING_FLEX_DATA}
        />
      </section>

      {/* 5. Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center text-sm font-medium">
          <p>© 2026 MS Soft GSM (mssoft-gsm.com). All rights reserved.</p>
          <p className="mt-1 text-slate-500 text-xs">Serving  Phone Repair Technicians and GSM Specialists in Uganda.</p>
        </div>
      </footer>
    </main>
  );
}