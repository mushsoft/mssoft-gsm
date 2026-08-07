'use client';

import React, { useState } from 'react';

export function HeroSearchPortal() {
  const [query, setQuery] = useState('');

  return (
    <section className="bg-slate-100 py-10 px-4 md:px-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main GSM Search Hero Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-slate-200 flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/60 rounded-full blur-2xl pointer-events-none -mr-16 -mt-16" />

          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
              <span>GSM & Mobile Repair Hub</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Search Spares, Devices & Repair Tools
            </h1>
            <p className="text-slate-500 font-medium mt-2 text-base">
              Instant lookup for phone specs, screen prices, ISP pinouts, flashing tools & repair tutorials.
            </p>

            {/* Main Search Input Bar */}
            <div className="mt-8 relative max-w-2xl">
              <div className="flex items-stretch border-2 border-blue-600 rounded-xl overflow-hidden focus-within:ring-4 focus-within:ring-blue-100 transition-all bg-white shadow-sm">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search model (e.g., A54 5G, iPhone 13 OLED, MTK Flash Tool, ISP Pinout)..."
                  className="w-full px-5 py-4 text-slate-800 placeholder-slate-400 font-medium focus:outline-none text-base md:text-lg"
                />
                <button 
                  type="button" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-7 flex items-center justify-center transition-colors font-semibold"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center justify-between mt-3 text-xs md:text-sm text-slate-500 px-1 font-medium">
                <span>Samsung, Apple, Tecno, Infinix, Xiaomi, Repair Equipment</span>
                <a href="/spares" className="text-blue-600 font-bold hover:underline">
                  Advanced Filters →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* GSM Quick Action Cards */}
        <div className="flex flex-col gap-4">
          <a href="/testpoints" className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all flex items-center gap-5 group">
            <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                ISP & EDL Testpoints
              </h3>
              <p className="text-sm text-slate-500 font-medium">Pinouts for Flashing & Unlocking</p>
            </div>
          </a>

          <a href="/tools" className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all flex items-center gap-5 group">
            <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Hardware Repair Tools
              </h3>
              <p className="text-sm text-slate-500 font-medium">Separators, Hot Air, Soldering & Scope</p>
            </div>
          </a>
        </div>

      </div>

      {/* GSM Quick Category Bar */}
      <div className="max-w-7xl mx-auto mt-6 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-900 mb-4">GSM Technician Directory & Resources</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-6 text-sm font-semibold text-slate-700">
          <a href="/phones" className="flex items-center gap-2 hover:text-blue-600">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Phones & Tablet Specs
          </a>
          <a href="/spares" className="flex items-center gap-2 hover:text-blue-600">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Screens, Batteries & Flexes
          </a>
          <a href="/testpoints" className="flex items-center gap-2 hover:text-blue-600">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            EDL / ISP Schematics
          </a>
          <a href="/flashing" className="flex items-center gap-2 hover:text-blue-600">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Flashing Tools & Firmware
          </a>
          <a href="/tools" className="flex items-center gap-2 hover:text-blue-600">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Soldering & Workstation Setup
          </a>
          <a href="/accessories" className="flex items-center gap-2 hover:text-blue-600">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Chargers, Cable & Accessories
          </a>
          <a href="/tutorials" className="flex items-center gap-2 hover:text-blue-600">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Hardware Repair Tutorials
          </a>
          <a href="https://wa.me/256773944288" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-emerald-600 text-emerald-600 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            WhatsApp Tech Support
          </a>
        </div>
      </div>
    </section>
  );
}