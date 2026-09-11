import React, { useState } from 'react';

export default function About() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Navigation Bar / Header with Mobile Toggle */}
      <nav className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-black tracking-wider text-white">VK ALFA</span>
        </div>
        
        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-300">
          <a href="/" className="hover:text-blue-400 transition-colors">Home</a>
          <a href="/products.html" className="hover:text-blue-400 transition-colors">Products</a>
          <a href="/about.html" className="text-blue-400">About</a>
          <a href="/contact.html" className="hover:text-blue-400 transition-colors">Contact</a>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button 
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className="mobile-toggle md:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 flex items-center justify-center focus:outline-none"
          aria-label="Toggle Menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`h-0.5 w-full bg-white transition-transform duration-300 ${isDrawerOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`h-0.5 w-full bg-white transition-opacity duration-300 ${isDrawerOpen ? 'opacity-0' : ''}`}></span>
            <span className={`h-0.5 w-full bg-white transition-transform duration-300 ${isDrawerOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer fixed inset-y-0 right-0 z-50 w-72 bg-slate-900 border-l border-slate-800 p-6 flex flex-col gap-6 transform transition-transform duration-300 ease-in-out md:hidden ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <span className="font-black text-white tracking-wider text-sm">NAVIGATION</span>
          <button 
            onClick={() => setIsDrawerOpen(false)}
            className="text-slate-400 hover:text-white p-2 text-lg font-bold"
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col gap-4 text-base font-semibold text-slate-300">
          <a href="/" onClick={() => setIsDrawerOpen(false)} className="drawer-link hover:text-blue-400 transition-colors">Home</a>
          <a href="/products.html" onClick={() => setIsDrawerOpen(false)} className="drawer-link hover:text-blue-400 transition-colors">Products</a>
          <a href="/about.html" onClick={() => setIsDrawerOpen(false)} className="drawer-link text-blue-400">About</a>
          <a href="/contact.html" onClick={() => setIsDrawerOpen(false)} className="drawer-link hover:text-blue-400 transition-colors">Contact</a>
          <a href="/contact.html" className="drawer-btn mt-4 py-3 px-4 bg-blue-600 text-white text-center rounded-xl font-bold shadow-lg shadow-blue-600/30">Enquire Now</a>
        </div>
      </div>

      {/* Backdrop for Mobile Drawer */}
      {isDrawerOpen && (
        <div 
          onClick={() => setIsDrawerOpen(false)} 
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm md:hidden"
        ></div>
      )}

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-6 md:p-12">
        {/* Header Section */}
        <div className="mb-12 text-center md:text-left">
          <span className="inline-block px-3 py-1 mb-3 text-xs font-extrabold tracking-widest text-blue-400 uppercase bg-blue-500/10 border border-blue-500/20 rounded-full">
            Executive Governance // Bikaner
          </span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3 text-white">
            About Alfa Coolers
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl">
            Meet the leadership driving Alfa Industries forward with unwavering industrial ethics, uncompromising quality, and direct dealer accountability since 2007.
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Person 1: Kailash Chandra Rajpurohit */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 flex flex-col items-center text-center shadow-2xl transition-all duration-300 hover:border-slate-700">
            <div className="w-full h-80 overflow-hidden rounded-xl border border-slate-800/60 mb-6 bg-slate-950">
              <img 
                src="./partner-kailash-chandra.jpg" 
                alt="Kailash Chandra Rajpurohit" 
                loading="lazy"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
              />
            </div>
            <span className="text-xs font-bold tracking-wider text-blue-400 uppercase mb-1">Partner // Operations</span>
            <h3 className="text-xl font-black text-white">Kailash Chandra Rajpurohit</h3>
            <p className="text-xs text-slate-400 font-medium mt-1">Mechanical Architecture &amp; Die Tooling</p>
          </div>

          {/* Person 2: Vijay Singh Rajpurohit */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 flex flex-col items-center text-center shadow-2xl transition-all duration-300 hover:border-slate-700">
            <div className="w-full h-80 overflow-hidden rounded-xl border border-slate-800/60 mb-6 bg-slate-950">
              <img 
                src="./partner-vijay-singh.jpg" 
                alt="Vijay Singh Rajpurohit" 
                loading="lazy"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
              />
            </div>
            <span className="text-xs font-bold tracking-wider text-blue-400 uppercase mb-1">Partner // Commercial</span>
            <h3 className="text-xl font-black text-white">Vijay Singh Rajpurohit</h3>
            <p className="text-xs text-slate-400 font-medium mt-1">Supply Chain &amp; Pan-India Distribution</p>
          </div>

        </div>
      </div>
    </div>
  );
}